/** @jsxImportSource @opentui/solid */
import { expect, test } from "bun:test"
import { testRender } from "@opentui/solid"
import { Logo } from "../../src/component/logo"
import { ConfigProvider } from "../../src/config"
import { ThemeProvider } from "../../src/context/theme"
import { createTuiResolvedConfig } from "../fixture/tui-runtime"

test("home logo shows the Chinese wordmark instead of the block letters", async () => {
  const app = await testRender(
    () => (
      <ConfigProvider config={createTuiResolvedConfig()}>
        <ThemeProvider mode="dark" source={{ discover: async () => ({}) }}>
          <Logo />
        </ThemeProvider>
      </ConfigProvider>
    ),
    { width: 80, height: 30 },
  )

  try {
    await app.renderOnce()
    const frame = app.captureCharFrame()
    expect(frame).toContain("探 索")
    expect(frame).toContain("未 至 之 境")
    expect(frame).not.toContain("█▀▀█")
  } finally {
    app.renderer.destroy()
  }
})