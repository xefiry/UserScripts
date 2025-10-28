// ==UserScript==
// @name        Jira - Utility buttons
// @version     2
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
#dropdown {
  position: relative;
  display: inline-block;
}

#dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  z-index: 1;
}

#dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

#dropdown a:hover {
  background-color: #ddd;
}

.show {
  display: block !important;
}
`
var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)


function get_ticket() {
  return location.pathname.replace("/browse/", "")
}

function get_name() {
  let tmp = document.querySelector("h1")

  if (tmp !== null) {
    return tmp.innerText
  }
  else {
    console.error("Error from get_name()")
    return "ERROR"
  }
}

function get_creator() {
  let tmp = document.querySelector("div[data-testid='issue.views.field.user.reporter']")

  if (tmp !== null) {
    return tmp.innerText
  }
  else {
    console.error("Error from get_creator()")
    return "ERROR"
  }
}

function get_url_2() {
  let tmp = document.querySelector("a._11c8dcr7")

  if (tmp !== null) {
    return tmp.href
  }
  else {
    console.error("Error from get_url_2()")
    return "ERROR"
  }
}

function copy_hyperlink_1() {
  let link = document.URL
  let title = get_ticket()
  let content = "<a href='" + link + "'>" + title + "</a>"

  GM_setClipboard(content, "text/html")
}

function copy_hyperlink_2() {
  // get link from the "Afficher la demande sur le portail" link
  let link = get_url_2()
  let title = get_ticket()
  let content = "<a href='" + link + "'>" + title + "</a>"

  GM_setClipboard(content, "text/html")
}

function copy_text() {
  let content = get_ticket()

  GM_setClipboard(content, "text/plain")
}

function copy_fulltext() {
  let content = get_ticket() + " " + get_name()

  GM_setClipboard(content, "text/plain")
}

function copy_tsv() {
  let content = get_ticket() + "\t" + get_name() + "\t" + get_creator()

  GM_setClipboard(content, "text/plain")
}

function copy_markdown() {
  let link = document.URL
  let title = get_ticket()
  let content = "[" + title + "](" + link + ")"

  GM_setClipboard(content, "text/plain")
}

function toggle_dropdown() {
  document.getElementById("dropdown-content").classList.toggle("show")
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  let button = document.getElementById("dropdown-button")
  let classes = document.getElementById("dropdown-content").classList
  
  if (!button.contains(event.target) && classes.contains("show")) {
    classes.remove("show")
  }
}

function init() {
  // If dropdown menu already exists, do nothing
  if (document.getElementById("dropdown") !== null) {
    return
  }

  // Get the new location for button
  let new_location = document.querySelector("._1e0c1txw._vchhusvi._gy1pu2gc._1p57u2gc._4cvrv2br._2lx2vrvc._1bahh9n0")
  if (new_location === null) {
    console.error("Jira better link copy can't work, new button location not found")
    return
  }

  // Create div for the dropdown with the menu
  let dropdown = document.createElement("div")
  dropdown.id = "dropdown"
  dropdown.innerHTML = `
  <div id="dropdown-content">
    <a onclick="copy_hyperlink_1()">URL 1</a>
    <a onclick="copy_hyperlink_2()">URL 2</a>
    <a onclick="copy_markdown()">Markdown</a>
    <a onclick="copy_text()">Ticket</a>
    <a onclick="copy_fulltext()">Ticket + Name</a>
    <a onclick="copy_tsv()">TSV</a>
  </div>
  `

  // Get source button for model
  let source_button = document.querySelector(".css-vl1vwy")
  if (source_button === null) {
    console.error("Jira better link copy can't work, Create button not found")
    return
  }

  // Clone it to create the new button for dropdown
  let dropdown_button = source_button.cloneNode(true)
  dropdown_button.innerHTML = dropdown_button.innerHTML.replace("Créer", "Copier")
  dropdown_button.id = "dropdown-button"
  dropdown_button.onclick = toggle_dropdown

  dropdown.insertBefore(dropdown_button, dropdown.firstChild)
  new_location.insertBefore(dropdown, new_location.firstChild)
}

setInterval(init, 500);
