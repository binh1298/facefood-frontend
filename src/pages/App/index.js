import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Login';
import Home from '../Home';
import Register from '../Register';
import SearchPost from '../SearchPost'
import Navigation from '../../components/navigation';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../utils/theme';
import { Toolbar } from '@material-ui/core';
import PostDetail from '../PostDetail'
import { Routes } from '../../routes';
import { Toolbar } from '@material-ui/core';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Toolbar></Toolbar>
        <BrowserRouter>
          <Navigation />
          {Routes}
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default hot(App);
