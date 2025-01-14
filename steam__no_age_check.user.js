// ==UserScript==
// @name        Steam - No age check
// @version     1.0
// @description Removes age check when accessing a steam game page by filling automaticly a birth date.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/steam__no_age_check.user.js
// @icon        https://steamcommunity.com/favicon.ico
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://store.steampowered.com/agecheck/*
// ==/UserScript==

function main() {
  year_selector = document.getElementById("ageYear");
  year_selector.value = 1990;
  document.getElementsByClassName("btnv6_blue_hoverfade")[0].click();
  document.getElementById("age_gate_btn_continue").click();
}

setTimeout(main, 500);
