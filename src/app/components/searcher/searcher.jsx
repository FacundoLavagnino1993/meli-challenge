import React, { Component } from 'react';

export default class SearcherBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searcherValue: '',
      productsResult: [],
      errorRetrive: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  handleChange(event) {
    this.setState({searcherValue: event.target.value})
  }

  getProducts(event) {
    //event.preventDefault();
    /*const query = this.state.searcherValue;
    console.log(query);
    fetch(`/api/items?q=${query}`)
    .then(data => {
      this.setState({
        productsResult: data.json(),
      })
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        errorRetrive: true
      })
    })
    .finally(() => {
      console.log(window.location);
      /*if (window.location.pathname == '/' && !this.state.errorRetrive) {
        window.location.href = `/items?search=${query}`;
      }

    })*/
  };

  render() {
    return (
      <div className="searcher-container">
        <form className="nav-search" action="/items" method="GET" onSubmit={this.getProducts}>
          <input className="nav-search-input" type="text"  placeholder="Nunca dejes de buscar" onChange={this.handleChange}>
          </input>
          <button className="nav-search-btn" type="submit">
          <div role="img" arial-label="Buscar" className="nav-icon-search">
            <img src="bundles/images/ic_Search.png" />
            </div>
          </button> 
        </form>
      </div>
    )
  }
}