/** Command titles, feedback, and static text in the remaining dialogs and components. */
export const dialogs = {
  // Composer commands.
  "Clear prompt": "清空提示",

  // Shell output dialog.
  "Copy command": "复制命令",
  "Scroll output up": "向上滚动输出",
  "Scroll output down": "向下滚动输出",
  "Previous output page": "上一页输出",
  "Next output page": "下一页输出",
  "First loaded output": "最早的已加载输出",
  "Follow shell output": "跟随 shell 输出",
  "Shell output": "Shell 输出",
  "Shell output is no longer available.": "Shell 输出已不可用。",
  "Unable to read shell output. Retrying…": "无法读取 shell 输出，正在重试…",

  // Worktree dialogs.
  "Loading worktrees failed": "加载 worktree 失败",
  "Show project worktrees": "显示项目 worktree",
  "Return to projects": "返回项目列表",
  "Worktree name (optional)": "Worktree 名称（可选）",
  "Creating worktree failed": "创建 worktree 失败",
  "Delete worktree?": "删除 worktree？",
  "This worktree has file changes. Do you want to delete it anyway?": "此 worktree 有文件改动，仍要删除吗？",
  "Failed to delete worktree": "删除 worktree 失败",
  "Could not load worktrees": "无法加载 worktree",

  // Session frame / tabs.
  "New terminal": "新建终端",
  "Close tab menu": "关闭标签页菜单",
  "Recently closed tabs": "最近关闭的标签页",
  "No recently closed tabs": "没有最近关闭的标签页",
  "Session ID copied to clipboard": "会话 ID 已复制到剪贴板",

  // Usage notices.
  "Running low on {name}": "{name} 额度即将用尽",
  "{name} limit reached": "{name} 额度已用尽",
  "Resets {time}": "重置时间：{time}",
  "{amount} left · resets {time}": "剩余 {amount} · 重置时间：{time}",
  "Switch to a free model with": "切换到免费 Model：",
  "Or turn on Extra Usage on your Go page to keep going now:": "或在 Go 页面开启额外用量以继续使用：",
  "{name} usage limit reached": "{name} 用量已达上限",
  "Switch model with": "切换 Model：",
  "Paid models are paused. Switch to a free model with": "付费 Model 已暂停，切换到免费 Model：",
  "Usage limit reached": "用量已达上限",
  "usage limit reached": "用量已达上限",

  // Update / confirm / select / autocomplete command titles.
  "Confirm update action": "确认更新操作",
  "Previous update action": "上一个更新操作",
  "Next update action": "下一个更新操作",
  "Confirm dialog selection": "确认对话框选择",
  "Previous dialog option": "上一个对话框选项",
  "Next dialog option": "下一个对话框选项",
  "Previous item": "上一项",
  "Next item": "下一项",
  "First item": "第一项",
  "Last item": "最后一项",
  "Select item": "选择项",
  "Previous section": "上一节",
  "Next section": "下一节",
  "Dismiss autocomplete": "关闭自动补全",
  "Confirm autocomplete action": "确认自动补全操作",

  // Go upsell dialog.
  "Free limit reached": "免费额度已用尽",
  "Previous Go option": "上一个 Go 选项",
  "Next Go option": "下一个 Go 选项",
  "Confirm Go option": "确认 Go 选项",
} as const
