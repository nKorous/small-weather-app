const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(cors())
router.use(bodyParser.json())

const db = require('./db')
const sendErrorResponse = require('./logger')

const API_KEY = process.env.ACCU_WEATHER_API_KEY
const WEATHER_BASE = 'http://dataservice.accuweather.com'


router.get('/currentLocalWeather', async (req, res) => {

  res.status(200).send(req.headers)
})

router.get('/favoriteLocations', async (req, res) => {
  db.query('SELECT * FROM favoriteLocations ORDER BY locationAdded DESC', (err, result) => {
    if(result) {
      res.status(200).send(result)
    }

    if(err) {
      sendErrorResponse('WARN', res, 'favoriteLocations', 'CANNOT GET favoriteLocations', err)
    }
  })
})

router.post('/addFavoriteLocation', async (req, res) => {
  const body = req.body

  console.log(body)
  res.status(200)

})

router.delete( '/deleteFavoriteLocation', async (req, res) => {
  const locationKey = Number(req.query.locationKey)

  console.log(locationKey)
  res.status(200)
})

router.get('/autocompleteLocationInfo', async (req, res)=> {
  const location = encodeURI(req.query.location)

  axios.get(`${WEATHER_BASE}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${location}`)
    .then( response => response.data )
    .then( data => res.status(200).send(data))
    .catch(err => {
      sendErrorResponse('WARN', res, 'autocompleteLocationInfo', 'CANNOT GET LOCATIONS', err)
    })
})

router.get('/getCurrentConditions', async (req, res) => {
  const locationID = Number(req.query.locationID)

  axios.get(`${WEATHER_BASE}/currentconditions/v1/${locationID}?apikey=${API_KEY}`)
    .then( response => response.data )
    .then( data => res.status(200).send(data))
    .catch(err => {
      sendErrorResponse('WARN', res, 'getCurrentConditions', 'CANNOT GET CONDITIONS', err)
    })
})

router.get('/getFiveDayForcast', async (req, res) => {
  const locationID = Number(req.query.locationID)

  axios.get(`${WEATHER_BASE}/forecasts/v1/daily/5day/${locationID}?apikey=${API_KEY}`)
  .then( response => response.data )
  .then( data => res.status(200).send(data))
  .catch(err => {
    sendErrorResponse('WARN', res, 'getFiveDayForcast', 'CANNOT GET FORCAST', err)
  })

})






module.exports = router
