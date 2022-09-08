require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();


app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, resp, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, resp) => {
  //   resp.send("Hello Express");
  resp.sendFile(__dirname + "/views/index.html");
});
express.static(__dirname + "/public");

app.get("/json", (req, resp) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    resp.json({ message: "HELLO JSON" });
  } else {
    resp.json({ message: "Hello json" });
  }
});

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



module.exports = app;
