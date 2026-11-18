import { describe, expect, test } from "bun:test"
import { detectLocale, getLocale, setLocale, t } from "../src/i18n"
import { messageParts } from "../src/i18n/messages"

describe("i18n", () => {
  test("detects Chinese and English locales from the environment", () => {
    expect(detectLocale({ LANG: "zh_CN.UTF-8" })).toBe("zh-CN")
    expect(detectLocale({ LC_ALL: "zh-TW" })).toBe("zh-CN")
    expect(detectLocale({ LANG: "en_US.UTF-8" })).toBe("en")
    expect(detectLocale({ LANG: "de_DE.UTF-8" })).toBe("en")
    expect(detectLocale({ OPENCODE_LOCALE: "zh-CN", LANG: "en_US.UTF-8" })).toBe("zh-CN")
    expect(detectLocale({ LANG: "C" })).toBe("en")
  })

  test("falls back to the source string when a translation is missing", () => {
    setLocale("zh-CN")
    expect(t("Not translated yet")).toBe("Not translated yet")
    setLocale("en")
  })

  test("translates and interpolates values", () => {
    setLocale("zh-CN")
    expect(t("Settings")).toBe("设置")
    expect(t("Switch to session in quick slot {slot}", { slot: 3 })).toBe("切换到快速槽位 3 的会话")
    expect(t("Keep {name} visible", { name: undefined })).toBe("Keep {name} visible")
    setLocale("en")
    expect(t("Switch to session in quick slot {slot}", { slot: 3 })).toBe("Switch to session in quick slot 3")
  })

  test("keeps the source text in English", () => {
    setLocale("en")
    expect(getLocale()).toBe("en")
    expect(t("Settings")).toBe("Settings")
  })

  test("does not repeat a source string across catalog areas", () => {
    const seen = new Map<string, string>()
    for (const [area, part] of Object.entries(messageParts)) {
      for (const key of Object.keys(part)) {
        expect({ key, area, previous: seen.get(key) }).toEqual({ key, area, previous: undefined })
        seen.set(key, area)
      }
    }
  })
})
