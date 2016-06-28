import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App.jsx';
import Home from './containers/Home.jsx';
import NoMatch from './containers/NoMatch.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/*" component={NoMatch} />
  </Route>
);
