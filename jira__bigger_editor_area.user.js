// ==UserScript==
// @name        Jira - Bigger editor area
// @version     1.0.1
// @description Removes the height limit for the editor.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/jira__bigger_editor_area.user.js
// @icon        https://www.atlassian.com/favicon.ico
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://*.atlassian.net/browse/*
// ==/UserScript==


function main() {
  let editor = document.querySelector("div.ak-editor-content-area")

  if (editor !== null && editor.style.maxHeight === "") {
    editor.style.maxHeight = "none"
  }
}

setInterval(main, 500);
