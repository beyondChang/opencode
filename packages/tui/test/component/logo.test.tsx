/** @jsxImportSource @opentui/solid */
import { afterEach, expect, test } from "bun:test"
import { testRender } from "@opentui/solid"
import { Logo } from "../../src/component/logo"
import { ConfigProvider } from "../../src/config"
import { ThemeProvider } from "../../src/context/theme"
import { setLocale, type Locale } from "../../src/i18n"
import { logo, wordmark } from "../../src/logo"
import { createTuiResolvedConfig } from "../fixture/tui-runtime"

afterEach(() => setLocale("en"))

const render = async (width: number, height: number) => {
  const app = await testRender(
    () => (
      <ConfigProvider config={createTuiResolvedConfig()}>
        <ThemeProvider mode="dark" source={{ discover: async () => ({}) }}>
          <Logo />
        </ThemeProvider>
      </ConfigProvider>
    ),
    { width, height },
  )
  try {
    await app.renderOnce()
    return app.captureCharFrame()
  } finally {
    app.renderer.destroy()
  }
}

const draw = async (locale: Locale, width: number, height: number) => {
  setLocale(locale)
  return render(width, height)
}

test("home logo draws the braille wordmark in Chinese", async () => {
  const frame = await draw("zh-CN", 120, 40)
  for (const line of wordmark.art) expect(frame).toContain(line)
  expect(frame).not.toContain("█▀▀█")
})

test("home logo falls back to the compact Chinese wordmark on a narrow terminal", async () => {
  const frame = await draw("zh-CN", 44, 30)
  expect(frame).toContain("探 索 未 至 之 境")
  expect(frame).not.toContain(wordmark.art[0])
})

test("home logo draws the opencode block wordmark in English", async () => {
  const frame = await draw("en", 120, 40)
  // The block wordmark rows without shading markers survive as-is in the frame.
  expect(frame).toContain(logo.right[1])
  expect(frame).toContain(logo.right[3])
  expect(frame).not.toContain(wordmark.art[0])
})

test("home logo stacks the opencode block wordmark on a medium terminal", async () => {
  const frame = await draw("en", 30, 30)
  expect(frame).toContain(logo.right[1])
  expect(frame).not.toContain(wordmark.art[0])
})

test("logo repaints when the locale switches", async () => {
  setLocale("en")
  const app = await testRender(
    () => (
      <ConfigProvider config={createTuiResolvedConfig()}>
        <ThemeProvider mode="dark" source={{ discover: async () => ({}) }}>
          <Logo />
        </ThemeProvider>
      </ConfigProvider>
    ),
    { width: 120, height: 40 },
  )
  try {
    await app.renderOnce()
    expect(app.captureCharFrame()).toContain(logo.right[1])

    setLocale("zh-CN")
    await app.renderOnce()
    const frame = app.captureCharFrame()
    expect(frame).toContain(wordmark.art[0])
    expect(frame).not.toContain(logo.right[1])
  } finally {
    app.renderer.destroy()
  }
})
