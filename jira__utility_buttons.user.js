// ==UserScript==
// @name        Jira - Utility buttons
// @version     1.1
// @description Adds buttons for various things to copy from a ticket.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/jira__utility_buttons.user.js
// @icon        https://www.atlassian.com/favicon.ico
// @noframes
// @run-at      document-end
// @grant       GM_setClipboard
// @match       https://*.atlassian.net/browse/*
// ==/UserScript==

// CSS style for the buttons
var styles = `
.my_buttons {
  border-width: 0px;
  border-radius: 3px;
  font-size: inherit;
  color: var(--ds-text, #42526E) !important;
  cursor: pointer;
  padding: 0px 5px;
  margin-left: 10px;
}
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


function get_ticket() {
  return document.URL.replace(location.protocol + '//' + location.host + "/browse/", "")
}

function get_name() {
  tmp = document.querySelector("h1")

  if (tmp !== null) {
    return tmp.innerText
  }
  else {
    console.error("Error from get_name()")
    return "ERROR"
  }
}

function get_creator() {
  tmp = document.querySelector("div[data-testid='issue.views.field.user.reporter']")

  if (tmp !== null) {
    return tmp.innerText
  }
  else {
    console.error("Error from get_creator()")
    return "ERROR"
  }
}

function get_url_2() {
  tmp = document.querySelector("a._11c8qk37")

  if (tmp !== null) {
    return tmp.href
  }
  else {
    console.error("Error from get_url_2()")
    return "ERROR"
  }
}

function copy_hyperlink_1() {
  link = document.URL
  title = get_ticket()
  content = "<a href='" + link + "'>" + title + "</a>"

  GM_setClipboard(content, "text/html")
}

function copy_hyperlink_2() {
  // get link from the "Afficher la demande sur le portail" link
  link = get_url_2()
  title = get_ticket()
  content = "<a href='" + link + "'>" + title + "</a>"

  GM_setClipboard(content, "text/html")
}

function copy_text() {
  content = get_ticket()

  GM_setClipboard(content, "text/plain")
}

function copy_fulltext() {
  content = get_ticket() + " " + get_name()

  GM_setClipboard(content, "text/plain")
}

function copy_tsv() {
  content = get_ticket() + "\t" + get_name() + "\t" + get_creator()

  GM_setClipboard(content, "text/plain")
}

function copy_markdown() {
  link = document.URL
  title = get_ticket()
  content = "[" + title + "](" + link + ")"

  GM_setClipboard(content, "text/plain")
}

function create_button(text, click_function) {
  result = document.createElement("button")

  result.classList.add("my_buttons")
  result.innerText = text
  result.addEventListener("click", click_function)

  return result
}

function init() {
  // Get the new location for buttons
  x = document.querySelector("ol._1e0c1txw")
  if (x === null) {
    console.error("Jira better link copy can't work, ol.css-m6vsls not found")
    return
  }

  // If no buttons found, create and add them
  if (document.getElementsByClassName("my_buttons").length == 0) {
    x.appendChild(create_button("URL 1", copy_hyperlink_1))
    x.appendChild(create_button("URL 2", copy_hyperlink_2))
    x.appendChild(create_button("MD",    copy_markdown))
    x.appendChild(create_button("TXT",   copy_text))
    x.appendChild(create_button("FULL",  copy_fulltext))
    x.appendChild(create_button("TSV",   copy_tsv))
  }
}

setInterval(init, 500);
