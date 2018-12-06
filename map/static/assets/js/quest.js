/* global L, fetch, $, localStorage */

import styleLines from './helper.js'

function init () {
  window.addEventListener('wheel', event => {
    if (event.deltaY !== 0) {
      window.scroll(window.scrollX + event.deltaY * 5, window.scrollY)
      event.preventDefault()
    }
  })

  const prefs = JSON.parse(localStorage.getItem('data'))
  console.log(prefs)

  let url
  if (prefs.time === 'now') {
    url = `${window.location.href.replace('start', '')}data`
  } else {
    url = `${window.location.href.replace('start', '')}offlinedata-${prefs.time}`
  }

  fetch(url)
    .then(res => res.json())
    .then(data => setup(data, prefs))
    .catch(err => console.error(err))
}

function setup (trafficData, prefs) {
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

  addPopups(prefs.transportation)
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

function addPopups (transport) {
  $(document).scroll(function () {
    let x = $(this).scrollLeft()
    console.log(x)
    if (x < 1500) {
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_01.svg')
    }
    if (x > 1500 && x < 2450) {
      showPopup($('.WDJ1'))
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_03.svg')
    } else {
      hidePopup($('.WDJ1'))
    }

    if (x > 3500 && x < 4350) {
      showPopup($('.WDJ2'))
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_04.svg')
    } else {
      hidePopup($('.WDJ2'))
    }

    if (x > 5500 && x < 6350) {
      showPopup($('.WDJ3'))
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_05.svg')
      if (transport === 'bike') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_01.svg')
    } else {
      hidePopup($('.WDJ3'))
    }

    if (x >= 6700) {
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_final_auto_1.svg')
      if (transport === 'bike') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_final_fiets.svg')
    }
  })
}

init()
