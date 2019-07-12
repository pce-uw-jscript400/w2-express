const { NODE_ENV='development', PORT=5000 } = process.env
const express = require('express')
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.get('/pizza', (request, response, next) => {
  if (request.query.secret === 'SECRETPASSCODE') {
    response.status(200).json({
      message: 'Mmmm, pizza'
    })
  } else {
    response.status(401).json({
      message: 'No pizza for you'
    })
  }
})

app.get('/', (req, res, _next) => {
  console.log(req.headers)
  console.log(req.query)
  res.json({
    message: 'Hello, Express!'
  })
})

app.get('/my/name/is/:username', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.username}!`
  })
})

app.get('/ping', (req, res, _next) => {
  const status = 200
  res.status(status).json({
    message: 'pong'
  })
})

app.post('/message', (req, res, _next) => {
  const status = 201
  const message = 'Message received!'
  const { content } = req.query
  res.status(status).json({ message, content })
})

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

app.delete('/messages/:id', (req, res, next) => {
  const status = 200
  const { id } = req.params
  const message = `Deleted message ${id}`
  res.status(status).json({ message })
})

const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)
