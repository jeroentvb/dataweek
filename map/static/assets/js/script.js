/* global L, fetch */

import styleLines from './helper.js'

function init () {
  fetch(`${window.location.href}data`)
    .then(res => {
      return res.json()
    })
    .then(data => setup(data))
    .catch(err => console.error(err))
}

function setup (trafficData) {
  const coordinates = {
    lat: 52.370216,
    long: 4.895168
  }

  const map = L.map('map').setView([coordinates.lat, coordinates.long], 13)

  L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 16
  })
    .addTo(map)

  L.geoJSON(trafficData, {
    style: styleLines
  })
    .addTo(map)
}

init()
