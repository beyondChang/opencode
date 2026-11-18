import { Keymap } from "../context/keymap"
import { useTheme } from "../context/theme"
import { t } from "../i18n"
import { DialogHeader, DialogLayout, useDialog } from "./dialog"

export function DialogHelp() {
  const dialog = useDialog()
  const theme = useTheme().surface("dialog")
  const shortcuts = Keymap.useShortcuts()

  Keymap.createLayer(() => ({
    mode: "modal",
    commands: [
      { bind: "return", title: t("Close help"), group: t("Dialog"), run: () => dialog.clear() },
      { bind: "escape", title: t("Close help"), group: t("Dialog"), run: () => dialog.clear() },
    ],
  }))

  return (
    <DialogLayout
      header={<DialogHeader title={t("Help")} closeLabel="esc/enter" />}
      footer={{
        actions: { primary: [{ title: t("ok"), key: "enter", onTrigger: () => dialog.clear() }] },
      }}
      legacyFooter={
        <box flexDirection="row" justifyContent="flex-end">
          <box
            paddingLeft={3}
            paddingRight={3}
            backgroundColor={theme.background.action.primary.focused}
            onMouseUp={() => dialog.clear()}
          >
            <text fg={theme.text.action.primary.focused}>{t("ok")}</text>
          </box>
        </box>
      }
    >
      <text fg={theme.text.muted}>
        {t("Press {key} to see all available actions and commands in any context.", {
          key: shortcuts.get("command.palette.show"),
        })}
      </text>
    </DialogLayout>
  )
}
