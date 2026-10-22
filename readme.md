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

It also makes Ctrl+Tab cycle through recently used tabs from **all spaces**,
not just the current one. Picking a tab from another space switches to that
space. Unloaded (sleeping) tabs are left out, as in stock Zen. This part is a
script, so it needs Sine; the styling alone also works as userChrome.css.

## Requirements

The switcher panel only appears when **Ctrl+Tab cycles through tabs in recently
used order** is on (Settings → General → Tabs), which sets
`browser.ctrlTab.sortByRecentlyUsed` = `true`.

## Preferences

| Pref | Default | Effect |
| --- | --- | --- |
| `zen.mods.modern-ctrltab.large-thumbnails` | `false` | Uses 260×166 thumbnails instead of 200×128 |
| `zen.mods.modern-ctrltab.all-spaces` | `true` | Includes tabs from all spaces (Sine only) |

## Install

- **userChrome.css (styling only):** set
  `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`, paste
  `chrome.css` into `<profile>/chrome/userChrome.css`, then restart Zen.
- **Sine:** enter `jgriggs-sluh/zen-modern-ctrltab` in Sine's install field in
  Zen's Settings.
