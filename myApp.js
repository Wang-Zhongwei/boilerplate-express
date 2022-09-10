require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();
const port = process.env.PORT || 3000;

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false })); // enable body parsing
// Root-level middleware: Remember to call next to let request pass to next middleware or request gets stuck in the pipeline
app.use((req, resp, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, resp) => {
  //   resp.send("Hello Express");
  resp.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, resp) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    resp.json({ message: "HELLO JSON" });
  } else {
    resp.json({ message: "Hello json" });
  }
});

// middleware demo: app.METHOD(path, middlewareFunction1, middlewareFunction2, ...)
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", (req, resp) => {
  resp.json({ echo: req.params.word });
});

app.get("/name", (req, resp) => {
    resp.json({name: req.query.first + " " + req.query.last})
});

app.post("/name", (req, resp) => {
    resp.json({name: req.body.first + " " + req.body.last})
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
