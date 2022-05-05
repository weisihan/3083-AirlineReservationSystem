import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function MostFrequent() {
  const [freqCustomer, setFreqCustomer] = useState([]);
  const { airlineName } = useContext(UserContext);
  const { airline_name } = airlineName;
  useEffect(() => {
    async function fetchData() {
      console.log(airline_name);
      let freqcus = await axios.post("http://localhost:3001/mostfrequent", {
        airline_name,
      });

      freqcus = freqcus.data;
      console.log(freqcus);
      console.log("-----");
      let results = [];
      //   let space = " ";
      //   results.push("Customer name: ");
      //   results.push(freqcus.customer.cust_name);
      //   results.push(space);
      //   let cusDOB = freqcus.customer.DOB.split("T")[0];
      //   results.push("Customer DOB: ");
      //   results.push(cusDOB);
      //   results.push(space);
      //   results.push("Customer email: ");
      //   results.push(freqcus.customer.email);
      //   console.log(results);
      let temp = [
        freqcus.customer.cust_name,
        freqcus.customer.DOB.split("T")[0],
        freqcus.customer.email,
      ];
      console.log(temp);
      results.push(temp);

      setFreqCustomer(results);
    }
    fetchData();
  }, []);

  let heading = ["Customer Name", "DOB", "Customer Email Address"];

  return (
    <div className="card">
      <h1>Most Frequent Customers </h1>
      <h2>Displaying most frequent customer information</h2>
      {/* {<p>{JSON.stringify(flightData)}</p>} */}
      <Table heading={heading} body={freqCustomer} />
      {/* <div>{freqCustomer}</div> */}
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default MostFrequent;
