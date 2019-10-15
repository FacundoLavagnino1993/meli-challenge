import React, { Component } from 'react';
import ItemListElement from './itemListElement/ItemListElement.jsx';
import Breadcrumb from '../breadcrumb/breadcrumb.jsx';
import NotFound from '../errors/notFound.jsx';
import AppError from '../errors/appError.jsx';
class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsResult: [],
      breadcrumb: [],
      retriveFail: false,
      errorAplication: false,
      noContent: false,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    if (this.props.location && this.props.location.search) {
      const unparsedQuery = this.props.location.search;
      this.builderQuery(unparsedQuery);
    } else {
      this.setState({
        errorAplication: true,
        loading: false
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
          noContent: true,
          errorAplication: false,
          retriveFail: false,
          loading: false
        })
      } else {
        this.setState({
          itemsResult: data.items,
          breadcrumb: data.categories,
          noContent: false,
          errorAplication: false,
          retriveFail: false,
          loading: false
        });
      }
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        retriveFail: true,
        loading: false
      })
    })
  };
  renderHandler() {
    let render = '';
    switch(true) {
      case  this.state.loading:
              render = (<div></div>)
                break;
      case  !this.state.loading,
            this.state.errorAplication, 
            this.state.retriveFail:
              render = (<AppError />);
                break;
      case  !this.state.loading,
            this.state.noContent:
              render = (<NotFound />);
                break;
      case  !this.state.loading,
            !this.state.errorAplication,
            !this.state.retriveFail,
            !this.state.noContent:
              render = (this.state.itemsResult.map((element, index) => <ItemListElement data={element} key={index}/>));
                break;    
    }
    return render;
  } 

  render() {
    return (
      <div className="section-main">
        {this.state.breadcrumb.length > 0 ? <Breadcrumb data={this.state.breadcrumb} /> : <div className="space-breadcrumb"></div>}
        <ul className="card-container">
          {this.renderHandler()}
        </ul>
      </div>
    );
  }
}
export default Items;