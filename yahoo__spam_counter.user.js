// ==UserScript==
// @name        Yahoo - Spam counter
// @version     1.0
// @description Adds a spam counter in Yahoo mail.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/yahoo__spam_counter.user.js
// @icon        https://s.yimg.com/nq/nr/img/favicon_cWDEiZtrqTWONMlAUlZWSgK3G1KMiDm8HXxTSbzD7S8_v1.ico
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://mail.yahoo.com/*
// ==/UserScript==

var spam_button
var spam_count

function addCount() {
  spam_button = document.querySelector("a[href='/d/folders/6']")
  
  spam_count = document.createElement("div")
  spam_count.innerText = " (?)" // this is no regular space, this is ALT+255
  
  spam_button.firstChild.appendChild(spam_count)

  updateCount()
}

function updateCount() {
  nb_spam = spam_button.childNodes[0].title.replace("aucun",  "0").match(/\d+/)[0]

  spam_count.innerText = " ("+nb_spam+")" // this is no regular space, this is ALT+255
  if (nb_spam == 0) {
    spam_count.style.color = "white"
    spam_count.style.fontWeight = "normal"
  } else {
    spam_count.style.color = "red"
    spam_count.style.fontWeight = "bold"
  }
}

// .5s delay to add counter
setTimeout(addCount, 500);

// update count every 5 seconds
setInterval(updateCount, 5000)
