# Modern Ctrl+Tab Preview

Restyles Zen's Ctrl+Tab tab switcher to match
[zen-browser/desktop PR #15078](https://github.com/zen-browser/desktop/pull/15078)
("Modern Ctrl Tab Preview, CSS only") by [@gholts](https://github.com/gholts):

- a single rounded tray with a light or dark background
- compact 156×106 thumbnails, cropped to fill the tile
- the favicon and title on one row under each thumbnail
- the selected tab filled with your accent color
- squircle corners where your Zen build supports them

## Requirements

The switcher panel only appears when **Ctrl+Tab cycles through tabs in recently
used order** is on (Settings → General → Tabs), which sets
`browser.ctrlTab.sortByRecentlyUsed` = `true`.

## Preferences

| Pref | Default | Effect |
| --- | --- | --- |
| `zen.mods.modern-ctrltab.large-thumbnails` | `false` | Uses 220×150 thumbnails instead of 156×106 |

## Install

- **userChrome.css:** set `toolkit.legacyUserProfileCustomizations.stylesheets`
  to `true`, paste `chrome.css` into `<profile>/chrome/userChrome.css`, then
  restart Zen.
- **Sine or another mod manager:** install it from this folder or repository.
