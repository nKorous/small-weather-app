const express = require('express')
const cors = require('cors')
const axios = require('axios')

const router = express.Router()

const db = require('./db')

router.use(cors())

router.get('/currentLocalWeather', async (req, res) => {

  res.status(200).send(req.headers)
})

router.get('/favoriteLocations', async (req, res) => {
  db.query('SELECT * FROM favoriteLocations ORDER BY locationAdded DESC', (err, result) => {
    if(result) {
      res.status(200).send(result)
    }

    if(err) {
      console.warn(err)
      res.status(500).send({ERR: 'UNABLE TO COMPLETE REQUEST FOR favoriteLocations'})
    }
  })
})






module.exports = router
