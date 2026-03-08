// ==UserScript==
// @name        Remove target="_blank" in links
// @version     1.0
// @description Removes all target="_blank" from links (a) to prevent opening links in a new tab on a left mouse click. Opening in new tab should be on mouse click only. See https://www.w3schools.com/tags/att_a_target.asp.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/remove_target_blank_in_links.user.js
// @noframes
// @run-at      document-end
// @grant       none
// @match       *://*/*
// ==/UserScript==

function main() {
  let nb = 0

  document.querySelectorAll("a[target='_blank']").forEach(a => {
    console.log(a)
    a.removeAttribute("target")
    nb++
  })

  if (nb > 0) {
    console.log(`Removed ${nb} target="_blank"`)
  }
}

setInterval(main, 1000)
