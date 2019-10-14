import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Helpers from '../../../helpers/amountParser.jsx';

class ItemListElement extends Component {
  constructor(props) {
    super(props);
  }
//<span className="price-decimal">{`${this.props.data.price.decimals}`}</span>
  formatCurrency(currency) {
    return Helpers.currencyParser(currency);
  };

  formatAmount(amount) {
    return Helpers.amountPriceParser(amount);
  }

  formatDecimal(decimal) {
    return Helpers.decimalPriceParser(decimal);
  }

  render() {
    return (<li className="item-element">
      <Link to={`/items/${this.props.data.id}`}>
        <div className="item-element-image">
          <img src={this.props.data.picture} width="160px" height="180px"/>
        </div>
        <div className="item-element-info-ctn">
          <div className="item-price-shipping-ctn">
            <div className="item-element-price">
              <span className="price-currency">{`${this.formatCurrency(this.props.data.price.currency)}`}</span>
              <span className="price-amount">{`${this.formatAmount(this.props.data.price.amount)}`}</span>
              <span className="price-decimal">{`${this.formatDecimal(this.props.data.price.decimals)}`}</span>
            </div>
            <span className="item-shipping">{this.props.data.free_shipping ? 'Envío gratis' : null}</span>
          </div>
          <span className="item-element-title">{this.props.data.title}</span>
        </div>
        <div className="item-element-location">
          <span>{this.props.data.address}</span>
        </div>
      </Link>
    </li>);
  }
}

export default ItemListElement;