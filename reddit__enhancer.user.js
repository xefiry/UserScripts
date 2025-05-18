// ==UserScript==
// @name        Reddit - Enhancer
// @version     1.2.2
// @description Various enhancements for Reddit (increase display width, added arrow controls to scroll images, always use best quality image, all gif are videos, no nsfw blur/click/blocking)
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

function get_buttons() {
  tmp = document.querySelector("div#shreddit-media-lightbox gallery-carousel")
  if (tmp == null) {
    return null
  }
  return tmp.shadowRoot.querySelectorAll("faceplate-carousel button.button-small")
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

  no_nsfw_blur()
  no_nsfw_click()
}

setTimeout(main, 500);
setInterval(main, 2000)
