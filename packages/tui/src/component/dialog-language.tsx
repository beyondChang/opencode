import { DialogSelect, type DialogSelectOption } from "../ui/dialog-select"
import { useConfig } from "../config"
import { useDialog } from "../ui/dialog"
import { useToast } from "../ui/toast"
import { setLocale, t, type LocalePreference } from "../i18n"

/** Lets the user switch the interface language; the change is persisted and applied immediately. */
export function DialogLanguage() {
  const config = useConfig()
  const dialog = useDialog()
  const toast = useToast()
  const initial = config.data.locale ?? "auto"
  const options: DialogSelectOption<LocalePreference>[] = [
    { title: t("Follow system"), value: "auto" },
    { title: t("Chinese"), value: "zh-CN" },
    { title: t("English"), value: "en" },
  ]
  let current: LocalePreference = initial

  const apply = (value: LocalePreference) => {
    if (value === current) return
    current = value
    setLocale(value)
    void config
      .update((draft) => {
        draft.locale = value
      })
      .catch(toast.error)
  }

  return (
    <DialogSelect
      title={t("Switch language")}
      options={options}
      current={initial}
      onCancel={() => {
        apply(initial)
        dialog.clear()
      }}
      onMove={(option) => apply(option.value)}
      onSelect={(option) => {
        apply(option.value)
        dialog.clear()
      }}
    />
  )
}
