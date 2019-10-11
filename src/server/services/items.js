const axios = require('axios');
const API = 'https://api.mercadolibre.com';
const itemModel = require('../models/itemModel');
const config = require('../config/config');
const basePath = config.envConfig.api.basePath;

class ProductService {

  constructor() {};

  getProducts(query) {
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/sites/MLA/search?q=${query}`,
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        resolve(itemModel(response.data));
      }).catch((error) => {
        reject(error.response);
      })
    })
  };

}

module.exports = ProductService;