import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import PurchaseTicket from "./PurchaseTicket";
import { fontWeight } from "@mui/system";

let foundFlag = 0;
function SearchFlights() {
  let navigate = useNavigate();
  let res;
  const [details, setDetails] = useState({
    sourcecity: "",
    descity: "",
    depdate: "",
    arrivedate: "",
    price: "200",
    userEmail: "",
    rate: "",
    comment: "",
    flightNum: "",
  });
  async function reviewFlight() {
    let warning = document.getElementById("warning");
    warning.innerHTML = "";
    if (foundFlag == 0) {
      warning.innerHTML +=
        "WARNING! Please Select Search Flight First then Review";
    } else {
      const newUserEmail = await axios.post(
        "http://localhost:3001/clientFlightBack",
        details
      );
      details.userEmail = newUserEmail.data;
      let reviewForm = document.getElementById("review");
      reviewForm.style.display = "inline";
      let reviewBtn = document.getElementById("reviewBtn");
      reviewBtn.style.display = "inline";
    }
  }
  async function reviewProcess() {
    let warning = document.getElementById("warning");
    warning.innerHTML = "";
    console.log("?");
    const reviewBack = await axios.post(
      "http://localhost:3001/clientReviewBack",
      details
    );
    console.log(1, reviewBack);
    if (reviewBack.data == "fail") {
      warning.innerHTML +=
        "You did not purchase this flight! You can not review";
    } else {
      warning.innerHTML += "You Sucessfully Reivewed the Flight!";
    }
  }
  async function purchaseTicket() {
    let warning = document.getElementById("warning");
    warning.innerHTML = "";
    if (foundFlag == 0) {
      warning.innerHTML +=
        "WARNING! Please Select Search Flight First then Purchase";
    } else {
      const sendUserEmail = await axios.post(
        "http://localhost:3001/clientFlightBack",
        details
      );
      details.userEmail = sendUserEmail.data;
      const resBody = await axios.post(
        "http://localhost:3001/clientPurchaseTicket",
        details
      );
      warning.innerHTML +=
        "Your Chosen Ticket was Succesfully Purchased and Stored";
    }
  }
  async function SearchOne() {
    const resBody = await axios.post(
      "http://localhost:3001/clientSearchFlight",
      details
    );
    res = resBody.data;
    foundFlag = 1;
    console.log("searchres", res);
    let output = document.getElementById("output");
    output.innerHTML = "";
    output.innerHTML += "Search Result: <br>";
    for (let i = 0; i < res.length; i++) {
      output.innerHTML += "Flight Num: " + res[i].flightnum + "<br>";
      details.flightNum = res[i].flightnum;
      output.innerHTML +=
        "Departure Airport(source city): " + res[i].departairport + "<br>";
      output.innerHTML +=
        "Arrival Airport(destination city): " + res[i].arriveairport + "<br>";
      output.innerHTML += "Departure Date: " + res[i].departureDate + "<br>";
      output.innerHTML += "Arrival Date: " + res[i].arrivalDate + "<br>";
      output.innerHTML += "Departure Time: " + res[i].departureTime + "<br>";
      output.innerHTML += "Arrival Time: " + res[i].arrivalTime + "<br>";
    }
  }

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className="card">
      <h1>Search for flights </h1>
      <div id="warning" style={{ color: "red", fontWeight: "bold" }}></div>
      <div className="form-group">
        <label htmlFor="sourcecity"> souce city: </label>
        <input
          type="text"
          sourceCity="sourcecity"
          id="sourcecity"
          onChange={(e) =>
            setDetails({ ...details, sourcecity: e.target.value })
          }
          value={details.sourcecity}
        />
      </div>
      <div id="hint"></div>
      <div className="form-group">
        <label htmlFor="desCity"> destination city: </label>
        <input
          type="text"
          sourceCity="descity"
          //destinaty city
          id="descity"
          onChange={(e) => setDetails({ ...details, descity: e.target.value })}
          value={details.descity}
        />
      </div>
      <div className="form-group">
        <label htmlFor="depdate"> departure date: </label>
        <input
          type="text"
          depdate="depdate"
          id="depdate"
          onChange={(e) => setDetails({ ...details, depdate: e.target.value })}
          value={details.depdate}
        />
      </div>
      <div className="form-group">
        <label htmlFor="arrivedate"> arrival date: </label>
        <input
          type="text"
          arrivedate="arrivedate"
          id="arrivedate"
          onChange={(e) =>
            setDetails({ ...details, arrivedate: e.target.value })
          }
          value={details.arrivedate}
        />
      </div>
      <div id="output" style={{ fontWeight: "bold" }}></div>
      <div id="review" style={{ display: "none" }}>
        <div className="form-group">
          <label htmlFor="rate">
            {" "}
            Rate Your Flight(1-5, 5 is the highest){" "}
          </label>
          <input
            type="text"
            rate="rate"
            id="rate"
            onChange={(e) => setDetails({ ...details, rate: e.target.value })}
            value={details.rate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment"> Give Your Comment About This Flight</label>
          <input
            type="text"
            comment="comment"
            id="comment"
            onChange={(e) =>
              setDetails({ ...details, comment: e.target.value })
            }
            value={details.comment}
          />
        </div>
      </div>
      <br></br>
      <button
        className="btn"
        id="reviewBtn"
        style={{ display: "none" }}
        onClick={reviewProcess}
      >
        {" "}
        Submit Review{" "}
      </button>
      <br></br>
      <br></br>
      <button className="btn" onClick={SearchOne}>
        {" "}
        Search Flight{" "}
      </button>
      <br></br>
      <br></br>
      <button className="btn" onClick={reviewFlight}>
        {" "}
        Reivew Flight{" "}
      </button>
      <br></br>
      <br></br>
      <button className="btn" onClick={purchaseTicket}>
        {" "}
        Purchase Ticket{" "}
      </button>
      <br></br>
      <br></br>
      <Link to="/clienthome">
        <button className="btn">Go to client home</button>
      </Link>
    </div>
  );
}

export default SearchFlights;
