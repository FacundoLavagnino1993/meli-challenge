import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';
const routes_api = require('./routes/api.routes');

const app = express();

app.use(express.static('public'));
app.use('/api', routes_api);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get(['/', '/items*' ], async (req, res) => {
  try {
    res.sendFile(path.join(__dirname+'/index.html'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(config.port, config.host, () => {
  console.info(`Running on ${config.host}:${config.port}...`);
});
