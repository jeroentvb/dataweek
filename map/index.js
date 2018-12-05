const express = require('express')
const request = require('request')

module.exports = express()
  .use(express.static('static'))
  .get('/', index)
  .get('/data', sendData)
  .use(notFound)
  .listen(25562, () => console.log('Server listening on port 25562'))

function makeRequest (url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, html) => {
      if (err) reject(err)
      resolve(html)
    })
  })
}

function index (req, res) {
  res.sendFile(`${__dirname}/static/index.html`)
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
