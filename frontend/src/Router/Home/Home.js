import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

async function AllFlights() {
  const [details, setDetails] = useState({
    allflights: {},
  });
  let flights = await axios.get("http://localhost:3001/home", details);

  return flights.data;
}

function Home() {
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let flights = await axios.get("http://localhost:3001/home");
      setFlightData(flights.data);
      console.log(flights);
    }
    fetchData();
  }, []);
  // flightData = AllFlights();

  console.log(flightData);

  return (
    <div className="card">
      <h1>Homepage </h1>
      <h2>Welcome to xxx airlines</h2>
      {flightData ? (
        flightData.map((flight) => {
          return (

            <DataGrid
  onCellClick={(params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
    event.defaultMuiPrevented = true;
  }}
/>
            <p>
              Airline: {flight.airline_name} Flight Number:
              {flight.flight_num}
            </p>
          );
        })
      ) : (
        <p>loading..</p>
      )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
