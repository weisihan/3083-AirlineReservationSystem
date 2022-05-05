import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table.component";
import { UserContext } from "../contexts/user.context";

function TicketsSold() {
  const [ticketsSold, showTicketsSold] = useState([]);
  const { airlineName } = useContext(UserContext);
  const { airline_name } = airlineName;

  const [details, setDetails] = useState({
    company: "",
  });

  details.company = airlineName;

  useEffect(() => {
    async function fetchData() {
      //console.log(airline_name);
      let tickets = await axios.post(
        "http://localhost:3001/ticketsold",
        details
      );

      tickets = tickets.data;
      console.log(tickets);
      console.log("-----");
      let results = [];
      for (let i = 0; i < tickets.length; i++) {
        let temp = [
          tickets[i].ID,
          tickets[i].sold_price,
          tickets[i].card_number,
          tickets[i].card_type,
          tickets[i].exp_date.split("T")[0],
          tickets[i].name_on_card,
          tickets[i].purchase_date.split("T")[0],
          tickets[i].airline_name,
          tickets[i].flight_num,
          tickets[i].dept_date.split("T")[0],
          tickets[i].dept_time,
        ];
        results.push(temp);
      }
      showTicketsSold(results);
      console.log(results);
    }
    fetchData();
  }, []);
  let heading = [
    "ID",
    "Sold Price",
    "Card Number",
    "Card Type",
    "Expiration Date",
    "Name on Card",
    "Purchase Date",
    "Airline Name",
    "Flight Number",
    "Departure Date",
    "Departure Time",
  ];
  return (
    <div className="card">
      <h1>Tickets Sold</h1>
      <h2>Displaying tickets sold within a year</h2>
      <Table heading={heading} body={ticketsSold} />
      <br></br>
      <div className="actions">
        <Link to="/staffhome">
          <button className="btn">Go to staff home</button>
        </Link>
      </div>
    </div>
  );
}

export default TicketsSold;
