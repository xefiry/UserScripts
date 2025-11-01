// ==UserScript==
// @name        Twitch - Copy followed channels
// @version     1.0
// @description Add buton to copy list of followed channels
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/twitch__copy_followed_channel.user.js
// @icon        https://assets.twitch.tv/assets/favicon-32-e29e246c157142c94346.png
// @noframes
// @run-at      document-end
// @grant       GM_setClipboard
// @match       https://www.twitch.tv/directory/following/channels
// ==/UserScript==

function list_channels() {
  let channels = []

  document.querySelectorAll(".info").forEach(node => {
    channels.push('"' + node.innerText + '"')
  })

  let all_channels = channels.sort().join(",\n")

  GM_setClipboard(all_channels, "text/plain")
}

function init() {
  let new_location = document.querySelector("h1").parentNode

  let button = document.createElement("button")
  button.id = "new_button"
  button.innerText = "Copy channel list"
  button.onclick = list_channels

  new_location.appendChild(button)
}

setTimeout(init,  500); // .5s delay
