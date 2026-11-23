import { createMemo } from "solid-js"
import { useRenderer } from "@opentui/solid"
import { useData } from "../../context/data"
import { DialogSelect } from "../../ui/dialog-select"
import { useClipboard } from "../../context/clipboard"
import { useToast } from "../../ui/toast"
import { useClient } from "../../context/client"
import { errorMessage } from "../../util/error"
import { DialogFork } from "./dialog-fork"
import { usePromptRestore } from "../../prompt/restore"
import { appendToSessionPrompt } from "../../component/prompt/draft-stash"
import { t } from "../../i18n"

export function DialogMessage(props: { messageID: string; sessionID: string }) {
  const data = useData()
  const clipboard = useClipboard()
  const toast = useToast()
  const client = useClient()
  const renderer = useRenderer()
  const restorePrompt = usePromptRestore()
  const message = createMemo(() => data.session.message.get(props.sessionID, props.messageID))

  return (
    <DialogSelect
      title={t("Message Actions")}
      searchInTitle
      titlePlaceholder={t("Search actions")}
      options={[
        {
          title: t("Jump to"),
          value: "message.jump",
          description: t("view message in session"),
          onSelect: (dialog) => dialog.clear(),
        },
        {
          title: t("Revert"),
          value: "session.revert",
          description: t("undo messages and file changes"),
          onSelect: (dialog) => {
            const value = message()
            const { sessionID, messageID } = props
            // The composer changes only once the revert is staged, so a failed revert leaves the draft alone.
            void (async () => {
              const restored = value?.type === "user" ? await restorePrompt(value) : undefined
              await client.api.session.revert.stage({ sessionID, messageID })
              if (restored) appendToSessionPrompt(sessionID, restored, renderer.widthMethod)
            })().catch((error) => toast.show({ message: errorMessage(error), variant: "error", duration: 5000 }))
            dialog.clear()
          },
        },
        {
          title: t("Copy"),
          value: "message.copy",
          description: t("message text to clipboard"),
          onSelect: async (dialog) => {
            const value = message()
            if (!value) return
            const text =
              value.type === "user"
                ? value.text
                : value.type === "assistant"
                  ? value.content
                      .filter((content) => content.type === "text")
                      .map((content) => content.text)
                      .join("\n")
                  : "text" in value
                    ? value.text
                    : ""
            try {
              await clipboard.write(text)
              dialog.clear()
            } catch (error) {
              toast.error(error)
            }
          },
        },
        {
          title: t("Fork"),
          value: "session.fork",
          description: t("create a new session"),
          onSelect: (dialog) => {
            const value = message()
            if (!value || value.type !== "user") return
            dialog.replace(() => <DialogFork sessionID={props.sessionID} messageID={props.messageID} />)
          },
        },
      ]}
    />
  )
}
