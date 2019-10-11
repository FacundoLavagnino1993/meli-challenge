const express = require('express');
const router  = express.Router();
const request = require('request');
const app = express();
const ProductService = require('../services/items');
const productService = new ProductService();

router.get('/items', (req, res) => {
  productService.getProducts(req.query.q)
  .then((response) => {
    res.json(response);

  }).catch((error)=> {
    console.log(error);
    res.status(error.status);
  });
})


module.exports = router;