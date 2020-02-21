import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6D00',
    },
    secondary: {
      main: '#00BFA5',
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
    primary:{
      main: '#FF525A',
    },
    secondary: {
      main: '#FF525A',
    },
    background:{
      main:'#2A272A',
      text:'#C6C6C6',
    },
  },

});

export default theme;