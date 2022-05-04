import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

async function AllFlights() {
  const [details, setDetails] = useState({
    allflights: {},
  });
  let flights = await axios.all([
    await axios.post("http://localhost:3001/home", details),
  ]);

  return flights.data;
}

function Home() {
  flightData = AllFlights();

  console.log(flightData);

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
