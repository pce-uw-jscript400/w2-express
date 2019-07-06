// process.env is our local environment
// declaring 2 node variables - NODE_ENV and PORT
// they are being destructured from env
// if they dare not found then use the default values

const { NODE_ENV='development', PORT=5000 } = process.env

// assign express framework to the variable express
const express = require('express')

// When invoking express we get a new application.
// With it comes built in functions such as app.use etc.
const app = express()

// Morgan provides logging
if (NODE_ENV !== 'testing') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// Application level middleware
app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

// request, response, next
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

app.get('/ping', (req, res, next) => {
  res.status(200).json({
    message: 'pong'
  })
})

app.post('/message', (req, res, next) => {
  console.log(req.body)

  const status = 201
  const { content } = req.query
  const message = 'Message received!'
  res.status(status).json({ message, content })
})

app.delete('/messages/:id', (req, res, next) => {
  res.status(200).json({
    message: `Deleted message ${req.params.id}`
  })
})

// Create a function called listener
// When invoked it will print a statement that
// includes the PORT
const listener = () => console.log(`Listening on Port ${PORT}`)

// Our app is going to listen on the specified PORT
app.listen(PORT, listener)

// when you invoke express you get get