// process.env is our local environment. We're declaring two
// new variables, NODE_ENV and PORT. These variables are getting
// destructured from process.env. If the variables are not
// defined, go ahead and give them the following default
// values.
const { NODE_ENV = "development", PORT = 5000 } = process.env;
// Assign the express framework to the variable express
const express = require("express");
// When we invoke express, we get a new application. That application
// has lots of methods we will need to use, such as app.use and app.get
const app = express();

if (NODE_ENV === "development") app.use(require("morgan")("dev"));
app.use(require("body-parser").json());

app.get("/", (req, res, next) => {
  res.json({
    message: "Hello, Express!"
  });
});

// GET / ping
//   -> Status Code: 200
//   -> Response Body: { message: 'pong' }

app.get("/ping", (req, res, next) => {
  const status = 200;
  res.status(status).json({ message: "pong" });
});

// POST / message ? content = hello
//   -> Status Code: 201
//   -> Response Body: { message: 'Message received!', content: 'hello' }

// Application-level middleware
app.use((req, res, next) => {
  console.log("In the server!");
  next();
});

app.post("/message", (req, res, next) => {
  const status = 201;
  const message = "Message received!";
  console.log(req.body);
  const { content } = req.body;

  res.status(status).json({ message, content });
});

// DELETE / messages / 4
//   -> Status Code: 200
//   -> Response Body: { message: 'Deleted message 4' }
app.delete("/messages/:id", (req, res, next) => {
  const status = 200;
  const { id } = req.params;
  const message = `Deleted message ${id}`;

  res.status(status).json({ message });
});

app.get("/pizza", (request, response, next) => {
  if (request.query.secret === "SECRETPASSCODE") {
    response.status(200).json({
      message: "Mmmm pizza"
    });
  } else {
    response.status(401).json({
      message: "No pizza for you"
    });
  }
});

app.get("/my/name/is/:name", (req, res, next) => {
  console.log(req.params);
  res.json({
    message: `Hello, ${req.params.name}!`
  });
});

// Create a function called listener that, when invoked,
// will print out the following statement that includes
// the PORT.
const listener = () => console.log(`Listening on Port ${PORT}`);
// Our app is going to listen on the specified PORT, and when it's
// ready, it will fire the listener
app.listen(PORT, listener);
