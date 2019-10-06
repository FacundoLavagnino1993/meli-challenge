import React, { Component } from 'react';
import SearcherIcon from '../../Icons/SearcherIcon.js';

class SearcherBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searcher-container">
        <form className="nav-search" submit="search">
          <input className="nav-search-input" type="text" placeholder="Nunca dejes de buscar">
          </input>
          <button className="nav-search-btn" type="submit">
          <div role="img" arial-label="Buscar" className="nav-icon-search">
            <SearcherIcon />
            </div>
          </button> 
        </form>
      </div>
    )
  }
}

export default SearcherBox;