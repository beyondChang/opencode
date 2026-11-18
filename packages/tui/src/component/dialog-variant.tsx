import { createMemo } from "solid-js"
import { useLocal } from "../context/local"
import { DialogSelect } from "../ui/dialog-select"
import { useDialog } from "../ui/dialog"
import { useNewDesigns } from "../config"
import { t } from "../i18n"

export function DialogVariant() {
  const local = useLocal()
  const dialog = useDialog()
  const newDesigns = useNewDesigns()

  const options = createMemo(() => [
    {
      value: "default",
      title: t("Default"),
      onSelect: () => {
        dialog.clear()
        local.model.variant.set(undefined)
      },
    },
    ...local.model.variant
      .list()
      .filter((variant) => variant !== "default")
      .map((variant) => ({
        value: variant,
        title: variant,
        onSelect: () => {
          dialog.clear()
          local.model.variant.set(variant)
        },
      })),
  ])

  return (
    <DialogSelect<string>
      options={options()}
      title={t("Select variant")}
      renderFilter={!newDesigns()}
      current={local.model.variant.current() ?? "default"}
      flat={true}
    />
  )
}
