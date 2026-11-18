import { TextAttributes } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import { useTheme } from "../context/theme"
import { wordmark } from "../logo"

const spaced = (value: string) => Array.from(value).join(" ")

export function Logo() {
  const theme = useTheme()
  const dimensions = useTerminalDimensions()

  return (
    <box>
      {dimensions().height < 12 ? null : (
        <box flexDirection="row">
          <text fg={theme.text.muted} selectable={false}>
            {dimensions().width < 22 ? wordmark.left : spaced(wordmark.left)}
          </text>
          <text fg={theme.text.base} attributes={TextAttributes.BOLD} selectable={false}>
            {dimensions().width < 22 ? wordmark.right : " " + spaced(wordmark.right)}
          </text>
        </box>
      )}
    </box>
  )
}