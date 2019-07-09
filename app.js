const { NODE_ENV='development', PORT=5000 } = process.env
const express = require('express')
const app = express()


if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
// app.use(require('body-parser').json())



app.get('/', (req, res, next) => {
  // console.log(req.headers)
  // console.log(req.query)
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

app.get('/pong', (req, res, next) => {
  const status = 200
  res.status(status).json({
    message: 'pong!'
  })
})

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

app.post('/message',(req, res, next) => {
  const status = 201
  console.log(req.body)
  res.status(status).json({
    message: 'Message received!'
  })
})


app.delete('/message/4', (req, res, next) => {
  const status = 200
  res.status(status).json({
    message: 'Deleted message 4'
  })
})

const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)
