// ==UserScript==
// @name        Fextralife - Fullscreen Elden Ring map
// @version     1.1
// @description Display Elden Ring map in "fullscreen".
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/fextralife__fullscreen_elden_ring_map.user.js
// @icon        https://fextralife.com/wp-content/uploads/2015/07/cropped-flswords-160-192x192.png
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://eldenring.wiki.fextralife.com/Interactive+Map*
// ==/UserScript==

// Search for the maps and put them fullscreen
document.querySelectorAll("iframe.interactivemapcontainer").forEach(map => {
  map.style.width = "100%"
  map.style.height = "100%"
  map.style.position = "fixed"
  map.style.top = 0
  map.style.left = 0
  map.style.zIndex = 999999
  map.style.backgroundColor = "rgb(34, 34, 34)"
})
