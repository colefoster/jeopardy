import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink, useLocation } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  const location = useLocation();

  // Define an array of routes where the navbar should be hidden
  const hiddenRoutes = ["/play", "/another-route-to-hide-navbar-on"];

  // Check if the current route is in the hiddenRoutes array
  const isHidden = hiddenRoutes.includes(location.pathname);

  // If the current route is in the hiddenRoutes array, return null to hide the navbar
  if (isHidden) {
    return null;
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
        <img style={{"width" : 100 + '%'}} alt="" src="https://www.jeopardy.com/themes/jeopardy/logo.png"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <NavLink className="nav-link" to="/questions">
                <b>Questions Search</b>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                <b>Categories Search</b>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                <b>Create Custom Question</b>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/userQuestions">
                <b>View Custom Questions</b>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
