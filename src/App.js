import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BreweryPage from "./components/BreweryPage";
import HomePage from "./components/HomePage";
import InputPage from "./components/InputPage";
import MyHeader from "./components/MyHeader";
import OneBrewPage from "./components/OneBrewPage";
import EditPerson from "./EditPerson";

export default function App() {
  return (
    <Router>
      <Container>
        <MyHeader />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/input" component={InputPage} />
          <Route exact path="/brew" component={BreweryPage} />
          <Route path="/brew/:id" component={OneBrewPage} />
          <Route path="/person/:id">
            <EditPerson />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
