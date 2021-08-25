import "semantic-ui-css/semantic.min.css";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="item header">
        <i className="home icon"></i>JobHunt
      </Link>
      <Link to="/jobs" className="item">
        Jobs
      </Link>
      <Link to="/add_job" className="item">
        <i className="plus icon"></i> Add Job
      </Link>
      <div className="right menu">
        <Link to="/register" className="item">
          Register
        </Link>
        <Link to="/register" className="item">
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
