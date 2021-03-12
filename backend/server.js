const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const PORT = process.env.PORT || 8889
const staticDist = "./dist/small-weather-app";

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

app.use(express.static(staticDist));

// root
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: staticDist });
});

app.get('/api/home', (req, res) => {
  res.status(200).send({MSG: 'GOT HOME'})
})


