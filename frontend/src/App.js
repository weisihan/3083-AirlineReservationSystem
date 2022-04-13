import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./Router/Home/Home";
import Welcome from "./Components/Welcome";
import Register from "./Components/Register";
import ClientHome from "./Components/ClientHome";
import ClientReg from "./Components/ClientReg";
import StaffReg from "./Components/StaffReg";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";

function Layout() {
  return (
    <div>
      <nav>
        <Stack direction="row" spacing={2}>
          <Link to="/clientreg">
            <button className="btn"> Register as a client</button>
          </Link>{" "}
          <Link to="/staffreg">
            <button className="btn"> Register as a staff </button>
          </Link>
        </Stack>
      </nav>
      <div className="content"></div>
      <Outlet />
    </div>
  );
}
function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Welcome />} />
        <Route path="/clienthome" element={<ClientHome />} />
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/staffreg" element={<StaffReg />} />
          <Route path="/clientreg" element={<ClientReg />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
