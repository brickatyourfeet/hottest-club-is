const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const clubs = [
  {
    id: 1,
    name: 'Crease',
    guests: [
      { id: 100, name: 'Wes Reid' }
    ]
  }
]

app.get('/clubs', (req, res, next) => {
  res.json({ data: clubs })
})

app.get('/clubs/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)

  res.json({ data: club })
})

app.post('/clubs', (req, res, next) => {
  const club = req.body
  clubs.push(club)

  res.status(201).json({ data: club })
})

app.put('/clubs/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)
  const index = clubs.indexOf(club)

  clubs.splice(index, 1, req.body)
  res.json({ data: req.body })
})

app.delete('/clubs/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)
  const index = clubs.indexOf(club)

  clubs.splice(index, 1)
  res.status(204).json()
})

app.get('/clubs/:id/guests', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)

  res.json({ data: club.guests })
})

app.get('/clubs/:id/guests/:guestId', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)
  const guestId = Number(req.params.guestId)
  const guest = club.guests.find(guest => guest.id === guestId)

  res.json({ data: guest })
})

app.post('/clubs/:id/guests', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)

  club.guests.push(req.body)
  res.json({ data: req.body })
})

app.put('/clubs/:id/guests/:guestId', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)
  const guestId = Number(req.params.guestId)
  const guest = club.guests.find(guest => guest.id === guestId)
  const index = club.guests.indexOf(guest)

  club.guests.splice(index, 1, req.body)
  res.json({ data: req.body })
})

app.delete('/clubs/:id/guests/:guestId', (req, res, next) => {
  const id = Number(req.params.id)
  const club = clubs.find(club => club.id === id)
  const guestId = Number(req.params.guestId)
  const guest = club.guests.find(guest => guest.id === guestId)
  const index = clubs.guests.indexOf(guest)

  club.guests.splice(index, 1)
  res.status(204).json()
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
