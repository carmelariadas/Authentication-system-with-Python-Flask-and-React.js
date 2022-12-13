import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light ">
      <div className="container justify-content-between">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary me-5">
              Check the Context in action
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary me-5">Log Out</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary">Log In</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
