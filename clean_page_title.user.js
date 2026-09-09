// ==UserScript==
// @name        Clean page title
// @version     2.0
// @description Removes unnecessary text in page title.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://github.com/xefiry/UserScripts/raw/refs/heads/master/clean_page_title.user.js
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://github.com/*
// @match       https://myanimelist.net/anime/*
// @match       https://*.nexusmods.com/*/mods/*
// @match       https://www.senscritique.com/*
// @match       https://www.spirit-of-metal.com/en/band/*
// @match       https://store.steampowered.com/app/*
// @match       https://www.twitch.tv/*
// @match       https://*.wikipedia.org/wiki/*
// @match       https://wiki.archlinux.org/title/*
// @match       https://eldenring.wiki.fextralife.com/*
// @match       https://nomanssky.fandom.com/wiki/*
// @match       https://stardewvalleywiki.com/*
// @match       https://www.stardewvalleywiki.com/*
// ==/UserScript==

class Rule {
  constructor(site, pattern, replace) {
    this.site = site; // Site to apply rule
    this.pattern = pattern; // What to search for
    this.replace = replace ? replace : ""; // What to replace it with
  }

  matches() {
    return (document.URL.search(this.site) !== -1);
  }

  apply() {
    let new_title = document.title.replace(this.pattern, this.replace);
    if (document.title !== new_title) {
      document.title = new_title;
      console.debug(this.site + " applied");
    }
  }
}

function do_rename() {
  filtered_rules.forEach(rule => { rule.apply(); });
}

const ALL_RULES = [
  new Rule("github.com",                    /^(GitHub - )?([A-Za-z0-9._-]+\/[A-Za-z0-9._-]+)(: .*)?$/, "$2"),
  new Rule("myanimelist.net/anime",         " - MyAnimeList.net"),
  new Rule("nexusmods.com",                 / at [A-Za-z0-9 ']+ Nexus - [Mm]ods and [Cc]ommunity/),
  new Rule("senscritique.com",              " - SensCritique"),
  new Rule("spirit-of-metal.com",           " - discography, line-up, biography, interviews, photos"),
  new Rule("store.steampowered.com",        /^(Save [0-9]+% on )?(.*?) on Steam/,                       "$2"),
  new Rule("twitch.tv",                     " - Twitch"),
  // wiki pages
  new Rule("wikipedia.org/wiki",            / [—-] Wikip[eé]dia/),
  new Rule("wiki.archlinux.org/title",      " - ArchWiki"),
  new Rule("eldenring.wiki.fextralife.com", " | Elden Ring Wiki"),
  new Rule("nomanssky.fandom.com/wiki",     " - No Man's Sky Wiki"),
  new Rule("stardewvalleywiki.com",         " - Stardew Valley Wiki")
];

// we filter the rules to keep only the ones that matches
let filtered_rules = ALL_RULES.filter(rule => rule.matches());

console.debug({ "url": document.URL, "ALL_RULES": ALL_RULES, "filtered_rules": filtered_rules });

setInterval(do_rename, 500); // every .5 second
