// Import Node Modules
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

// Import React Components
import App from "./App.jsx";
import AppHeader from "./components/header/header.jsx";
import Items from "./components/items/items.jsx";

class AppRoutes extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <App>
        <Switch>
          <Route exact path="/" component={ AppHeader } />
          <Route exact path="/items" component={ Items } />
        </Switch>
      </App>
    )
  }
}

export default AppRoutes;