/* global L, fetch */

import styleLines from './helper.js'

function init () {
  window.addEventListener('wheel', event => {
    if (event.deltaY !== 0) {
      window.scroll(window.scrollX + event.deltaY * 5, window.scrollY)
      event.preventDefault()
    }
  })

  fetch(`${window.location.href}data`)
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

  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    maxZoom: 16,
    minZoom: 2
  })
    .addTo(map)

  L.geoJSON(trafficData, {
    style: styleLines
  })
    .addTo(map)
}

init()
