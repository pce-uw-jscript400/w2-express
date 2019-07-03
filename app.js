const { NODE_ENV='development', PORT=5000 } = process.env
const express = require('express')
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

// app.get('/my/name/is/:name', (req, res, next) => {
//   console.log(req.params)
//   res.json({
//     message: `Hello, ${req.params.name}!`
//   })
// })

// app.get('/', (req, res, next) => {
//   console.log(req.headers)
//   console.log(req.query)
//   res.status(404).json({
//     message: 'Hello, Express!'
//   })
// })

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

// app.delete('/message/:id', (req, res, next) => {
//   const status = 201
//   const { id } = req.query
//   const message = `Deleted message ${id}`
 
//   res.status(status).json({
//     message
//   })
// })

app.post('/message', (req, res, next) => {
  const status = 201
  const message = 'Message received!'
  const { content } = req.query
  res.status(status).json({
    message, content
  })
})


const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)
