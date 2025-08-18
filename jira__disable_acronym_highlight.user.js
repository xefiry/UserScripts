// ==UserScript==
// @name        Jira - Disable acronym highlight
// @version     1.0
// @description Disable hilight that proposes AI definition for acronyms
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/jira__disable_acronym_highlight.user.js
// @icon        https://www.atlassian.com/favicon.ico
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://*.atlassian.net/browse/*
// ==/UserScript==

function remove_hilight() {
  document.querySelectorAll(".acronym-highlight").forEach(node =>
  {
    console.log("acronym-hilight removed on", node.innerText)
    node.outerHTML = node.outerText
  })
}

setInterval(remove_hilight, 1000);
