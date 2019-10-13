import React, {Component} from 'react';

export default class Helper extends Component {
  constructor(props) {
    super(props);
  }

  static amountPriceParser(amount) {
    const point = '.';
    const decimal = ','
    let splitStr = amount.toString().split('.');
    let splitLeft = splitStr[0];
    let splitRight = splitStr.length > 1 ? decimal + splitStr[1] : '';
    const regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, `$1.$2`);
    }
    return `${splitLeft}${splitRight}`;
  }

  static currencyParser(currency) {
    switch(currency) {
      case 'ARS':
          currency = '$';
          break;
      case 'USD':
          currency = 'U$D';    
          break;
    }
    return currency;
  }

}