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

* **Your Answer:** `node_modules/` is included in the `.gitignore` file so that our node modules do not get added to our repo/github. Adding all of them would be lots of unncessary revision tracking.

---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:** `body-parser` is a package for parsing requests before handlers. `express` is the server framework that will run our server. `morgan` is an HTTP request logger that simply logs requests. `nodemon` will automatically reboot the the server when it detects that files on the server have changed.

---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:** Because we haven't specified a  `/notfound` route for our server.

---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** Headers are a set of information about the response you are about to receive, this can include what kind of content it is, who sent the content to you, the charset of the content. In general a set of instructions for the content.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:** This `console.log()` statement is echoed in my terminal. You can change the headers in Postman by using the "headers" tab when you send your request.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:** query parameters are parameters passed to a request via a URL that can be packaged by Express

---

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:** `app.use()` gets called before any server request. Next is continue to the next route that matches.

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

* **Your Answer:** `app` is technically a function, but looks more like an object. It is the server application and its purpose is to handle all requests.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:** `app.get()` is a function that is a property of `app` and define a route for GET requests.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:** `/` is a string & route that when matched, will respond with the result.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:** `req` is an object and it represents the request from the client.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**  `res` is also an object and it represents the response from the server.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:** `next` is a function and it represents a continue statement or next command, essentially letting the server to move on to the next available route. Often this is used for middleware.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:** If listening for a `POST` request, we'd need to go from `app.get()` to `app.post()`. All sorts of request methods are available.

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:** A status code is a code that lets the client know the status of the response. Other common ones are 404 (moved/not found) or 500 (server error).

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

* **Your Answer:** req.params in an object that contains the parameters passed to the URL. `Hello, ${req.params.name}!` would need to become `Hello, ${req.params.username}!`

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

* **Your Answer:** Middleware is used for administration of the server, logging, authentication, all sorts of different use cases. Order does matter.

---

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:** Morgan is only on dev because the client will never see this when it's live, it's only useful for us when debugging.

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:** `body-parser` gives us access to req.body and allows us to parse it. Generally the body comes in as a string and does more of the leg work for us to make it easier.

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:** This line is setting a destructure constant object to shortid's generate function.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:** `/vegetables` and `/vegetables/:id` are currently available. `/vegetables` has both POST and GET.

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:** `helpers.validate` is a function we are importing from a `helpers.js` file that validates a request. It is middleware. It declares what requests should take.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:** The data is overwritten because there is no persistant state.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:** The first statement passes an object to the next function that includes a status and message, the second statement destructures that object and responds with it. Err is that created object and it refers to a general error. Since the last function has four parameters it's an error handler.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:** It's a javascript linter and it will tell you if you are writing code that is bad or against AirBnb's guidelines.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)