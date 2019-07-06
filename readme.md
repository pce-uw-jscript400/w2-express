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

* **Your Answer:** We include them so that those packages are not uploaded to github. There's no reason for us to track changes.

---

- [x] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**

* Body parser is for parsing requests.
* Express is a node framework.
* Morgan is a logger middleware for node.
* Nodemon automatically restarts the server whenever there are changes to the code.

---

- [x] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:** We haven't configured in our code any url paths that match `/notfound` with the action get.

---

- [x] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [x] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** Headers are metadata. I recognize Express and json since we configured the code to return json with this request.

---

- [x] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:** You can find the log in the terminal. Headers can be changed by going to the headers tab and entering keys and values for the headers.

---

- [x] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:** Query parameters are things you put in the url to be sent along with the request (providing additional information). Converted to an object.

Example - https://www.google.com/search?q=weather

---

- [x] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:** `app.use()` gets called whenever a request is made. The `next()` gets it ready for the next route that matches.

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

* **Your Answer:** App is a next application. Its function is to build an app in which we can use methods that comes with the node module.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**  It's a method that defines a route that is a get request.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:** `/` is the root of the app. Its purpose is to represent the home route.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:** It is an object. It is the request itself and may have additional information.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:** Response is an object. It represents what we will respond with.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:** Next is a function. Will allow the app to move on to the next function.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:** The function that will be called is `app.post()`.

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:** HTTP requests have status codes. 200 means that the request was ok. Can change by adding a status after `res`.

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

* **Your Answer:** `req.params` is an object that will have the parameter variables that were passed along with the request. You will need to change the message value to be `req.params.username`.

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

* **Your Answer:** Middleware are methods that you use to set up your application. A lot of it will be required at the top of the file.

---

- [x] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:** Morgan is used for logging in development. We only want to use Morgan in development so that the client never see the information in the terminal. File can also get big if there are thousands of requests and we are saving them.

Body parser gives you access to req.body in the form of an object. In our case we are getting a body in json form.

---

- [x] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:** The response body changes to undefined because the body parser makes the form data available in req.body.

---

- [x] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:** This is an object that when generate is accessed it generates a short id. Short-id is a package that creates url friendly ids.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:** Routes currently available:
GET /vegetables
GET /vegetables/:id
POST /vegetables

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:** It's a helper function that returns a next error function if the request is not valid. The function considers an empty body, missing keys, or extra keys in the request a bad request.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:** The new vegetable created is not stored in memory after the server is restarted. It's not saved because the data is defined at the beginning as an empty array of fruits and vegetables.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:** The second to last `app.use()` function sets up an object for the next function in which the status 404 is set up with a message. The last one extracts the message and status and returns it in the response in json.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:** Standard js is a linter that will tell you if your code doesn't follow standard js style.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [body-parser](https://www.npmjs.com/package/body-parser)