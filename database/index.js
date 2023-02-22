/* eslint-disable camelcase */
const mysql = require('mysql')
const cors = require('cors')
const query1 = 'SELECT * FROM audiotracks'
const express = require('express')
const app = express()
const queryroutes =
  'SELECT * FROM hiking_routes'
const querypoi = 'SELECT * FROM points_of_interest'

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(allowCrossDomain)
app.use(cors())

app.get('/posts', (req, res) => {
  res.send('Hello World')
})

// const pool = mysql.createPool({
//   host: 'eu-cdbr-west-03.cleardb.net',
//   user: 'ba9317e5d5c428',
//   password: 'f8e769ef',
//   database: 'heroku_ad9c6aba2801aa2',
//   port: 3306
// })

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'track-databasev3',
//   port: 3310
// })

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'track-databasev3',
  port: 3310
})

app.get('/tracks', (req, res) => {
  const rowData = []
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id' + connection.threadId)
    connection.query(query1, (err, rows) => {
      if (err) throw err
      rows.forEach((row) => {
        rowData.push(row)
      })
      res.send(rowData)
    })
  })
})

app.get('/poi', (req, res) => {
  const rowData = []
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id' + connection.threadId)
    connection.query(querypoi, (err, rows) => {
      if (err) throw err
      rows.forEach((row) => {
        rowData.push(row)
      })
      res.send(rowData)
    })
  })
})

app.get('/route', (req, res) => {
  const rowData = []
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id' + connection.threadId)
    connection.query(queryroutes, (err, rows) => {
      if (err) throw err
      rows.forEach((row) => {
        rowData.push(row)
      })
      res.send(rowData)
    })
  })
})

app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

app.post('/api', (request, response) => {
  console.log('request', request.ip)
  const data = request.body
  const current_lon = data.lon
  const current_lat = data.lat
  let play_PoI = null
  const query =
            'SELECT id, lon_start, lon_end,lat_start,lat_end FROM points_of_interest'
  pool.query(query, (err, rows) => {
    if (err) throw err
    rows.forEach((row) => {
      const R = 6371 // Radius of the earth in km
      const dLat = (current_lat - row.lat_start) * (Math.PI / 180) // deg2rad below
      const dLon = (current_lon - row.lon_start) * (Math.PI / 180)
      const distanceCalculation =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(row.lat_start * (Math.PI / 180)) *
                    Math.cos(current_lat * (Math.PI / 180)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2)

      const c =
                    2 *
                    Math.atan2(
                      Math.sqrt(distanceCalculation),
                      Math.sqrt(1 - distanceCalculation)
                    )

      const distance = R * c // Distance in km
      console.log('id', row.id, 'distance', distance)
      if (distance <= 0.020) {
        play_PoI = row.id
        console.log('playpoi', play_PoI)
      }
    })
    response.json({
      status: 'success',
      latitude: data.lat,
      longitude: data.lon,
      altitude: data.alt,
      play_PoI: play_PoI
    })
  })
})

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'))
