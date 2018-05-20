
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use("/app", express.static(__dirname + "/app"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var router = require("./app/index.js")(app);

app.use(function(err, req, res, next) {
   res.status(err.status || 500);
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});