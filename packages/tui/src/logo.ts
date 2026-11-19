// The original "opencode" wordmark drawn from block glyphs, shown for an English interface.
export const logo = {
  left: ["                   ", "█▀▀█ █▀▀█ █▀▀█ █▀▀▄", "█__█ █__█ █^^^ █__█", "▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀~~▀"],
  right: ["             ▄     ", "█▀▀▀ █▀▀█ █▀▀█ █▀▀█", "█___ █__█ █__█ █^^^", "▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀"],
}

// The home wordmark: a braille banner of "探索未至之境" plus the compact one-line fallback used
// when the terminal is too narrow or too short to fit the banner.
export const wordmark = {
  text: { left: "探索", right: "未至之境" },
  split: 13,
  art: [
    "⣼⣧⢶⡖⣒⡶⠀⣒⣒⣺⣗⣒⡂⠀⠤⠤⣿⠤⠤⠀⠈⣛⣿⣛⣿⡛⠀⢠⣤⣼⣧⣤⡄⠀⣸⣇⣲⣞⣷⣒",
    "⣼⡧⠽⣼⣮⠧⠀⢛⣾⣿⢾⣏⠃⠐⠒⣲⣿⣖⠒⠂⠀⣭⣭⣿⣭⣽⠀⠀⠀⣠⡴⠛⠁⠀⢸⡇⣶⣶⣶⡆",
    "⣼⠇⠞⢹⠟⠶⠀⡬⢯⣽⠏⠿⡅⠀⠞⠋⣿⠈⠳⠂⠰⠶⠶⠿⠶⠶⠂⠰⠻⢯⣤⣤⣤⠀⠞⠛⡽⠏⢿⡷",
  ],
}

export const go = {
  left: ["    ", "█▀▀▀", "█_^█", "▀▀▀▀"],
  right: ["    ", "█▀▀█", "█__█", "▀▀▀▀"],
}