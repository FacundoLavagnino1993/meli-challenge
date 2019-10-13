const axios = require('axios');
//const API = 'https://api.mercadolibre.com';
const itemModel = require('../models/itemModel');
const config = require('../config/config');
const basePath = config.envConfig.api.basePath;

class ProductService {

  constructor() {};

  getProducts(query) {
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/sites/MLA/search?q=${query}&limit=4`,
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        //let categoryId = findMajorCategories(response.data.available_filters.find(element => element.id == "category"));
        let allCategories = response.data.available_filters.find(element => element.id == "category");
        //this.findMajorCategories(response.data.available_filters);

        console.log('##########');
        console.log(allCategories);
        resolve(itemModel(response.data));
      }).catch((error) => {
        reject(error.response);
      })
    })
  };

  /*getBreadcrumb(categoryId) {
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/categories/${categoryId}`,
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        console.log(response);
        //resolve(itemModel(response.data));
      }).catch((error) => {
        reject(error.response);
      })
    })
  }

 /* getProductsDetail(id) {
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/items/${id}`,
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
  /*getProductDescription(id) {
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
  }*/
  findIdMajorCategory(allCategories) {
    //find(element => element.id == "category")
    let allResultsCategories = [];
      /*allCategories.values.foreach(element => {
        allResultsCategories.push(element.results)});*/
    console.log('################');
    console.log(allResultsCategories);
    /*if (allCategories) {
      allCategories.foreach((element, index) => {
        
      })
    }*/
    
  }
}

module.exports = ProductService;