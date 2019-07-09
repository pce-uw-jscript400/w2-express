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

*  We dont need to add node_modules in our builds


- [ ] Take a look at the `package.json` file.

* **Question:** Take a minute to look through the installed packages and describe the purpose of each one. Don't just copy and paste from something online!

* **Your Answer:**

* The package.json file is used by npm to understand how to integrate your app with other add ons.  

- [ ] Try going to [http://localhost:5000/notfound](http://localhost:5000/notfound)

* **Question:** Why do we get a response when we go to `/` but not `/notfound`?

* **Your Answer:**

* The "main" in our package.json is set to index.js.  `/` will direct you to to the index.js.  If we had other pages setup in a router `/somepage` would direct you to that page.

- [ ] By default, browsers make `GET` requests when you go to a URL. Use [Postman](https://www.getpostman.com) to make a similar `GET` request.

---

- [ ] In Postman, go to the **Headers** tab _that is on the same level as the response Body._ These are headers that were returned by your server.

* **Question:** What are headers? What values do you recognize?

* **Your Answer:**

* Meta data regarding your app.  Shows mime, length of respons type, specifies the technologies used by web apps.

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make the request again.
  ```js
  console.log(req.headers)
  ```

* **Question:** Where can you find this `console.log()` statement? How can you change the headers that are sent in Postman?

* **Your Answer:**

* The headers were console.log-ed in the Terminal.  In Postman you can add new header keys.  The default are just the temporary headers provided by Postman.

- [ ] Add the following line **above** the `res.json()` line in your `app.js` file; then, make a request again but this time change the URL to the following: `http://localhost:5000?course=javascript`
  ```js
  console.log(req.query)
  ```

* **Question:** What are query parameters? Try going to a couple of your favorite websites and paste an example of query parameters being used.

* **Your Answer:**

* It appears to be a request sent to the app.js or your app.  So if you had in a function to accept the query passed you could program methods to search.  

- [ ] Before all of your routes, add the following:
  ```js
  app.use((req, res, next) => {
    console.log('In the server!')
    next()
  })
  ```

* **Question:** When does `app.use()` get called?

* **Your Answer:**

* When a get request is running.  It appears to be called before all other functions.  Top down.

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
* app is our application referenced in the app.js and shown in browser via index.js.

* **Question:** What type of thing is `app.get()` and what is its purpose?

* **Your Answer:**
* app.get() is attaching a method to the application that will do something based on a get request /route and the parameters specified associated to functions or other methods inside the app.get().

* **Question:** What type of thing is `/` and what is its purpose?

* **Your Answer:**
* Use the slash to specific the route.  So in a browser you would use /somename to specify a different app.get() with the specified route.

* **Question:** What type of thing is `req` and what does it represent in the callback?

* **Your Answer:**
* It is looking for a request.

* **Question:** What type of thing is `res` and what does it represent in the callback?

* **Your Answer:**
* It is looking for a response to the request

* **Question:** What type of thing is `next` and what does it represent in the callback?

* **Your Answer:**
* If after running the first get() move to the next get() function.

* **Question:** Instead of a `GET` request, lets say we want to listen in for a `POST` request. What do you think you needs to change?

* **Your Answer:**
* app.post()

* **Question:** Right now all of our requests will return a "Status Code" of 200. Define what a status code is and research how you could change it.

* **Your Answer:**
* Status codes appear to be information from express reflecting the status of a get request.  200 is OK

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
* req.params is the request parameter :name.  If you change thet get request parameter to :username you have to change the the response message to reflect the name of the parameter to ${req.params.username}.

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
* The middleware will run before a route. 

- [ ] Take a moment to read through the following code that is already in `app.js`. If you need, take a look at the [morgan](https://www.npmjs.com/package/morgan) and [body-parser](https://www.npmjs.com/package/body-parser) packages on NPM:
  ```js
  if (NODE_ENV === 'development') {
    app.use(require('morgan')('dev'))
  }
  app.use(require('body-parser').json())
  ```

* **Question:** Describe the purpose of both morgan and body-parser. Why do you think morgan is only being run when the application is run in development mode?

* **Your Answer:**
* If morgan is signed in he or she will have dev environment variable. The body-parser appears to set the environment variable to json().  Meaning it's parsing all data to json. 

- [ ] Update one of the `POST` routes you've created by adding the following code before the response is set. Then, try sending a request body using Postman to that route.
  ```js
  console.log(req.body)
  ```

* **Question:** Try commenting out `body-parser` in your application. What happens and why?

* **Your Answer:**
* Undefined:  We didn't require the body-parser so when we requested the body object from the post nothing was returned so body is undefined.

- [ ] Visit the [Exercise: Express](https://github.com/pce-uw-jscript400/exercise-express) repository on GitHub. Follow the setup instructions and open the code in a code editor. Then, answer the following questions:

* **Question:** Describe what is happening on the following line. What is the [shortid](https://www.npmjs.com/package/shortid) package and what is it being used for?
  ```js
  const { generate: generateId } = require('shortid')
  ```

* **Your Answer:**
* Creating a url friendly id that is short enough for a url character limit.

* **Question:** What routes are currently available to you as part of this application?

* **Your Answer:**
* vegetables and vegetables/:ids

* **Question:** Look for `helpers.validate` in the `app.js` file. What is this and how does it work?

* **Your Answer:**
* It appears to be a validation check for the two "required" inputs or responses of name and price.

* **Question:** Try creating a new vegetable. Then, try restarting your server. What happens to the data you posted and why?

* **Your Answer:**
I was having issues with getting anything to post to state.  But considering that it was a state if you refresh the server I would assume state would be saved.  

* **Question:** Take a look at the last two `app.use()` methods at the end of the file. Describe how both work and what `err` is refers to.

* **Your Answer:**
* If the request resulted in an error the message and status of the first app.use would be in the response of the second app.use.

* **Question:** Take a look at the `package.json` file. What is [standardjs](https://standardjs.com/) and what will it do for you?

* **Your Answer:**
* These are the formating standards for writing code so developers across the galaxy will understand and be able to read your code easier and faster.  
#### Resources

- [Postman](https://www.getpostman.com)
- [Express](https://expressjs.com/)
- [morgan](https://www.npmjs.com/package/morgan) 
- [body-parser](https://www.npmjs.com/package/body-parser)