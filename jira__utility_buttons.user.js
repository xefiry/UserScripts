// ==UserScript==
// @name        Jira - Utility buttons
// @version     1.0
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

// ==UserScript==
// ==/UserScript==


function get_ticket() {
  return document.URL.replace(location.protocol + '//' + location.host + "/browse/", "")
}

function get_name() {
  tmp = document.querySelector("h1")

  if (tmp !== null) {
    return tmp.innerText
  }
  else {
    return "ERROR"
  }
}

function get_creator() {
  tmp = document.querySelector("div[data-testid='issue.views.field.user.reporter']")

  if (tmp !== null) {
    return tmp.innerText
  }
  else {
    return "ERROR"
  }
}

function get_url_2() {
  tmp = document.querySelector("a._11c8qk37")

  if (tmp !== null) {
    return tmp.href
  }
  else {
    return "ERROR"
  }
}

function copy_hyperlink() {
  console.log("copy_hyperlink called")

  link = document.URL
  title = get_ticket()
  content = "<a href='" + link + "'>" + title + "</a>"

  GM_setClipboard(content, "text/html")
}

function copy_hyperlink_2() {
  console.log("copy_hyperlink called")

  // get link from the "Afficher la demande sur le portail" link
  link = get_url_2()
  title = get_ticket()
  content = "<a href='" + link + "'>" + title + "</a>"

  GM_setClipboard(content, "text/html")
}

function copy_text() {
  console.log("copy_text called")

  content = get_ticket()

  GM_setClipboard(content, "text/plain")
}

function copy_fulltext() {
  console.log("copy_fulltext called")

  content = get_ticket() + " " + get_name()

  GM_setClipboard(content, "text/plain")
}

function copy_tsv() {
  console.log("copy_tsv called")

  content = get_ticket() + "\t" + get_name() + "\t" + get_creator()

  GM_setClipboard(content, "text/plain")
}

function copy_markdown() {
  console.log("copy_markdown called")

  link = document.URL
  title = get_ticket()
  content = "[" + title + "](" + link + ")"

  GM_setClipboard(content, "text/plain")
}

function create_button(id, text, click_function) {
  result = document.createElement("button")

  result.id = "id"
  result.classList.add("my_buttons")
  result.innerText = text
  result.addEventListener("click", click_function)

  return result
}

function init() {
  console.log("Jira better link copy working")

  // Get the new location for buttons
  x = document.querySelector("ol._1e0c1txw")
  if (x === null) {
    console.error("Jira better link copy can't work, ol.css-m6vsls not found")
    return
  }

  if (document.getElementsByClassName("my_buttons").length != 0) {
    console.log("Buttons already here, nothing to do")
    return
  }

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

  // Create the buttons
  x.appendChild(create_button("id_copy_hyperlink",   "URL",   copy_hyperlink))
  x.appendChild(create_button("id_copy_hyperlink_2", "URL 2", copy_hyperlink_2))
  x.appendChild(create_button("id_copy_markdown",    "MD",    copy_markdown))
  x.appendChild(create_button("id_copy_text",        "TXT",   copy_text))
  x.appendChild(create_button("id_copy_fulltext",    "FULL",  copy_fulltext))
  x.appendChild(create_button("id_copy_tsv",         "TSV",   copy_tsv))
}

setTimeout(init, 1000);
