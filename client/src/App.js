import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './home';
import Login from './login';

function App() {
  return (
    <div className="App">
      <Router>
      	<Switch>
      	  <Route path="/" exact component={Home} />
      	  <Route path="/login" component={Login} />
      	</Switch>
      </Router>
    </div>
  );
}

export default App;
