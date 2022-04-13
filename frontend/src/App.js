import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./Router/Home/Home";
import Welcome from "./Components/Welcome";
import Register from "./Components/Register";
import ClientHome from "./Components/ClientHome";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/clientreg">Client Registeration</Link> |{" "}
        <Link to="/staffreg">Staff Registeration</Link>
      </nav>
      <div className="content"></div>
      <Outlet />
    </div>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Welcome />} />
      <Route path="/clienthome" element={<ClientHome />} />
      <Route path="/" element={<Layout />}>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/staffreg" element={<StaffReg />} />
        <Route path="/clientreg" element={<ClientReg />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
