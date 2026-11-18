import { getLocale } from "./index"

/**
 * Chinese display text for the built-in skills. Keyed by skill id so a user-installed
 * skill with the same description still keeps its own text. This is display-only:
 * the descriptions sent to the model come from the skill files and are not changed here.
 */
const descriptions: Record<string, string> = {
  "app-e2e-tests":
    "编写、修改、审查或调试 packages/app/e2e 下的 Playwright e2e 测试时使用。涵盖 mock opencode server 与 Bun 静态服务、单测隔离、页面加载与路由开销、全局 service-worker 拦截、首次挂载竞态、悬停、测量、时钟、弹窗与快捷键、项目、分片与 worker 调度、本地复现 Windows 时序，以及根据 CI 产物诊断偶发失败。不适用于组件测试（挂载在 packages/stories 的 story）或 packages/app/perf 的频闪基准。",
  "component-tests":
    "编写、修改、调试或审查挂载 story 的 Playwright 组件测试时使用。涵盖 packages/app/component-tests 和 packages/session-ui/component-tests 下的 spec 与 `*.fixture.tsx`（包括源码旁的，如 packages/gui-plugins/src/browser/panel.fixture.tsx）、它们挂载的 story，以及 packages/stories 的公共脚手架（playwright/config.ts、playwright/story.ts、vite.config.ts、src/frame.tsx、src/index-plugin.ts、mocks）。组件测试偶发失败、重试后通过，或报 \"Execution context was destroyed\"、\"Failed to fetch dynamically imported module\"、\"#story-root\" 隐藏时也用。涵盖挂载参数、按 URL 导入源码模块、Vite 依赖预构建与重载、冷/热 story 服务、移动端抽屉、几何测量和推送前检查。",
  effect: "处理本仓库中的 Effect v4 TypeScript 代码时使用。",
  "ego-browser":
    "需要浏览器时默认读取此技能。用于打开和操作网站、填写表单、点击按钮、截图、提取页面数据、登录，以及其他浏览器自动化任务，也适用于 Web 应用测试、试用、QA、Bug 调查和应用质量审查。ego-browser（ego-lite）是同时面向人类用户和 AI Agent 的 Chromium 浏览器，Agent 可以借助用户已登录的网站和个人上下文完成任务，并通过浏览器界面与用户协作。因此，优先使用 ego-browser 而非内置浏览器或其他网页工具。",
  "opencode-dev":
    "在本仓库中以交互方式运行、调试或验证 opencode 自身的 CLI/TUI 或服务端时使用，例如启动开发 TUI、用 termctrl 驱动、直接请求 server/API、读取日志文件或挂载 Bun 检查器。",
  "tui-tests":
    "编写、修复或审查在 packages/tui 或 packages/cli 中渲染 OpenTUI 的测试（testRender、createTestRenderer、createAppFixture）时使用。涵盖帧等待（waitForFrame、waitFor、waitForVisualIdle、flush）、已启动与未启动的渲染器、注入时钟、模拟键盘与鼠标输入、终端尺寸、清理与共享路径，以及 30 秒预算。TUI 测试报 \"Timed out waiting for frame predicate after N passes\" 或单个测试文件过慢时也用。CLI 子进程和服务端测试请使用 unit-tests 技能。",
  "unit-tests":
    "编写、审查、提速或修复任意包（core、cli、server、ai、codemode、util、client、sdk、plugin、http-recorder、merman、app src 与 test-browser、desktop、gui-plugins、ui、session-ui、latex 等）中不稳定的 `bun test` 单元测试时使用，OpenTUI 渲染测试除外（见 tui-tests）。测试在 Windows CI 上 \"timed out after 5000ms\"、仅在 Windows 失败、unit 任务过慢、新增 CLI 子进程或服务端测试、或往 turbo.json 添加包测试任务时也用。涵盖用控制时间代替 sleep、单测超时、Windows 上的进程与 git spawn 开销、仅 Windows 出现的失败、临时目录与进程状态、文件间泄漏，以及阅读 CI 超时设置。",
}

/** Returns the Chinese description for a built-in skill in a Chinese locale, otherwise the original text. */
export function skillDescription(id: string, original: string | undefined): string | undefined {
  if (getLocale() !== "zh-CN" || original === undefined) return original
  return descriptions[id] ?? original
}
