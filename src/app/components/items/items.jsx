import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItemListElement from './itemListElement/itemListElement.jsx';
class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsResult: [],
      breadcrumb: [],
      retriveFail: false,
      errorAplication: false,
      noContent: false
    }
    this.builderQuery = this.builderQuery.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const unparsedQuery = this.props.location.search;
      this.builderQuery(unparsedQuery);
    } else {
      this.setState({
        errorAplication: true
      })
    }
  }

  builderQuery(unparsedQuery) {
    const query = unparsedQuery.split('+').join('-');
    let params = {};
    let tokens;
    let re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(query)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    this.getProducts(params.search);
  }

  getProducts(params) {
    fetch(`/api/items?q=${params}`)
    .then(data => data.json())
    .then(data => {
      if (data.items.length === 0) {
        this.setState({
          itemsResult: [],
          breadcrumb: [],
          noContent: true
        })
      } else {
        this.setState({
          itemsResult: data.items,
          breadcrumb: data.categories,
          noContent: false
        });
      }
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        retriveFail: true
      })
    })
  };

  render() {
    return (
      <div className="section-main">
        <div className="breadcrumb-box">
          { this.state.breadcrumb.map((category, index) => <div className="breadcrumb-container" key={index}><span className="breadcrumb-text">{`${category}`}</span><span className="breadcrumb-symbol">{">"}</span></div>)}
        </div>
        <ul className="card-container item">
          { this.state.itemsResult.map((element, index) => <ItemListElement data={element} key={index}/>) }
        </ul>
      </div>
    );
  }
}
export default Items;