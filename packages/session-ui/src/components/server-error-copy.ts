import type { UiI18n, UiI18nOrdinaryKey } from "@opencode/ui/context/i18n"

/**
 * Fixed English messages the server writes for its own failures. They reach an error card as plain text, so a
 * keyed translation keeps a non-English reader from seeing raw English; any other server message stays as is.
 */
const keys: Record<string, UiI18nOrdinaryKey> = {
  "Step interrupted": "ui.serverError.stepInterrupted",
  "Tool execution interrupted": "ui.serverError.toolExecutionInterrupted",
  "Compaction cancelled": "ui.serverError.compactionCancelled",
  "Compaction was interrupted": "ui.serverError.compactionInterrupted",
  "Provider did not return a tool result": "ui.serverError.toolResultMissing",
  "Tools are disabled after the maximum agent steps": "ui.serverError.maxSteps",
  "The provider response ended with an unknown finish reason.": "ui.serverError.unknownFinishReason",
  "Response still truncated after two output token limit continuations": "ui.serverError.outputLimit",
  "Tool call arguments were not completed and were not executed. Reissue the call with complete arguments.":
    "ui.serverError.incompleteToolArguments",
  "Execution was interrupted repeatedly and will not be resumed automatically.": "ui.serverError.executionInterrupted",
  "Subagent cancelled": "ui.serverError.subagentCancelled",
}

export function serverErrorCopy(i18n: UiI18n, message: string) {
  const key = keys[message.replace(/^Error:\s*/, "").trim()]

  return key ? i18n.t(key) || message : message
}
