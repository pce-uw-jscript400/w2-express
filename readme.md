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
It's not necessary/a good idea to track changes in that directory.
---

- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**
Bodyparser: handles incoming request streams using a number of built-in methods.
Express: 
Morgan: provides tools to handle and organize http logs.
---

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**
The notfound route isn't defined yet.
---

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**
Headers are a set of key-value pairs sent along with the request response. A GET request to localhost:5000 returns
    X-Powered-By →Express
    Content-Type →application/json; charset=utf-8
    Content-Length →29
    ETag →W/"1d-2xgNbPXoy9ff2kjMz+3OfvVkytU"
    Date →Tue, 09 Jul 2019 00:14:45 GMT
    Connection →keep-alive

Content-Type specifies the MIME type and character encoding.
---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**
The headers are shown within the Postman console.
To add or edit headers, click the Headers tab just below the URL field and add/modify the headers there.
---

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**
Query params are additional key-value pairs passed along with a URL. 
https://www.airbnb.com/s/all?toddlers=0&place_id=NA&query=North%20America&search_type=section_navigation&refinement_paths%5B%5D=%2Ffor_you
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
Immediately after the server (re)starts and outputs the Listening on Port xxxx message.
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
A nodejs module that initially runs the express server

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**
Defines a route and sends a get request.

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**
Represents the path requested by the get request.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**
The request sent to the server.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**
The response object.

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**
The next available matching route.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**
Use app.post instead.

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**
A status code gives information about the success or failure of the request. Use response.status(###).json({...}) to send 
a specific status code.
---

- [ ] Add the following route to your application; then, make a request again but this time change the URL to the following, making sure to replace `<your-name` with your acutal name: `http://localhost:5000/my/name/is/<your-name>`.
  ```js
  app.get('/my/name/is/:username/:age', (req, res, next) => {
    console.log(req.params)
    res.json({
        console.log(req.params);
        message: `Hello, ${req.params.username}`;
    })
  })
  ```

* **Question:** What is `req.params`? What else will you need to change if you change the path to `/my/name/is/:username`?

* **Your Answer:**
Req.params is an object containing parameters. I would have to change :name to :username and modify the message output.
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
Middleware is a type of software that connects two or more systems together. For example, 

Middleware is different from an API because

A route specifies how the server should handle certain requests. 
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
TODO
---

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**
With body-parser loaded, the server has easier access to the contents of the request body (in this case, an empty object) and can output them.
---

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**
It is used to generate unguessable ids - for example, the ones used in this week's exercise.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**
/vegetables, /fruits


* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**
It checks that the request isn't getting a 400 error, and that it contains all the keys it's supposed to and none it doesn't.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**


* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**
Standardjs enforces a javascript coding style, reducing inconsistencies within code with multiple contributors.


#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)
