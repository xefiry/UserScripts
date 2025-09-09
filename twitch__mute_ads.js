// ==UserScript==
// @name        Twitch - Mute ads
// @version     1.0
// @description Mute video during ads. Unmute mini player on top of chat if available.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/twitch__mute_ads.user.js
// @icon        https://assets.twitch.tv/assets/favicon-32-e29e246c157142c94346.png
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://www.twitch.tv/*
// ==/UserScript==

var check_interval = null

function ad_is_playing() {
  return document.querySelector("span[data-a-target='video-ad-countdown']") !== null
}

function toggle_volume(mute_ad) {
  videos = document.querySelectorAll("video")
  
  // If no video found, stop here
  if (videos.length === 0) {
    console.error("Cannot find videos")
    return false
  }
  
  // If we want to mute the ad
  if (mute_ad) { 
  	// If it's already muted, do nothing
    if (videos[0].muted) {
      console.log("Video already muted, nothing to do")
      return false
    }
  }
  
  // If the mini video player exists, unmute it and copy volume level
  if (videos.length == 2) {
    console.log("Toggling mini player mute status")
    videos[1].muted = !mute_ad
    videos[1].volume = videos[0].volume
  }
  
  // Set mute status for the main video player
  videos[0].muted = mute_ad
  
  return true
}

function check_for_ad() {  
  if (!ad_is_playing()) {
    return
  }
  
  console.log("Ad detected")
  
  // If the toggle is successful
  if (toggle_volume(true)) {
    // stop interval and wait for end of ad
    clearInterval(check_interval)
  	setTimeout(wait_for_add, 500)
  } else {
    // Otherwise, put the interval back
    check_interval = setInterval(check_for_ad, 1000)
  }
}

function wait_for_add() {
  if (ad_is_playing()) {
    // If ad is still playing, wait more
    setTimeout(wait_for_add, 500)
  } else {
    console.log("End of ad")
    // toggle volume back
    toggle_volume(false)
    // set interval back
    check_interval = setInterval(check_for_ad, 1000)
  }
}

check_interval = setInterval(check_for_ad, 1000)
console.log("Add muter running, interval id =", check_interval)
