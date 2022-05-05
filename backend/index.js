const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const mysql = require("mysql");
const md5 = require("md5");
const moment = require("moment");

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "airline_reservation",
  connectionLimit: 30,
});
const app = express();

app.use(express.json());
app.use(cors());

// var db = new JsonDB(new Config("myDataBase", true, false, "/"));
// var currUser = ""; // username
// var currRole = ""; //staff or client
// var currComp = ""; // staff's company

app.post("/", (req, res) => {
  console.log(req.body);
  if (req.body["username"] == "olivia") {
    console.log("YOOO");
  }
  // sql query using the req.username
  res.send(req.body);
});

app.get("/home", (req, res) => {
  // select all the flight data
  let departDate = new Date();
  let future30 = new Date();
  departDate = moment(departDate).format("YYYY-MM-DD");
  future30 = moment(departDate).format("YYYY-MM-DD");
  future30 = moment(future30).add(30, "days");
  console.log(future30);

  connection.query("SELECT * FROM Flight", (err, rows) => {
    if (!err) {
      let filteredRows = rows.filter(
        (row) => future30.diff(moment(row["dept_date"]), "days") < 30
      );
      console.log(filteredRows[0]);

      res.send(filteredRows);
    } else {
      res.status(500).send(err);
      console.log(err);
    }
  });
});

app.post("/viewflight", (req, res) => {
  let departDate = new Date();
  let future30 = new Date();
  let airline_name = req.body.company;
  departDate = moment(departDate).format("YYYY-MM-DD");
  future30 = moment(departDate).format("YYYY-MM-DD");
  future30 = moment(future30).add(30, "days");
  console.log(future30);
  // select all the flight data
  // future 30 days

  connection.query(
    `SELECT * FROM Flight WHERE airline_name = '${airline_name}'`,
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => future30.diff(moment(row["dept_date"]), "days") < 30
        );
        console.log(filteredRows[0]);

        res.send(filteredRows);

        //console.log(filteredRows);
      } else {
        res.status(500).send(err);
        console.log(err);
      }
    }
  );
});

app.post("/ticketsold", (req, res) => {
  let todayDate = new Date();
  let backOneYear = new Date();
  todayDate = moment(todayDate).format("YYYY-MM-DD");
  todayDate = moment(todayDate).add(0, "days");
  // backOneYear = moment(todayDate).format("YYYY-MM-DD");
  // backOneYear = moment(backOneYear).subtract(1, "years");
  // console.log(backOneYear);
  // select all the flight data
  console.log(req.body);
  console.log(todayDate);
  const airline_name = req.body.company;
  // future 30 days
  connection.query(
    `SELECT * FROM Ticket WHERE airline_name = '${airline_name}'`,
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => todayDate.diff(moment(row["purchase_date"]), "years") < 1
        );
        console.log(filteredRows[0]);

        res.send(filteredRows);

        console.log(filteredRows);
      } else {
        res.status(500).send(err);
        console.log(err);
      }
    }
  );
});

app.post("/ticketmonth", (req, res) => {
  let todayDate = new Date();
  todayDate = moment(todayDate).format("YYYY-MM-DD");
  todayDate = moment(todayDate).add(0, "days");
  console.log(req.body);
  console.log(todayDate);
  const airline_name = req.body.company;
  connection.query(
    `SELECT * FROM Ticket WHERE airline_name = '${airline_name}'`,
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => todayDate.diff(moment(row["purchase_date"]), "days") < 30
        );
        console.log(filteredRows[0]);

        res.send(filteredRows);

        console.log(filteredRows);
      } else {
        res.status(500).send(err);
        console.log(err);
      }
    }
  );
});

