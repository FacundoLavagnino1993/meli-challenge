import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
//import { createBrowserHistory } from 'history'
import AppRoutes from './app/AppRoutes.jsx';
//imports files to webpack bundler
import './styles/index.scss';
import icon from './Icons/ic_Search.png';

ReactDOM.render(
    <Router>
      <AppRoutes />
    </Router>,
  document.getElementById('root')
);
