import { createMemo, Show } from "solid-js"
import { Card } from "@opencode/ui/card"
import { Icon } from "@opencode/ui/icon"
import { useI18n } from "@opencode/ui/context/i18n"
import { LinkedText } from "./linked-text"
import { serverErrorCopy } from "./server-error-copy"

export function SessionErrorMessage(props: { message: string; links?: boolean }) {
  const i18n = useI18n()
  const message = createMemo(() => serverErrorCopy(i18n, props.message))
  const content = createMemo(() => {
    // Only a colon before the first URL ends a title, so a scheme or port never splits a URL.
    const url = message().search(/https?:\/\//)
    const separator = message().slice(0, url === -1 ? undefined : url).indexOf(":")

    if (separator === -1) return { detail: message() }

    return {
      title: message().slice(0, separator + 1),
      detail: message().slice(separator + 1),
    }
  })

  return (
    <>
      <Show when={content().title}>{(title) => <strong class="font-[530]">{title()}</strong>}</Show>
      <Show when={props.links} fallback={content().detail}>
        <LinkedText text={content().detail} />
      </Show>
    </>
  )
}

export function SessionError(props: { message: string }) {
  return (
    <Card variant="error" class="error-card" data-kind="session-error-card">
      <div class="flex w-full min-w-0 items-start gap-2">
        <Icon name="outline-hexagonal-warning" class="shrink-0 text-v2-state-fg-danger" />
        <div class="min-w-0">
          <SessionErrorMessage message={props.message} links />
        </div>
      </div>
    </Card>
  )
}
