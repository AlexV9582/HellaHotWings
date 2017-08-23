var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = require("./app.js")

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var tables = [];
var waitList = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

app.post("/api/new", function(req, res) {
    var newreservation = req.body;
    if (tables.length >= 5) {
        waitList.push(newreservation)
    }else {
        tables.push(newreservation)
    }
    res.redirect("/tables");
})

app.get("/api/waitList", function(req, res) {
    res.json(waitList);
})

app.get("/api/tables", function(req, res) {
    res.json(tables);
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });