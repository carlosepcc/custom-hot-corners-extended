## Changelog:

### v15+ (not released yet)
**Fixed:**
- keyboard shortcuts doesn't update on-change

### v15
**Fixed:**
- installation using `make local-install` throws error on non ASCII character in `prefs.js` source code.

### v14
**Fixed:**
- Option `Show active items only` on `Keyboard` pages crashes after shortchuts change.

### v13 (12 was skipped due to packaging error):

**Added actions:**
- MPRIS player controls: `Play/Pause`, `Next Track`, `Previous Track`. Works the same way as the keyboard media keys - controls the most recently launched media player
- `Open New window`
- `Move App windows to Prev/Next workspace`, `Move Window to Prev/Next workspace` - allows to move window or all windows of selected application corresponding to the current filter settings to an adjacent workspace
- `Move App windows to Prev/Next New workspace`, `Move Window to Prev/Next New workspace` - similar to the previous one, but first creates new empty workspace to which the window/s will be moved
- workspace switcher options moved to separate extension `Workspace Switcher Manager` which offers more options.
- `Display Brightness Up/Down` in new section `Hardware`.
- `GNOME Shell UI inspector` in `Debug` section - direct activation of the tool that is available in the Looking Glass and allows to inspect GNOME Shell UI elements using a mouse. Big advantage is that this action can be activated using a keyboard shortcut even when a popup menu is open and inspect menu items.
- `Open Panel Aggregate Menu`, `Open Panel Date Menu`, `Open Panel App Menu` in `GNOME` section.

**Fixes:**
- added gschema paths for not dynamically created settings - now global settings can be backed up using `Extensions Sync` extension. Unfotunately, dynamically created settings directories storing settings of all individual triggers don't have unique schema id, so can not be backed up using mentioned extension.
- GS41 not detected
- Custom Menus - items without its own submenu were added to the previous submenu instead of to the root menu.
- Sceen keyboard won't show when activated from Custom Menu

**Other changes:**
- added compatibility with GNOME Shell 42.
- default value for `Enable this trigger in fullscreen mode` option has been set to `true` and its control has been moved from the settings popup menu to the main page right beside each Action dropdown menu.
- global option `Enable all trigers in fullscreen` has been removed.
- redesigned `Monitor` corner settings page, added toggle button for direct control over `Enable in Fullscreen` option.
- redesigned `Keyboard` and `Custom Menus` Options pages and added butons for control over tree view.
- workspace switcher options have been removed, you can use my `Workspace Switcher Manager` extension to customize workspace switcher behavior globaly.
- Custom menu adds title of the focused window as the first item if the menu contains actions that target the window.
- action `Run Preset Command ...` now can activate application by app id (`.desktop` launcher file name) and was renamed to `Run Preset Command / Activate App ...`. App chooser dialog can now produce command or app id and the latter is default (preffered) option as it's native way to launch / activate application in GNOME Shell.
- some actions have been moved to submenus to reduce menu height, some useless actions heve been removed

### v11:
- Added action `Open ArcMenu` action, compatible with ArcMenu v.20+
- Added workspace indicator to the `Reorder workspace` actions
- Added support of Ubuntu's 21.10 light Yaru theme in action `Light/Dark Gtk theme toggle`
- Fixed broken Run Command Prompt action
- Layout optimizations in the Preferences window for Gtk 4

### v10:
- Added actions supporting new AATWS application switcher
- Added action `Quit application`
- Fixed issue with shortcuts accessible from the lock screen

### v9:
- *Ctrl* "safety lock" finally works with Wayland
- Pressure barrier sizes are now adjustable by scale controllers on the main corner page along with clickable area expansion for better orientation in settings.
- Barrier size is now adjustable in percentage of the monitor's width/heigt instead of pixels.
- Option *Make active corners/edges visible* now also shows the pressure barriers.
- Added action **Window Thumbnail (PIP)** - make a thumbnail preview (like Picture in Picture) of the active window which you can drag and drop anywhere on the screen. Thumbnail size can be adjusted by a mouse scroll wheel and you can even change the source window of the thumbnail. You can make as many thumbnails as you want, not just one.
- Added new shader filters - color blind vision simulation and correction filters in Accessibility menu. Inversion filters have been enhanced - Invert Lightness, Invert Lightness - Wite to Grey (for lower contrast at night time) and full color inversion, now all gamma corrected to make deep dark shades distinguishable.
- Added actions to trigger default Window and App Switcher Pop-ups. When you install and enable the **Advanced Alt+TAb Window Switcher** extension you'll be able to use more actions with diffrent settigs of this extended window switcher pop-up.
- Added 4 **Custom Menus** to action menu - you can populate up to 4 different menus with actions of your choice and trigger them the same way as other single actions.
- Added **Minimize to thumbnail** action - live window thumbnail of the focused window will be created and window will be minimized.
- Workspace switcher has **new** optional **workspace switcher indicator - overlay index**. Shows a big transparent index number of switched workspace on the bottom half of the screen.

**v8**:
- **Optional keyboard shortcuts for most actions** - CHC-E offers many unique actions which can be now used even without a mouse
- The *Invert Lightness* action is now available in Gnome 40
- Toggle Light/Dark GTK theme action - supports Adwaita and Ubuntu Yaru(Light) themes
- Multiple color effect actions for whole desktop and single windows including **red/green color tint, contrast, brightness, transparency and system Night Light switch**
- *Reorder workspace* action alows you to move whole workspace up/down (left/right in gnome 40) in the workspace list.