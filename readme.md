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
It is third party modules that are managed in repositories shouldn't not be checked in and managed.
---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**
nodemon - This will restart your server when changes occur to your code.

morgan - Logging middleware.  Log on request and not response incase there is a server issue.

express - rails to bootstrap and run a minimal web framework.

body-parser - middleware that parses JSON and converts to a string.
---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**
/ is mapped to the app but /notfound there is no app or anything listening.  No routes.
---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.
Ok.
---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**
I noticed it is powered by Express.

Headers are values that are passed in the response and also returned by the server.  It is data that is exchanged between the client and server.


X-Powered-By →Express
Content-Type →application/json; charset=utf-8
Content-Length →29
ETag →W/"1d-2xgNbPXoy9ff2kjMz+3OfvVkytU"
Date →Wed, 03 Jul 2019 01:46:02 GMT
Connection →keep-alive
---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?


* **Your Answer:**
- You can add any headers in the request in Postman under the Headers tab.

 - When we add the console.log component, then on node we see logging of the headers on the node instance.
---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**
Passing in as URL and then converting to an object value. This is more information about the request.

On Reddit, search parameters are query paramaters.  
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
Always, it is called every time.  It is just a general request for everything to go through.

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
app is the function that contains all of the methods we will use.  When you invoke express you get app.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**
app.get() defines a route for only GET requests.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**
This is the path of the request.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**
req = information about the request itself.
* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**
res - response object.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**
Forward request to the next route that matches.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**
The method we are listening for or using needs to change from app.get to app.post.


* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**
We can send response.status(401).json 
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

* **Question:** What is `req.params`? What else will you need to change if you change the path to `/my/name/is/:√≈`?

* **Your Answer:**
Route Parameters and not query parameters.  
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
Middleware sits between the client and server request.  It can help with logging, and debugging.
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
bodyparser gives you access to req.body in the form of an object.
morgan is a logging middleware to capture details from the request on the client / service side.  
morgan is only used in Dev for performance reasons.
---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**
Fails to parse in Postman.
---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**
shortid will generate a url safe ID for use in our application.


* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**
/vegtables /vegtables/:id

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**
This is a clean way to store helpers or functions you will call often to validate data across multiple places.  
It is required in the express app.js

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**
All gone, no persistent storage.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**
This is adding error handling to the application.  What is happening is we are specifically handling a 404 with a readable message.
Then, if the error is not a 404, we return the actuall message to the user. 

err is if an execption occured, we want to provide more context or a human readable error if possible to the user.
As a last resort we provide the actuall error message.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?
linter which is a way to makesure your code follows the correct syntax.  For example it might run but you have white space, trailing spaces, bad indents that all
can impact the size and performance.
* **Your Answer:**

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)