import React, { Component, PropTypes } from 'react';
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
          <Link to="/"> <img src="https://http2.mlstatic.com/ui/navigation/5.1.1/mercadolibre/logo__large_plus.png"></img></Link>
          </div>
          <SearcherBox/>
        </div>
      </header>
    );
  }
}
