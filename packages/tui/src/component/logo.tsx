import { TextAttributes } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/solid"
import { For } from "solid-js"
import { useTheme } from "../context/theme"
import { wordmark } from "../logo"

const spaced = (value: string) => Array.from(value).join(" ")
const artWidth = wordmark.art[0]?.length ?? 0

export function Logo() {
  const theme = useTheme()
  const dimensions = useTerminalDimensions()
  // The banner needs its full width plus the widest surrounding padding, and six rows above the composer.
  const banner = () => dimensions().width >= artWidth + 8 && dimensions().height >= 14

  return (
    <box>
      {dimensions().height < 12 ? null : banner() ? (
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
      )}
    </box>
  )
}