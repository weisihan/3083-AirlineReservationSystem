import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";
import { AccordionDetails } from "@mui/material";

function ViewFlights() {
  const [flightData, setFlightData] = useState([]);
  const { airlineName } = useContext(UserContext);

  const [details, setDetails] = useState({
    company: "",
  });

  details.company = airlineName;

  useEffect(() => {
    async function fetchData() {
      console.log("here: ", airlineName);
      let flights = await axios.post(
        "http://localhost:3001/viewflight",
        details
      );
      console.log(airlineName);
      flights = flights.data;
      console.log(flights);
      let results = [];
      for (let i = 0; i < flights.length; i++) {
        let dpdate = flights[i].dept_date.split("T")[0];
        let temp = [
          flights[i].airline_name,
          flights[i].flight_num,
          dpdate,
          flights[i].dept_time,
        ];
        results.push(temp);
      }

      setFlightData(results);
    }
    fetchData();
  }, []);

  let heading = [
    "Flight Number",
    "Company Name",
    "Departure Date",
    "Departure Time",
  ];

  return (
    <div className="card">
      <h1>View flights </h1>
      <h2>Displaying flights for future 30 days</h2>
      {/* {<p>{JSON.stringify(flightData)}</p>} */}
      <Table heading={heading} body={flightData} />
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewFlights;
