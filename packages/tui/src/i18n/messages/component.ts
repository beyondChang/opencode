/** Titles, placeholders, keymap labels, and feedback in the component dialogs. */
export const component = {
  // Command palette.
  "Settings · {category}": "设置 · {category}",
  Suggested: "推荐",
  "Search commands": "搜索命令",

  // Agent / variant / model selection dialogs.
  "Search agents": "搜索 Agent",
  "Search models": "搜索 Model",

  // Debug dialog.
  Version: "版本",
  Date: "日期",
  OS: "操作系统",
  "Session ID": "会话 ID",
  "Debug info copied to clipboard": "调试信息已复制到剪贴板",
  "Copy debug info": "复制调试信息",
  "Share this when reporting an issue": "报告问题时请附上此信息",

  // Error details dialog.
  "Copy details": "复制详情",
  "Investigate error": "查看错误",

  // Release highlights dialog.
  "Close highlights": "关闭更新亮点",
  "Scroll to top": "滚动到顶部",
  "Scroll to bottom": "滚动到底部",
  "What's new in {version}": "{version} 更新亮点",

  // Experiments dialog.
  "New designs": "新设计",
  "Preview the new TUI designs": "预览新版 TUI 设计",
  "TUI tools": "TUI 工具",
  "Let the agent open terminals in this TUI (requires server support)": "允许 Agent 在此 TUI 中打开终端（需要服务端支持）",
  Experiments: "实验功能",
  "No experiments available": "暂无可用实验功能",

  // Other dialog chrome.
  Themes: "主题",
  Stash: "暂存",
  "Name worktree": "命名 worktree",
  "Worktree name": "Worktree 名称",

  // Skill dialog.
  Skills: "技能",
  "No skills available": "暂无可用技能",
  "Could not load skills": "无法加载技能",
  "Close and reopen Skills to try again.": "请关闭并重新打开技能列表重试。",
  "Loading skills…": "正在加载技能…",
  "No skills found": "未找到技能",

  // Status dialog.
  Status: "状态",
  "No MCP servers": "没有 MCP 服务",
  "{count} MCP servers": "{count} 个 MCP 服务",
  Connected: "已连接",
  "Disabled in configuration": "已在配置中禁用",
  "Needs authentication: {error}": "需要认证：{error}",

  // Free models dialog.
  "Free models": "免费 Model",
  "Connect a provider for access to more models": "连接服务商以使用更多 Model",
  "connect provider": "连接服务商",
  favorite: "收藏",
  unfavorite: "取消收藏",

  // Session rename / list dialogs.
  "Session title": "会话标题",
  "Failed to rename session: {error}": "重命名会话失败：{error}",
  Today: "今天",
  Pinned: "已置顶",
  Sessions: "会话",
  "for {project}": "（{project}）",
  "Search sessions": "搜索会话",
  "Search sessions in {project}": "在 {project} 中搜索会话",

  // Image preview dialog.
  "Previous image": "上一张图片",
  "Next image": "下一张图片",
  "Image {index} of {total}": "第 {index} 张，共 {total} 张",
  "Image {index}": "图片 {index}",
  previous: "上一张",

  // Generic select / prompt dialogs.
  "No items available": "暂无可选项",
  "No results found": "未找到结果",

  // Working directory actions.
  "Working directory": "工作目录",
  "Copy path": "复制路径",
  "Path copied to clipboard": "路径已复制到剪贴板",
  "Open folder": "打开文件夹",
  "in system file manager": "在系统文件管理器中",
  Workspaces: "工作区",
  "to another working directory": "切换到其他工作目录",

  // Export dialogs.
  Format: "格式",
  Location: "位置",
  Options: "选项",
  Sanitize: "脱敏",
  "Export session": "导出会话",
  "Change export option": "修改导出选项",
  "Save to file": "保存到文件",
  "save to file": "保存到文件",
  "Previous export option": "上一个导出选项",
  "Next export option": "下一个导出选项",
  "Select export option": "选择导出选项",
  include: "包含",
  exclude: "排除",
  Export: "导出",
  "Export as:": "导出格式：",
  "Include thinking": "包含思考过程",
  "Include tools": "包含工具",
  "Sanitize sensitive data": "脱敏敏感数据",
  copied: "已复制",
  "copy path": "复制路径",
  "Close export result": "关闭导出结果",
  "Copy export path": "复制导出路径",
  "Session exported": "会话已导出",
  "Saved to": "已保存到",
} as const
