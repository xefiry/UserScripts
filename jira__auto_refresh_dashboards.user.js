// ==UserScript==
// @name        Jira - Auto refresh dashboards
// @version     1.1
// @description Adds a timer to auto refresh dashboards.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/jira__auto_refresh_dashboards.user.js
// @icon        https://www.atlassian.com/favicon.ico
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://*.atlassian.net/jira/dashboards/*
// ==/UserScript==

let refresh_time = 5 * 60 // in seconds

let refresh_button
let refresh_text
let curent_time

Number.prototype.toHHMMSS = function () {
  let sec_num = parseInt(this, 10)
  let hours   = Math.floor(sec_num / 3600)
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  let seconds = sec_num - (hours * 3600) - (minutes * 60)

  if (hours   < 10) {hours   = "0"+hours}
  if (minutes < 10) {minutes = "0"+minutes}
  if (seconds < 10) {seconds = "0"+seconds}

  return (hours > 0 ? hours + ':' : '') + minutes + ':' + seconds
}

function update_timer() {
  refresh_button.childNodes[0].innerText = refresh_text + ' (' + curent_time.toHHMMSS() + ')'

  if (curent_time == 0) {
    refresh()
  } else
    curent_time--
}

function refresh() {
  refresh_button.click()
  curent_time = refresh_time
}

function init() {
  refresh_button = document.querySelector("button.css-vl1vwy")

  if (refresh_button != null) {
    refresh_text = refresh_button.childNodes[0].innerHTML

    curent_time = refresh_time

    setInterval(update_timer, 1000)

    // reset timer on click
    refresh_button.onclick = function(e) {
      curent_time = refresh_time
    }

    // refresh when hittint 'r' key
    document.onkeyup = function(e) {
    if (e.key == "r")
      refresh()
    }
  } else {
    console.error("Refresh button not found")
  }
}

setTimeout(init, 1000)
