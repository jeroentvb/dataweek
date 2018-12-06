const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const fs = require('fs')

module.exports = express()
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'templates')
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .get('/', index)
  .post('/start', startQuest)
  .get('/data', sendData)
  .get('/offlinedata-9', sendOfflineData)
  .get('/offlinedata-12', sendOfflineData)
  .get('/offlinedata-15', sendOfflineData)
  .get('/offlinedata-17', sendOfflineData)
  .use(notFound)
  .listen(4040, () => console.log('Server listening on port 25562'))

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

function startQuest (req, res) {
  let data = {
    time: req.body.time,
    transportation: req.body.transportation
  }

  res.render('quest', {
    data: data
  })
}

function sendData (req, res) {
  makeRequest('http://web.redant.net/~amsterdam/ndw/data/reistijdenAmsterdam.geojson')
    .then(data => res.send(data))
    .catch(err => {
      console.error(err)
      res.send('Something went wrong while getting the data.')
    })
}

function sendOfflineData (req, res) {
  let dataNumber = req.url.split('-')[1]
  const data = fs.readFileSync(`./static/assets/data/data${dataNumber}.geojson`)
  res.send(data)
}

function notFound (req, res) {
  res.send('404! The requested page was not found!')
}
