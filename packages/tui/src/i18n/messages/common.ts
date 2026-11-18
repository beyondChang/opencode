/**
 * Shared interface vocabulary. Keep entries short and neutral so the same wording can be reused
 * by the main TUI, mini, and run output.
 */
export const common = {
  // Generic actions and dialog controls.
  Search: "搜索",
  Settings: "设置",
  Help: "帮助",
  ok: "确定",
  Back: "返回",
  cancel: "取消",
  Cancel: "取消",
  Done: "完成",
  Confirm: "确定",
  Close: "关闭",
  Copy: "复制",
  Delete: "删除",
  Retry: "重试",
  "Working…": "处理中…",
  "Enter text": "输入文本",
  "Loading…": "加载中…",
  "Loading session history…": "正在加载会话历史…",
  "No matches": "没有匹配项",

  // Common nouns and status labels.
  Tokens: "Token",
  Context: "上下文",
  Cost: "花费",
  Model: "模型",
  Agent: "Agent",
  Session: "会话",
  "Session done": "会话完成",
  "Session failed": "会话失败",
  "Permission required": "需要权限",
  "Input needs response": "输入需要响应",
  "Permission needs input": "权限需要确认",
  Thought: "思考",
  Background: "后台",
  Queued: "已排队",
  "Compaction queued": "已排队压缩",
  "No preview": "无预览",

  // Help dialog.
  "Close help": "关闭帮助",
  "Press {key} to see all available actions and commands in any context.":
    "按 {key} 可在任意界面查看所有可用操作和命令。",
} as const
