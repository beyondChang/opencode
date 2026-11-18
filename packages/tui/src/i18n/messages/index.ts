import { commands } from "./commands"
import { common } from "./common"
import { component } from "./component"
import { integration } from "./integration"
import { keybinds } from "./keybinds"
import { mini } from "./mini"
import { prompt } from "./prompt"
import { session } from "./session"
import { settings } from "./settings"
import { sidebar } from "./sidebar"
import { system } from "./system"

const parts = { common, commands, component, integration, keybinds, mini, prompt, session, settings, sidebar, system }

/**
 * Flat source-string to Chinese catalog. Area files must not repeat a source string; the
 * i18n test asserts the merged keys stay unique so a duplicate cannot silently win.
 */
export const messages: Record<string, string> = Object.assign({}, ...Object.values(parts))

export const messageParts = parts
