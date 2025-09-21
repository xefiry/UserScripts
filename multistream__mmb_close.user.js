// ==UserScript==
// @name        multistre.am - Close stream on middle click
// @version     1.0
// @description Close stream when middle mouse click on header
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/multistream__mmb_close.user.js
// @icon        https://multistre.am/static/images/favicon.jpg
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://multistre.am/*
// ==/UserScript==

var nb_streams = 0

function clickHandler(evt) {
  if (evt.button == 1) {
    evt.currentTarget.querySelector("button.closebutton").click()
  }
}

function refresh_events() {
  let streams = document.querySelectorAll("div.streamoverlay")

  if (nb_streams != streams.length) {
    console.log("refreshing events")
    nb_streams = streams.length
  }

  for (var i = 0; i < streams.length; i++) {
    streams[i].onmouseup = clickHandler
  }
}

setInterval(refresh_events, 1000)
