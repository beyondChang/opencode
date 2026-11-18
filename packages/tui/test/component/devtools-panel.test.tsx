import { expect, test } from "bun:test"
import { createAppFixture } from "../fixture/app"
import { tmpdir } from "../fixture/fixture"

// lucent-orng keeps its V1 surfaces transparent, so raised background tokens resolve to alpha 0 there.
// The devtools panels float over the session, so they must paint their own opaque backdrop.
test("devtools panel paints an opaque backdrop on a theme with transparent surfaces", async () => {
  await using state = await tmpdir()
  await using app = await createAppFixture({
    state: state.path,
    width: 100,
    height: 30,
    config: { animations: false, theme: { name: "lucent-orng" }, debug: { devtools: true } },
  })
  await app.ready
  const frame = await app.waitForFrame((row) => row.includes("Experiments"))
  const barRow = frame.split("\n").findIndex((line) => line.includes("Experiments"))
  const uiColumn = frame.split("\n")[barRow]!.indexOf("UI")

  await app.mockMouse.click(uiColumn, barRow)
  await app.renderOnce()
  const panel = app
    .captureSpans()
    .lines.map((line) => line.spans)
    .filter((spans) => spans.map((span) => span.text).join("").includes("Status"))
  expect(panel).toHaveLength(1)

  const opaqueWidth = panel[0]!.filter((span) => span.bg.toInts()[3] === 255).reduce(
    (width, span) => width + span.width,
    0,
  )
  expect(opaqueWidth).toBeGreaterThan(20)
})