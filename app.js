// process.env is our local environment. We're declaring two
// new variables, NODE_ENV and PORT. These variables are getting 
// destructed from process.env. If the variables are not
// defined, go ahead and give them the following default
// values.
const { NODE_ENV='development', PORT=5000 } = process.env
// Assign the express framework to the variable express
const express = require('express')
// When we invoke express, we get a new application. That application
// has lots of methods we will need to use, such as app.use and app.get

const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})

app.get('/', (req, res, next) => {
  console.log(req.headers)
  console.log(req.query)
  res.status(404).json({
    message: 'Hello, Express!'
  })
})

app.get('/ping', (req, res, next) => {
  const status = 200
  res.status(status).json({
    message: 'pong'
  })
})

app.post('/message', (req, res, next) => {
  const status = 201
  const message = 'Message received!'
  const { content } = req.query
  res.status(status).json({
    message, content
  })
})

app.delete('/message/:id', (req, res, next) => {
  const status = 201
  const { id } = req.params
  const message = `Deleted message ${id}`
 
  res.status(status).json({
    message
  })
})

app.post('/message', (req, res, next) => {
  const status = 201
  const message = 'Message received!'
  console.log(req.body)
  const { content } = req.body
  
  res.status(status).json({
    message, content
  })
})

// Create a function called listener that, when invoked,
// will print out the following statement that includes
// the PORT.
const listener = () => console.log(`Listening on Port ${PORT}`)
// Our app is going to listen on the specified PORT, and when it's
// ready, it will fire the listener 
app.listen(PORT, listener)
