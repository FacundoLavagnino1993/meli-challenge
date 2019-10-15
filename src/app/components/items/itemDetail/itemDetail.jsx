import React, {Component} from 'react';
import Breadcrumb from '../../breadcrumb/breadcrumb.jsx';
import Helpers from '../../../helpers/amountParser.jsx';
import NotFound from '../../errors/notFound.jsx';
import AppError from '../../errors/appError.jsx';
import ItemDetailComponent from './itemDetailContent/itemDetailContent.jsx';
class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.getProdocutDetail = this.getProdocutDetail.bind(this);
    this.state = {
      itemResult: {
        picture: '',
        condition: '',
        sold_quantity: '',
        title: '',
        price: {
          amount: '',
          currency: '',
          decimals: ''
        },
        description: ''
      },
      breadcrumb: [],
      notFound: false,
      errorAplication: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    if(this.props.match && this.props.match.params) {
      const id = this.props.match.params.id;
      this.getProdocutDetail(id);
    } else {
      this.setState({
        errorAplication: true
      })
    }
  }

  handleErrors(response) {
    if (!response.ok && response.status == 404) {
      this.setState({
        loading: false,
        errorAplication: false,
        notFound: true
      })
      throw Error();
    }
    return response.json();
  }

  getProdocutDetail(id) {
    fetch(`/api/items/${id}`)
    .then(response => this.handleErrors(response))
    .then(data => {
      this.setState({
        breadcrumb: data.categories,
        notFound: false,
        errorAplication: false,
        itemResult: {
          picture: data.item.picture,
          condition: data.item.condition ? 'Nuevo' : 'Usado',
          sold_quantity: data.item.sold_quantity,
          title: data.item.title,
          price: {
            amount: Helpers.amountPriceParser(data.item.price.amount),
            decimals: Helpers.decimalPriceParser(data.item.price.decimals),
            currency: Helpers.currencyParser(data.item.price.currency) 
          },
          description: data.item.description
        },
        loading: false
      })
    }).catch(() => {
      if (!this.state.notFound) {
        this.setState({
          loading: false,
          notFound: false,
          errorAplication: true
        })
      } 
    })
  };

  renderHandler() {
    let render = '';
    switch(true) {
      case  this.state.loading:
              render = (<div></div>)
                break;
      case  !this.state.loading,
            this.state.errorAplication:
              render = (<AppError />);
                break;
      case  !this.state.loading,
            this.state.notFound:
              render = (<NotFound />);
                break;
      case  !this.state.loading,
            !this.state.errorAplication,
            !this.state.notFound:
              render = <ItemDetailComponent itemResult={this.state.itemResult} />
                break;    
    }
    return render;
  } 

  render() {
    return (
      <div className="section-main">
        {this.state.breadcrumb.length > 0 ? <Breadcrumb data={this.state.breadcrumb} /> : <div className="space-breadcrumb"></div>}
        <div className="card-container">
          {this.renderHandler()}
        </div>
      </div>
    );
  }
}

export default ItemDetail;