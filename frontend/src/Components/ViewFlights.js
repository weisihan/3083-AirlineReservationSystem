import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function ViewFlights() {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let flights = await axios.get("http://localhost:3001/viewflight");
      flights = flights.data;
      console.log(flights);
      let results = [];
      for (let i = 0; i < flights.length; i++) {
        let temp = [];
        let current = flights[i];
        temp = [
          current.flight_num,
          current.airline_name,
          current.dept_airport,
          current.arr_airport,
        ];
        results.push(temp);
      }

      setFlightData(results);

      console.log(flights);
    }
    fetchData();
  }, []);
  // flightData = AllFlights();

  console.log(flightData);

  let heading = ["Flight Number", "Company Name", "Departure", "Arrival"];


  return (
    <div className="card">
      <h1>View flights </h1>
      <h2>Displaying flights</h2>
      <Table heading={heading} body={flightData} />
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewFlights;
