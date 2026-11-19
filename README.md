# OpenCode TUI

开源的 AI Coding Agent 终端界面。

本仓库为 OpenCode 的精简分支，仅保留终端界面（TUI）及其完整依赖链，移除了 CLI、Server、SDK 等其它外围代码。

## 目录结构

`packages/` 下保留的包：

- `tui` — 终端界面主体
- `client`、`core`、`schema`、`protocol`、`plugin`、`plugin-browser`、`ui`、`util`、`theme` — TUI 运行所依赖的核心库
- `ai`、`codemode`、`simulation`、`latex`、`merman`、`http-recorder`、`httpapi-codegen` — 上层依赖的辅助包

## 开发

需要 [Bun](https://bun.sh) 1.4 及以上版本。

```bash
bun install          # 安装依赖
bun run typecheck    # 类型检查（turbo，覆盖全部保留包）
bun run lint         # oxlint 检查
bun run check        # lint + typecheck
```

## 参与贡献

如有兴趣贡献代码，请在提交 PR 前阅读 [贡献指南](./CONTRIBUTING.md)。

## 基于 OpenCode 进行开发

如果你在项目名中使用了 “opencode”（如 “opencode-dashboard” 或 “opencode-mobile”），请在 README 里注明该项目不是 OpenCode 团队官方开发，且不存在隶属关系。

## 社区

- [飞书群](https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=52ao9352-5623-4fa0-b7dd-3407c392c1af&qr_code=true)
- [X.com](https://x.com/opencode)

## 许可

[MIT](./LICENSE)
