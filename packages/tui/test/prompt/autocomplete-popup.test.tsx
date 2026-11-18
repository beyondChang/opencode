import { expect, test } from "bun:test"
import { createAppFixture } from "../fixture/app"
import { tmpdir } from "../fixture/fixture"

// lucent-orng keeps its V1 surfaces transparent, so raised background tokens resolve to alpha 0 there.
// The slash popup floats over session text and the home logo, so it must paint its own opaque backdrop.
test("slash popup paints an opaque backdrop on a theme with transparent surfaces", async () => {
  await using state = await tmpdir()
  await using app = await createAppFixture({
    state: state.path,
    config: { animations: false, theme: { name: "lucent-orng" } },
  })
  await app.ready
  await app.waitForFrame((frame) => frame.includes("commands"))
  app.mockInput.typeText("/")
  await app.renderOnce()

  const row = app
    .captureSpans()
    .lines.map((line) => line.spans)
    .filter((spans) => spans.map((span) => span.text).join("").includes("/btw"))
  expect(row).toHaveLength(1)

  const opaqueWidth = row[0]
    .filter((span) => span.bg.toInts()[3] === 255)
    .reduce((width, span) => width + span.width, 0)
  expect(opaqueWidth).toBeGreaterThan(40)
})