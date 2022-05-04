import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fontWeight } from "@mui/system";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function MyFlights() {
  function handleEvent(event) {
    console.log("targetname", event.target.name);
    setDetails({ ...formDetails, [event.target.name]: event.target.value }); //happening in the background
    console.log(formDetails);
  }
  const { currentUser } = useContext(UserContext);

  const [formDetails, setDetails] = useState({
    airline_name: "",
    email: currentUser,
  });
  const [foundFlights, setFlights] = useState([]);

  async function sendRequest(formDetails) {
    let res = await axios.post("http://localhost:3001/clientView", formDetails);
    res = res.data.flights;
    // console.log("newres", res);
    let aggregated = [];
    for (let i = 0; i < res.length; i++) {
      const {
        airline_name,
        arr_airport,
        arr_date,
        arr_time,
        base_price,
        dept_airport,
        dept_date,
        dept_time,
        flight_num,
        flight_status,
      } = res[i];

      aggregated.push([
        airline_name,
        arr_airport,
        arr_date.split("T")[0],
        arr_time,
        base_price,
        dept_airport,
        dept_date.split("T")[0],
        dept_time,
        flight_num,
        flight_status,
      ]);
      // console.log("agregated", aggregated);
    }
    setFlights(aggregated);
  }
  sendRequest(formDetails);

  let heading = [
    "airline_name",
    "arr_airport",
    "arr_date",
    "arr_time",
    "base_price",
    "dept_airport",
    "dept_date",
    "dept_time",
    "flight_num",
    "flight_status",
  ];
  return (
    <div className="card">
      <h1>My flights </h1>
      <div className="form-group">
        <label htmlFor="airline_name"> airline name: </label>
        <input
          type="text"
          name="airline_name"
          id="airline_name"
          onChange={(e) => handleEvent(e)}
        />
      </div>
      <Table heading={heading} body={foundFlights} />
      <Link to="/review">
        <button className="btn">Review Flights</button>
      </Link>
      {/* <button
        className="btn"
        id="cancelBtn"
        style={{ display: "none" }}
        onClick={confirmCancel}
      >
        {" "}
        Confirm Cancel{" "}
      </button>
      <br></br>
      <br></br> */}
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
      <br></br>
      {/* <button className="btn" onClick={cancelFlight}>
        {" "}
        Cancel Flight{" "}
      </button> */}
    </div>
  );
}

export default MyFlights;
