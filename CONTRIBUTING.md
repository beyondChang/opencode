# 参与贡献

本仓库是 OpenCode 的 tui-only 分支，只包含终端界面（`packages/tui`）及其依赖的工作区包。

最容易通过评审的改动：

- 缺陷修复
- 新增 LSP 与格式化工具
- LLM 性能优化
- 特定环境兼容性修复
- 缺失的标准行为
- 文档改进

界面与核心产品特性需要先经过设计评审再动手。不确定改动是否符合方向时，先联系维护者，或选择带有 [`help wanted`](https://github.com/anomalyco/opencode/issues?q=is%3Aissue%20state%3Aopen%20label%3Ahelp-wanted)、[`good first issue`](https://github.com/anomalyco/opencode/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)、[`bug`](https://github.com/anomalyco/opencode/issues?q=is%3Aissue%20state%3Aopen%20label%3Abug) 或 [`perf`](https://github.com/anomalyco/opencode/issues?q=is%3Aopen%20is%3Aissue%20label%3A%22perf%22) 标签的 issue。

打算认领某个 issue？留个评论，维护者会在无人处理时分配给你。

> [!NOTE]
> 无视上述规则的 PR 可能会被直接关闭。

## 开发环境

需要与 [`package.json`](./package.json) 中 `packageManager` 字段一致的 Bun 版本或更高版本。在仓库根目录执行：

```bash
bun install
```

### 包结构

- `packages/tui`：终端界面
- `packages/client`：生成的 TypeScript 客户端
- `packages/core`：领域行为与持久化
- `packages/schema`：共享的传输与存储契约
- `packages/protocol`：API 定义
- `packages/plugin`：插件 API
- `packages/ui`、`packages/theme`、`packages/util`：界面组件、主题与通用工具
- `packages/ai`、`packages/codemode`、`packages/simulation`、`packages/latex`、`packages/merman`、`packages/http-recorder`、`packages/httpapi-codegen`：上层依赖的辅助包

### 验证

在受影响的包目录内运行类型检查与测试，不要在仓库根目录运行：

```bash
cd packages/core
bun run test
bun typecheck
```

同时参考各包附近的 `AGENTS.md`。修改公开的 Protocol `HttpApi` 后，必须在 `packages/client` 下执行 `bun run generate`；不要手工修改生成出来的客户端文件。

风格规范见仓库的 [风格指南](./AGENTS.md)。

## 提交 PR

### 关联 Issue

缺陷修复、杂项与测试类 PR 必须引用已存在的 issue；文档、重构与特性类 PR 不受自动关联检查限制。需要时在描述中使用 `Fixes #123` 或 `Closes #123`。

在实现新功能前，请先提交一个 feature request，说明要解决的问题、为什么应属于本项目，以及你设想的方法。取得设计同意后再提交实现 PR。

### 保持聚焦

- PR 要小而专注
- 说明问题是什么、改动为什么能解决它
- 确认该功能尚不存在
- 界面改动附上改动前后的截图或录屏
- 逻辑改动说明你测了什么、评审者如何验证

### 保持简短

冗长、明显由 AI 生成的 PR 描述和 issue 可能被忽略。请用自己的话简短说明；如果改动无法简短解释，可能说明这个 PR 太大了。

### 标题规范

使用 `type(scope): summary`。支持的 type 为 `feat`、`fix`、`docs`、`chore`、`refactor`、`test`，scope 可选。

示例：

- `docs: update contributing guide`
- `fix(tui): restore scroll position`
- `feat(tui): add workspace search`

## Issue

缺陷报告与功能请求必须使用对应的 issue 模板，不接受空白 issue。使用与「怎么做」类问题请到 [Discord 社区](https://discord.gg/opencode) 提问。

自动检查会标记缺少模板、占位文本、AI 生成的大段文字以及缺少实质内容的情况。被标记后有 2 小时可修正，超时会自动关闭；如认为标记有误，请联系维护者。
