const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
// The first argument is the database filename. If no extension, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new JsonDB(new Config("myDataBase", true, false, "/"));
var currUser = ""; // username
var currRole = ""; //staff or client

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("get");
  var data = db.getData("/");
  res.send(data);
});

app.post("/stafflogin", (req, res) => {
  console.log("post");
  console.log(req.body.username);
  console.log(req.body.password);

  // check if username and password are correct
  var data = db.getData("/");
  for (const item in data.staff) {
    if (data.staff[item].username === req.body.username) {
      if (data.staff[item].password === req.body.password) {
        console.log("Login successful");
        res.send(true);
        currUser = req.body.username;
        currRole = "staff";
        return;
      }
    }
  }
  console.log("Invalid username or password");
  res.send(false);
});

app.post("/clientlogin", (req, res) => {
  console.log("post");
  console.log(req.body.email);
  console.log(req.body.password);

  // check if username and password are correct
  var data = db.getData("/");
  for (const item in data.client) {
    if (data.client[item].email === req.body.email) {
      if (data.client[item].password === req.body.password) {
        console.log("Login successful");
        res.send(true);
        currUser = req.body.email;
        currRole = "client";
        return;
      }
    }
  }
  console.log("Invalid username or password");
  res.send(false);

});

app.post("/newstaff", (req, res) => {
  console.log(req.body);
  db.push("/staff", [req.body], false);
  res.send("newstaff");
});

app.post("/newclient", (req, res) => {
  console.log(req.body);
  db.push("/client", [req.body], false);
  res.send("newclient");
});

app.post("/newflight", (req, res) => {
  console.log(req.body);
  db.push("/flight", [req.body], false);
  res.send("newflight");
});

app.post("/newairport", (req, res) => {
  console.log(req.body);
  db.push("/airport", [req.body], false);
  res.send("newairport");
});


app.post("/logout", (req, res) => {
  console.log("logout");
  currUser = "";
  currRole = "";
  console.log("currRole: " + currRole);
});

app.post("/staffcheck", (req, res) => {
  console.log(currRole);
  if (currRole == "staff") {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post("/clientcheck", (req, res) => {
  console.log(currRole);
  if (currRole == "client") {
    res.send(true);
  } else {
    res.send(false);
  }
});


app.listen(3001, () => console.log("Server is listening to port 3000"));
