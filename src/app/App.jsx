import React, { Component, PropTypes } from 'react';
import AppHeader from './components/header/header.jsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    return (
      <div>   
        <AppHeader/>
        <div className="app-content" >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;