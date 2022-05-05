import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function TopArrivals() {
  const [topArrivals, showTopArrivals] = useState([]);
  const { metaData } = useContext(UserContext);
  const { airline_name } = metaData;
  useEffect(() => {
    async function fetchData() {
      //console.log(airline_name);
      let tops = await axios.post("http://localhost:3001/toparrivals", {
        airline_name,
      });

      tops = tops.data;
      console.log(tops);
      console.log("-----");
      let results = [];
      for (let i = 0; i < tops.length; i++) {
        results.push(tops[i].arr_airport);
        results.push("   \n");
      }
      showTopArrivals(results);
      console.log(results);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <h1>Top Destination Airports </h1>
      <h2>Displaying the top 3 destination airports of last Year</h2>
      <div>{topArrivals}</div>
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default TopArrivals;
