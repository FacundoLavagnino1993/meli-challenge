const express = require('express');
const router  = express.Router();
const ProductService = require('../services/items');
const productService = new ProductService();
const ItemBuilder = require('../models/itemBuilder');

router.get('/items', (req, res) => {
  productService.getProducts(req.query.q)
  .then((response) => {
    res.json(ItemBuilder({
      data: response,
      origin: 'getProductsService'
    }));
  }).catch((error)=> {
    console.log('###########');
    res.status(error.status).send(error.data);
  });
})

router.get(['/items/:id'], (req, res) => {
  productService.getProductDetail(req.params.id)
  .then((response) => {
    res.json(ItemBuilder({
      data: response,
      origin: 'getProductDetailService'
    }));
  }).catch((error)=> {
    res.status(error.status).send(error.data);
  });
})

module.exports = router;