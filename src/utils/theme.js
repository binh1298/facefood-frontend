import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F59C88',
    },
    secondary: {
      main: '#FF525A',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  table:{
    background:{
      main:'#2A272A',
    },
    row:{
      head:'#C6C6C6',
    }
  },
  button:{
    primary: {
      main: '#F59C88',
    },
    secondary: {
      main: '#FF525A',
    },
    error: {
      main: red.A400,
    },
  }

});

export default theme;