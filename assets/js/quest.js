/* global L, fetch, $, localStorage */

import styleLines from './helper.js'

function init () {
  const prefs = JSON.parse(localStorage.getItem('data'))
  checkTransport(prefs.transportation)
  console.log(prefs)

  let url
  if (prefs.time === 'now') {
    url = `${window.location.href.replace('quest.html', 'assets/data/')}data.geojson`
  } else {
    url = `${window.location.href.replace('quest.html', 'assets/data/')}data${prefs.time}.geojson`
  }

  fetch(url)
    .then(res => res.json())
    .then(data => setup(data, prefs))
    .catch(err => console.error(err))
}

function checkTransport (transport) {
  if (transport === 'bike') {
    document.getElementById('car').setAttribute('src', 'assets/images/Fiets.svg')
    document.getElementById('WJD1').setAttribute('src', 'assets/images/popup/WJD_Fiets01.svg')
    document.getElementById('WJD2').setAttribute('src', 'assets/images/popup/WJD_Fiets02.svg')
    document.getElementById('WJD3').setAttribute('src', 'assets/images/popup/WJD_Fiets03.svg')
    document.getElementById('final-bg').setAttribute('src', 'assets/images/FINAL_TOPPER.svg')
  }
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

function show (el) {
  el.removeClass('hide')
  el.addClass('show')
}

function hide (el) {
  if (el.hasClass('show')) {
    el.removeClass('show')
    el.addClass('hide')
  }
}

function addPopups (transport) {
  $(document).scroll(function () {
    let x = $(this).scrollLeft()
    if (x > 10) {
      if (transport === 'car') $('.transport').addClass('car-moving')
      if (transport === 'bike') $('.transport').addClass('bike-moving')
    }
    if (x < 1500) {
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_01.svg')
    }
    if (x > 1500 && x < 2450) {
      show($('.WDJ1'))
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_03.svg')
    } else {
      hide($('.WDJ1'))
    }

    if (x > 3500 && x < 4350) {
      show($('.WDJ2'))
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_04.svg')
    } else {
      hide($('.WDJ2'))
    }

    if (x > 4800 && x < 5650) {
      show($('.WDJ3'))
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_05.svg')
      if (transport === 'bike') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_01.svg')
    } else {
      hide($('.WDJ3'))
    }

    if (x >= 5800) {
      if (transport === 'car') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_final_auto_1.svg')
      if (transport === 'bike') $('#beer').attr('src', 'assets/images/Bier/Bier-o-meter_final_fiets.svg')
    }

    if (x >= 8800) {
      show($('#final-bg'))
      show($('#final-img'))
      show($('#retry-button'))
    }

    if (x < 8500) {
      hide($('#final-bg'))
      hide($('#final-img'))
      hide($('#retry-button'))
    }
  })
}

init()
