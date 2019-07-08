//process.env is our local environment. We're declaring two
//new variables, NODE_ENV and PORT =. THese variables are getting
//destructured from process.env. If the variables are not
//defined, go ahead and give them the following default values
const { NODE_ENV='development', PORT=5000 } = process.env
//Assign the express framework to the variable express
const express = require('express')
//When we invoke express, we get a new application. That application
//has lots of methods we will need to use, such as app.use and app.get
const app = express()
console.log(typeof app)

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
// app.use(require('body-parser').json())



app.get('/', (req, res, next) => {

  // console.log(typeof next)
  //  console.log(req.query)
  //  console.log(req.headers)

  res.status(200).json({
    message: 'Hello, Express!'
  })
})

app.get('/ping', (req, res) => {
  res.status(200).json({
     message: 'pong'
  })
})


//Application-level middleware
app.use((req, res, next) => {
  console.log('In the server!')
  next()
})




app.post('/message', (req, res) => {
  console.log(req.body)
  const { content } = req.body
  const message = 'Message received'

  res.status(201).json({message, content})

})


app.delete('/messages/:id', (req, res) => {

  const { id } = req.params
  const message = `Delete message ${id}`

  res.status(201).json({message})

})




app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})

//Create a function called listener that, when invoked, will print out the following statement that
//includes the PORT.
const listener = () => console.log(`Listening on Port ${PORT}`)
//Our app is going to listen on the specified PORT, and when it's
//ready will execute the callback function listener
app.listen(PORT, listener)
