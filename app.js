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

app.get('/pizza', (req, res, next) => { 
  res.status(418).json({
    message: 'Mmm pizza'
  })
})

app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

//http://localhost:5000/ping
app.get('/ping', (req, res, next) => { 
  res.status(200).json({
    message: 'pong'
  })
})

//http://localhost:5000/message?content="Hey"
app.post('/message', (req, res, next) => { 
  const status = 201
  const message = 'Message received!'
  const { content } = req.query
  res.status(status).json({ message, content})
})

//http://localhost:5000/messages/5
app.delete('/messages/:id', (req, res, next) => { 
  const status = 200
  const { id } = req.params
  const message = `Deleted message ${id}`
  res.status(status).json({message})
})



const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)

