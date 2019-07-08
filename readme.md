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

* **Your Answer:** Because we don't want git to keep track of any additions or removal of any dependencies that we may need in developing this project. We also don't want to push it up into our github repository.

---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**
`body-parser` Parsers the body of the request so that we can manipulate it in our code.
`express` A js library that will make it easy for us to create servers.
`morgan` A request logger for node.js that tells you what type of request(GET, POST, DELETE, PATCH) is coming into our server, the status of the response and how long it took.

---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:** Because we haven't specified the path to the endpoint `/notfound`

---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** Headers are meta data about the response from the server. I recognize content-type and content-length from the example.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:** The `console.log()` can be found in the terminal that we are using to run our code. You can change the headers on the request being sent in postman by adding a key and value under the headers tab below the url in Postman.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:** Query parameters are additional strings in the url that can be used to pass data to a server.
`source=hp&ei=0rwiXcLdE4jB-wS77quQBw&q=movies`

---

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:** `app.use()` gets called before the routes since it is before any of our routes.

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

* **Your Answer:** `app` is function with many methods.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:** `app.get()` is a method that handles all GET requests.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:** `/` is the name of the route. In this cause its the default route.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:** `req` is the entire request object from the client. It represents the body, headers and any query that my be passed.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:** `res` is the entire response that we create in our code when this certain route is being requested by the client. It represents the entire response in the callback function.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:** `next` is the continue action in the callback. It tells our code to continue with the response after the request is made.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:** Change `app.get` into `app.post`.

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:** Status code is a tiny bit of information that tells the client what happened to their request. We can change the status by typing in .status(STATUSCODE) after the res..

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

* **Your Answer:** `req.params` is the route parameters. You would need to change the path string, and the response to `req.params.username`

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

* **Your Answer:** Middleware is the code that runs before any route is met. Middleware can be used to do run authentication, validation or test.

---

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**`morgan` is to be able to log information about the type of requests that are coming in. `body-parser` gives us access to req.body. Morgan is only being run in dev because we don't want all the logs in production which could slow down response time.

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:** Without `body-parser` the code throws an error. The endpoint that we are requesting a POST requires the request body to be parsed.

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:** We are importing the `shortid` package which is a unique id generator. It is being used to create a uniqueid for each response that we get in a POST request.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:** `/vegetables` -GET, `/vegetables` -POST, and `/vegetables/:id` -GET

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:** `helpers.validate` is a middleware function that validates that the request body `name` and `price` are part of the POST request.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:** The data that I just created is gone because we did not save it to any database.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:** The first `app.use` is a middleware that handles request that do not meet an actual route. It returns an status code of 404 and a message that outputs the path that was requested. The second `app.use` is also an error handler that outputs the error message from the helpers.js file.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:** `standardjs` is a javascript code auto formatter. It can save my time cleaning out my code and keeping it consistent.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [body-parser](https://www.npmjs.com/package/body-parser)
