import React from "react";
import { Link, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Message } from "semantic-ui-react";

export default function Home() {
  const location = useLocation();
  return (
    <main>
      <section className="ui container center aligned">
        {location.state &&
          location.state.action &&
          location.state.action === "registered" && (
            <Message success>
              User registered successfully. Please log in.
            </Message>
          )}
        {location.state &&
          location.state.action &&
          location.state.action === "logged_in" && (
            <Message success>User logged in successfully.</Message>
          )}
        <h1>Welcome to JobHunt</h1>
        <h2 className="header">
          Go to the <Link to="/jobs">Jobs page</Link> or
          <Link to="/add_job">Add a new job.</Link>
        </h2>
      </section>
    </main>
  );
}
