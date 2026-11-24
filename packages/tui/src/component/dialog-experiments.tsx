import { createMemo, createSignal } from "solid-js"
import { useConfig, useNewDesigns } from "../config"
import { DIALOG_LIST_INSET } from "../ui/dialog"
import { DialogSelect } from "../ui/dialog-select"
import { useTheme } from "../context/theme"
import { useToast } from "../ui/toast"
import { t } from "../i18n"

type Experiment = {
  id: string
  title: string
  description: string
  /** Whether the experiment is on when the config does not set it. */
  default?: boolean
}

// In-flight features anyone can opt into. Each entry is temporary: an
// experiment either graduates (delete the entry, make the behavior
// unconditional) or dies (delete the entry and the branch it gated).
export const experiments: Experiment[] = [
  {
    id: "new-designs",
    title: t("New designs"),
    description: t("Preview the new TUI designs"),
    default: true,
  },
  {
    id: "client-mcp",
    title: t("TUI tools"),
    description: t("Let the agent open terminals in this TUI (requires server support)"),
  },
]

export function DialogExperiments() {
  const config = useConfig()
  const newDesigns = useNewDesigns()
  const theme = useTheme()
  const toast = useToast()
  const [selected, setSelected] = createSignal<Experiment>()
  const [saving, setSaving] = createSignal(false)

  const enabled = (experiment: Experiment) =>
    (config.data.experimental?.[experiment.id] ?? experiment.default ?? false) === true

  const options = createMemo(() =>
    experiments.map((experiment) => ({
      title: experiment.title,
      searchText: experiment.description,
      footer: enabled(experiment) ? "on" : "off",
      value: experiment,
    })),
  )

  // All experiments are booleans, so either direction toggles.
  async function change(experiment = selected()) {
    if (saving()) return
    if (!experiment) return
    const next = !enabled(experiment)
    setSaving(true)
    await config
      .update((draft) => {
        if (!draft.experimental || typeof draft.experimental !== "object") draft.experimental = {}
        draft.experimental[experiment.id] = next
      })
      .catch(toast.error)
      .finally(() => setSaving(false))
  }

  return (
    <DialogSelect
      title={t("Experiments")}
      options={options()}
      renderFilter={experiments.length > 0}
      onMove={(option) => setSelected(option.value)}
      onSelect={(option) => void change(option.value)}
      emptyView={
        <box paddingLeft={DIALOG_LIST_INSET} paddingRight={DIALOG_LIST_INSET}>
          <text fg={theme.text.muted}>{t("No experiments available")}</text>
        </box>
      }
      footerHints={experiments.length > 0 && !newDesigns() ? [{ title: "change", label: "←/→" }] : []}
      bindings={
        experiments.length > 0
          ? [
              {
                bind: "left",
                title: t("Previous value"),
                group: "Experiments",
                run: () => void change(),
              },
              {
                bind: "right",
                title: t("Next value"),
                group: "Experiments",
                run: () => void change(),
              },
            ]
          : []
      }
    />
  )
}
