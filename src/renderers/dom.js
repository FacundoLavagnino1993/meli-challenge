import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

import { SearcherBox } from 'components/searcher/searcher';
import { App } from 'components/App';
import '../styles/index.scss';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.hydrate(
  routing,
  document.getElementById('root')
);
