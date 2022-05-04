import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../../Components/Table.component";

async function AllFlights() {
  const [details, setDetails] = useState({
    allflights: {},
  });
  let flights = await axios.get("http://localhost:3001/home", details);

  return flights.data;
}

function Home() {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let flights = await axios.get("http://localhost:3001/home");
      flights = flights.data;
      console.log(flights);
      // airline_name: "Air China";
      // airplane_airline_name: "Air China";
      // airplane_id: "3";
      // arr_airport: "LAX";
      // arr_date: "2021-11-12T05:00:00.000Z";
      // arr_time: "16:50:25";
      // base_price: 300;
      // dept_airport: "SFO";
      // dept_date: "2021-11-12T05:00:00.000Z";
      // dept_time: "13:25:25";
      // flight_num: "102";
      // flight_status: "On-time";
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
      <h1>Homepage </h1>
      <h2>Welcome to xxx airlines</h2>
      <div>
        <div>
          <h2>{"Please sign in or register"} </h2>
          <div className="actions">
            <div className="App">
              <div>
                <Link to="/login">
                  <button className="btn">Log in</button>
                </Link>
                <Link to="/register">
                  <button className="btn"> Register </button>
                </Link>
              </div>
              <br></br>
              <Table heading={heading} body={flightData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
