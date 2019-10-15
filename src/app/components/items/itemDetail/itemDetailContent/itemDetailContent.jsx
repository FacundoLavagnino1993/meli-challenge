import React, {Component} from 'react';

class ItemDetailContent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="item-box">
        <div className="item-detail-container">
          <div className="item-picture">
            <img src={this.props.itemResult.picture}></img>
          </div>
          <div className="item-info">
            <div className="item-seller-info">
              <span>{`${this.props.itemResult.condition} - ${this.props.itemResult.sold_quantity} vendidos`}</span>
            </div>
            <div className="item-title">
              <span>{this.props.itemResult.title}</span>
            </div>
            <div className="item-price">
              <span className="price-currency">{this.props.itemResult.price.currency}</span>
              <span className="price-amount">{this.props.itemResult.price.amount}</span>
              <span className="price-decimal">{this.props.itemResult.price.decimals}</span>
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
            {this.props.itemResult.description}
          </div>
        </div>
      </div>
    )
  }

}

export default ItemDetailContent;