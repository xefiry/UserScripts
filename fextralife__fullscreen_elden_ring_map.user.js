// ==UserScript==
// @name        Fextralife - Fullscreen Elden Ring map
// @version     1.0
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

// Search for the maps
maps = document.querySelectorAll("iframe.interactivemapcontainer")

// Put them fullscreen
for (let i = 0; i < maps.length; i++) {
  maps[i].style.width = "100%"
  maps[i].style.height = "100%"
  maps[i].style.position = "fixed"
  maps[i].style.top = 0
  maps[i].style.left = 0
  maps[i].style.zIndex = 999999
  maps[i].style.backgroundColor = "rgb(34, 34, 34)"
}

// Search for the "Chat" button (and anything "hidden-xs")
x = document.getElementsByClassName("hidden-xs")

// Hide it
for (let i = 0; i < x.length; i++) {
  x[i].style.visibility = "hidden"
}
