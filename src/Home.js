import React from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

export default function Home() {
  return (
    <main>
      <section className="ui container center aligned">
        <h1>Welcome to JobHunt</h1>
        <h2 className="header">
          Go to the <Link to="/jobs">Jobs page</Link> or
          <Link to="/add_job">Add a new job.</Link>
        </h2>
      </section>
    </main>
  );
}
