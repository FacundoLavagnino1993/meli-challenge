import React, { Component } from 'react';
// Import svg file, transpilated by svgr script.
import SearcherIcon from '../../Icons/SearcherIcon.js';
class SearcherBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searcherValue: '',
      productsResult: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  handleChange(event) {
    this.setState({searcherValue: event.target.value})
  }

  getProducts(event) {
    event.preventDefault();
    let query = this.state.searcherValue;
    console.log(query);
    fetch(`http://localhost:3000/api/items?q=${query}`)
    .then(response => response.json())
    .then(data => this.setState({productsResult: data}))
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <header className="nav-header">
        <a className="nav-logo" href="//localhost:3000/"></a>
        <div className="searcher-container">
          <form className="nav-search" onSubmit={this.getProducts}>
            <input className="nav-search-input" type="text"  placeholder="Nunca dejes de buscar" onChange={this.handleChange}>
            </input>
            <button className="nav-search-btn" type="submit">
            <div role="img" arial-label="Buscar" className="nav-icon-search">
              <SearcherIcon />
              </div>
            </button> 
          </form>
        </div>
      </header>
    )
  }
}

export default SearcherBox;