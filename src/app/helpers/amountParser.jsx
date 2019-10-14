import React, {Component} from 'react';

export default class Helper extends Component {
  constructor(props) {
    super(props);
  }
  //Parser int amount (*.***)
  static amountPriceParser(amount) {
    //delete decimals
    let amountWithoutDecimals = parseInt(amount);
    let amountString = amountWithoutDecimals.toString();
    const regx = /(\d+)(\d{3})/;
    while (regx.test(amountString)) {
      amountString = amountString.replace(regx, `$1.$2`);
    }
    return amountString;
  }
  //Parser decimal amount (.**)
  static decimalPriceParser(decimal) {
    const doubleZero = "00";
    let decimalParsed;
    if (decimal == 0) {
      decimalParsed = doubleZero;
    } else {
      decimalParsed = decimal.toString().slice(2,4);
    }
    return decimalParsed;
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