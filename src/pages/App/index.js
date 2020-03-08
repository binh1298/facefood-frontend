import { Toolbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { Routes } from '../../routes';
import theme from '../../utils/theme';

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
