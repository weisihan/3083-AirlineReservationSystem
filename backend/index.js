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
var currComp = ""; // staff's company

// var mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 8889,
//   user: "root",
//   password: "root",
//   database: "airlineReservation",
//   connectionLimit: 30,
// });

var db = new JsonDB(new Config("myDataBase", true, false, "/"));
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
app.post("/displayFlight", (req, res) => {
  let data = db.getData("/");
  res.send(data.flight);
});
app.post("/cancelFlight", (req, res) => {
  console.log("back");
  let data = db.getData("/");
  let now = new Date().toLocaleDateString();
  let flag = 0;
  console.log("now", now);
  for (let i = 0; i < data.flight.length; i++) {
    if (data.flight[i].flightnum == req.body.cancel) {
      console.log("firststep");
      let dateNum = data.flight[i].departureDate.split("-");
      console.log("time", dateNum);
      let nowNum = now.split("/");
      console.log("now", nowNum);
      if (nowNum[2] == dateNum[0]) {
        console.log(nowNum[2]);
        console.log(dateNum[0]);
        if (nowNum[0] == dateNum[1]) {
          if (nowNum[1] - dateNum[2] <= 1 || dateNum[2] - nowNum[1] <= 1) {
            flag = 1;
          }
        }
      }
      // if(data.flight[i].departureDate)
      if (flag != 1) {
        console.log("work");
        for (
          let tmpItem = 0;
          tmpItem < data.flight[i].passenger.length;
          tmpItem++
        ) {
          // console.log("tmpEmail",data.data.client[j].email);
          if (data.flight[i].passenger[tmpItem] == req.body.email) {
            console.log("delete flgiht", data.flight[i]);
            // db.delete("/flight", data.flight[i].passenger[tmpItem]);
            // db.delete("/review", [req.body]);
            res.send("success");
            console.log("cancel done");
          }
        }
      }
    }
  }
  res.send("fail");
  console.log("cancelflight", req.body);
  // for (const item in data.ticket) {
  //   console.log("dataemail",data.ticket[item].userEmail);
  //   console.log("reqemail",req.body.email);
  //   if(data.ticket[item].userEmail == req.body.email){
  //     console.log(2);
  //     if(data.ticket[item].flightNum == req.body.cancel){
  //       console.log(3);
  //       db.delete("/review", [req.body]);
  //       res.send("success");
  //       console.log("review done");
  //     }
  //   }
  // }
  // console.log("cancel fail");
  // res.send("fail");
  // console.log("cancelflight",req.body);
});
app.post("/clientFlightBack", (req, res) => {
  console.log("finally worked");
  res.send(currUser);
  // var data = db.getData("/");
  // for (const item in data.client) {
  //   if (data.client[item].email === req.body.email) {
  //     if (data.client[item].password === req.body.password) {
  //       console.log("olivia successful");
  //       res.send(data.client[item].email);
  //     }
  //   }
  // }
});
app.post("/clientSearchFlight", (req, res) => {
  console.log("flight backend search");
  let data = db.getData("/");
  let dataArray = [];
  console.log("reqbody", req.body);
  for (const item in data.flight) {
    if (data.flight[item].departairport === req.body.sourcecity) {
      console.log("1connected");
      if (data.flight[item].arriveairport === req.body.descity) {
        console.log("descity match");
        if (data.flight[item].departureDate === req.body.depdate) {
          console.log("depdate match");
          if (data.flight[item].arrivalDate === req.body.arrivedate) {
            console.log("connected");
            console.log(data.flight[item].arriveairport);
            dataArray.push(data.flight[item]);
          }
        }
      }
    }
  }
  res.send(dataArray);
});
app.post("/clientReviewBack", (req, res) => {
  let data = db.getData("/");
  console.log("reviewbody", req.body);
  for (const item in data.ticket) {
    // console.log("dataemail",data.ticket[item].userEmail);
    // console.log("reqemail",req.body.);
    if (data.ticket[item].userEmail == req.body.userEmail) {
      console.log(2);
      if (data.ticket[item].flightNum == req.body.flightNum) {
        console.log(3);
        db.push("/review", [req.body]);
        res.send("newreview");
        console.log("review done");
      } else {
        console.log("review fail");
        res.send("fail");
      }
    }
  }
});
app.post("/clientPurchaseTicket", (req, res) => {
  console.log("ticketBody", req.body);
  db.push("/ticket", [req.body]);
  res.send("newclient");
  console.log("ticket purchase");
  //res.send(currUser);
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
        console.log("after success,", data.client[item].email);
        res.send(data.client[item].email);
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
app.post("/money", (req, res) => {
  let moneyArray = [];
  var data = db.getData("/");
  for (const item in data.ticket) {
    if (data.ticket[item].userEmail == req.body.email) {
      moneyArray.push(data.ticket[item].price);
    }
  }
  res.send(moneyArray);
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
    res.send("true");
  } else {
    res.send("false");
  }
});

app.post("/clientcheck", (req, res) => {
  console.log(currRole);
  if (currRole == "client") {
    res.send("true");
  } else {
    res.send("false");
  }
});

app.listen(3001, () => console.log("Server is listening to port 3001"));
