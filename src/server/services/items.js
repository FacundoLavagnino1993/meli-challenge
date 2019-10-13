const axios = require('axios');
const itemModel = require('../models/itemBuilder');
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
        const categoryId = this.findIdMajorCategory(response.data);
        console.log(categoryId);
        return this.getBreadcrumb(categoryId, response.data.results)
      }).then((response)=>{
        resolve(response);
      }).catch((error) => {
        reject(error.response);
      })
    })
  };

  getBreadcrumb(categoryId, items) {
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/categories/${categoryId}`,
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        resolve({
          category: response.data.path_from_root,
          items: items
        })
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
  findIdMajorCategory(data) {
    //searching category into all filters
    let categoriesValues = [];
    let allCategories = data.available_filters.find(element => element.id == "category");
    //searching top category result
    if (allCategories) {
      allCategories.values.forEach((value) => {
        categoriesValues.push(value.results);
      })
      let topResult = Math.max(...categoriesValues);
      //searching id category using topCategory result
      return allCategories.values.find(element => element.results === topResult).id;
    } else {
      return '';
    }
  }
}

module.exports = ProductService;