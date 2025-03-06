// ==UserScript==
// @name        Reddit - Enhancer
// @version     1.0.4
// @description Various enhancements for Reddit (increase display width, added arrow controls to scroll images, always use best quality image, all gif are videos, no nsfw blur/click)
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

// Always show the best quality images
function always_use_best_image() {
  images = document.querySelectorAll("img.media-lightbox-img")

  for (let i = 0; i < images.length; i++) {

    // get srcset from the image and split it in an array
    srcset = images[i].srcset.split(", ")

    // only continue if srcset has multiple entries
    if (srcset.length > 1) {

      // get the last srcset
      new_srcset = srcset[srcset.length - 1]

      // split it and get the first part (the URL)
      new_href = new_srcset.split(" ")[0]

      // apply new srcset and new href
      images[i].srcset = new_srcset
      images[i].href = new_href
    }
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
  // for posts
  old_node = document.querySelector("xpromo-nsfw-blocking-container")

  if (old_node !== null) {
    console.log("NSFW blur found and removed")
    new_node = document.createElement("shreddit-async-loader")
    new_node.innerHTML = old_node.innerHTML
    old_node.replaceWith(new_node)
  }

  // for miniatures on the side
  // get sidebar
  sidebar = document.querySelector("pdp-right-rail")

  if (sidebar !== null) {
    imgs = sidebar.querySelectorAll("img")

    // remove blur from images
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].style.filter.includes("blur")) {
        imgs[i].style.filter = ""
      }
    }

    // remove (-18) svgs
    svgs = sidebar.querySelectorAll("svg")

    for (var i = 0; i < svgs.length; i++) {
      if (svgs[i].classList.contains("h-[24px]")) {
        svgs[i].remove()
      }
    }
  }

  // for miniatures in search result
  if (document.URL.search("/search/") >= 0) {
    imgs = document.querySelectorAll("faceplate-img")

    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].classList.contains("thumbnail-blur")) {
        imgs[i].classList.remove("thumbnail-blur")
      }
    }
  }
}

function no_nsfw_click() {
  // Click on "View nsfw content"
  imgs = document.querySelectorAll("shreddit-blurred-container")

  for (var i = 0; i < imgs.length; i++) {
    // Get the overlay inside the container
    overlay = imgs[i].shadowRoot.querySelector(".overlay")

    // If nsfw blur and overlay exists, we click it (not the container)
    if (imgs[i].getAttribute("reason") === "nsfw" && overlay !== null) {
      overlay.click()
    }
  }
}

function get_buttons() {
  z = null

  w = document.querySelector("div#shreddit-media-lightbox")
  if (w == null) {
    return null
  }
  x = w.querySelector("gallery-carousel")
  if (x == null) {
    return null
  }
  y = x.shadowRoot.querySelector("faceplate-carousel")
  if (y == null) {
    return null
  }
  z = y.querySelectorAll("button.button-small")

  return z
}

document.addEventListener('keydown', function (event) {
  if (event.key === "ArrowLeft") {
    b = get_buttons()
    if (b != null) {
      b[0].click()
    }
  }
  else if (event.key === "ArrowRight") {
    b = get_buttons()
    if (b != null) {
      b[1].click()
    }
  }
})

function main() {
  increase_display_width()
  always_use_best_image()
  all_gifs_are_videos()

  no_nsfw_blur()
  no_nsfw_click()
}

setTimeout(main, 500);
setInterval(main, 2000)
