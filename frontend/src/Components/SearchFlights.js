import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { fontWeight } from "@mui/system";

let foundFlag = 0;

function sendRequest(formDetails) {
  axios.post("http://localhost:3001/clientSearchFlight", formDetails);
  console.log("sending axios request...");
  console.log(formDetails);
}

function SearchFlights() {
  const [formDetails, setDetails] = useState({
    sourceCity: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
  });

  function handleEvent(event) {
    console.log("targetname", event.target.name);
    setDetails({ ...formDetails, [event.target.name]: event.target.value }); //happening in the background
    console.log(formDetails);
  }
  return (
    <div className="card">
      <h1>Search for flights </h1>
      {/* <div id="warning" style={{ color: "red", fontWeight: "bold" }}></div> */}
      <div className="form-group">
        <label> souce city: </label>
        <input
          type="text"
          id="sourceCity"
          name="sourceCity"
          onChange={(e) => handleEvent(e)}
        />
      </div>
      <div id="hint"></div>
      <div className="form-group">
        <label htmlFor="destination"> destination city: </label>
        <input
          name="destination"
          type="text"
          //destinaty city
          id="destination"
          onChange={(e) => handleEvent(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="departureDate"> departure date: </label>
        <input
          name="departureDate"
          type="text"
          id="departureDate"
          onChange={(e) => handleEvent(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="arrivalDate"> arrival date: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) => handleEvent(e)}
        />
      </div>
      {/* <div id="output" style={{ fontWeight: "bold" }}></div> */}
      <div id="review" style={{ display: "none" }}>
        <div className="form-group">
          <label htmlFor="rate">
            {" "}
            Rate Your Flight(1-5, 5 is the highest){" "}
          </label>
          <input type="text" rate="rate" id="rate" />
        </div>
        <div className="form-group">
          <label htmlFor="comment"> Give Your Comment About This Flight</label>
          <input type="text" comment="comment" id="comment" />
        </div>
      </div>
      <br></br>
      <button className="btn" id="reviewBtn" style={{ display: "none" }}>
        {" "}
        Submit Review{" "}
      </button>
      <button className="btn" onClick={() => sendRequest(formDetails)}>
        {" "}
        Search Flight{" "}
      </button>
      <Link to="/clienthome">
        <button className="btn">Go to client home</button>
      </Link>
    </div>
  );
}

export default SearchFlights;
