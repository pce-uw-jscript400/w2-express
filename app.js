//process.env - local environment - declaring 2 variables - node env and port
//destructured from process.env
// if not defined, the following default values are given
const { NODE_ENV = "development", PORT = 5000 } = process.env;
//assign express framework to variable express
const express = require("express");
//when we invoke express, we get a new appliaction - that has lots of methods
// like app.use and app.get
const app = express();

if (NODE_ENV === "development") app.use(require("morgan")("dev"));
// app.use(require("body-parser").json());

app.get("/", (req, res, next) => {
  console.log(req.headers);
  console.log(req.query);
  res.json({
    message: "Hello, Express!"
  });
});

app.get("/my/name/is/:name", (req, res, next) => {
  console.log(req.params);
  res.json({
    message: `Hello, ${req.params.name}!`
  });
});

app.get("/ping", (req, res, next) => {
  res.status(200).json({
    message: `pong`
  });
});
//Application level middleware
app.use((req, res, next) => {
  console.log("In the server!");
  next();
});

app.post("/message", (req, res, next) => {
  const { content } = req.query;
  const message = "Message received!";
  console.log(req.body);
  res.status(201).json({ message, content });
});

app.delete("/messages/:id", (req, res, next) => {
  const status = 200;
  const { id } = req.params;
  const message = "Deleted message ${id}";
  res.status(status).json({ message });
});
//create a function called listener that, when invoked will print following statement
// that includes port
const listener = () => console.log(`Listening on Port ${PORT}`);

//our app is goign to listen on the specified port and when ready fires the listener
app.listen(PORT, listener);
