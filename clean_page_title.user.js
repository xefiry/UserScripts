// ==UserScript==
// @name        Clean page title
// @version     1.0.1
// @description Removes unnecessary text in page title.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/clean_page_title.user.js
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://github.com/*
// @match       https://hianime.to/*
// @match       https://myanimelist.net/anime/*
// @match       https://*.nexusmods.com/*/mods/*
// @match       https://www.senscritique.com/*
// @match       https://www.spirit-of-metal.com/en/band/*
// @match       https://store.steampowered.com/app/*
// @match       https://*.wikipedia.org/wiki*
// @match       https://wiki.archlinux.org/title/*
// @match       https://eldenring.wiki.fextralife.com/*
// ==/UserScript==

let rules = [
// Site to apply rule               What to search for                                        What to replace it with
  ["github.com",                    /^(GitHub - )?([A-Za-z0-9._-]+\/[A-Za-z0-9._-]+)(: .*)?$/, "$2"],
  ["hianime.to",                    /Watch (.*) English Sub\/Dub online Free on HiAnime.to/g,  "$1"],
  ["myanimelist.net/anime",         " - MyAnimeList.net",                                      ""],
  ["nexusmods.com",                 / at [A-Za-z0-9 ']+ Nexus - [Mm]ods and [Cc]ommunity/g,    ""],
  ["senscritique.com",              " - SensCritique",                                         ""],
  ["spirit-of-metal.com",           " - discography, line-up, biography, interviews, photos",  ""],
  ["store.steampowered.com",        " on Steam",                                               ""],
  ["store.steampowered.com",        /^Save [0-9]+% on /g,                                      ""],
  // wiki pages
  ["wikipedia.org/wiki",            / [—-] Wikip[eé]dia/g,                                     ""],
  ["wiki.archlinux.org/title",      " - ArchWiki",                                             ""],
  ["eldenring.wiki.fextralife.com", " | Elden Ring Wiki",                                      ""]
]

function do_rename() {
  for (let i = 0; i < filtered_rules.length; i++) {
    console.debug(filtered_rules[i][0] + " applied")
    document.title = document.title.replace(filtered_rules[i][1], filtered_rules[i][2]);
  }
}

let url = document.URL
// we filter the rules to keep only the ones that matches
let filtered_rules = rules.filter(rule => url.search(rule[0]) != -1)

console.debug({url})
console.debug({rules})
console.debug({filtered_rules})

setTimeout(do_rename,  500); // .5s delay

// for senscritique.com, we try multiple times
if (url.search("senscritique.com") != -1) {
  console.log("senscritique.com detected, we will try to apply rule multiple times")
  setInterval(do_rename, 5000); //  every 5 second
}
