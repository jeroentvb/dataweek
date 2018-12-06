/* global L, fetch, $, localStorage */

import styleLines from './helper.js'

function init () {
  window.addEventListener('wheel', event => {
    if (event.deltaY !== 0) {
      window.scroll(window.scrollX + event.deltaY * 5, window.scrollY)
      event.preventDefault()
    }
  })

  const selectedTime = localStorage.getItem('selectedTime')

  let url
  if (selectedTime === 'now') {
    url = `${window.location.href.replace('start', '')}data`
  } else {
    url = `${window.location.href.replace('start', '')}offlinedata-${selectedTime}`
  }

  fetch(url)
    .then(res => res.json())
    .then(data => setup(data))
    .catch(err => console.error(err))
}

function setup (trafficData) {
  const coordinates = {
    lat: 52.370216,
    long: 4.895168
  }

  const map = L.map('map').setView([coordinates.lat, coordinates.long], 13)
  map.dragging.disable()

  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    maxZoom: 13,
    minZoom: 13
  })
    .addTo(map)

  L.geoJSON(trafficData, {
    style: styleLines
  })
    .addTo(map)

  addPopups()
}

function showPopup (el) {
  el.removeClass('hide-popup')
  el.addClass('show-popup')
}

function hidePopup (el) {
  if (el.hasClass('show-popup')) {
    el.removeClass('show-popup')
    el.addClass('hide-popup')
  }
}

function addPopups () {
  $(document).scroll(function () {
    let x = $(this).scrollLeft()
    if (x > 1500 && x < 2450) {
      showPopup($('.WDJ1'))
    } else {
      hidePopup($('.WDJ1'))
    }

    if (x > 3500 && x < 4350) {
      showPopup($('.WDJ2'))
    } else {
      hidePopup($('.WDJ2'))
    }

    if (x > 5500 && x < 6350) {
      showPopup($('.WDJ3'))
    } else {
      hidePopup($('.WDJ3'))
    }
  })
}

init()
