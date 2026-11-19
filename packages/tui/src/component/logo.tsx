import { TextAttributes, type RGBA } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import { For, type JSX } from "solid-js"
import { useTheme } from "../context/theme"
import { tint } from "../theme/color"
import { getLocale } from "../i18n"
import { go, logo, wordmark } from "../logo"

const spaced = (value: string) => Array.from(value).join(" ")
const artWidth = wordmark.art[0]?.length ?? 0

export function Logo() {
  const theme = useTheme()
  const dimensions = useTerminalDimensions()
  // The banner needs its full width plus the widest surrounding padding, and three rows above the composer.
  const banner = () => dimensions().width >= artWidth + 8 && dimensions().height >= 12

  // Block glyphs shade `_ ^ ~ ,` against the background so the letters keep their drop shadow.
  const renderLine = (line: string, fg: RGBA, bold: boolean): JSX.Element[] => {
    const shadow = tint(theme.background.base, fg, 0.25)
    const attrs = bold ? TextAttributes.BOLD : undefined
    return Array.from(line).map((char) => {
      if (char === "_") {
        return (
          <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
            {" "}
          </text>
        )
      }
      if (char === "^") {
        return (
          <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === "~") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === ",") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▄
          </text>
        )
      }
      return (
        <text fg={fg} attributes={attrs} selectable={false}>
          {char}
        </text>
      )
    })
  }

  return (
    <box>
      {dimensions().height < 12 ? null : getLocale() === "zh-CN" ? (
        banner() ? (
          <box flexDirection="column">
            <For each={wordmark.art}>
              {(line) => (
                <box flexDirection="row">
                  <text fg={theme.text.muted} selectable={false}>
                    {line.slice(0, wordmark.split)}
                  </text>
                  <text fg={theme.text.base} attributes={TextAttributes.BOLD} selectable={false}>
                    {line.slice(wordmark.split)}
                  </text>
                </box>
              )}
            </For>
          </box>
        ) : (
          <box flexDirection="row">
            <text fg={theme.text.muted} selectable={false}>
              {dimensions().width < 22 ? wordmark.text.left : spaced(wordmark.text.left)}
            </text>
            <text fg={theme.text.base} attributes={TextAttributes.BOLD} selectable={false}>
              {dimensions().width < 22 ? wordmark.text.right : " " + spaced(wordmark.text.right)}
            </text>
          </box>
        )
      ) : dimensions().width < 22 ? (
        <For each={go.right.slice(1)}>
          {(line) => <box flexDirection="row">{renderLine(line, theme.text.base, true)}</box>}
        </For>
      ) : dimensions().width < 44 ? (
        <>
          <For each={logo.left.slice(1)}>
            {(line) => <box flexDirection="row">{renderLine(line, theme.text.muted, false)}</box>}
          </For>
          <For each={logo.right}>
            {(line) => <box flexDirection="row">{renderLine(line, theme.text.base, true)}</box>}
          </For>
        </>
      ) : (
        <For each={logo.left}>
          {(line, index) => (
            <box flexDirection="row" gap={1}>
              <box flexDirection="row">{renderLine(line, theme.text.muted, false)}</box>
              <box flexDirection="row">{renderLine(logo.right[index()], theme.text.base, true)}</box>
            </box>
          )}
        </For>
      )}
    </box>
  )
}
