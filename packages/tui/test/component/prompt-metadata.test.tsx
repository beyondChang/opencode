/** @jsxImportSource @opentui/solid */
import { expect, test } from "bun:test"
import { RGBA } from "@opentui/core"
import { testRender } from "@opentui/solid"
import { PromptMetadataRow } from "../../src/component/prompt/metadata"
import { ConfigProvider } from "../../src/config"
import { ThemeProvider } from "../../src/context/theme"
import { createTuiResolvedConfig } from "../fixture/tui-runtime"

const render = async (auto: boolean) => {
  const app = await testRender(
    () => (
      <ConfigProvider config={createTuiResolvedConfig()}>
        <ThemeProvider mode="dark" source={{ discover: async () => ({}) }}>
          <PromptMetadataRow
            mode="normal"
            agent="Build"
            auto={auto}
            model="DeepSeek V4.1 Flash Free"
            provider=""
            muted={false}
            highlight={RGBA.fromHex("#ffffff")}
            agentAlpha={1}
            modelAlpha={1}
            variantAlpha={1}
          />
        </ThemeProvider>
      </ConfigProvider>
    ),
    { width: 120, height: 30 },
  )
  try {
    await app.renderOnce()
    return app.captureCharFrame()
  } finally {
    app.renderer.destroy()
  }
}

// The i18n catalog is process-global and other test files flip it, so match either locale.
test("composer marks auto accept permission mode", async () => {
  const frame = await render(true)
  expect(frame).toMatch(/auto accept|自动接受/)
})

test("composer marks the permission mode that asks", async () => {
  const frame = await render(false)
  expect(frame).toMatch(/prompt|按需询问/)
  expect(frame).not.toMatch(/auto accept|自动接受/)
})