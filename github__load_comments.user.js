// ==UserScript==
// @name        GitHub - Load comments
// @version     1.0.1
// @description Auto loads comments in issues
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://github.com/xefiry/UserScripts/raw/refs/heads/master/github__load_comments.user.js
// @icon        https://github.githubassets.com/favicons/favicon.svg
// @noframes
// @run-at      document-end / document-idle
// @grant       none
// @match       https://github.com/*/issues/*
// ==/UserScript==

function click_button() {
    button = document.querySelector(".LoadMore-module__buttonChildrenWrapper--_sKVA")
    
    if (button !== null) {
        console.log("Button clicked")
        button.click()
    }
}

setInterval(click_button, 500)
