const { NODE_ENV = 'development', PORT = 5000 } = process.env
const express = require('express')
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use((reg, res, next) => {
    console.log('In the server!')
    next()
})

app.get('/my/name/is/:name', (req, res, next) => {
    console.log(req.params)
    res.json({
        message: `Hello, ${req.params.name}!`
    })
})
app.get('/ping', (req, res, next) => {
    res.status('200').json({ message: 'pong' })
})

app.post('/message', (req, res, next) => {
    const { content } = req.query;
    console.log(req.body)
    res.status(201).json({
        message: 'Message received!',
        content
    })
})

app.delete('/messages/:id', (res, req, next) => {
    const status = 200;
    const { id } = req.params;
    const message = 'Deleted message {id}'
    res.status(status).json({ message })
})

app.get('/', (req, res, next) => {
    console.log(req.headers)
    console.log(req.query)
    res.json({
        message: 'Hello, Express!'
    })
})

const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)