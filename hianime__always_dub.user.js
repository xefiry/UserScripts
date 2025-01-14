// ==UserScript==
// @name        Hianime - Always dub
// @version     1.0
// @description Set Hianime to always play dubbed anime.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/hianime__always_dub.user.js
// @icon        https://hianime.to/favicon.ico
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://hianime.to/*
// ==/UserScript==

source = localStorage["currentSource"]

if (typeof(source) == "undefined" || source == "sub") {
  console.log("'currentSource' is sub or undefined, changing it")
  localStorage["currentSource"] = "dub"
  location.reload();
}
