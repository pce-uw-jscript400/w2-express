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

* **Your Answer:** We don't need to track dependencies in git.

---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:** body-parser for parsing the body of requests, for example JSON bodies. express is a framework that lets us easily listen for http requests and respond to them. morgan is used for logging.

---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:** the server is listening for requests to `/` as defined by app.get(), but not for `/notfound`

---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** headers are meta-data about the response. It's stuff that's not in the body of the response. I recognize content-type, content-length, date, and connection.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:** the log statement is printed to the terminal that is running the server. You can change the headers in the request Headers tab.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:** query parameters are arguments that are defined in the request URL after the `?`.

---

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:** Anytime a request is received on the port the server is listening on, before handling the route

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

* **Your Answer:** It's an EventEmitter. It's an object the represents the Express application.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:** app.get() is a function. It is used to configure how to handle a get request.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:** `/` is a path. It defines the pattern of the the request URL that will be handled by this route.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**  `req` is an object and represents the request details.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:** `res` is an object and represents the response details.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:** `next` is a function. It's the next function to be called in the chain for handling a request.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:** change `app.get()` to `app.post()`

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:** a status code is returned to indicate the status of the request. 200 is 'success', for example. You can set the status code with `res.status()`.

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

* **Your Answer:** `req.params` is an object holding parameters from the request URL. You'll also need to change `req.params.name` to `req.params.username`.

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

* **Your Answer:** Middleware has access to the request object, response object, and the next middleware function. A route defines how to handle a request using a specific request method and path. Middleware is used to transform requests before handing it off to the next middleware.

---

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:** Morgan is for logging requests and not needed in a production environment. Body-parser will parse request bodys. For example, json bodies into a javascript object.

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:** The request body becomes undefined since the body-parser is no longer parsing the JSON content in the request body.

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:** The code uses destructuring syntax to assign the `shortid.generate` function to `generateId`. `shortid` is used to generate unique strings to used as identifiers. Currently, it is being use to generate a unique identier for new vegetables.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:** GET `/vegetables`, GET `/vegetables/:id`, POST `/vegetables`

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:** It is a middleware function that validates the incoming request. It will be called when a POST request for `/vegetables` is received. If the request is invalid, it will pass an error to Express using `next(error)`. This error will be passed on to an error handling middleware function defined with 4 arguments. If the request is valid, it will call `next()` with no arguments to execute the next middleware.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:** The vegetables are only stored in memory and not persisted (for example, in a database or file). When the server is restarted anything in memory is lost.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:** The first one is only reached if the requert doesn't match any of the defined routes. This is considered an error and so it creates and error and passes it to Express. Express passes errors to the `app.use()` to be handled. In this case, a status code is set and the error message is sent back as a response. `err` is the error object.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:** standardjs automatically formats and enforces the standard javascript code style. It is a devDependency and only needed during development.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)