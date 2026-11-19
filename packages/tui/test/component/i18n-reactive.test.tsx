/** @jsxImportSource @opentui/solid */
import { expect, test } from "bun:test"
import { testRender } from "@opentui/solid"
import { setLocale, t } from "../../src/i18n"

/** Locale copy is reactive so switching the language refreshes rendered text without a restart. */
test("rendered copy follows a locale switch", async () => {
  setLocale("en")
  const app = await testRender(
    () => <text>{t("Switch language")}</text>,
    { width: 40, height: 5 },
  )
  try {
    await app.renderOnce()
    expect(app.captureCharFrame()).toContain("Switch language")

    setLocale("zh-CN")
    await app.renderOnce()
    expect(app.captureCharFrame()).toContain("切换语言")
  } finally {
    app.renderer.destroy()
    setLocale("en")
  }
})
