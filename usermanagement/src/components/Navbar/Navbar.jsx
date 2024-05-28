import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import useAuth from "../routing/useAuth";

function NavBar() {
  // Use React Router's hooks to get the current location and navigation functions
  const location = useLocation();
  const navigate = useNavigate();

  const { auth, setAUth } = useAuth();

  console.log(location);

  const LOGOUT_URL =
    "https://usermanagement-jav.motivitylabs.com/api/user/signout";

  const role = localStorage.getItem("role");

  const userName = localStorage.getItem("userName");

  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      const currentTime = Date.now();
      const fifteenMinutes = 1 * 60 * 1000;

      if (currentTime - lastActivityTime > fifteenMinutes && auth.token) {
        handleLogout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(inactivityTimer);
  }, [lastActivityTime, auth.token]);

  const updateLastActivityTime = () => setLastActivityTime(Date.now());

  
  // Function to handle the logout action
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const emailString = localStorage.getItem("email");
      const userName = localStorage.getItem("userName");
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: emailString,
          refreshToken,
        }),
      });
      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        localStorage.removeItem("siteId");
        localStorage.removeItem("role");
        navigate("/");
      } else {
        console.error("Logout failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  

  // Extract the first character, space, and the following character from the input string
  const inputString = userName ? userName : "";

  function extractFirstCharSpaceAndFollowingChar(inputString) {
    const spaceIndex = inputString.indexOf(" ");

    if (spaceIndex !== -1 && spaceIndex < inputString.length - 1) {
      const firstChar = inputString.charAt(0);
      const followingChar = inputString.charAt(spaceIndex + 1);
      return firstChar + followingChar;
    } else {
      return "";
    }
  }

  extractFirstCharSpaceAndFollowingChar(inputString);

  // Call the extraction function and store the result
  const result = extractFirstCharSpaceAndFollowingChar(inputString);

  return (
    <Navbar className="navbar-custom" expand="md">
      <NavbarBrand href="/" className="navbar-brand-custom">
        <span className="circle">P</span> Proximity
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        {location?.pathname === "/dashboard" ||
        location?.pathname === "/admin/" ||
        location?.pathname === '/admin/customer' ||
        location?.pathname === '/admin/frList' ||
        location?.pathname === '/admin/sitesList' ||
        location?.pathname === '/admin/analytics' ||
        location?.pathname === "/representative" ? (
          <>
            <NavItem>
              <Link to="/" className="nav-link" onClick={handleLogout}>
                <button
                  type="submit"
                  className="btn-sm button rounded border-0 text-light py-1 mx-auto"
                >
                  Logout
                </button>
              </Link>
            </NavItem>
            <NavItem>
              <span className="circle p-2">{result}</span>
            </NavItem>
          </>
        ) : (
          <>
            {location.pathname === "/login" ? (
              <NavItem>
                <NavLink href="/register">
                  <button
                    type="submit"
                    className="btn-sm button rounded border-0 text-light py-1 mx-auto"
                  >
                    Register
                  </button>
                </NavLink>
              </NavItem>
            ) : location.pathname === "/register" ? (
              <NavItem>
                <NavLink href="/login">
                  <button
                    type="submit"
                    className="btn-sm button rounded border-0 text-light py-1 mx-auto"
                  >
                    Login
                  </button>
                </NavLink>
              </NavItem>
            ) : location.pathname === "/" && role === "CUSTOMER" ? (
              <>
                <NavItem>
                  <Link to="/dashboard" className="nav-link">
                    <button
                      type="submit"
                      className="btn-sm button rounded border-0 text-light py-1 mx-auto"
                    >
                      dashboard
                    </button>
                  </Link>
                </NavItem>
              </>
            ) : location.pathname === "/" && role === "REPRESENTATIVE" ? (
              <>
                <NavItem>
                  <Link to="/representative" className="nav-link">
                    <button
                      type="submit"
                      className="btn-sm button rounded border-0 text-light py-1 mx-auto"
                    >
                      dashboard
                    </button>
                  </Link>
                </NavItem>
              </>
            ) : location.pathname === "/" && role === "ADMIN" ? (
              <>
                <NavItem>
                  <Link to="/admin" className="nav-link">
                    <button
                      type="submit"
                      className="btn-sm button rounded border-0 text-light py-1 mx-auto"
                    >
                      dashboard
                    </button>
                  </Link>
                </NavItem>
              </>
            ) : location.pathname === "/" ? (
              <>
                <NavItem>
                  <Link to="/register">
                    <button
                      type="submit"
                      className="btn-sm button rounded border-0 text-light py-1 mb-2 mx-auto"
                    >
                      Register
                    </button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/login">
                    <button
                      type="submit"
                      className="btn-sm button rounded border-0 text-light py-1 mx-auto"
                      style={{ marginLeft: "10px" }}
                    >
                      Login
                    </button>
                  </Link>
                </NavItem>
              </>
            ) : null}
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
