import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import withAuth from './withAuth';
import Home from './home';
import Login from './login';

function App() {
  return (
    <div className="App">
      <Router>
      	<Switch>
      	  <Route path="/" exact component={withAuth(Home)} />
      	  <Route path="/login" component={Login} />
      	</Switch>
      </Router>
    </div>
  );
}

export default App;
