import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Survey from "./pages/Survey";

function AppRouter() {
  return (
    <Router>
      <Route exact path="/" component={Dashboard} />
      <Route path="/surveys/:id" component={Survey} />
    </Router>
  );
}

export default AppRouter;
