// Ctrl+Tab across all spaces
// Makes the Ctrl+Tab switcher list recently used tabs from every Zen space,
// not just the current one. Picking a tab from another space switches to it:
// Zen's tab selection hook (gZenWorkspaces.onBeforeTabSelect) already handles
// that. Requires Sine (or another userscript loader).
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

(() => {
  const PREF = "zen.mods.modern-ctrltab.all-spaces";

  if (
    typeof ctrlTab === "undefined" ||
    typeof gZenWorkspaces === "undefined" ||
    ctrlTab._zenAllSpacesPatched
  ) {
    return;
  }
  ctrlTab._zenAllSpacesPatched = true;

  const isEnabled = () => Services.prefs.getBoolPref(PREF, true);

  const originalInitRecentlyUsedTabs = ctrlTab._initRecentlyUsedTabs;
  const originalOnKeyDown = ctrlTab.onKeyDown;

  // Zen rebuilds this list (via uninit/readPref) on every space switch, and
  // gBrowser.tabs only holds the current space's tabs. Build it from every
  // space instead. Unloaded tabs are still filtered out by Zen's tabList getter.
  ctrlTab._initRecentlyUsedTabs = function () {
    if (!isEnabled()) {
      originalInitRecentlyUsedTabs.call(this);
      return;
    }
    let tabs;
    try {
      tabs = gZenWorkspaces.allStoredTabs;
    } catch (e) {
      console.error("ctrltab-all-spaces: couldn't read tabs from all spaces", e);
      originalInitRecentlyUsedTabs.call(this);
      return;
    }
    this._recentlyUsedTabs = [...new Set(tabs)].filter(
      tab =>
        !tab.closing && !tab.hidden && !tab.hasAttribute("zen-empty-tab")
    );
    this._sortRecentlyUsedTabs();
  };

  // Firefox's onKeyDown, except it counts this.tabList (all spaces) rather
  // than gBrowser.visibleTabs (current space), so the panel opens even when
  // the current space has only one or two tabs.
  ctrlTab.onKeyDown = function (event) {
    if (!isEnabled()) {
      originalOnKeyDown.call(this, event);
      return;
    }

    let action = ShortcutUtils.getSystemActionForEvent(event);
    if (action != ShortcutUtils.CYCLE_TABS) {
      return;
    }

    // keyboard lock may have default prevented
    if (
      event.defaultPrevented ||
      this.KeyboardLockUtils?.mustWaitForKeyboardLockRequestedReply(event)
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (this.isOpen) {
      this.advanceFocus(!event.shiftKey);
      return;
    }

    if (event.shiftKey) {
      this.showAllTabs("shift-tab");
      return;
    }

    document.addEventListener("keyup", this, { mozSystemGroup: true });

    let tabs = this.tabList;
    if (tabs.length > 2) {
      this.open();
    } else if (tabs.length == 2) {
      let index = tabs[0].selected ? 1 : 0;
      gBrowser.setSelectedTab(
        tabs[index],
        gBrowser.TabMetrics?.userTriggeredContext(
          gBrowser.TabMetrics.METRIC_SOURCE.CTRL_TAB
        )
      );
    }
  };

  const rebuild = () => {
    ctrlTab.uninit();
    ctrlTab.readPref();
  };

  Services.prefs.addObserver(PREF, rebuild);
  window.addEventListener(
    "unload",
    () => Services.prefs.removeObserver(PREF, rebuild),
    { once: true }
  );

  gZenWorkspaces.promiseInitialized.then(rebuild);
})();
