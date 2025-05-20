// ==UserScript==
// @name        Reddit - Enhancer
// @version     1.5
// @description Various enhancements for Reddit (increase display width, added arrow controls to scroll images, always use best quality video, all gif are videos, no nsfw blur/click)
// @author      xefiry
// @namespace   https://github.com/xefiry
// @homepageURL https://github.com/xefiry/UserScripts
// @supportURL  https://github.com/xefiry/UserScripts/issues
// @downloadURL https://raw.githubusercontent.com/xefiry/UserScripts/master/reddit__enhancer.user.js
// @icon        https://www.redditstatic.com/shreddit/assets/favicon/64x64.png
// @noframes
// @run-at      document-end
// @grant       none
// @match       https://www.reddit.com/*
// ==/UserScript==

// Increase width limit on subredits homepages & posts
function increase_display_width() {
  new_width = "80%"

  elem = document.querySelector(".subgrid-container")
  if (elem != null && elem.style.width !== new_width) {
    elem.style.width = new_width
  }
}

function set_video_quality() {
  key = "@reddit/shreddit-player-media-quality"
  if (localStorage[key] !== "1080") {
    localStorage[key] = "1080"
    location.reload()
  }
}

// removes "gif" attribute from some videos to prevent problems
// (video playback restarts alone, click on media opens new tab)
function all_gifs_are_videos() {
  vid_list = document.querySelectorAll("shreddit-player-2")

  for (i = 0; i < vid_list.length; i++) {
    vid = vid_list[i]

    if (vid.hasAttribute("gif")) {
      // remove reddit video controls
      vid.shadowRoot.querySelector("shreddit-media-ui").remove()
      // add default video controls
      vid.shadowRoot.querySelector("video").setAttribute("controls", "controls")
      // enable loop
      vid.shadowRoot.querySelector("video").setAttribute("loop", "")
      // remove gif attribute
      vid.removeAttribute('gif')
    }
  }
}

// remove nsfw blur on new reddit
function no_nsfw_blur() {
  // for miniatures on the sidebar
  sidebar = document.querySelector("pdp-right-rail")

  if (sidebar !== null) {
    // remove blur from images
    sidebar.querySelectorAll("img").forEach(img => {
      if (img.style.filter.includes("blur")) {
        img.style.filter = ""
      }
    })

    // remove (-18) svgs
    sidebar.querySelectorAll("svg").forEach(svg => {
      if (svg.classList.contains("h-[24px]")) {
        svg.remove()
      }
    })
  }

  // for miniatures in search result
  if (document.URL.search("/search/") >= 0) {
    document.querySelectorAll("faceplate-img").forEach(img => {
      if (img.classList.contains("thumbnail-blur")) {
        img.classList.remove("thumbnail-blur")
      }
    })
  }
}

function no_nsfw_click() {
  // Click on "View nsfw content"
  document.querySelectorAll("shreddit-blurred-container").forEach(img => {
    // Get the overlay inside the container
    overlay = img.shadowRoot.querySelector(".overlay")

    // If nsfw blur and overlay exists, we click it (not the container)
    if (img.getAttribute("reason") === "nsfw" && overlay !== null) {
      overlay.click()
    }
  })
}

var buttons = null

function set_buttons(event) {
  buttons = event.currentTarget.shadowRoot.querySelectorAll("faceplate-carousel button.button-small")
}

function add_carousel_listner() {
  // get all carousels
  carousels = document.querySelectorAll("gallery-carousel")

  // if there is only one, get it's buttons
  if (carousels.length === 1) {
    buttons = carousels[0].shadowRoot.querySelectorAll("faceplate-carousel button.button-small")
  }
  // else, add event listner to update buttons on hover
  else {
    document.querySelectorAll("gallery-carousel:not(.hasEventListner)").forEach(node => {
      node.onmouseover = set_buttons
      node.classList.add("hasEventListner")
    })
  }
}

document.addEventListener('keydown', function (event) {
  if (buttons === null) {
    return
  }
  
  switch(event.key) {
    case "ArrowLeft":  buttons[0].click(); break;
    case "ArrowRight": buttons[1].click(); break;
  }
})

function main() {
  increase_display_width()
  set_video_quality()
  all_gifs_are_videos()
  add_carousel_listner()

  no_nsfw_blur()
  no_nsfw_click()
}

setTimeout(main, 500);
setInterval(main, 2000)
