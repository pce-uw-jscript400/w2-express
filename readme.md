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
You don't want to track all the node modules in your repo. If someone wants to use your repo, they can run npm install to get all the modules. It makes for smaller packages/downloads.

---

- [x] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**
body-parser: Middleware that parses the body of an incoming request (available in req.body). It used to be part of Express and then it was separated into its own package but now it's back to being bundled with Express.

express: Express.js is a web application framework - a tool to build robust web/mobile applications

morgan: request logger middleware for node, logs all requests (as configured) from clients to a server. logs can be used for troubleshooting and/or stats

nodemon: watches and automatically restarts a node app when file changes are deteched (seems similar to browsersync)

---

- [x] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**
There isn't a route set up for /notfound. There's only one for /.

---

- [x] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [x] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**
headers are information about the request/response that are passed between client and server but not displayed to the end user (meta data)

I recognize:
X-Powered-By
Content-Security-Policy
Content-Type
Date

---

- [x] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**
The output from the console.log appears in the terminal window where you are running the server (npm run dev).

You can specify headers in Postman in the key/value section. If you click send again the key/value pairs show up in the console.log.

---

- [x] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**
Query paramaters allow you to only get back specific information you request.

https://www.goodreads.com/book/show/35791968-still-me?``from_choice=true``

https://twitter.com/search?``q=%23earthquake&src=trend_click&pt=1146844311302131712``

https://www.zillow.com/seattle-wa/new-homes/house,condo,townhouse_type/3-_beds/?``searchQueryState={%22pagination%22:{},%22mapBounds%22:{%22west%22:-122.91265133496091,%22east%22:-121.77693966503904,%22south%22:47.39050935930467,%22north%22:47.8348841285054},%22regionSelection%22:[{%22regionId%22:16037,%22regionType%22:6}],%22isMapVisible%22:true,%22filterState%22:{%22isForSaleByAgent%22:{%22value%22:false},%22isForSaleByOwner%22:{%22value%22:false},%22isForSaleForeclosure%22:{%22value%22:false},%22isComingSoon%22:{%22value%22:false},%22isAuction%22:{%22value%22:false},%22isPreMarketForeclosure%22:{%22value%22:false},%22isPreMarketPreForeclosure%22:{%22value%22:false},%22isMakeMeMove%22:{%22value%22:false},%22beds%22:{%22min%22:3},%22isManufactured%22:{%22value%22:false},%22isLotLand%22:{%22value%22:false},%22isMultiFamily%22:{%22value%22:false},%22price%22:{%22max%22:600000},%22monthlyPayment%22:{%22max%22:2283}},%22isListVisible%22:true}`` (that is a ridiculously complex example!)

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
At the start of the request before anything is returned. It is called every time.

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
app is an object. It invokes express and allows us to use methods like app.get() and app.use().

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**
It's a method. It defines a route and handles incoming get requests.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**
The path of the route, whether it is the root of the website or not, depending on where it is located.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**
req is an object to handle the request

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**
res is an object you can use for handling the response

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**
next sends the request to the next middleware/matching route in line. If you don't have a next middleware it just stops there. You can also not use next if there isn't a next middleware or matching route.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you need to change?

* **Your Answer:**
create a new method for app.post() 

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**
A status code represents the type of response from the server. There are a ton of status codes. e.g. 200 means it was successful (OK), 404 means not found, 301 is a permanent redirect (e.g. it moved), 302 means a temporary redirect/move etc. Generally, it tells the client whether the request was successful or not.

To change it you could specify res.status(200).json(); for OK (success). If you wanted to send a 404 message you could do res.status(404).json(); with a message.

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

req.params are the paramaters from the request. 

If you wanted to change to /my/name/is/:username, you woud also change: 

res.json({message: `Hello, ${req.params.username}!`})

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
Middleware is a piece of software that handles requests and processes them. It can pass a request to another piece of code, server, application, etc. or it can just do something (e.g. process the request). It is different from a route because routes match requests. Middleware will always run (as long as the program hasn't returned before it runs). If you put it at the top it will always run.

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
morgan is  a logger
body-parser parses the body of an incoming request.

You probably don't need logging (morgan) on a production environment. Or you're using something else

---

- [x] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**
The app returns undefined. body-parser gives you access to req.body so when we comment it out it no longer provides us access to it.

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**
shortid creates random, short ids. It's being used to an id for each item.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**
/vegetables
/vegetables/:id

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**
helpers.validate is a function that verifies the request before the post request is processed.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**
When you restart the server the new vegetable is gone because it's not being stored anywhere persistent, like a database or written to a file.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**
The first app.use sets up a 404 error message if none of the previous routes match.

The second app.use takes any error status/message from the app (either from the 404 above or another error if there is one elsewhere in the app) and returns it in a json message.

err refers to the error object.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**
standardjs is a tool that automatically formats your code and catches style & programmer errors. So it's a linter. It helps you to not make simple coding mistakes.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)