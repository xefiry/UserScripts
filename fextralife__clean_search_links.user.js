// ==UserScript==
// @name        Fextralife - Clean search links
// @version     1.0
// @description Cleans Fextralife search links so they don't point to google.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/fextralife__clean_search_links.user.js
// @icon        https://fextralife.com/wp-content/uploads/2015/07/cropped-flswords-160-192x192.png
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://*.wiki.fextralife.com/*
// ==/UserScript==

function main() {
  links = document.querySelectorAll("a.gs-title")

  for (var i = 0; i < links.length; i++) {
    if (links[i].hasAttribute("data-cturl")) {
      links[i].removeAttribute("data-cturl")
    }
  }
}

setInterval(main, 2000)
