import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Login';
import Home from '../Home';
import Register from '../Register';
import Navigation from '../../components/navigation';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(App);
