// ==UserScript==
// @name        Lucca - Autologin
// @version     1.0.1
// @description Automaticly click on "Log in using your company account" to log on Lucca
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://github.com/xefiry/UserScripts/raw/refs/heads/master/lucca__autologin.user.js
// @icon        https://cdn.lucca.fr/favicon/lucca/favicon-32x32.png
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://packsolutions.ilucca.net/identity/login*
// ==/UserScript==

button = document.querySelector("a.button")
if (button.innerText === "Log in using your company account") {
  button.click()
}
