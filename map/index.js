/* global fetch */

const express = require('express')
const request = require('request')

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'templates')
  .use(express.static('static'))
  .get('/', index)
  .get('/data', sendData)
  .use(notFound)
  .listen(3000, () => console.log('Server listening on port 3000'))

function makeRequest (url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, html) => {
      if (err) reject(err)
      resolve(html)
    })
  })
}

function index (req, res) {
  res.render('index')
}

function sendData (req, res) {
  makeRequest('http://web.redant.net/~amsterdam/ndw/data/reistijdenAmsterdam.geojson')
    .then(data => res.send(data))
    .catch(err => {
      console.error(err)
      res.send('Something went wrong while getting the data.')
    })
}

function notFound (req, res) {
  res.send('404! The requested page was not found!')
}
