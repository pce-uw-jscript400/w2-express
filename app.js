const { NODE_ENV='development', PORT=5000 } = process.env
const express = require('express')
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

app.get('/', (req, res, next) => {
  console.log(req.query);
  console.log(req.headers);
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
  res.status(200)
  res.json({
    message: `pong`
  })
  next()
})

app.post('/message', (req, res, next) => {
  const { content } = req.query
  res.status(201)
  console.log(req.body)
  res.json({
    message: `Message Recived!`,
    content: `${content}`
  })
  next()
})

app.delete('/messages/:id', (req, res, next) => {
  const { id } = req.params
  res.status(200)
  res.json({
     message: `Message deleted ${id}`
  })

})

const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)