// get the most frequent customer that took the airline specified in request body
app.post("/mostfrequent", (req, res) => {
  console.log(req.body);
  const airline_name = req.body.company;
  console.log(airline_name);
  console.log("REQ:: ", req.body);
  // search for all the customers that bought the airline's tickets and count the number of times they bought
  connection.query(
    `SELECT COUNT(*) AS num_of_purchases, Customer.email 
    FROM Customer, Purchase 
    WHERE Customer.email = Purchase.email 
    AND Purchase.ticket_id IN 
    (
        SELECT Ticket.ID 
        FROM Ticket 
        WHERE Ticket.airline_name = '${airline_name}'
    ) 
    GROUP BY Customer.email 
    ORDER BY num_of_purchases DESC LIMIT 1`,
    [req.body.company],
    (err, rows) => {
      if (!err) {
        // send the email of the customer with the most purchases
        customoer_email = rows[0].email;
        all_flights = [];
        // search the customer information from the customer table
        connection.query(
          `SELECT email, cust_name, DOB 
                FROM Customer
                WHERE email = ?`,
          [customoer_email],
          (err, rows) => {
            if (!err) {
              connection.query(
                // get all flights of the customer by email
                "SELECT flight_id FROM Purchase WHERE email = customoer_email",
                [all_flights],
                (err, rows) => {
                  if (!err) {
                    // send the customer information and all the flights
                    res.send(rows);
                  } else {
                    res.status(500).send(err);
                    console.log(err);
                  }
                }
              );
              // send the customer information as well as the number of purchases
              res.send({ customer: rows[0] });
            } else {
              res.send(err);
              console.log(err);
            }
          }
        );
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

//temp ---------------
app.post("/toparrivals", (req, res) => {
  const airline_name = req.body.company;
  let todayDate = new Date();
  todayDate = moment(todayDate).format("YYYY-MM-DD");
  todayDate = moment(todayDate).add(0, "days");
  connection.query(
    `SELECT COUNT(*) AS num_of_purchases, arr_airport
    FROM Ticket JOIN Flight
    ON Ticket.flight_num = Flight.flight_num
    WHERE Ticket.airline_name = '${airline_name}'
    GROUP BY arr_airport
    ORDER BY num_of_purchases DESC
    LIMIT 3
    `,
    [req.body.company, req.body.start_date, req.body.end_date],
    (err, rows) => {
      if (!err) {
        console.log(rows[0]);
        // console.log("-----------");
        // if the city name is needed, we will need to search the city name from the airport table, if not let's just ignore it
        res.send(rows);
        //console.log(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/showrevenue", (req, res) => {
  const airline_name = req.body.company;
  let todayDate = new Date();
  todayDate = moment(todayDate).format("YYYY-MM-DD");
  todayDate = moment(todayDate).add(0, "days");
  connection.query(
    `SELECT *
    FROM Ticket
    WHERE Ticket.airline_name = '${airline_name}'
    `,
    [req.body.company],
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => todayDate.diff(moment(row["purchase_date"]), "years") < 1
        );
        res.send(filteredRows);
        //console.log(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/showrevenuemonth", (req, res) => {
  const airline_name = req.body.company;
  let todayDate = new Date();
  todayDate = moment(todayDate).format("YYYY-MM-DD");
  todayDate = moment(todayDate).add(0, "days");
  connection.query(
    `SELECT *
    FROM Ticket
    WHERE Ticket.airline_name = '${airline_name}'
    `,
    [req.body.company],
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => todayDate.diff(moment(row["purchase_date"]), "months") < 1
        );
        res.send(filteredRows);
        //console.log(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/showrevenueeconomy", (req, res) => {
  const airline_name = req.body.company;
  connection.query(
    `SELECT *
    FROM Ticket
    WHERE Ticket.airline_name = '${airline_name}'
    AND Ticket.travel_class = "economy"
    `,
    [req.body.company],
    (err, rows) => {
      if (!err) {
        res.send(rows);
        //console.log(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/showrevenuebusiness", (req, res) => {
  const airline_name = req.body.company;
  connection.query(
    `SELECT *
    FROM Ticket
    WHERE Ticket.airline_name = '${airline_name}'
    AND Ticket.travel_class = "business"
    `,
    [req.body.company],
    (err, rows) => {
      if (!err) {
        res.send(rows);
        //console.log(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/money", (req, res) => {
  connection.query(
    `SELECT *
    FROM Ticket
    WHERE ID IN (
      SELECT Ticket.ID
      FROM Ticket
      WHERE Ticket.ID IN (
        SELECT Purchase.ticket_id
        FROM Purchase
        WHERE Purchase.email = ? 
      )
    )
    AND purchase_date BETWEEN ? AND ?`,
    [req.body.email, req.body.start_date, req.body.end_date],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/stafflogin", (req, res) => {
  const { username, staff_password } = req.body;

  const hashedPassword = md5(staff_password); // hash the password
  connection.query(
    `SELECT * FROM AirlineStaff WHERE username = '${username}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        if (result.length === 0) {
          res.status(400).send("Invalid username or password");
        }
        if (result[0].staff_password === hashedPassword) {
          // send back the user information without the password
          console.log("login success");
          res.send(true);
        } else {
          res.status(400).send("Incorrect password");
        }
      }
      return;
    }
  );
});

app.post("/displayFlight", (req, res) => {
  let data = db.getData("/");
  res.send(data.flight);
});
// app.post("/cancelFlight", (req, res) => {
//   console.log("back");
//   let data = db.getData("/");
//   let now = new Date().toLocaleDateString();
//   let flag = 0;
//   console.log("now", now);
//   for (let i = 0; i < data.flight.length; i++) {
//     if (data.flight[i].flightnum == req.body.cancel) {
//       console.log("firststep");
//       let dateNum = data.flight[i].departureDate.split("-");
//       console.log("time", dateNum);
//       let nowNum = now.split("/");
//       console.log("now", nowNum);
//       if (nowNum[2] == dateNum[0]) {
//         console.log(nowNum[2]);
//         console.log(dateNum[0]);
//         if (nowNum[0] == dateNum[1]) {
//           if (nowNum[1] - dateNum[2] <= 1 || dateNum[2] - nowNum[1] <= 1) {
//             flag = 1;
//           }
//         }
//       }
//       // if(data.flight[i].departureDate)
//       if (flag != 1) {
//         console.log("work");
//         for (
//           let tmpItem = 0;
//           tmpItem < data.flight[i].passenger.length;
//           tmpItem++
//         ) {
//           // console.log("tmpEmail",data.data.client[j].email);
//           if (data.flight[i].passenger[tmpItem] == req.body.email) {
//             console.log("delete flgiht", data.flight[i]);
//             // db.delete("/flight", data.flight[i].passenger[tmpItem]);
//             // db.delete("/review", [req.body]);
//             res.send("success");
//             console.log("cancel done");
//           }
//         }
//       }
//     }
//   }
//   res.send("fail");
//   console.log("cancelflight", req.body);
//   // for (const item in data.ticket) {
//   //   console.log("dataemail",data.ticket[item].userEmail);
//   //   console.log("reqemail",req.body.email);
//   //   if(data.ticket[item].userEmail == req.body.email){
//   //     console.log(2);
//   //     if(data.ticket[item].flightNum == req.body.cancel){
//   //       console.log(3);
//   //       db.delete("/review", [req.body]);
//   //       res.send("success");
//   //       console.log("review done");
//   //     }
//   //   }
//   // }
//   // console.log("cancel fail");
//   // res.send("fail");
//   // console.log("cancelflight",req.body);
// });
app.post("/clientFlightBack", (req, res) => {
  console.log("finally worked");
  res.send("hi");
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
  // let data = db.getData("/");
  let dataArray = [];

  console.log("reqbody", req.body);

  const { destination, sourceCity, departureDate, arriveDate } = req.body;
  connection.query(
    `SELECT * FROM airline_reservation.Flight WHERE dept_airport='${sourceCity}' AND arr_airport ='${destination}'`,
    (err, result) => {
      res.send(result);
    }
  );
});
app.post("/clientReviewBack", (req, res) => {
  // console.log("Review", req.body);
  let flightNum = req.body.flightNum;
  let rating = req.body.rating;
  let comment = req.body.comment;
  let airlineName = req.body.airlineName;
  let depDate = req.body.depDate;
  let depTime = req.body.depTime;
  let currUser = req.body.currentUser;
  connection.query(
    `INSERT INTO Feedback (email, flight_num, airline_name, dept_date, dept_time, comment, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [currUser, flightNum, airlineName, depDate, depTime, comment, rating],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting");
        return;
      }
      res.status(200).send(true);
    }
  );
  //find flight num
});
//this is for client purchase ticket
app.post("/clientPurchaseTicket", (req, res) => {
  console.log("ticketBody", req.body);
  // res.send(req.body);
  let purchase_date = new Date();
  let purchase_time = new Date();
  purchase_date = moment(purchase_date).format("YYYY-MM-DD");
  purchase_time = moment(purchase_time).format("HH:mm:ss");
  let dept_date = req.body.dept_date.split("T")[0];
  let ticket_id = Math.floor(Math.random() * 1000000);
  let expireDate = req.body.expDate;
  expireDate = moment(expireDate).format("YYYY-MM-DD");
  // firstName: 'sad',
  // lastName: 'asd',
  // cardNumber: 'asd',
  // cardType: 'asd',
  // expDate: 'asd',
  // airline_name: '',
  // dept_airport: '',
  // arr_airport: '',
  // flight_num: '',
  // dept_date: '',
  // dept_time: ''

  // Pull off all the variables above
  const {
    firstName,
    lastName,
    cardNumber,
    cardType,
    expDate,
    airline_name,
    dept_airport,
    arr_airport,
    flight_num,
    dept_time,
    base_price,
    email,
  } = req.body;

  connection.query(
    `insert into Ticket (sold_price, card_number, card_type, exp_date, name_on_card, purchase_date, purchase_time, airline_name, flight_num, dept_date, dept_time,ID)
    values (?,?,?,?,?,?,?,?,?,?,?,?)
    `,
    [
      base_price,
      cardNumber,
      cardType,
      expDate,
      firstName + " " + lastName,
      purchase_date,
      purchase_time,
      airline_name,
      flight_num,
      dept_date,
      dept_time,
      ticket_id,
      email,
    ],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        connection.query(
          `insert into Purchase (email,ticket_id)
          values (?,?)`,
          [email, ticket_id],
          (err, rows) => {
            if (!err) {
              res.send({
                success: true,
              });
            } else {
              res.send(err);
              console.log(err);
            }
          }
        );
      }
    }
  );
});
app.post("/ticketInfo", (req, res) => {
  console.log("ticketInfo", req.body.email);
  const email = req.body.email;
  connection.query(
    `SELECT * FROM Purchase WHERE email='${email}'`,
    (err, result) => {
      res.send(result);
    }
  );
});
app.post("/clientcancel", (req, res) => {
  console.log("cancel", req.body);
  // res.send(true);
  //purchase, ticket,

  const { ticketId, flightNum, airlineName, depTime, depDate, email } =
    req.body;
  // let airlineName = req.body.airlineName;
  // let flightNum = req.body.flightNum;
  // let depDate = req.body.depDate;
  // let depTime = req.body.depTime;
  // let email = req.body.email;
  console.log("num", flightNum);
  let dept_date = depDate.split("T")[0];
  connection.query(
    `
         DELETE FROM Purchase
          WHERE Purchase.ticket_id = ?
          `,
    [ticketId],

    (err, rows) => {
      if (!err) {
        // use the ticket id in the row to delete the purchase table
        console.log("should work");
        connection.query(
          ` DELETE FROM Ticket WHERE airline_name = '${airlineName}' AND flight_num = '${flightNum}' AND dept_date = '${depDate}' AND dept_time = '${depTime}'`,

          (err, rows) => {
            if (!err) {
              res.send({
                success: true,
              });
            } else {
              res.send(err);
              console.log("hi", err);
            }
          }
        );
      } else {
        res.send(err);
        console.log("error", err);
      }
    }
  );
});
app.post("/clientlogin", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = md5(password); // hash the password
  connection.query(
    `SELECT * FROM Customer WHERE email = '${email}'`, // find the client
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        const {
          c_name,
          cust_password,
          building_num,
          street,
          city,
          state,
          phone_num,
          passport_num,
          passport_exp,
          passport_country,
          birth,
        } = result[0];

        const c_info = {
          c_name,
          email,
          building_num,
          street,
          city,
          state,
          phone_num,
          passport_num,
          passport_exp,
          passport_country,
          birth,
        };

        if (cust_password === hashedPassword) {
          console.log("login success");
          res.send(true);
          // currUser = req.body.email;
          // currRole = "client";
        } else {
          res.status(400).send("Incorrect password");
        }
      }
      return;
    }
  );
});
app.post("/clientView", (req, res) => {
  console.log("clientView", req.body);
  if (req.body.airline_name) {
    connection.query(
      `SELECT *
        FROM Flight
        WHERE airline_name = ?
        AND flight_num IN
        (
            SELECT Ticket.flight_num
            FROM Ticket
            WHERE Ticket.ID IN
            (
                SELECT Purchase.ticket_id
                FROM Purchase
                WHERE Purchase.email = ?
            )
        )`,
      [req.body.airline_name, req.body.email],
      (err, rows) => {
        if (!err) {
          res.send({
            flights: rows,
            cust_email: req.body.email,
          });
        } else {
          res.send(err);
          console.log(err);
        }
      }
    );
  } else {
    connection.query(
      `SELECT *
        FROM Flight
        WHERE flight_num IN
        (
            SELECT Ticket.flight_num
            FROM Ticket
            WHERE Ticket.ID IN
            (
                SELECT Purchase.ticket_id
                FROM Purchase
                WHERE Purchase.email = ?
            )
        )`,

      [req.body.email],
      (err, rows) => {
        if (!err) {
          res.send({
            flights: rows,
            cust_email: req.body.email,
          });
        } else {
          res.send(err);
          console.log(err);
        }
      }
    );
  }
});
app.post("/newstaff", (req, res) => {
  const { username, password, first_name, last_name, birth, airline_name } =
    req.body;
  const birth_mysql = `${birth.slice(0, 4)}/${birth.slice(5, 7)}/${birth.slice(
    8,
    10
  )}`;

  const hashedPassword = md5(password);
  connection.query(
    `SELECT * FROM AirlineStaff WHERE username = '${username}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (result.length > 0) {
        res.status(400).send("User already exists");
      } else {
        const query = `INSERT INTO AirlineStaff(username,staff_password,first_name,last_name,DOB,airline_name) VALUES (
                    '${username}',
                    '${hashedPassword}',
                    '${first_name}',
                    '${last_name}',
                    '${birth_mysql}',
                    '${airline_name}'
                )`;
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).send(result);
          }
        });
      }
    }
  );
});

app.post("/newclient", (req, res) => {
  const {
    email,
    password,
    name,
    building_num,
    street,
    city,
    state,
    phone_num,
    passport_num,
    passport_exp,
    passport_country,
    birthday,
  } = req.body;
  const birthday_mysql = `${birthday.slice(0, 4)}/${birthday.slice(
    5,
    7
  )}/${birthday.slice(8, 10)}`; // format: YYYY/MM/DD
  const passport_exp_mysql = `${passport_exp.slice(0, 4)}/${passport_exp.slice(
    5,
    7
  )}/${passport_exp.slice(8, 10)}`;
  const hashedPassword = md5(password); // hash the password
  connection.query(
    `SELECT * FROM Customer WHERE email = '${email}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (result.length > 0) {
        res.status(400).send("This email has been registered!");
      } else {
        const query = `INSERT INTO Customer(email,cust_password,cust_name,building_num,street,city,state,phone_num,passport_num,passport_exp,passport_country,DOB) VALUES (
            '${email}',
            '${hashedPassword}', 
            '${name}',
            ${building_num},
            '${street}',
            '${city}',
            '${state}',
            ${phone_num},
            '${passport_num}',
            '${passport_exp_mysql}',
            '${passport_country}',
            '${birthday_mysql}'
        )`;
        // use md5 to hash the password
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).send(result);
          }
        });
      }
    }
  );
});

app.post("/newflight", (req, res) => {
  connection.query(
    `SELECT *
    FROM Airport
    WHERE airport_code = ?`,
    [req.body.dept_airport],
    (err, rows) => {
      if (rows.length == 0) {
        // see if departure airport exists
        res.send("Error: Departure Airport does not exist");
      } else {
        connection.query(
          `SELECT *
          FROM Airport
          WHERE airport_code = ?`,
          [req.body.arr_airport],
          (err, rows) => {
            if (rows.length == 0) {
              // see if arrival airport exists
              res.send("Error: Arrival Airport does not exist");
            } else {
              connection.query(
                `SELECT *
                FROM Airplane
                WHERE ID = ?
                AND airline_name = ?`,
                [
                  req.body.airplane_id,
                  req.body.airplane_airline_name_in_flight,
                ],
                (err, rows) => {
                  if (rows.length == 0) {
                    // see if airplane exists
                    res.send("Error: Airplane does not exist");
                  } else {
                    // if all the checks pass, add the flight
                    connection.query(
                      `INSERT INTO Flight
                    (flight_num, airline_name, dept_airport, arr_airport, dept_date, dept_time, arr_date, arr_time, airplane_id, flight_status, base_price, airplane_airline_name)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        req.body.flight_num,
                        req.body.airline_name,
                        req.body.dept_airport,
                        req.body.arr_airport,
                        req.body.dept_date,
                        req.body.dept_time_eastern,
                        req.body.arr_date,
                        req.body.arr_time_eastern,
                        req.body.airplane_id,
                        req.body.flight_status,
                        req.body.base_price,
                        req.body.airplane_airline_name_in_flight,
                      ],
                      (err, rows) => {
                        if (!err) {
                          res.send("Added new flight");
                          console.log(rows);
                        } else {
                          res.send(
                            "Unable to add the flight, check all your fields and try again"
                          );
                          console.log(err);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.post("/newairport", (req, res) => {
  console.log("hihihihihi");
  connection.query(
    `INSERT INTO Airport
    (airport_code, airport_name, city)
    VALUES (?, ?, ?)`,
    [req.body.airport_code, req.body.airport_name, req.body.city],
    (err, rows) => {
      if (!err) {
        res.send("Added new airport");
      } else {
        res.send("Airport already exists");
        console.log(err);
      }
    }
  );
});

// add new airplane to the database
app.post("/newairplane", (req, res) => {
  connection.query(
    `INSERT INTO Airplane
    (ID, airline_name, seat_amt)
    VALUES (?, ?, ?)`,
    [req.body.airplane_id, req.body.airline_name, req.body.seat_amt],
    (err, rows) => {
      if (!err) {
        res.send("Added new airplane");
      } else {
        res.send("Airplane already exists");
        console.log(err);
      }
    }
  );
});

app.post("/logout", (req, res) => {
  console.log("logout");
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

app.post("/viewfeedback", (req, res) => {
  const { flight_num, dept_date, dept_time, airline_name } = req.body;
  //const flight_num = req.body.flight_num;
  //const dept_date = req.body.dept_date;
  //console.log("req body: ", req.body);
  // const dept_time = req.body.dept_time;
  // const airline_name = req.body.airline_name;
  //console.log("!!!!!!!!!!!!");
  console.log(req.body);

  // get all the feedbacks from the feedback table based on the specified flight number, dept date, dept time and airline name
  connection.query(
    `SELECT *
    FROM Feedback
    WHERE flight_num = '${flight_num}'
    AND dept_date = '${dept_date}'
    AND dept_time = '${dept_time}'
    AND airline_name = '${airline_name}'`,
    /*
    [
      (req.body.flight_num,
      req.body.dept_date,
      req.body.dept_time,
      req.body.airline_name)
    ],
    */
    (err, rows) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

// change the status of a flight
app.post("/changestatus", (req, res) => {
  // find the flight and extract the status
  connection.query(
    `SELECT *
    FROM Flight
    WHERE flight_num = ?
    AND airline_name = ?
    AND dept_date = ?
    AND dept_time = ?`,
    [
      req.body.flight_num,
      req.body.airline_name,
      req.body.dept_date,
      req.body.dept_time,
    ],
    (err, rows) => {
      if (!err) {
        console.log("");
        // change ontime to delay
        if (rows[0].flight_status == "On-time") {
          connection.query(
            `UPDATE Flight
            SET flight_status = ?
            WHERE flight_num = ?
            AND airline_name = ?
            AND dept_date = ?
            AND dept_time = ?`,
            [
              "Delayed",
              req.body.flight_num,
              req.body.airline_name,
              req.body.dept_date,
              req.body.dept_time,
            ],
            (err, rows) => {
              if (!err) {
                res.send("Changed to Delayed");
              } else {
                console.log(err);
              }
            }
          );
        } else {
          // change delay to ontime
          connection.query(
            `UPDATE Flight
            SET flight_status = ?
            WHERE flight_num = ?
            AND airline_name = ?
            AND dept_date = ?
            AND dept_time = ?`,
            [
              "On-time",
              req.body.flight_num,
              req.body.airline_name,
              req.body.dept_date,
              req.body.dept_time,
            ],
            (err, rows) => {
              if (!err) {
                res.send("Changed to On Time");
              } else {
                console.log(err);
              }
            }
          );
        }
      } else {
        res.send("Unable to change flight status");
        console.log(err);
      }
    }
  );
});

app.listen(3001, () => console.log("Server is listening to port 3001"));
