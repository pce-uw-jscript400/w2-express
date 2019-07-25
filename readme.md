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

- [X] Take a look at the `.gitignore` file.

* **Question:** Why do you think `node_modules/` is included in there?

* **Your Answer:** It's because we don't want to push all the node modules to github.  We can just install it with npm install.  We also don't need to track changes of the modules.

---

- [X] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:** Dependencies are used in the production build 
* body-parser [reads the request body to make it available to the back-end app]
* express [fast web framework for node to create and manage servers] 
* morgan [it will console log incoming requests, metadata, and errors]
* Dev dependencies are only used in dev (i.e. nodemon, which auto restarts node when directory files change)
* nodemon [dev ]

---

- [x] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:** There's a get request response for only the index file. We have not defined the /notfound route anywhere in the app.

---

- [X] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [X] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** it is metadata on the server request. it mentions x-powered-by, which identifies Express as the server host platform type. Date and content length are self explnatory. content-type mentions application, type, and charset

---

- [X] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:** you may find it in the terminal. you can change it by modifying req.headers, which can be done in Postman.

---

- [X] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:** query parameters are search strings input into a url by a user client. 
* https://hn.algolia.com/?query=topic&sort=byPopularity&prefix&page=0&dateRange=all&type=story this site uses query parameters such as sort, page #, date range, and link/article type

---

- [X] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:** it gets called right when the client app makes a connection with the server before any routes are checked.  This code is called by default to log when the client reaches the server.

---

- [X] Take a moment to observe the basic structure of a **route** in Express.
  ```js
  app.get('/', (req, res, next) => {
    console.log(req.query)
    res.json({
      message: 'Hello, Express!'
    })
  })
  ```

* **Question:** What type of thing is `app` and what is its purpose?

* **Your Answer:** app is an express function. but in totality it's an application that serves as a server to handle incoming url requests.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:** it is an object method to define a route that is a GET request. A get request asks for a response for information.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:** it is the path. it's purpose is to define home and sub URLs . this route is usually the default path or base URL.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:** It is the server request. it is the call to the server from the client. It contains the body, headers and query of the client's call.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:** response from the server to the client. it is the answer from the server to the client's request.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:** it will look for the next query match in app.get path. it is an object method. It will continue the response.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:** change app.get to app.post. it could also use a message or content to be defined 

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:** status code is issued by server in response to a client's requrest made to a server. you can change it, for example, by missing a required query string (400)

---

- [X] Add the following route to your application; then, make a request again but this time change the URL to the following, making sure to replace `<your-name` with your acutal name: `http://localhost:5000/my/name/is/<your-name>`.
  ```js
  app.get('/my/name/is/:name', (req, res, next) => {
    console.log(req.params)
    res.json({
      message: `Hello, ${req.params.name}!`
    })
  })
  ```

* **Question:** What is `req.params`? What else will you need to change if you change the path to `/my/name/is/:username`?

* **Your Answer:** these are the query parameters used in the queries url string. You will need to change the response to utilize req.params. You can change the ':username' part of the parth.

---

- [X] Create three new routes as follows, testing each one as you go:
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

- [X] Earlier we added the following code. Try moving it between two routes you just created and test each route.
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** The above can be described as middleware. Describe what middleware is in your own words and how it differs from building a route.

* **Your Answer:** It runs between and before routes, aka in the middle of routes. It is not a route, but does something with the app

---

- [X] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**
* morgan is an http request logger middleware for node.js that uses format and options. it is only ran in dev mode because we dont need to log anything for production build

* body-parser is a node middleware that parses incoming requests in  before handlers for node, and you may use req.body to utilize it. it is important because it reads a client input and stores it as jscript  object, making it readible

---

- [X] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:** it returns undefined instead of an empty object because the application cannot read the request body.

---

- [] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:** ShortId makes short, varied, url appropriate unique ids. It is very useful for for url shorteners( such as MongoDB and Redis), IDs, and any other id users might see.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:** GET vegetables,  GET vegetables {id, single vegetable}, POST vegetables {single vegetable}

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:** it is a middleware that makes sure the full set of keys, name and price, are being included in the request.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:** It gets erased because the data gets erased when the client restarts. It is not saved in any database

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:** 
* The 2nd to last 'app.use()' provides an error to a 404 error where the query path is not found among the listed routes. 
* The last 'app.use()' stores the error message and returns it to the client as a response. It should use the 404 'app.use()' function from directly above.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:** It will create a standard style for writing and linting. It will automatically format code for formatting/styling errors or mistakes. 

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)