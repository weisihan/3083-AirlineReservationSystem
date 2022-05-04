import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function SearchFlights() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  const [formDetails, setDetails] = useState({
    sourceCity: "LAX",
    destination: "PEK",
    departureDate: "2021-03-04",
    arrivalDate: "2021-03-05",
  });

  const [foundFlights, setFlights] = useState([]);

  async function purchaseTicket(flightid, currentUser) {
    if (!currentUser) {
      alert("NO USER IS LOGGED IN!!!");
    }
    console.log(flightid);
    console.log("go purchase ticket...");
  }

  async function sendRequest(formDetails) {
    let res = await axios.post(
      "http://localhost:3001/clientSearchFlight",
      formDetails
    );
    res = res.data;
    console.log("newres", res);
    let aggregated = [];
    for (let i = 0; i < res.length; i++) {
      console.log("item", res[i]);
      console.log("datatime", res[i].arr_date.split("T")[0]);
      console.log("formtime", formDetails.arrivalDate);
      if (
        res[i].arr_date.split("T")[0] == formDetails.arrivalDate &&
        res[i].dept_date.split("T")[0] == formDetails.departureDate
      ) {
        // airline_name: "Delta";
        // airplane_airline_name: "Delta";
        // airplane_id: "Boeing 787-7";
        // arr_airport: "PEK";
        // arr_date: "2021-03-05T05:00:00.000Z";
        // arr_time: "23:00:00";
        // base_price: 5500;
        // dept_airport: "LAX";
        // dept_date: "2021-03-04T05:00:00.000Z";
        // dept_time: "14:00:00";
        // flight_num: "DL456";
        // flight_status: "Delay";
        const { airline_name, arr_airport, dept_airport, flight_num } = res[i];
        aggregated.push([
          airline_name,
          arr_airport,
          dept_airport,
          flight_num,
          <button
            onClick={() => {
              purchaseTicket(airline_name, currentUser);
            }}
          >
            hello
          </button>,
        ]);
      }
    }

    setFlights(aggregated);
    console.log(aggregated);
  }

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
      <Table
        heading={["airline_name", "dept", "arrival", "flight_num", "purchase"]}
        body={foundFlights}
      />
    </div>
  );
}

export default SearchFlights;
