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

* **Your Answer:**  They are code that is not maintained by you, and is easily reinstalled wherever by npm.

---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**  
**  express is a light weight app server.
**  morgan is  a middleware logging framework.
**  body-parser looks in request body for things matching the specified content type.
**  nodemon restarts express whenever changes are made to the code.

---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**  We haven't specified a path for that endpoint.

---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** Metadata about the response
X-Powered-By →Express  (name of app server)
Content-Type →application/json; charset=utf-8  (means that the response is in JSON UTF-format)
Content-Length →29 (can be useful if the response is buffered, and you want to know the whole length)
ETag →W/"1d-2xgNbPXoy9ff2kjMz+3OfvVkytU"  (A unique identifier of the transaction)
Date →Tue, 09 Jul 2019 05:25:12 GMT  (the date)
Connection →keep-alive  (keep-alive eliminates the overhead of creating a new connection with subsequent requests, improves performance)

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**  The output is in the terminal where I started Express.  I can set headers in the top half of Postman as key-value pairs.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**  The part of a url begining with a question mark, followed by key-value pairs separated by ampersands
https://en.wikipedia.org/w/index.php?title=Query_string&action=history
https://twitter.com/search?q=soccer&src=typd
---

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:**  At the beginning of building the response, if the request matches the route (it always does in this example)

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

* **Your Answer:**  app is an instance of Express.  It receives and responds to HTTP requests.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**  It is a function that is invoked when a GET request is recieved that matches the route.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**  / is a paramater that corresponds to the root path.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**  req is an object containing details about the HTTP request.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**  res is the response object that you build to respond to a HTTP request.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**  next is a function that is called to find the next matching route.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**  app.post() instead of get()

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**  It is a part of the response that indicates whether the call was successful and what action was taken.

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

* **Your Answer:** an object containing key/value pairs from the url.  You would need to change the message to req.params.username.

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

* **Your Answer:**  Middleware is a function that always runs if the code reaches that point. A route is only executed if the request matches the route function. 

---

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**  Morgan logs to the filesystem.  On a production (or production-like) server the best practice is to log to the console; your server infrastructure should have its own logging handler to collect logs from the server and dispose of them per policy.  A cloud server can come and go, so you don't want to store logs there.  body-parser translates requests into key-value pairs.  

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**  req.body returns undefined because we aren't parsing it anymore.

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**  We are pulling generate() from shortid and calling it generateId in our code.  shortid generates short, unique ids.  Perhaps lower overhead than a UUID.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:** GET `/vegetables`, GET `/vegetables/:id`, POST `/vegetables`

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**  It is a function that validates input when called.  It can make sure you have all the required fields, no extra fields, etc.  This is useful when you want to turn req.body into a persistent object.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**  It is not there after the restart, because it is not persisted anywhere.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**  The first one returns a 404 if no routes match.  The second handles errors that are thrown in the routes.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**  It is a dev dependency that can show you things in your code that you technically can do but probably shouldn't, such as use == when you should use ===.  Comparable to FindBugs in Java.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)