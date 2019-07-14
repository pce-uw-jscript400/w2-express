# Building Servers with Express

By the end of this lesson, you should be able to build a simple server with the [Express](https://expressjs.com/) framework for Node.js.

## Core Learning Objective

- Create an application server using NodeJS and Express

## Sub-Objectives

- Create an Express server that listens on a specified port
- Make requests to that server using [Postman](https://www.getpostman.com)
- Create routes using different paths and HTTP verbs
- Identify and build middleware
- Parse information sent in the request body

### Installation

1. Fork & Clone
1. `npm install`
1. `npm run dev`

Then, go to [http://localhost:5000/](http://localhost:5000) and you should see a message.

### Instructions & Guiding Questions

- [ ] Take a look at the `.gitignore` file.

* **Question:** Why do you think `node_modules/` is included in there?

* **Your Answer:**

---We dont have to track node_modules by git. It can be installed by npm install. So it is included in git ignore.

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**

---dependencies contains the packages on which the appilcation is built on. dev-dependencies are packages that are used for development but not necessary for the
project
nodemon - monitors for changes in source and restarts the server automatically - useful in development
express - web framework for node.js
body-parser - body parsing middleware - The bodyParser object exposes various factories to create middlewares. All middlewares will populate the req.body property with the parsed body when the Content-Type request header matches the type option, or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
morgan - Logging middleware for node.js http apps.

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**

---/notfound enpoint doesnt exist - so the we get the error
get / returns the response from app.js - which is the message dsiplayed

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---done

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**

---X-Powered by - tells on which application was built - here Express
Content type and length - represents type and length of message body in the response

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers);
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**

---console.log() is displayed on the terminal.
parameters could be sent through req.headers object -> changes the headers in postman

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query);
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**

---{ course: 'javascript' } ->query parameters

Query parameters are optional key-value pairs that appear to the right of the ? in a URL.

Example:
?module_item_id=9525216

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log("In the server!");
    next();
  });
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:**

---Everytime a request is sent to the server app.use is called

- [ ] Take a moment to observe the basic structure of a **route** in Express.
  ```js
  app.get("/", (req, res, next) => {
    console.log(req.query);
    res.json({
      message: "Hello, Express!"
    });
  });
  ```

* **Question:** What type of thing is `app` and what is its purpose?

* **Your Answer:**a function - instance of express on which methods are invoked

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**finds a route for the GET request

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**this represents the path for a request - string type

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**Request - object type

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**Response - object type

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:** represent the next matching route - function

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**invoke the post method on app

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**

---By default status is returned as 200. response.status('status code') can be used to change the default status code.

- [ ] Add the following route to your application; then, make a request again but this time change the URL to the following, making sure to replace `<your-name` with your acutal name: `http://localhost:5000/my/name/is/<your-name>`.
  ```js
  app.get("/my/name/is/:name", (req, res, next) => {
    console.log(req.params);
    res.json({
      message: `Hello, ${req.params.name}!`
    });
  });
  ```

* **Question:** What is `req.params`? What else will you need to change if you change the path to `/my/name/is/:username`?

* **Your Answer:**

---Query params - req.params
We need to change message: `Hello, \${req.params.username}`

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
    console.log("In the server!");
    next();
  });
  ```

* **Question:** The above can be described as middleware. Describe what middleware is in your own words and how it differs from building a route.

* **Your Answer:**

---Middleware acts as a connection between two systems to carry data/communication between the systems.This function sends messages when the control moves from one route to other

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === "development") {
    app.use(require("morgan")("dev"));
  }
  app.use(require("body-parser").json());
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**

---morgan - HTTP request logger middleware for node.js
body-parser - Node.js body parsing middleware.

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body);
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**

---req.body is undefined when body-parser is disbaled - the request body streamed is parsed as json and sent over the request.

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?

  ```js
  const { generate: generateId } = require("shortid");
  ```

* **Your Answer:**generate unique id for a record

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**get, post, put, delete

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**validate request body is correct, has all keys and no extra keys and moves to the next step

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**The vegetable record created was not stored in database - so it doesnot show up when we restart the server

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**app.use method acts as error handlers. First method does nto receive the error in parameter - so it throws a generic error message. The second function gets the error in argument and the error message could be customized based on the type of erro being passed. next() function is invoked when something fails and this calls the use() method.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**catches style issues and programmer errors - automatically formats code

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [body-parser](https://www.npmjs.com/package/body-parser)
