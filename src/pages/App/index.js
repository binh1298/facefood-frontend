import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../utils/theme';
import { Routes } from '../../routes';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navigation />
          {Routes}
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default hot(App);
