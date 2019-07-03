const { NODE_ENV='development', PORT=5000 } = process.env
const express = require('express')
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())



app.get('/', (req, res, next) => {
  console.log(req.headers)
  console.log(req.query)
  res.json({
    message: 'Hello, Express!'
  })
})

app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})
/**
 * GET /ping
 *   -> Status Code: 200
 *   -> Response Body: { message: 'pong' }
*/ 
app.get('/ping', (req, res, next) => {
  res.status(200).json({
    message: 'pong'
  })
})

app.use((req,res,next) => {
  console.log('In the server!')
  next()
})

app.post('/message', (req, res, next) => {
  res.status(201).json({
    message: 'Message received!',
    content: `${req.query.content}`
  })
})

app.delete('/messages/:id', (req, res, next) => {
  res.status(200).json({
    message: `Deleted message ${req.params.id}`
  })
})


const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)
