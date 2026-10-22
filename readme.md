# Modern Ctrl+Tab Preview

Restyles Zen's Ctrl+Tab tab switcher, starting from
[zen-browser/desktop PR #15078](https://github.com/zen-browser/desktop/pull/15078)
("Modern Ctrl Tab Preview, CSS only") by [@gholts](https://github.com/gholts):

- a single bright, rounded tray, whatever your browser theme
- 200×128 thumbnails with a soft shadow, cropped to fill the tile
- the favicon and title on one row under each thumbnail, cut off with "…"
  when too long
- the selected tab on a soft gray tile
- squircle corners where your Zen build supports them

## Requirements

The switcher panel only appears when **Ctrl+Tab cycles through tabs in recently
used order** is on (Settings → General → Tabs), which sets
`browser.ctrlTab.sortByRecentlyUsed` = `true`.

## Preferences

| Pref | Default | Effect |
| --- | --- | --- |
| `zen.mods.modern-ctrltab.large-thumbnails` | `false` | Uses 260×166 thumbnails instead of 200×128 |

## Install

- **userChrome.css:** set `toolkit.legacyUserProfileCustomizations.stylesheets`
  to `true`, paste `chrome.css` into `<profile>/chrome/userChrome.css`, then
  restart Zen.
- **Sine:** enter `jgriggs-sluh/zen-modern-ctrltab` in Sine's install field in
  Zen's Settings.
