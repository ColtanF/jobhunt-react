import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
// import "semantic-ui-css/semantic.min.css";

import NavBar from "./NavBar";
import ViewJobs from "./ViewJobs";
import SingleJob from "./SingleJob";
import Home from "./Home";
import Error from "./Error";
import AddJob from "./AddJob";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/jobs">
          <ViewJobs />
        </Route>
        <Route path="/add_job">
          <AddJob />
        </Route>
        <Route path="/view_job/:id">
          <SingleJob />
        </Route>
        <Route path="/edit_job/:id">
          <AddJob />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
