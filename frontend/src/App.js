import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./Router/Home/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ClientHome from "./Components/ClientHome";
import ClientLog from "./Components/ClientLog";
import ClientReg from "./Components/ClientReg";
import StaffLog from "./Components/StaffLog";
import StaffReg from "./Components/StaffReg";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";

function RegisterLayout() {
  return (
    <div>
      <nav>
        <Stack direction="row" spacing={2}>
          <Link to="/clientreg">
            <button className="btn"> Client</button>
          </Link>{" "}
          <Link to="/staffreg">
            <button className="btn"> Staff </button>
          </Link>
        </Stack>
      </nav>
      <div className="content"></div>
      <Outlet />
    </div>
  );
}

function LoginLayout() {
  return (
    <div>
      <nav>
        <Stack direction="row" spacing={2}>
          <Link to="/clientlog">
            <button className="btn"> Client</button>
          </Link>{" "}
          <Link to="/stafflog">
            <button className="btn"> Staff </button>
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
        <Route path="/clienthome" element={<ClientHome />} />
        <Route path="/" element={<RegisterLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/staffreg" element={<StaffReg />} />
          <Route path="/clientreg" element={<ClientReg />} />
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/stafflog" element={<StaffLog />} />
          <Route path="/clientlog" element={<ClientLog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
