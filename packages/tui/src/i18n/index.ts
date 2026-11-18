import { messages } from "./messages"

export type Locale = "en" | "zh-CN"
export type LocalePreference = "auto" | Locale

function localeFromTag(value: string): Locale {
  const tag = value.trim().toLowerCase().replace("_", "-")
  if (!tag || tag === "c" || tag === "posix") return "en"
  return tag.startsWith("zh") ? "zh-CN" : "en"
}

/**
 * Resolves the interface language from the explicit override, then the usual POSIX locale
 * environment variables, then the runtime locale. An undetectable environment falls back to
 * Chinese so a Chinese terminal that exposes no locale still reads as Chinese.
 */
export function detectLocale(environment: Readonly<Record<string, string | undefined>> = process.env): Locale {
  const raw = environment.OPENCODE_LOCALE ?? environment.LC_ALL ?? environment.LC_MESSAGES ?? environment.LANG
  if (raw) return localeFromTag(raw)
  const system = Intl.DateTimeFormat().resolvedOptions().locale
  if (system) return localeFromTag(system)
  return "zh-CN"
}

let locale: Locale = detectLocale()

export function setLocale(preference?: LocalePreference) {
  locale = !preference || preference === "auto" ? detectLocale() : preference
}

export function getLocale(): Locale {
  return locale
}

/**
 * Returns the interface text for an English source string. The source string is the catalog key,
 * so a missing translation falls back to English instead of showing a raw key. Values replace
 * `{name}` placeholders; missing values keep the placeholder visible.
 */
export function t(source: string, values?: Record<string, string | number | undefined>): string {
  const message = locale === "zh-CN" ? (messages[source] ?? source) : source
  if (!values) return message
  return message.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key]
    return value === undefined ? match : String(value)
  })
}
