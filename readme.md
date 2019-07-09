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

- [x] Take a look at the `.gitignore` file.

* **Question:** Why do you think `node_modules/` is included in there?

* **Your Answer:**
We don't want to track our modules in git. Easily re-installable
---

- [x] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**
nodemon - it's the thing that updates the server by restarting the app when it detects changes to the files

body-parser -  allows us to parse response bodies

express - Node framework for building applications

morgan - logging info about incoming requests
---

- [x] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**
We haven't specified a path to `/notfound`
---

- [x] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [x] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**
Metadata about your request.
ContentType - type of data being returned
Content-Length - number of characters in this case
Date - it's a date!
---

- [x] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**
Terminal

Headers can be changed by adding keys and values under the Header tab.
---

- [x] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**
Query parameters are ways of requesting specific data from an endpoint.
---

- [x] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:**
every time!
---

- [x] Take a moment to observe the basic structure of a **route** in Express.
  ```js
  app.get('/', (req, res, next) => {
    console.log(req.query)
    res.json({
      message: 'Hello, Express!'
    })
  })
  ```

* **Question:** What type of thing is `app` and what is its purpose?

* **Your Answer:**
It's how we invoke express which allows us to use the methods that come with express.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**
Handles get requests and defines a route.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**
It's the path. So in this case, it's the index of the site, but could also be in the middle like `/profile/:user1`

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**
The request object.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**
The response object.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**
Continue to next route that matches

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**
We need to create an `app.post()`

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**
Status code indicate the success or type of failure of a query being made to an endpoint. To define a new status code we could write a function for `res.status(<code>).json()`. We could create a version of this for each status code.
---

- [x] Add the following route to your application; then, make a request again but this time change the URL to the following, making sure to replace `<your-name` with your acutal name: `http://localhost:5000/my/name/is/<your-name>`.
  ```js
  app.get('/my/name/is/:name', (req, res, next) => {
    console.log(req.params)
    res.json({
      message: `Hello, ${req.params.name}!`
    })
  })
  ```

* **Question:** What is `req.params`? What else will you need to change if you change the path to `/my/name/is/:username`?

* **Your Answer:**
The parameters being passed to the endpoint. So we would change the message being returned to `Hello, ${req.params.username}!`
---

- [x] Create three new routes as follows, testing each one as you go:
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

- [x] Earlier we added the following code. Try moving it between two routes you just created and test each route.
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** The above can be described as middleware. Describe what middleware is in your own words and how it differs from building a route.

* **Your Answer:**
It's the code that's run before the routes are accessed. Usually is auth or logging, etc

---

- [x] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**
morgan is for logging info about incoming requests. body-parser allows us to parse the response body. We only want morgan in dev mode because we wouldn't want all those logs clogging up production.

---
- [x] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**
this throws an error because we need the body to be parsed in order for it to be returned in the application.
---

- [x] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**
Importing the short id package, which allows us to generate unique ids. We're using it to assign a unique id to each response of each POST.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**
GET: /vegetables
POST: /vegetables
GET: /vegetables/:id

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**
A function that checks to be sure that the request body of the POST contains valid data. If it's empty or doesn't have the right keys/values it returns an error.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**
The data is gone because I didn't save it anywhere!

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**
1 - structures a response if a 404 is returned, it creates a message that contains the invalid method and path combo
2 - the second takes that status and method created in the first app.use() method and responds.

The `err` is the the object created in the first method, that is passed to the second method.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**
It's a code formatter that will automatically restructure your code for style consistency.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [body-parser](https://www.npmjs.com/package/body-parser)
