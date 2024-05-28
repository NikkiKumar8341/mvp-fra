import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import RequireAuth from "./components/routing/RequiredAuth";
import Missing from "./components/missing/Missing";
import RepresentativeBoard from "./components/representative/RepresentativeBoard";
import FrList from "./components/admin/FrList";
import SitesList from "./components/admin/SitesList";
import Customer from "./components/admin/Customer";
import Admin from "./components/admin/Admin";
import Analytics from "./components/admin/Analytics";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const ROLE = {
    CUSTOMER: "CUSTOMER",
    ADMIN: "ADMIN",
    REPRESENTATIVE: "REPRESENTATIVE",
    // Add other roles as needed
  };

  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} errorElement={<Missing />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={<RequireAuth allowedRoles={[ROLE.CUSTOMER]} />}
            >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route
              path="/admin/*"
              element={<RequireAuth allowedRoles={[ROLE.ADMIN]} />}
            >
              <Route path="analytics" element={<Analytics />} />
              <Route path="frList" element={<FrList />} />
              <Route path="sitesList" element={<SitesList />} />
              <Route path="customer" element={<Customer />} />
            </Route>

            <Route
              path="/"
              element={<RequireAuth allowedRoles={[ROLE.REPRESENTATIVE]} />}
            >
              <Route path="/representative" element={<RepresentativeBoard />} />
            </Route>
            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
