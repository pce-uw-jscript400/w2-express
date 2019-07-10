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

* **Your Answer:**

There are many libraries and files, and these npm modules should be separately installed by users if needed via npm install.

---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**

Relevant lines:

```
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.16.4",
    "morgan": "^1.9.1"
  },
  "devDependencies": {
    "nodemon": "^1.19.1"
  }
```

dependencies:

* body-parser - 

* express - A minimalist web server framework that runs on node.js.  Comparable to Angular, Rails, Bootstrap frameworks.  Takes care of the typical plumbing for you.

* morgan - Logger middleware for node.js.


devDependencies: These packages are required only during the development phase:

* nodemon - a monitor script for use during node.js development. Restarts the server automatically when changes are detected, so you don't have to remember to do these steps.


---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**

/notfound shows:

Cannot GET /notfound

There's no "/notfound" route defined; `app.js` doesn't have path to that endpoint:

`app.get('/notfound', (req, res, next) => {`


---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**


notes:

GET http://localhost:5000/ returns:

{
    "message": "Hello, Express!"
}

Headers show metadata about the request.

In Postman, the Headers tab lists these headers:
* X-Powered-By →Express (the server type)
* Content-Type →application/json; charset=utf-8 (json is the data format returned; the server is configured to respond using this format. charset is the character set used for the response.)
* Content-Length →29 (the length of the response)
* ETag →W/"1d-2xgNbPXoy9ff2kjMz+3OfvVkytU"
* Date →Wed, 03 Jul 2019 01:46:24 GMT (the date and time of the response)
* Connection →keep-alive


---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**

console.log outputs to the terminal, not the browser.

Output in terminal:
{
  host: 'localhost:5000',
  connection: 'keep-alive',
  pragma: 'no-cache',
  'cache-control': 'no-cache',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 ' +
    'Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9'
}

To change the headers, in Postman, click Headers tab, then in Headers section, under key, type the header name, and to the right, the value.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**

Converts what gets passed in after the URL, to a JS object.

Syntax: `?key=value&nextKey=nextValue`

The query parameter is information about a request.  Here we are just printing out the query parameter key and value.

The response at the terminal is: `{ course: 'javascript' }`, after the previous log output:
```
{
  host: 'localhost:5000',
  connection: 'keep-alive',
  pragma: 'no-cache',
  'cache-control': 'no-cache',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 ' +
    'Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9'
}
{ course: 'javascript' }
GET /?course=javascript 200 4.424 ms - 29
```

---

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:**

It gets called every time there's a request to the server.

Output: (see 1st or 2nd line)

```Listening on Port 5000
In the server!
{
  host: 'localhost:5000',
  connection: 'keep-alive',
  pragma: 'no-cache',
  'cache-control': 'no-cache',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 ' +
    'Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9'
}
{}
```

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

* **Your Answer:**

we're using node to run an express server.
app is used to start up the server.

typeof shows that `app` is a function (it happens to be an EventEmitter).
The `app` function has various functions, mostly for creating routes.

`app` initializes the node.js server.


* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**

`app.get()` defines a route for a GET request.
When the path / is specified in the URL, this is a GET request for this route.


* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**

/ is a path defining the home route.
When the path / is specified in the URL, possibly by default, this is a request.
The route for the first matching path in app.js is used.


* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**

req is an object, the request.  It's information about the request.
It can contain query parameters.


* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**

`res` is the response object; the response from the server.  


* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**

`next` calls or represents the next available matching route;
`next` is a function that continues processing with the next middleware found in the file.


* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**

It's a different verb.  It tells the server to change data.

In the route, instead of `app.get(function...)`, use `app.post(function...)`


* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**

A status code is a small amount of information about how the request went, such as success or failure and a brief failure reason.

You can change from the default code of 200 by adding a status(status-code) call on the response:

```
app.get('/pizza', (req, res) => {
  res.status(418).json({
    message: 'Mmmm pizza'
  })
})
```

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

* **Your Answer:**

`req.params` is the route parameters value in the URL request.

Also change __
"message: `Hello, ${req.params.name}!`"
to
"message: `Hello, ${req.params.username}!`"

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

* **Your Answer:**

Middleware is not run if a route above it matches.

It could be at the top of the server pipeline, eg for logging.  Authentication could be used for only certain routes, if use is put in-between routes.

---

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**

morgan logs to the terminal, information such as 
`GET /pizza 200 2.482 ms`.
The client won't see the terminal, so streamline the code.

body-parser gives you access to `req.body`, as an object; it defines additional info that can be sent in a request, such as in a post or put.  For example, if posting to a server to make a purchase, it could be what products and quantity. 

Request bodies are buffered as a stream; we'd have to manually join the info. body-parser makes this easier than that manual approach.

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**

The line references generateId from the shortid module.  generateId will be the unique ID.

The shortid package generates short non-sequential url-friendly unique ids.


* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**

These routes are currently available:

```
app.get('/vegetables', (req, res, next) => {
app.get('/vegetables/:id', (req, res, next) => {
app.post('/vegetables', helpers.validate, (req, res, next) => {
```


* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**

helpers.validate() is an imported function:
`const helpers = require('./src/helpers')`

```
const validate = (req, res, next) => {
  const error = { status: 400, message: 'Bad request' }
  if (!req.body) next(error)

  const hasAllKeys = REQUIRED_KEYS.every(key => req.body[key])
  if (!hasAllKeys) next(error)

  const noExtraKeys = Object.keys(req.body).every(key => REQUIRED_KEYS.includes(key))
  if (!noExtraKeys) next(error)

  next()
}
```

If there's no request body, or
if there's not all the required keys, or
if there are no extra keys, 
this function goes to the next error handler in the pipeline.


* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**

To create a new vegetable, in Postman, select POST, and then define a Body.




* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**



* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**



#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)