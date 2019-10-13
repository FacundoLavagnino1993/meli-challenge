import React, { Component, PropTypes } from 'react';

export default class SearcherBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searcher-container">
        <form className="nav-search" action={`/items?`} method="GET">
          <div className="input-button-container">
            <input name="search" flex="75" className="nav-search-input" type="text"  placeholder="Nunca dejes de buscar"></input>
            <button className="nav-search-btn" flex="25" type="submit">
              <div role="img" arial-label="Buscar" className="nav-icon-search">
                <img src="/images/ic_Search.png" />
              </div>
            </button>
          </div>
        </form>
      </div>
    )
  }
}