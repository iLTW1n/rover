import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Home } from 'pages';

import 'utils/axios';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
);

export default App;
