const axios = require('axios');
const itemModel = require('../models/itemBuilder');
const config = require('../config/config');
const basePath = config.envConfig.api.basePath;

class ProductService {

  constructor() {};

  getProducts(query) {
    let productResults = {};
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/sites/MLA/search?q=${query}&limit=4`,
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((products) => {
        productResults = products.data.results;
        const categoryId = this.findIdMajorCategory(products.data);
        return this.getBreadcrumb(categoryId);
      }).then((breadcrumb)=>{
        resolve({
          items: productResults,
          category: breadcrumb
        })
      }).catch((error) => {
        console.log(error);
        reject(error.response);
      })
    })
  };

  getBreadcrumb(categoryId) {
    if (categoryId) {
      return new Promise((resolve, reject) => {
        axios({
          'method': 'GET',
          'url': `${basePath}/categories/${categoryId}`,
          'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((response) => {
          resolve(response.data.path_from_root)
        }).catch((error) => {
          reject(error.response);
        })
      })
    } else {
      return new Promise((resolve) => {
        console.log('error categoryId params not valid on getBreadcrumb service');
        resolve([]);
      })
    }
    
  }

  getProductDetail(id) {
    let productDetail = {};
    let productDescription = {};
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/items/${id}`,
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        productDetail = response.data;
        return this.getProductDescription(id);
      }).then((description) => {
        productDescription = description;
        return this.getBreadcrumb(productDetail.category_id);
      }).then((breadcrumb) => {
        resolve({
          item: productDetail,
          description: productDescription.plain_text,
          category: breadcrumb
        })
      }).catch((error) => {
        console.log(error);
        reject(error);
      })
    })
  };

  getProductDescription(id) {
    return new Promise((resolve, reject) => {
      axios({
        'method': 'GET',
        'url': `${basePath}/items/${id}/description`,
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        console.log(error);
        reject(error.response);
      })
    })
  }
  findIdMajorCategory(data) {
    //searching category into all filters
    let categoriesValues = [];
    let allCategories = data.available_filters.find(element => element.id == "category");
    //searching top category result
    if (allCategories) {
      allCategories.values.forEach((value) => {
        categoriesValues.push(value.results);
      })
      const topResult = Math.max(...categoriesValues);
      //searching id category using topCategory result
      return allCategories.values.find(element => element.results === topResult).id;
    } else if (!allCategories){
      //If not found any category in available_filters, will get id from filter default value
      const defaultCategory = data.filters.find(element => element.id == "category");
      return defaultCategory ? defaultCategory.values[0].id : false;
    } else {
      return false;
    }
  }
}

module.exports = ProductService;