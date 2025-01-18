// ==UserScript==
// @name          4chan - Enhancer
// @version       1.1
// @description   Various enhancements for 4chan : Quick acces to "Set filters", dates displayed with local format, video progress bar on hover ("Image hover" needs to be activated in 4chan settings), colored digits
// @author        xefiry
// @namespace     https://github.com/xefiry
// @homepageURL   https://github.com/xefiry/UserScripts
// @supportURL    https://github.com/xefiry/UserScripts/issues
// @downloadURL   https://raw.githubusercontent.com/xefiry/UserScripts/master/4chan__enhancer.user.js
// @icon          https://s.4cdn.org/image/favicon.ico
// @noframes
// @run-at        document-end
// @grant         none
// @match         https://boards.4chan.org/*
// @exclude-match https://boards.4chan.org/*/catalog
// ==/UserScript==

var colors = [
  "#FFFFFF", // 0 not used
  "#FFFFFF", // 1 not used
  "#FFFFFF", // 2 not used
  "#62A4DA", // 3
  "#1a9306", // 4
  "#fcd00b", // 5
  "#ffa405", // 6
  "#fb3e8d", // 7
  "#9043FD"  // 8
];

var styles = `
#my_progress_background {
  position: fixed;
  height: 4px;
  background-color: rgba(100, 100, 100, .5);
  right: 0px;
  z-index: 9999;
}

#my_progress_bar {
  width: 50%;
  height: 4px;
  background-color: rgb(255, 0, 0, .75);
  transition: all .25s linear;
}
`;

function set_style() {
  // create new style
  var styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)

  // create progress bar content
  var progress_bar = document.createElement("div")
  progress_bar.id = "my_progress_bar"

  // create progress bar
  var progress_background = document.createElement("div")
  progress_background.id = "my_progress_background"
  progress_background.style.visibility = "hidden"
  progress_background.appendChild(progress_bar)

  // add it to the page
  document.body.appendChild(progress_background)
}

function set_nav_list() {
  // Get top left navigation list
  var nav = document.getElementById("navtopright")

  if (nav !== null) {
    // Create new "Set filters" node
    var sf = document.createElement("a")
    sf.href="javascript:;"
    sf.setAttribute("data-cmd", "filters-open")
    sf.innerText = "Set filters"

    // replace "Mobile" with newly created "Set filters" node
    nav.children[2].replaceWith(sf)
  }
}

function format_dates() {
  var date_nodes = document.querySelectorAll(".dateTime:not(.postNum):not(.formattedDate)")
  var timestamp

  for (let i = 0; i < date_nodes.length; i++) {
    //console.log(date_nodes[i])
    timestamp = date_nodes[i].getAttribute("data-utc")
    date_nodes[i].innerText = new Date(timestamp * 1000).toLocaleString()

    date_nodes[i].classList.add("formattedDate")
  }
}

function video_timeupdate() {
  // if the video is loaded and duration is known
  if (!isNaN(this.duration)) {
    progress = this.currentTime / this.duration * 100

    document.getElementById("my_progress_bar").style.width = `${progress}%`
  }
}

function video_pause() {
  console.log("pause")
  document.getElementById("my_progress_background").style.visibility = "hidden"
  document.getElementById("my_progress_bar").style.width = "0%"
}

function refresh_video_playbar() {
  var vid = document.querySelector("video#image-hover")
  var bar = document.getElementById("my_progress_background")

  // if there is a video
  if (vid !== null) {
    // show the progress
    bar.style.visibility = "visible"

    // adjust width to video
    var x = vid.getBoundingClientRect()
    bar.style.width = x.width + "px"
    bar.style.top = Math.min(x.height, window.innerHeight-4) + "px"

    // add listenner (if not present)
    if (!vid.classList.contains("has_listener")) {
      //vid.setAttribute("controls", "controls")

      vid.addEventListener("timeupdate", video_timeupdate);
      vid.addEventListener("pause", video_pause);

      vid.classList.add("has_listener")
    }
  }
}

function parse_number(num) {
  // get recuring characters at the end of the number (from 3 to 8 repetitions)
  parsed = num.match(/([0-9])\1{2,7}$/)

  // if there is a result (parsed.length is two because there is a subgroup)
  if (parsed !== null && parsed.length == 2) {
    // count how many digits repeat
    match_length = parsed[0].length

    // cut the number in half (prefix / repeating digits)
    // left part can be empty
    left_part = num.substring(0, num.length - match_length)
    right_part = num.substring(num.length - match_length)

    // stick everything with a background color on the right part
    result = `${left_part}<span style='background:${colors[match_length]};'>${right_part}</span>`

    return result
  }
  // if no match, return the number unchanged
  else {
    return num
  }
}

function set_number_colors() {
  // post number
  numbers = document.querySelectorAll(".postNum.desktop:not(.processed)")

  for (let i = 0; i < numbers.length; i++) {
    number = numbers[i].children[1].innerText
    numbers[i].children[1].innerHTML = parse_number(number)
    numbers[i].classList.add("processed")
  }

  // quote links
  numbers = document.querySelectorAll(".quotelink:not(.processed)")

  for (let i = 0; i < numbers.length; i++) {
    number = numbers[i].innerText
    numbers[i].innerHTML = parse_number(number)
    numbers[i].classList.add("processed")
  }
}


function main() {
  set_style()
  set_nav_list()
  setInterval(format_dates, 1000)
  setInterval(refresh_video_playbar, 100)
  setInterval(set_number_colors, 500)
}

//setTimeout(main, 250); // .25s delay
main()