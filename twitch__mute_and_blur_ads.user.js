// ==UserScript==
// @name        Twitch - Mute and blur ads
// @version     2.0.0
// @description Mute video and blur ads. Unmute mini player on top of chat if available.
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/twitch__mute_and_blur_ads.user.js
// @icon        https://assets.twitch.tv/assets/favicon-32-e29e246c157142c94346.png
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://www.twitch.tv/*
// ==/UserScript==

const Status = {
  IN_STREAM: 0,
  IN_AD: 1
};

let interval_time = 200
let cur_status = Status.IN_STREAM
let volume_save = 0

function check_for_ad() {
  let videos = document.querySelectorAll("video")
  let ad_playing = (document.querySelector("span[data-a-target='video-ad-countdown']") !== null)

  // If no video found, stop here
  if (videos.length === 0) {
    console.error("Cannot find videos")
    return
  }

  // Handle status change on the main player
  if (ad_playing && cur_status === Status.IN_STREAM) {
    console.log("Ad detected")

    // save the volume
    volume_save = videos[0].volume

    // mute and blur the video
    videos[0].muted = true
    videos[0].style.filter = "blur(250px)"

    cur_status = Status.IN_AD

  } else if (!ad_playing && cur_status === Status.IN_AD) {
    console.log("Ad ended")

    // unmute and unblur the video
    videos[0].muted = false
    videos[0].style.filter = ""

    cur_status = Status.IN_STREAM
  }


  // update volume on mini player (if it exists)
  if (videos.length == 2) {
    if (cur_status === Status.IN_STREAM) {
      videos[1].muted = true
    } else {
      videos[1].muted = false
      videos[1].volume = volume_save
    }
  }
}

setInterval(check_for_ad, interval_time)
