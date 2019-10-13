// Import Node Modules
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

// Import React Components
import App from "./App.jsx";
import Items from "./components/items/items.jsx";
import ItemDetail from "./components/items/itemDetail/itemDetail.jsx";
class AppRoutes extends Component {

  constructor (props) {
    super(props);
  }


  render() {
    return (
      <App>
        <Switch>
          <Route exact path="/"/>
          <Route exact path="/items" component={Items} />
          <Route exact path="/items/:id" component={ItemDetail} />
        </Switch>
      </App>
    )
  }
}

export default AppRoutes;