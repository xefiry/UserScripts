// ==UserScript==
// @name        NexusMods - Auto slow download
// @version     1.1
// @description Automaticly uses "Slow download" option.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/nexusmods__auto_slow_download.user.js
// @icon        https://images.nexusmods.com/favicons/ReskinOrange/favicon-32x32.png
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://www.nexusmods.com/*/mods/*?tab=files&file_id=*
// ==/UserScript==

function main() {
  let x = document.querySelector("mod-file-download")

  if (x !== null) {
    x.shadowRoot.querySelector("button").click()
  }
}

window.setTimeout(main, 500);
