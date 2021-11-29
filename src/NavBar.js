import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("logged_in"));
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("logged_in");
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
  };
  return (
    <div className="ui menu">
      <Link to="/" className="item header">
        <i className="home icon"></i>JobHunt
      </Link>
      {isLoggedIn && (
        <Link to="/jobs" className="item">
          Jobs
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/add_job" className="item">
          <i className="plus icon"></i> Add Job
        </Link>
      )}

      {isLoggedIn ? (
        <div className="right menu">
          <Link to="/" className="item" onClick={handleLogout}>
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="right menu">
          <Link to="/register" className="item">
            Register
          </Link>
          <Link to="/login" className="item">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
