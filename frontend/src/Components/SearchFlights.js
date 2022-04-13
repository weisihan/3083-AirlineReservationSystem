import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function SearchFlights() {
  return (
    <div className="card">
      <h1>Search for flights </h1>
      <div className="actions">
        <Stack component="form" noValidate spacing={3}>
          <TextField
            id="date"
            label="Choose a date"
            type="date"
            defaultValue="2022-05-05"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
