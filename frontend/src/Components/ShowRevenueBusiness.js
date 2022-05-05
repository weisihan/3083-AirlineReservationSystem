import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function ShowRevenueBusiness() {
  const [revenueB, showRevenueB] = useState([]);
  const { metaData } = useContext(UserContext);
  const { airline_name } = metaData;
  useEffect(() => {
    async function fetchData() {
      //console.log(airline_name);
      let revs = await axios.post("http://localhost:3001/showrevenuebusiness", {
        airline_name,
      });

      revs = revs.data;
      console.log(revs);
      console.log("-----");
      let results = 0;
      for (let i = 0; i < revs.length; i++) {
        results += revs[i].sold_price;
        // results.push(revs[i].sold_price);
        // results.push("   \n");
      }
      showRevenueB(results);
      console.log(results);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <h1>Revenue </h1>
      <h2>Displaying the total revenue of business class</h2>
      <div>Revenue = $ {revenueB}</div>
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ShowRevenueBusiness;
