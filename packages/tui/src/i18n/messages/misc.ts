/** Integration, plugin, pairing, devtools, and miscellaneous feedback text. */
export const misc = {
  // Integration dialog.
  "{count} connections": "{count} 个连接",
  "Sign in required →": "需要登录 →",
  "Press {key} again to confirm": "再次按 {key} 确认",
  "Disconnected {name}": "已断开 {name}",
  "Authentication expired": "认证已过期",
  "Authorization expired": "授权已过期",
  "Waiting for authorization…": "等待授权…",
  "Waiting for authorization… Press enter to open the link. If the browser can't reach this machine, paste the URL it was redirected to.":
    "等待授权…按回车打开链接。如果浏览器无法访问本机，请粘贴重定向后的网址。",
  "Connected {name}": "已连接 {name}",

  // Plugin feedback.
  Plugin: "Plugin",
  "Run /plugins to view details.": "运行 /plugins 查看详情。",
  "Open plugins": "打开插件",
  "Plugin failed: {target}": "Plugin 失败：{target}",
  "updating": "更新中",
  "disable": "禁用",
  "enable": "启用",
  "Failed to update plugin {name}": "更新插件 {name} 失败",
  local: "本地",

  // Local model / agent feedback.
  "Agent not found: {id}": "找不到 Agent：{id}",
  "Connect a provider": "连接一个 provider",
  "No provider selected": "未选择 provider",
  "{name} (unavailable)": "{name}（不可用）",
  "Add a favorite model to use this shortcut": "收藏一个模型后才能使用此快捷键",

  // Worktree / session progress.
  "Creating worktree": "正在创建 worktree",
  "Creating session": "正在创建会话",
  "Unable to determine current project": "无法确定当前项目",
  "Submitting prompt": "正在提交提示",

  // Pair dialog.
  "Open a link to connect. Links work once and expire in {minutes} minutes.": "打开链接进行连接。链接仅可使用一次，{minutes} 分钟后过期。",
  "This device": "此设备",
  Links: "链接",
  "Run `opencode service set hostname 0.0.0.0` to access the service remotely.": "运行 `opencode service set hostname 0.0.0.0` 以远程访问服务。",
  Pair: "配对",
  "Loading server information…": "正在加载服务信息…",
  "Could not load server information": "无法加载服务信息",
  "Close and reopen Pair to try again.": "关闭并重新打开配对窗口后重试。",

  // Error toasts.
  "Data migration failed": "数据迁移失败",
  "Failed to load theme: {name}": "加载主题 {name} 失败",
  "Invalid model format: {model}": "模型格式无效：{model}",
  "Failed to delete session: {error}": "删除会话失败：{error}",
  "{id}: cleanup failed: {error}": "{id}：清理失败：{error}",

  // Command descriptions / footer actions.
  "One-shot answer from the session's context without adding to the conversation": "根据会话上下文一次性回答，不加入对话记录",
  "Copy answer": "复制回答",
  "copy response": "复制回复",
  "Mark incomplete": "标记为未完成",
  "Mark complete": "标记为完成",
  "Close file menu": "关闭文件菜单",
  "Click to enlarge": "点击放大",

  // Dialogs.
  "Confirm alert": "确认提醒",
  "processing…": "处理中…",

  // DevTools panel.
  "Theme performance": "主题性能",
  Reconnect: "重新连接",
  "Last error": "最近错误",
  PID: "PID",
  Address: "地址",
  "Server details unavailable": "服务详情不可用",
  UI: "UI",
  Loop: "循环",
  CPU: "CPU",
  Memory: "内存",
  "Debug overlay": "调试覆盖层",
  Name: "名称",
  "Switch to {mode}": "切换到 {mode}",
  "Writing debug snapshot…": "正在写入调试快照…",
  "Write debug snapshot": "写入调试快照",
  Render: "渲染",
  "Time to first draw": "首次绘制耗时",
  "Turn token usage": "单轮 Token 用量",
  "Turn token usage (verbose)": "单轮 Token 用量（详细）",
} as const
