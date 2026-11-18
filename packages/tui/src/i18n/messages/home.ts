/** Home (no-session) screen, shared prompt placeholders, and startup hints. */
export const home = {
  // Example prompt text shown on the home composer.
  "Fix a TODO in the codebase": "修复代码库中的一个 TODO",
  "What is the tech stack of this project?": "这个项目用了哪些技术栈？",
  "Fix broken tests": "修复失败的测试",

  // Placeholder templates that wrap the rotating example above.
  "Ask anything… \"{example}\"": "随便问点什么…「{example}」",
  "Run a command… \"{example}\"": "运行命令…「{example}」",

  // Update notification on the home screen.
  "remote server update available": "服务端有可用更新",
  "restart to use v{version}": " 重启以使用 v{version}",
  "to install v{version}": " 安装 v{version}",

  // Home footer status.
  "{count} MCP failed": "{count} 个 MCP 服务失败",
  "{count} MCP": "{count} 个 MCP 服务",
  "{count} plugin failed": "{count} 个插件失败",
  "{count} plugins failed": "{count} 个插件失败",

  // Prompt footer hints (also visible on home).
  "{command} commands": "{command} 命令",
  commands: "命令",
  shell: "Shell",
  "exit shell mode": "退出 shell 模式",
  "{count} subagent": "{count} 个子 Agent",
  "{count} subagents": "{count} 个子 Agent",
  "{count} shell": "{count} 个 Shell",
  "{count} shells": "{count} 个 Shell",

  // Composer metadata and startup overlay.
  // Agent names and reasoning effort shown next to the model in the composer.
  Build: "编辑",
  Plan: "计划",
  "(new worktree)": "（新建 worktree）",
  recent: "最近",
  "+{count} more": "还有 {count} 项",
  "Press ctrl+d to confirm": "按 ctrl+d 确认",
  "Finishing startup…": "正在完成启动…",
  "Loading plugins…": "正在加载插件…",
} as const
