//import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
//import morgan from 'morgan';
import serialize from 'serialize-javascript';

import config from './config/config';
import ProductService from './services/items';

const router  = express.Router();
//const request = require('request');
//import request from 'request';
var routes_api = require('./routes/api.routes');

const app = express();
const productService = new ProductService();

app.use(express.static('public'));
app.use('/api', routes_api);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.serialize = serialize;

try {
  app.locals.meliChallenge = require('../../.reactful.json');
} catch (err) {
  app.locals.meliChallenge = {};
}

app.get(['/', '/items'], async (req, res) => {
  try {
    res.sendFile(path.join(__dirname+'/index.html'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/*
app.get('/items/:id', async (req, res) => {
  try {
    const vars = await serverRenderer();
    res.render('index', vars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});*/

app.get('/api/items', async (req, res) => {
  productService.getProducts(req.query.q)
    .then((response) => {
      res.json(response);

    }).catch((error)=> {
      console.log(error);
      res.status(error.status);
    });
})

app.listen(config.port, config.host, () => {
  /*fs.writeFileSync(
    path.resolve('.reactful.json'),
    JSON.stringify(
      { ...app.locals.meliChallenge, host: config.host, port: config.port },
      null,
      2
    )
  );*/

  console.info(`Running on ${config.host}:${config.port}...`);
});
