import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6D00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F05066',
      side:'#1CB24E',
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
      main:'#fff',
    },
    row:{
      head:'#2D2B31',
    }
  },
  button:{
    primary:{
      main: '#00DC9E',
      hover:'#00808C',
    },
    secondary: {
      main: '#FF525A',
    },
    background:{
      main:'#2A272A',
      text:'#FFF5F5',
    },
  },
  navBar:{
    primary:{
      main:'#FF6D00',
    },
    logout:{
      main: red.A400,
    },
    background:{
      main:'#fafafa'
    },
  },icon:{
    primary:{
      main:'rgba(255, 255, 255, 0.60)',
    }
  }

});

export default theme;