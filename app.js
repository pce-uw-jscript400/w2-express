// process.env is our local envir.  we're decl'g two new vars, NODE_ENV & PORT
// these vars are getting destructured from process.env.  if the vars are not def'd, give them the following default values.
const { NODE_ENV='development', PORT=5000 } = process.env
//Assign the express fwork to the var express
const express = require('express')
// When we invoke express, we get a new app. That app has lots of methods we'll needd to use, such as app.use and app.get
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())


app.get('/pizza', (req, res) => {
  // if(request.query.secret === 'SECRETPASSCODE'){
    // res.status(200).json({
    //   message: 'Mmmm pizza'
    // })
  // } else
  // {}
  res.status(418).json({
    message: 'Mmmm pizza'
  })
})

app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})

// GET /ping
// -> Status Code: 200
// -> Response Body: { message: 'pong' }
app.get('/ping', (req, res) => {
  const status = 200
  res.status(status).json({
    message: 'pong'
  })
})

// application-level middleware:
app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

// POST /message?content=hello
// -> Status Code: 201
// -> Response Body: { message: 'Message received!', content: 'hello' }
app.post('/message', (req, res) => {
  const status = 201
  const message = 'Message received!'
  const {content} = req.query

  res.status(status).json({message, content})
})

// TODO: fix
// DELETE /messages/4
// -> Status Code: 200
// -> Response Body: { message: 'Deleted message 4' }
app.delete('/messages:id', (req, res) => {
  const status = 200
  const {id} = req.params
  const message = `Deleted message ${id}`
  res.status(status).json({message})
})



app.get('/', (req, res) => {
  console.log(req.headers)
  console.log(req.query)
  res.json({
    message: 'Hello, Express!'
  })
})

// create a "listender" function that when invoked prints the following statement
// that includes the PORT.
const listener = () => console.log(`Listening on Port ${PORT}`)
// our app will listen on the spec'd PORT. When it's ready, it will fire the listener:
app.listen(PORT, listener)
