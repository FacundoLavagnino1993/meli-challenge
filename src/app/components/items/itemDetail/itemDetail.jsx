import React, {Component} from 'react';
import Breadcrumb from '../../breadcrumb/breadcrumb.jsx';
import Helpers from '../../../helpers/amountParser.jsx';
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
        } 
      },
      breadcrumb: [],
      description: '',
      retriveFail: false,
      errorAplication: false,
      loading: false
    };
  }

  componentDidMount() {
    if(this.props.match && this.props.match.params) {
      this.setState({
        loading: true
      });
      const id = this.props.match.params.id;
      this.getProdocutDetail(id);
    } else {
      this.setState({
        errorAplication: true
      })
    }
  }

  getProdocutDetail(id) {
    fetch(`/api/items/${id}`)
    .then(data => data.json())
    .then(data => {
      this.setState({
        breadcrumb: data.categories,
        description: data.description,
        retriveFail: false,
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
          }
        },
        loading: false
      })
    }).catch((error) => {
      console.log(error);
      this.setState({
        retriveFail: true
      })
    })
  };

  render() {
    return (
    <div className="section-main">
      {this.state.breadcrumb.length > 0 ? <Breadcrumb data={this.state.breadcrumb} /> : <div></div>}
      <div className="card-container">
        {!this.state.loading ? 
        <div className="item-box">
          <div className="item-detail-container">
            <div className="item-picture">
              <img src={this.state.itemResult.picture}></img>
            </div>
            <div className="item-info">
              <div className="item-seller-info">
                <span>{`${this.state.itemResult.condition} - ${this.state.itemResult.sold_quantity} vendidos`}</span>
              </div>
              <div className="item-title">
                <span>{this.state.itemResult.title}</span>
              </div>
              <div className="item-price">
                <span className="price-currency">{this.state.itemResult.price.currency}</span>
                <span className="price-amount">{this.state.itemResult.price.amount}</span>
                <span className="price-decimal">{this.state.itemResult.price.decimals}</span>
              </div>
              <div className="item-buy-btn">
                <button>Comprar</button>
              </div>
            </div>
          </div>
          <div className="item-description-container">
            <div className="description-title">
              <h2>Descripción del producto</h2>
            </div>
            <div className="description-content">
              {this.state.description}
            </div>
          </div>
        </div>
         : <div></div>} 
      </div>
    </div>);
  }
}

export default ItemDetail;