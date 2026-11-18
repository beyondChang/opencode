import { useTerminalDimensions } from "@opentui/solid"
import { createMemo, createSignal } from "solid-js"
import { Keymap } from "../context/keymap"
import { useTheme } from "../context/theme"
import { DialogHeader, DialogLayout, useDialog } from "../ui/dialog"
import { createMediaSource } from "./media-source"
import { t } from "../i18n"

type ImagePreviewItem = Readonly<{
  uri: string
  mention?: Readonly<{ text: string }>
}>

export function DialogImagePreview(props: { images: readonly ImagePreviewItem[]; initial: number }) {
  const dialog = useDialog()
  const dimensions = useTerminalDimensions()
  const theme = useTheme().surface("dialog")
  const [index, setIndex] = createSignal(Math.max(0, Math.min(props.images.length - 1, props.initial)))
  const current = createMemo(() => props.images[index()])
  const media = createMediaSource(() => current().uri)
  const imageHeight = createMemo(() => Math.max(3, dimensions().height - 8))

  dialog.setSize("xlarge")
  dialog.setCentered(true)

  function move(direction: number) {
    if (props.images.length < 2) return
    setIndex((value) => (value + direction + props.images.length) % props.images.length)
  }

  Keymap.createLayer(() => ({
    mode: "modal",
    commands: [
      { bind: "left", title: t("Previous image"), group: t("Dialog"), run: () => move(-1) },
      { bind: "right", title: t("Next image"), group: t("Dialog"), run: () => move(1) },
    ],
  }))

  return (
    <DialogLayout
      id="prompt-image-viewer"
      header={<DialogHeader title={t("Image {index} of {total}", { index: index() + 1, total: props.images.length })} />}
      footer={{
        actions: {
          primary:
            props.images.length > 1
              ? [
                  { title: t("previous"), key: "←", onTrigger: () => move(-1) },
                  { title: t("next"), key: "→", onTrigger: () => move(1) },
                ]
              : [],
        },
        get children() {
          return (
            <text fg={media.failed() ? theme.text.feedback.error.base : theme.text.muted} wrapMode="none" truncate>
              {media.failed() ? t("No preview") : (current().mention?.text ?? t("Image {index}", { index: index() + 1 }))}
            </text>
          )
        },
      }}
      legacyFooter={
        <box flexDirection="row" justifyContent="space-between">
          <text fg={theme.text.muted} onMouseUp={() => move(-1)}>
            {props.images.length > 1 ? "← previous" : ""}
          </text>
          <text fg={media.failed() ? theme.text.feedback.error.base : theme.text.muted} wrapMode="none" truncate>
            {media.failed() ? t("No preview") : (current().mention?.text ?? t("Image {index}", { index: index() + 1 }))}
          </text>
          <text fg={theme.text.muted} onMouseUp={() => move(1)}>
            {props.images.length > 1 ? "next →" : ""}
          </text>
        </box>
      }
    >
      <image
        id="prompt-image-viewer-image"
        source={media.source()}
        fit="fit"
        protocol="auto"
        width="100%"
        height={imageHeight()}
        onError={media.onError}
      />
    </DialogLayout>
  )
}
