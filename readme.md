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
To not push changes to the node modules - we don't need to push and save that info on Github and they will change a lot. Easy enough to run npm install to install these instead.
---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**
* nodemon: a package that restarts the server every time a code change is detected. 
* body-parser: middleware that parses the incoming body of a request to make it more manageable. A response is a large object containing many pieces of information about the request in addition to the actual body of requested information. body-parser is a middleware that extracts and parses the body to be passed to the client.
* express: Framework for setting up a node server
* morgan: A logging middleware. Helps adds logs for debugging express.

---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**
Because there is not a route specified for /notfound.
---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**
Headers are the meta-data about the request. I recognize Express(the server), content-type (json info), date of request, and connection (persist)
---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**
console.log() is printed in the terminal. You can add whatever headers you want to in Postman.
---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**
Query parameters are the values that are appended to a URL following a ?. 
https://www.etsy.com/search?explicit=1&q=woven+womens+top+sewing+pattern&ref=hp_suggested_search-3
https://www.livekindly.com/?s=brie
https://www.nytimes.com/search?query=comedy
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
When the application runs.
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
app is an express server and it's responsible for handling requests and providing responses to the html. Technically it is a function that's kinda like an object because it has a number of functions attached to it.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**
app.get() is a function that comes with express. It defines a route that makes a GET request

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**
/ is the path. The request (made from web application/Postman, etc) will include the path and which CRUD http request is being made. The server then looks for that path and GET (or other CRUD type) and if it finds it, executes that block of code.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**
req is the request object. 

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**
res is the response object. 

* **Question:** What type of thing is `next` and what does it represent in the callback?
next is a function that continues the flow of the request. It is the next available matching route. If the server has methods beyond the http requests, such as app.use, those will get invoked first and then the request is swallowed in that block of code. next allows for the app.use to be performed and call next() in its code block. This will continue the process of invoking the request and searching for the matching path provided in the request.

* **Your Answer:**

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**
app.get would change to app.post. Also, the request would require taking in some information to be posted.

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**
A status code provides information about the life of the request. 200 is means that the request was successful, the endpoint was reached and the response was returned. You can change a status by chaining .status("statusCodeHere") to the res

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
req.params is an object with the key of name set to the value of what is entered in the :name portion of the path. If :nam => :username, the message would change to `Hello ${req.params.username}!`

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
Middleware is the code/application/module that communicates between two systems, such as between servers and databases. The code above is different than a route because it is always run whenever the application gets to these lines. It is not looking for a matching route and CRUD operation, as a route is.
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
Morgan logs errors for the developer to be able to debug and provides insight into what actions are being called. These are different than error handling that is communicated with the user. Perhaps you do not want to expose the morgan logs to the user (perhaps for security reasons, maintaining a professional appearing web experience...), so these are only run in the development mode. Also, having morgan running in production will maybe slow the site because it iwill increase the size of the website.

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**
The response cannot be read because body-parser gives access to req.body. Without body-parser we would need to extract the body through writing more code. body-parser is a package that gives us that access out of the gate and simplifies the process.   

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**
* GET /vegetables
    * Will return a list of vegetables
* GET /vegetables/:id
    * Will return vegetable with a specified id
* POST /vegetables
    * Will add a vegetable to the vegetable array


* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**
* This is a callback method that is used in routes that require user input to ensure that the input is valid
* The helpers.validate function checks to see if the input is valid based on:
    * Status code
    * Contains required keys of name and price
    * Does not contain extra keys

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**

* The new vegetable is no longer there. Happened because the list of vegetables is not in a database, but an array that is attached to the instance of the server. At the top of app.js the vegetables variable is instantiated as an empty array, so we can push to that array and access the vegetables in an instance of the server. But, once we restart the server the array of vegetables begins as an empty array again.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**
*  The penultimate app.use with the 404 status exists to catch any request that did not match a route after checking with all of the routes defined in app.js. If this point is reached, this line of code calls next with the status of 404 and an error message about that problem. Next then calls the final app.use
* The final instance of app.use in this file receives the status code of 404 and the message and returns those pieces of information to the user.
* err is the object containing the status and the message passed as a parameter of next when called from the second to last app.use

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**
* This is a module that will enforce javascript style standards

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)