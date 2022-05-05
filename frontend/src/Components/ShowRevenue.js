import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function ShowRevenue() {
  const [revenue, showRevenue] = useState([]);
  const { airlineName } = useContext(UserContext);
  const [airline_name, setDetails] = useState({
    company: "",
  });

  airline_name.company = airlineName;
  useEffect(() => {
    async function fetchData() {
      //console.log(airline_name);
      let revs = await axios.post(
        "http://localhost:3001/showrevenue",
        airline_name
      );

      revs = revs.data;
      console.log(revs);
      console.log("-----");
      let results = 0;
      for (let i = 0; i < revs.length; i++) {
        results += revs[i].sold_price;
        // results.push(revs[i].sold_price);
        // results.push("   \n");
      }
      showRevenue(results);
      console.log(results);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <h1>Revenue </h1>
      <h2>Displaying the total revenue of last year</h2>
      <div>Revenue = $ {revenue}</div>
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ShowRevenue;
