import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Login';
import Home from '../Home';
import Register from '../Register';
import Navigation from '../../components/navigation';
import ListUser from '../ListUser';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
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
            <Route path="/listUser">
              <ListUser />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(App);
