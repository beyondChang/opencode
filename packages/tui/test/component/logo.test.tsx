/** @jsxImportSource @opentui/solid */
import { expect, test } from "bun:test"
import { testRender } from "@opentui/solid"
import { Logo } from "../../src/component/logo"
import { ConfigProvider } from "../../src/config"
import { ThemeProvider } from "../../src/context/theme"
import { wordmark } from "../../src/logo"
import { createTuiResolvedConfig } from "../fixture/tui-runtime"

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

test("home logo draws the enlarged braille wordmark on a wide terminal", async () => {
  const frame = await render(120, 40)
  for (const line of wordmark.art) expect(frame).toContain(line)
  expect(frame).not.toContain("█▀▀█")
})

test("home logo falls back to the compact wordmark on a narrow terminal", async () => {
  const frame = await render(60, 30)
  expect(frame).toContain("探 索 未 至 之 境")
  expect(frame).not.toContain(wordmark.art[0])
})