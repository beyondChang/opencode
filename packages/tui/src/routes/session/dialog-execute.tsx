import { TextAttributes, type CodeRenderable, type LineInfo, type ScrollBoxRenderable } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import type { SessionMessageAssistantTool } from "@opencode/client/promise"
import { createMemo, createSignal, onCleanup, Show } from "solid-js"
import stripAnsi from "strip-ansi"
import { useConfig } from "../../config"
import { useClipboard } from "../../context/clipboard"
import { Keymap } from "../../context/keymap"
import { useTheme, useThemes } from "../../context/theme"
import {
  DIALOG_INSET,
  DialogBleed,
  DialogFooter,
  DialogHeader,
  DialogLayout,
  dialogWidth,
  useDialog,
} from "../../ui/dialog"
import { useToast } from "../../ui/toast"
import { t } from "../../i18n"
import { Locale } from "../../util/locale"
import { getScrollAcceleration } from "../../util/scroll"
import { formatExecuteOutput } from "@opencode/util/execute-output"

// The part is the live store object, so the dialog follows the tool while child
// calls stream and the output arrives.
export function DialogExecute(props: { part: SessionMessageAssistantTool }) {
  const dialog = useDialog()
  const clipboard = useClipboard()
  const toast = useToast()
  const theme = useTheme().surface("dialog")
  const contentTheme = useTheme()
  const dimensions = useTerminalDimensions()
  const config = useConfig().data
  const [copied, setCopied] = createSignal<"code" | "output">()
  const maxHeight = createMemo(() => Math.max(3, Math.floor(dimensions().height * 0.7) - 6))
  let scroll: ScrollBoxRenderable | undefined

  dialog.setSize("xlarge")
  dialog.setCentered(true)

  const code = createMemo(() => executeCode(props.part.state.input))
  const text = createMemo(() => outputText(props.part.state))
  const highlighted = createMemo(() => {
    const value = text()
    return value ? highlightedOutput(value) : undefined
  })
  const failed = createMemo(() => {
    const state = props.part.state
    if (state.status === "error") return true
    if (state.status === "streaming") return false
    return state.metadata?.error === true
  })
  // Both blocks share one gutter width so their content starts on the same column.
  const digits = createMemo(() => String(Math.max(lineCount(code()), lineCount(highlighted()?.json), 1)).length)
  // Code and JSON wrap by character, so the content height is known up front.
  // Sizing synchronously lets the dialog open complete instead of growing over frames.
  const height = createMemo(() => {
    const width = Math.max(20, Math.min(dialogWidth(dialog.size), dimensions().width - 2) - DIALOG_INSET * 2)
    const codeWidth = Math.max(1, width - digits() - 1)
    const body = highlighted()
    const outputRows = body
      ? wrappedRows(body.json, codeWidth) + wrappedRows(body.rest, codeWidth)
      : wrappedRows(text(), width) || 1
    return Math.min(maxHeight(), (wrappedRows(code(), codeWidth) || 1) + outputRows + 5)
  })
  const status = createMemo(() => {
    const state = props.part.state
    if (state.status === "streaming") return t("Receiving code…")
    if (state.status === "running") return t("Running")
    const duration = props.part.time.completed
      ? ` · ${Locale.duration(props.part.time.completed - (props.part.time.ran ?? props.part.time.created))}`
      : ""
    if (failed()) return `${t("Failed")}${duration}`
    return `${t("Completed")}${duration}`
  })

  const copy = (kind: "code" | "output") => {
    const value = kind === "code" ? code() : text()
    if (!value) return
    void clipboard
      .write(value)
      .then(() => setCopied(kind))
      .catch(toast.error)
  }

  Keymap.createLayer(() => ({
    mode: "modal",
    commands: [
      { bind: "up", title: t("Scroll up"), group: t("Execute"), run: () => scroll?.scrollBy(-1) },
      { bind: "down", title: t("Scroll down"), group: t("Execute"), run: () => scroll?.scrollBy(1) },
      { bind: "pageup", title: t("Previous page"), group: t("Execute"), run: () => scroll?.scrollBy(-maxHeight()) },
      { bind: "pagedown", title: t("Next page"), group: t("Execute"), run: () => scroll?.scrollBy(maxHeight()) },
      { bind: "home", title: t("Scroll to code"), group: t("Execute"), run: () => scroll?.scrollTo(0) },
      { bind: "end", title: t("Scroll to output"), group: t("Execute"), run: () => scroll?.scrollTo(Infinity) },
      { bind: "c", title: t("Copy code"), group: t("Execute"), run: () => copy("code") },
      { bind: "o", title: t("Copy output"), group: t("Execute"), run: () => copy("output") },
    ],
  }))

  const copyActions = () => [
    copied() === "code"
      ? { title: t("✓ copied"), color: theme.text.feedback.success.base, onTrigger: () => copy("code") }
      : { title: t("copy code"), key: "c", onTrigger: () => copy("code") },
    copied() === "output"
      ? { title: t("✓ copied"), color: theme.text.feedback.success.base, onTrigger: () => copy("output") }
      : { title: t("copy output"), key: "o", onTrigger: () => copy("output") },
  ]

  return (
    <DialogLayout
      header={
        <DialogHeader
          gap={2}
          titleView={
            <text fg={theme.text.base} attributes={TextAttributes.BOLD} flexGrow={1}>
              {t("execute")}
            </text>
          }
        >
          <text fg={failed() ? theme.text.feedback.error.base : theme.text.muted}>{status()}</text>
        </DialogHeader>
      }
      footer={{ actions: { primary: copyActions() } }}
      footerGap={0}
      legacyFooter={
        <DialogFooter
          actions={{
            secondary: [
              { title: t("scroll"), key: "↑/↓" },
              ...copyActions(),
              { title: t("back"), key: "esc", onTrigger: () => dialog.clear() },
            ],
          }}
        />
      }
    >
      <DialogBleed>
        <scrollbox
          id="execute-detail-scroll"
          ref={(value: ScrollBoxRenderable) => (scroll = value)}
          height={height()}
          contentOptions={{ minHeight: 0 }}
          backgroundColor={contentTheme.background.raised.high}
          scrollbarOptions={{ visible: false }}
          scrollAcceleration={getScrollAcceleration(config)}
        >
          <box gap={1} paddingLeft={DIALOG_INSET} paddingRight={DIALOG_INSET} paddingTop={1} paddingBottom={1}>
            <box>
              <text fg={contentTheme.text.muted} attributes={TextAttributes.BOLD}>
                {t("Code")}
              </text>
              <Show when={code()} fallback={<text fg={contentTheme.text.muted}>{t("Waiting for code…")}</text>}>
                {(value) => <GutteredCode content={value()} filetype="typescript" digits={digits()} />}
              </Show>
            </box>
            <box>
              <text fg={contentTheme.text.muted} attributes={TextAttributes.BOLD}>
                {t("Output")}
              </text>
              <Show
                when={highlighted()}
                fallback={
                  <text
                    fg={
                      text()
                        ? failed()
                          ? contentTheme.text.feedback.error.base
                          : contentTheme.text.base
                        : contentTheme.text.muted
                    }
                    wrapMode="word"
                  >
                    {text() ??
                      (props.part.state.status === "completed" ? t("No output") : t("Waiting for output…"))}
                  </text>
                }
              >
                {(body) => (
                  <>
                    <GutteredCode content={body().json} filetype="json" digits={digits()} />
                    <Show when={body().rest}>
                      {(rest) => (
                        <box paddingLeft={digits() + 1}>
                          <text
                            fg={failed() ? contentTheme.text.feedback.error.base : contentTheme.text.base}
                            wrapMode="word"
                          >
                            {rest()}
                          </text>
                        </box>
                      )}
                    </Show>
                  </>
                )}
              </Show>
            </box>
          </box>
        </scrollbox>
      </DialogBleed>
    </DialogLayout>
  )
}

