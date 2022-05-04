import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Router/Home/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import ClientHome from "./Components/ClientHome";
import StaffHome from "./Components/StaffHome";
import ClientLog from "./Components/ClientLog";
import ClientReg from "./Components/ClientReg";
import StaffLog from "./Components/StaffLog";
import StaffReg from "./Components/StaffReg";

import MyFlights from "./Components/MyFlights";
import SearchFlights from "./Components/SearchFlights";
import PurchaseTicket from "./Components/PurchaseTicket";
import Review from "./Components/Review";
import TrackSpending from "./Components/TrackSpending";

import ViewFlights from "./Components/ViewFlights";
import NewFlight from "./Components/NewFlight";
import ChangeStatus from "./Components/ChangeStatus";
import NewAirplane from "./Components/NewAirplane";
import NewAirport from "./Components/NewAirport";
import ViewFeedback from "./Components/ViewFeedback";
import ViewReport from "./Components/ViewReport";

import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";

import AuthService from "./auth-service";
import { UserProvider } from "./contexts/user.context";

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
  const loggedIn = localStorage.getItem("loggedIn");

  return (
    <div>
      <UserProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/clienthome" element={<ClientHome />} />
          <Route path="/staffhome" element={<StaffHome />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/myflights" element={<MyFlights />} />
          <Route path="/searchflights" element={<SearchFlights />} />
          <Route path="/purchaseticket" element={<PurchaseTicket />} />
          <Route path="/review" element={<Review />} />
          <Route path="/trackspending" element={<TrackSpending />} />

          <Route path="/viewflights" element={<ViewFlights />} />
          <Route path="/newflight" element={<NewFlight />} />
          <Route path="/changestatus" element={<ChangeStatus />} />
          <Route path="/newairplane" element={<NewAirplane />} />
          <Route path="/newairport" element={<NewAirport />} />
          <Route path="/viewfeedback" element={<ViewFeedback />} />
          <Route path="/viewreport" element={<ViewReport />} />

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
      </UserProvider>
    </div>
  );
}

export default App;
