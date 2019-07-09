# Building Servers with Express

By the end of this lesson, you should be able to build a simple server with the [Express](https://expressjs.com/) framework for Node.js.

## Core Learning Objective

*	Create an application server using NodeJS and Express

## Sub-Objectives

* Create an Express server that listens on a specified port
* Make requests to that server using [Postman](https://www.getpostman.com)
* Create routes using different paths and HTTP verbs
* Identify and build middleware
* Parse information sent in the request body

### Installation

1. Fork & Clone
1. `npm install`
1. `npm run dev`

Then, go to [http://localhost:5000/](http://localhost:5000) and you should see a message.

### Instructions & Guiding Questions

- [ ] Take a look at the `.gitignore` file.

* **Question:** Why do you think `node_modules/` is included in there?

* **Your Answer:** node_modules contains all the npm packages that we have installed to build our app.
These pacakges need not be tracked/pushed onto git as they can be easily installed by anyone who would like to work on the project using npm install

---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**  nodemon : It automatically restarts our node application whenever any file or directory changes are detected. This is particularly useful in our case as we dont want to stop and restart our server every time we make a code change

express : Express is a web framework for node. It provides a bunch of wrappers for HTTP utility methods so that building our API's is easier without us having to deal with the nitty gritty details.

body-parser : It is a body parsing middleware. This basically intercepts the user request and parsers the body and process the data and hands it to the server request handler in a pretty form. This module provides different format body parsers such as JSON, Raw, Text and URL encoded body parser

morgan : this is another middleware that is used for logging purposes. This provides details about the timing metrics etc
---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:** When we go to localhost:/5000/notfound, we are essntially making a get request to a route/endpoint we haven't specified in our server code and hence we het that error, where as we have specified the response that needs to be returned when we do a GET request to /.

---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** This is the HTTP reesponse headers which contain the metadata for the response. In our case it indicates the framework that is running on the server and the content type refers to the type of the body that is sent in the response and content length is the actual number of charcters that is present in the body of the response

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:** This console.log statement is logged to the terminal. If you look at the headers tab in the same level as the request/GET we can edit the headers that are sent by POSTMAN

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:** Anything that follows the ? in the GET request is a query param. After the question mark is a key value pair and if you want to send in more key value pairs you combine them using &

Searching for javascript on uw website: https://www.washington.edu/search/?q=javascript


---

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:** Everytime a request is made

---

- [ ] Take a moment to observe the basic structure of a **route** in Express.
  ```js
  app.get('/', (req, res, next) => {
    console.log(req.query)
    res.json({
      message: 'Hello, Express!'
    })
  })
  ```

* **Question:** What type of thing is `app` and what is its purpose?

* **Your Answer:** app is an object with mutliple methods attached to it. Its purpose is to set up and run an express server

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:** app.get() is a function and it is used to process all the get requests that are received. The first param to the get method is the path/route and the get method and if the route matches then it excutes the function defined in the second param which typically deals with request and based on the request sends an appropriate response

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:** / represents a path and it is used to route the get request to the appropriately

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:** req is the request object

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:** res is the response object

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:** next is a function and it represents the next available matching route that the server has to execute after executing the current method

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:** instead of app.get() we need to use app.post()

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:** status code here refers to http status codes. Status codes refers to convey back to the client in brief what happened with the request, just a high level context. we can add a .status() method to change the status that needs to be returned

---

- [ ] Add the following route to your application; then, make a request again but this time change the URL to the following, making sure to replace `<your-name` with your acutal name: `http://localhost:5000/my/name/is/<your-name>`.
  ```js
  app.get('/my/name/is/:name', (req, res, next) => {
    console.log(req.params)
    res.json({
      message: `Hello, ${req.params.name}!`
    })
  })
  ```

* **Question:** What is `req.params`? What else will you need to change if you change the path to `/my/name/is/:username`?

* **Your Answer:** req.params is an object that represents route params. Route params are defined within a URL. If we change name to username then the message should log out req.params.username

---

- [ ] Create three new routes as follows, testing each one as you go:
  ```
  GET /ping
  -> Status Code: 200
  -> Response Body: { message: 'pong' }

  POST /message?content=hello
  -> Status Code: 201
  -> Response Body: { message: 'Message received!', content: 'hello' }

  DELETE /messages/4
  -> Status Code: 200
  -> Response Body: { message: 'Deleted message 4' }
  ```

---

- [ ] Earlier we added the following code. Try moving it between two routes you just created and test each route.
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** The above can be described as middleware. Describe what middleware is in your own words and how it differs from building a route.

* **Your Answer:** middleware is something that acts as a wrapper and exposes many methods within app for easy access. Without middleware we can still build the entire server but just that the code will tend to be overly verbose. middleware acts as a translation unit and makes life easier by providing useful wrappers

---

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:** The logs outputted by morgan are mostly useful for the developer only during the development phase. If it is enabled on a production server which gets a lot of traffic, these logs can actually bloat up pretty quickly and if they are being stored they can get really annoying and take up a lot of space

body parser gets us access to req.body and we can specify the format in which we expect request body to be in

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:** we get an error because without the body-parser we dont have access to req.body, infact req.body is logged as undefined, because in any standard request the body is sent as a stream and without the middleware we need to do a lot of translation ourseleves. body-parsers eliminates the need for that and provides us a simple and easy access to req.body

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:** short id is a unique id generator which is used to genetrate id's for each of the veggies and fruits that are created via post. This helps to uniquely identify each of the veggie and fruits and no two id's will be the same

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:** get /vegetables,  get /vegetables/:id, post /vegetables

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:** This basically helps us to validat the post request. The body of the post should have
a name and price as key's and thier corresponding value pairs are also expected to be passed as a part of request body and helpers.validate helps validate this

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:** The data is not persisted as it is only in memory and not stored to the database. So once we restart the server that data is gone

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:** if a particular path was not found for any of the req methods like get post put etc ,we log out the error messages using these app.use statements

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:** Helps provide enforce consitent styling for the entire project. 

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)