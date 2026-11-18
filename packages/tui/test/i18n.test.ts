import { describe, expect, test } from "bun:test"
import { detectLocale, getLocale, setLocale, t } from "../src/i18n"
import { skillDescription } from "../src/i18n/skill-descriptions"
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

  test("translates composer agent names and reasoning effort", () => {
    setLocale("zh-CN")
    expect(t("Build")).toBe("编辑")
    expect(t("Plan")).toBe("计划")
    expect(t("low")).toBe("低")
    expect(t("medium")).toBe("中")
    expect(t("high")).toBe("高")
    expect(t("review changes [commit|branch|pr], defaults to uncommitted")).toBe(
      "查看改动 [commit|branch|pr]，默认查看未提交的改动",
    )
    setLocale("en")
    expect(t("Build")).toBe("Build")
    expect(t("high")).toBe("high")
  })

  test("translates the permission mode labels", () => {
    setLocale("zh-CN")
    expect(t("auto accept")).toBe("自动接受")
    expect(t("prompt")).toBe("按需询问")
    setLocale("en")
    expect(t("auto accept")).toBe("auto accept")
    expect(t("prompt")).toBe("prompt")
  })

  test("uses Chinese skill descriptions from the display-only map in a Chinese locale", () => {
    setLocale("zh-CN")
    expect(skillDescription("ego-browser", "original")).toContain("需要浏览器时默认读取此技能")
    expect(skillDescription("unit-tests", "original")).toContain("单元测试")
    expect(skillDescription("GitHub.cli", "original")).toContain("GitHub CLI")
    // Unknown skills and missing descriptions keep the source text.
    expect(skillDescription("custom-skill", "original")).toBe("original")
    expect(skillDescription("ego-browser", undefined)).toBeUndefined()
    setLocale("en")
    expect(skillDescription("ego-browser", "original")).toBe("original")
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
