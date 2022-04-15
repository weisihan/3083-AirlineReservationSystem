import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function SearchFlights() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className="card">
      <h1>Search for flights </h1>
      <div className="actions">
        <Stack component="form" noValidate spacing={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={selectedDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider>
        </Stack>
        <br></br>
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default SearchFlights;
