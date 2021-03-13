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
  db.query('SELECT * FROM favoriteLocations ORDER BY countryName, locationName', (err, result) => {
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

  const stmt = 'INSERT INTO favoriteLocations (locationName, locationId, countryName, stateName) VALUES (?, ?, ?, ?)'
  db.query(stmt, [body.LocalizedName, body.Key, body.Country.LocalizedName, body.AdministrativeArea.LocalizedName], (err, result) => {
    if(result) {
      res.status(200).send(result)
    }

    if(err) {
      sendErrorResponse('WARN', res, 'addFavoriteLocations', 'CANNOT ADD favoriteLocations', err)
    }
  })
})

router.delete( '/deleteFavoriteLocation', async (req, res) => {
  const locationKey = Number(req.query.locationKey)

  const stmt = 'DELETE FROM favoriteLocations WHERE locationId = ?'
  db.query(stmt, [locationKey], (err, result) => {
    if(result) {
      res.status(200).send(result)
    }

    if(err) {
      sendErrorResponse('WARN', res, 'deleteFavoriteLocations', 'CANNOT DELETE favoriteLocations', err)
    }
  })
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

router.get('/getFiveDayForecast', async (req, res) => {
  const locationId = Number(req.query.locationId)

  axios.get(`${WEATHER_BASE}/forecasts/v1/daily/5day/${locationId}?apikey=${API_KEY}`)
  .then( response => response.data )
  .then( data => res.status(200).send(data))
  .catch(err => {
    sendErrorResponse('WARN', res, 'getFiveDayForcast', 'CANNOT GET FORECAST', err)
  })
})

router.get('/getOneDayForecast', async (req, res) => {
  const locationId = Number(req.query.locationId)

  axios.get(`${WEATHER_BASE}/forecasts/v1/daily/1day/${locationId}?apikey=${API_KEY}`)
  .then( response => response.data )
  .then( data => res.status(200).send(data))
  .catch(err => {
    sendErrorResponse('WARN', res, 'getOneDayForcast', 'CANNOT GET FORECAST', err)
  })
})






module.exports = router
