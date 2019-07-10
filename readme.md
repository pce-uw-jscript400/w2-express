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

--- You don't need to push `node_modules/` to the repo, as these modules can easily be re-installed using `npm install` command.

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**

---body-parser, express, morgan, nodemon. `nodemon` is a package which will restart an application when files changes in directory are detected. This helps developers see changes made in dev environment reflected in the project/application immediately. `express` is a framework which works like a pipeline... request comes in, runs code, finds response, ends.
`morgan` is a package which logs out information about the request, then calls next(); `body-parser` allows access to request body, allows application to consume this content successfully.

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**

--- The `/` describes an exact route. Code has been written to handle responding to a request to that route. There has not however been any such code for a response written for the `notfound` route.

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**

---Headers are metadata the client can use to understand the server and data it is interacting with. content type, content length describe the format/type of the data coming back in response, and its length, for example. Other information like timestamp, unique id, etc help to identify details about the the specific instance of the response.

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**

---the headers have been logged to the terminal. you can add additional header key/value pairs in the headers tab of the request detail and then submitting a new request.

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**

---query parameters can be used to inform on additional They are extensions of the URL that are used to help define specific content or actions based on the data being passed

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:**

---  Responding to a defined target path agnostic of the HTTP verb, `App.use()`will mount/bind a middleware to an application at the specificed path.

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

--- `App` is a function. In this case, `app` is the Express application itself, which has a number of methods and/or properties which can be used for routing incoming requests, etc.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**

---`app.get()` is a method and depending on the arguments provided, can either return the value of a referenced app setting i.e. `app.get(name)`, or can route an HTTP GET request to a specified path with a specified callback function i.e. `app.get(path, callback[, callback ..])`. In the context of the above example, `app.get()` is used to route an HTTP GET request.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**

--- `/` refers to a path, it is of string type

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**

--- `req` is an object,  represents the incoming request

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**

-- `res` is an object, represents the outgoing response

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**

--- `next` is a function, refers to the next available matching route

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**

--- you would use `app.post()` instead of `app.get()`

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**

---Status codes are used in response to an incoming request to notify the requesting client some context/detail about the receipt of that request. Common examples include 200, 404, 500 errors. You can use `res.status(code)` within the `app.HTTPVerb()` method to define what status code should be returned.

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

---`req.params` outputs an object containing the route/url parameters. You would use `${req.params.username}` instead of `${req.params.name}` when changing the path to `/my/name/is/:username`.

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

---Middleware functions allow an application to execute any code, react to various HTTP methods and modify request/response objects, call the next middleware function, etc.  The `app.use()` example above is a middleware function with no mount path. If 'building a route' refers to use of the `router.use` and `router.method` functions, the only difference is that these functions are bound specifically to `express.Router()`. 

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**

---`morgan` - logs out information about the request, then calls `next()`; morgan's function does not seem appropriate for a production environment, logging the HTTP request detail for each request recieved. this might lead to performance issues as well. 

---`body-parser` - grants access to body property of the request. `body-parser` can parse multiple content types;

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**

--- An error is returned as the application is unable to destructure the body property of the request.

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**

---`shortid` is a package which creates short, non-sequential unique ids. in the example above, we are declaring a variable `generateID` and assigning the `generate()` method from the `shortid` package to it.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**

---the routes `/vegetables` and `/vegatables/:id` are currently available.

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**

--- `helpers.validate` is a method for validating the request body is correct and determining whether to proceed to next step or throw an error.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**

--- The `generateID()` function produces a new ID for the vegetable. I think this is because the application itself has restarted and the previous data is no longer retained. But i am not certain.

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**

--- The first `app.use()` example is used when there is no HTTP Method and path matched for the incoming request. Its a generic not found error returned in response, identifying the method/path of the request.

--- The seocnd `app.use()` example is for error handling. the `err` argument helps to identify this. If a particular function such as `app.put()` for example encounters an error and produces a message and response code, these can be passed to this function using `next();`

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**

--- My impression is that `standardjs` is a package used to maintain consistent style and format of my code, a linting utility. Makes it more consumable for myself and others when needing to read, update, etc. the code within a given configuration file.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)