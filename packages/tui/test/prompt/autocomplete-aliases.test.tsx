import { expect, test } from "bun:test"
import { createAppFixture } from "../fixture/app"
import { tmpdir } from "../fixture/fixture"

// `/variants` and `/effort` are aliases of `/thinking`. The popup lists one row per command,
// so searching by the shared description or by an alias finds the command once instead of
// repeating the same row for every alias.
test("slash autocomplete lists an aliased command once", async () => {
  await using state = await tmpdir()
  await using app = await createAppFixture({ state: state.path, width: 120, height: 30 })
  await app.ready
  await app.waitForFrame((frame) => frame.includes("commands"))

  app.mockInput.typeText("/variant")
  await app.renderOnce()
  const frame = app.captureCharFrame()
  expect(frame.split("\n").filter((line) => line.includes("Switch thinking effort"))).toHaveLength(1)
  expect(frame.split("\n").filter((line) => line.includes("/thinking"))).toHaveLength(1)
  expect(frame).not.toContain("/effort")
})

test("slash autocomplete still finds the command by a secondary alias", async () => {
  await using state = await tmpdir()
  await using app = await createAppFixture({ state: state.path, width: 120, height: 30 })
  await app.ready
  await app.waitForFrame((frame) => frame.includes("commands"))

  app.mockInput.typeText("/effort")
  await app.renderOnce()
  const frame = app.captureCharFrame()
  expect(frame.split("\n").filter((line) => line.includes("/thinking"))).toHaveLength(1)
})