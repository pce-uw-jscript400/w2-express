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

## Because we don't need to keep tracking of files in node-modules folder since we can easily install them using npm install.

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**

## nodemon keeps monitoring the application files to find changes and then automatically restarts the server to apply those changes to the server.

## Express.js is a node.js framework which makes it easy to work with server side applications and takes care of lots of repetitive things for us.

## morgan provides logging

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**

## Because we have not specify a path to '/notfound'.

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**

## The response header contains the date, size and type of file that the server is sending back to the client and also data about the server itself.

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers);
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**

## console.log() statement can be find in the terminal.

## By adding new key:value under the headers tab in postman we can have custom information.

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query);
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**

## Query parameters are used to make our request more specific. In this case we send them as a key:value pairs.

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log("In the server!");
    next();
  });
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:**

## app.use() is a general function for every request to go through

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

* **Your Answer:**

## The type of 'app' is Object which has multiple function attached to it. node.js starts the Express.js and app is being used to start up our server

- **Question:** What type of thing is `app.get()` and what is its purpose?

- **Your Answer:**

## 'app.get' defines the route for the get request

- **Question:** What type of thing is `/` and what is its purpose?

- **Your Answer:**

## This is the pass represented by '/'.

- **Question:** What type of thing is `req` and what does it represent in the callback?

- **Your Answer:**

## 'req' is request that in our case we make it using postman

- **Question:** What type of thing is `res` and what does it represent in the callback?

- **Your Answer:**

## 'res' is the response object that we answer the request with.

- **Question:** What type of thing is `next` and what does it represent in the callback?

- **Your Answer:**

## 'next' is next available matching route.

- **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

- **Your Answer:**

## Just need change the 'app.get' to 'app.post'

- **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

- **Your Answer:**

## res.status(XXX).json({key:value})

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

## `req.params` is a rout parameters object.

## req.params.name needs to be chang to req.params.username.

## Basically whatever is after ':' need to be match with the req.params.\_\_\_.

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

##In middleware we can check all incoming request methods and also execute any code. but in route we are just looking for a specific url.

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === "development") {
    app.use(require("morgan")("dev"));
  }
  app.use(require("body-parser").json());
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**

## we use morgan to log servers responses on the console for development purpose and there is no need to show thoes logs to the user. also in the case of saving to the file if there are lots of request file can get really big.

## body-parser gets access to req.body. In body we can add some more information to our request and body-parser gives us easy access to it.

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body);
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**

## req.body is undefined. because now we don't have access to the body and if we want to have access to the body without using body-parser we need to write our own parser which requires some coding.

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?

  ```js
  const { generate: generateId } = require("shortid");
  ```

* **Your Answer:**

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**

## GET /vegetables

## GET /vegetables/:id

## POST /vegetables

- **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

- **Your Answer:**

## it is a callback method which checks the validity of the input by checking status code, required keys and also checks if it has unnecessary keys.

- **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

- **Your Answer:**

##

- **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

- **Your Answer:**

- **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

- **Your Answer:**

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [body-parser](https://www.npmjs.com/package/body-parser)
