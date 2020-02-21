import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from '../../components/navigation';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../utils/theme';
import { Toolbar } from '@material-ui/core';
import { Routes } from '../../routes';

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
