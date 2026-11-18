import { wordmark } from "../logo"

const reset = "\x1b[0m"
const bold = "\x1b[1m"
const dim = "\x1b[90m"

// Braille banners are printed as-is so the terminal keeps the two-tone wordmark.
function banner(pad = "") {
  return wordmark.art.map(
    (line) => `${pad}${dim}${line.slice(0, wordmark.split)}${reset}${line.slice(wordmark.split)}`,
  )
}

export type SessionEpilogue = { readonly title: string; readonly sessionID?: string }

// Printed after the TUI closes.
export function epilogue(input: { readonly session?: SessionEpilogue; readonly updatedVersion?: string }) {
  if (!input.session && !input.updatedVersion) return
  const row = (label: string, value: string) => `  ${dim}${label.padEnd(10, " ")}${reset}${bold}${value}${reset}`
  return [
    ...banner("  "),
    "",
    ...(input.updatedVersion
      ? [`  ${dim}Run ${reset}${bold}opencode${reset}${dim} to use ${reset}${bold}${input.updatedVersion}${reset}`, ""]
      : []),
    ...(input.session
      ? [row("Session", input.session.title), row("Continue", `opencode -s ${input.session.sessionID}`), ""]
      : []),
  ].join("\n")
}