import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SearcherBox from '../searcher/searcher.jsx';


export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header> 
        <div className="header-ctn">
          <div className="header-logo">
            <Link to="/" />
          </div>
          <SearcherBox />
        </div>
      </header>
    );
  }
}
