//process.env is our local development environment. We're declaring two new variables, NODE_ENV and PORT. These variables are getting destructured from process.env

const { NODE_ENV='development', PORT=5000 } = process.env
//Assign the express framework to the variable express
const express = require('express')
//When we invoke express we get a new application. That application
//has lots of methods we will need to use, such app.use and app.get
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.get('/', (req, res) => {
  console.log(req.headers)
  console.log(req.query)
  res.json({
    message: 'Hello, Express!'
  })
})

app.get('/pizza', (req, res) => {
  if(req.query.secret === 'SECRETPASSCODE') {
    res.status(200).json({
      message: 'Mmm, pizza'
    })
  } else {
    res.status(401).json({
      message: 'No pizza 4 u!'
    })
  }
  
})

app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})

app.get('/ping', (req, res, next) => {
  const status = 200;
  const message = 'pong'
  res.status(status).json({ message })
})


app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

app.post('/message', (req, res, next) => {
  const status = 201
  const { content } = req.body
  const message = 'Message received'
  res.status(status).json({ message , content })
})

app.delete('/messages/:id', (req, res, next) => {
  const status = 200
  const { id } = req.params
  const message = `Deleted message ${id}`
  res.status(status).json({ message })
})



//a new function called listener that when invoked will print out the following statement.
const listener = () => console.log(`Listening on Port ${PORT}`)
//want my app to listen on this port and the callback gets called when ready.
app.listen(PORT, listener)
