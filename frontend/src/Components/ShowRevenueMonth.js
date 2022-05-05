import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function ShowRevenueMonth() {
  const [revenueM, showRevenueM] = useState([]);
  const { metaData } = useContext(UserContext);
  const { airline_name } = metaData;
  useEffect(() => {
    async function fetchData() {
      //console.log(airline_name);
      let revsM = await axios.post("http://localhost:3001/showrevenuemonth", {
        airline_name,
      });

      revsM = revsM.data;
      console.log(revsM);
      console.log("-----");
      let results = 0;
      for (let i = 0; i < revsM.length; i++) {
        results += revsM[i].sold_price;
        // results.push(revs[i].sold_price);
        // results.push("   \n");
      }
      showRevenueM(results);
      console.log(results);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <h1>Revenue </h1>
      <h2>Displaying the total revenue of last month</h2>
      <div>Revenue = $ {revenueM}</div>
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default ShowRevenueMonth;
