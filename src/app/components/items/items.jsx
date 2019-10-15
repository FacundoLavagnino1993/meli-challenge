import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItemListElement from './itemListElement/itemListElement.jsx';
import Breadcrumb from '../breadcrumb/breadcrumb.jsx';
import NotFound from '../errors/notFound.jsx';
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

  handleErrors(response) {
    if (!response.ok) {
      console.log(response);
      throw Error(response.statusText);
    }
    return response.json();
  }

  getProducts(params) {
    fetch(`/api/items?q=${params}`)
    .then(response => this.handleErrors(response))
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
//{!this.state.noContent ? this.state.itemsResult.map((element, index) => <ItemListElement data={element} key={index}/>) : <NotFound />}
  renderHandler() {
    if (this.state.noContent && !this.state.retriveFail) {
      return (<NotFound />);
    } else if (!this.state.noContent) {
      return (this.state.itemsResult.map((element, index) => <ItemListElement data={element} key={index}/>));
    } 
  } 

  render() {
    return (
      <div className="section-main">
        {this.state.breadcrumb.length > 0 ? <Breadcrumb data={this.state.breadcrumb} /> : <div className="space-breadcrumb"></div>}
        <ul className="card-container item">
          {this.renderHandler()}
        </ul>
      </div>
    );
  }
}
export default Items;