function executeCode(input: SessionMessageAssistantTool["state"]["input"]) {
  if (typeof input === "string") return
  return typeof input.code === "string" && input.code ? input.code : undefined
}

function outputText(state: SessionMessageAssistantTool["state"]) {
  if (state.status === "error") return stripAnsi(state.error.message) || undefined
  if (state.status !== "completed") return
  const text = stripAnsi(
    state.content
      .flatMap((item) => (item.type === "text" ? [item.text] : []))
      .join("\n")
      .trim(),
  )
  return text || undefined
}

// A JSON result shows indented and highlighted, with any "Warnings:" and "Logs:" sections below it.
function highlightedOutput(text: string) {
  const formatted = formatExecuteOutput(text)
  if (formatted.json === undefined) return
  return { json: formatted.json, rest: formatted.rest }
}

function lineCount(text: string | undefined) {
  return text ? text.split("\n").length : 0
}

function wrappedRows(text: string | undefined, width: number) {
  if (!text) return 0
  return text.split("\n").reduce((sum, line) => sum + Math.max(1, Math.ceil(line.length / width)), 0)
}

// `<line_number>` right-aligns digits in a gutter sized to that block alone, so
// the column "1" starts on depends on the line count and differs between calls.
// One shared left-aligned gutter keeps the title and every line number on the
// same column, and keeps code and output on one content column. The gutter
// follows the wrapped layout so continuation rows stay unnumbered.
function GutteredCode(props: { content: string; filetype: "typescript" | "json"; digits: number }) {
  const theme = useTheme()
  const syntax = useThemes().currentSyntax
  const [info, setInfo] = createSignal<LineInfo>()
  const gutter = createMemo(() => {
    const sources = info()?.lineSources ?? props.content.split("\n").map((_, index) => index)
    return sources
      .map((source, index) => (sources[index - 1] === source ? "" : String(source + 1)).padEnd(props.digits))
      .join("\n")
  })
  const track = (block: CodeRenderable) => {
    const update = () => setInfo({ ...block.lineInfo })
    block.on("line-info-change", update)
    onCleanup(() => block.off("line-info-change", update))
  }

  return (
    <box flexDirection="row" gap={1} width="100%">
      <text fg={theme.text.muted} flexShrink={0} width={props.digits}>
        {gutter()}
      </text>
      <box flexGrow={1} flexShrink={1} minWidth={0}>
        <code
          ref={track}
          width="100%"
          conceal={false}
          wrapMode="char"
          fg={theme.text.base}
          filetype={props.filetype}
          syntaxStyle={syntax()}
          content={props.content}
        />
      </box>
    </box>
  )
}
