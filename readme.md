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

* **Your Answer:** Because we don't need git to keep track of all of the changes that are going on with any `node_modules` that we might have installed in our project.

---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:** We have only one `devDependency`, `nodemon`, which is a required package during development. Nodemon will track any changes that are done in our project and then hot reload or auto restart your server, so that you can see those changes. Eliminates the need to manually restart your server when developing. `dependencies` are only required at runtime. We have three packages listed there, `express`, `body-parser`, and `morgan`. These are frameworks that give us some things that may solve problems, give us the ability to create features, or maybe give us some styling and layout for an app.

---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:** Because we have not yet defined a path for the `/notfound` endpoint/route. `/` currently works, becuase we currently have the server setup to return a response `{"message":"Hello, Express!"}`.

---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:** Expresss is powering it, the `Content-Type` looks familiar, and the `Date` information.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers);
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:** You will find it in your terminal.

---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query);
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:** It's a way to define additional information when you make a `GET` request. They are often used to define or specify information in a request.

---

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log("In the server!");
    next();
  });
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:** `app.use()` is a general function for every request to go through and is called when it finds a match for a specified path.

---

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

* **Your Answer:** `app` is a middleware function. It's job is to parse incoming requests with JSON payloads and has many different methods on it, one of which is `.get()`.

- **Question:** What type of thing is `app.get()` and what is its purpose?

- **Your Answer:** `app.get()` it's a function and will return the HTTP request header. It will look to see if there is a match with the input.

- **Question:** What type of thing is `/` and what is its purpose?

- **Your Answer:** `/` is the root or index path/route. It's purpose is to return content that has been requested when `app.get()` has found a match for it.

- **Question:** What type of thing is `req` and what does it represent in the callback?

- **Your Answer:** `req` is an object representing the HTTP request.

- **Question:** What type of thing is `res` and what does it represent in the callback?

- **Your Answer:** `res` is an object and it represents the HTTP response that Express app sends.

- **Question:** What type of thing is `next` and what does it represent in the callback?

- **Your Answer:** `next()` is a callback function and tells the app to continue forward and will represent the next matching route.

- **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

- **Your Answer:** We can just swap out the `app.get()` to be `app.post()`.

- **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

- **Your Answer:** Status codes help convey whether or not a HTTP request was successfully completed. We can chain on the `status()` method like the following `res.status(418)`.

---

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

* **Your Answer:** `req.params` is an object and gives you access to any properties available on the named route. You would need to change any `params` based off of what you define, so for example:

```js
app.get("/my/name/is/:username", (req, res, next) => {
  console.log(req.params);
  res.json({
    message: `Hello, ${req.params.username}!`
  });
});
```

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
    console.log("In the server!");
    next();
  });
  ```

* **Question:** The above can be described as middleware. Describe what middleware is in your own words and how it differs from building a route.

* **Your Answer:** Middlewares are functions that give you the ability to access the HTTP request and response objects. It can also access any next middleware functions that are part of an Express app's request-response cycle. It differs from building a route by telling the app to perform certain tasks programmatically before/after it finds a matching route.

---

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === "development") {
    app.use(require("morgan")("dev"));
  }
  app.use(require("body-parser").json());
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:** `morgan` is a middleware that gives you the ability to create custom logging when developing your apps. `body-parser` is a middleware that gives you the ability to parse JSON data being submitted via HTTP `POST` request.

---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body);
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:** We get an error stating `Cannot destructure property 'content' of 'undefind' or 'null'`. This happens because `body-parser` gives us access to `req.body`. By commenting it out, `body-parser` doesn't know what to assume about the request coming in, in this example, a JSON object and so `content` comes back as `undefined`.

---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?

  ```js
  const { generate: generateId } = require("shortid");
  ```

* **Your Answer:** ShortId generates unique and short ids that are URL friendly and that's how we seem to be using it inside the app.

- **Question:** What routes are currently available to you as part of this application?

- **Your Answer:**

* `/vegetables`
* `/vegetables/:id`

- **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

- **Your Answer:** `helpers.validate` is a custom middleware that seems to be checking to make sure that the `req.body` contains valid information on the `POST` request. If the `req.body` is empty, it returns an error. If the `req.body` does not have all the required keys for `name` and `price`, then it will return an error. It also checks to make sure that there are no extra keys, in which case it returns an error.

- **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

- **Your Answer:** My data did not persist. This happened because as of now, it's just using the HTTP `POST` method to send data to a route and we are not using a database or a JSON file to store the contents that are being created.

- **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

- **Your Answer:** The first `app.use()` is a general purpse function that uses the `next()` middleware function to check for a valid route. It is using the `404 status code` which indicates the server was unable to find a matching route. It's also storing a template literal string in the message and inserting the type of HTTP method and pathame that it's receiving from the `request object`. The second `app.use()` is an error handler that is processing the `status` and the `message` off of the `response object` if there's an error. If there is, it uses destructuring, to unpack the values from `err` and stores them in `status` and `message`. These values are then used in `res.status()` and `res.json()` to store the status code and turns the `message` into a readable string.

- **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

- **Your Answer:** StandardJS gives us some power to be lazy and write clean code :) There's no setup or configuration, it automatically formats your code and helps enforce a consistent style for your JS code, which can help cut down on review time and any potential back-and-forth between engineering team members.

#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [body-parser](https://www.npmjs.com/package/body-parser)
