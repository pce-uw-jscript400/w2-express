// process.env is our local environment. We're declaring two
// new variables, NODE_ENV and PORT. These variables are getting
// destructured from process.env. If the variables are not
// defined, go ahead and give them the following default
// values.
const { NODE_ENV = "development", PORT = 5000 } = process.env;
// Assign the express framework to the variable express
const express = require("express");
// When we invoke express, we get a new applicat. That application
// has lots of methods we will need to use, such as app.use and app.get
const app = express();

if (NODE_ENV === "development") app.use(require("morgan")("dev"));
app.use(require("body-parser").json());

app.use((req, res, next) => {
  console.log("In the server!");
  next();
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

app.get("/ping", (req, res, next) => {
  res.status(200).json({
    message: "pong"
  });
});

app.post("/message", (req, res, next) => {
  const message = "Message received!";
  const { content } = req.query;
  res.status(201).json({
    message,
    content
  });
});

app.delete("/messages/:id", (req, res, next) => {
  const { id } = req.params;
  const message = `Delete message ${id}`;
  res.status(200).json({
    message
  });
});

app.get("/", (req, res, next) => {
  console.log(req.headers);
  console.log(req.query);
  res.json({
    message: "Hello, Express!"
  });
});

// Create a function called listener that, when invoked,
// will print out the following statement that includes
// the PORT.
const listener = () => console.log(`Listening on Port ${PORT}`);
// Tells the app to listen on this specified PORT, and when it's
// ready, it will fire the listener.
app.listen(PORT, listener);
