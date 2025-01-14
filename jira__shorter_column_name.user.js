// ==UserScript==
// @name        Jira - Shorter column name
// @version     1.0
// @description Renames a few column to be shorter.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/jira__shorter_column_name.user.js
// @icon        https://www.atlassian.com/favicon.ico
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://*.atlassian.net/jira/dashboards/*
// ==/UserScript==

function rename_column(class_name, old_name, new_name) {
  // search for the column to rename
  col = document.querySelector(class_name)

  // if it exists
  if (col !== null) {
    // get span inside
    in_col = col.querySelector("span")

    // and rename the content (check it before, just in case)
    if (in_col.innerText === old_name) {
      in_col.innerText = new_name
    }
  }

}

function rename_all() {
  rename_column(".headerrow-customfield_12129", "Date butoir / retour", "Date butoir")
  rename_column(".headerrow-customfield_10302", "Date prévisionnelle de livraison/MEP", "Dt prev. MeP")
}

setInterval(rename_all, 1000);
