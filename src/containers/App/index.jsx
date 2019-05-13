import React, { Component } from 'react';
import './styles.css';
import Quiz from '../Quiz';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
  },
  typography: {
    fontFamily: [
      'Nanum Gothic',
      'serif',
    ].join(','),
  },
});

class App extends Component {
  render() {
    return (
      <div className="application">
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h2" color="inherit">
                γνῶσις
                <Typography variant="subtitle1" color="inherit">
                  <span className='italicize'>gnōsis</span> | knowledge
                </Typography>
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={ 16 }>
            <Grid item xs={ 1 } md={ 2 } lg={ 3 } />
             <Grid item xs={ 10 } md={ 8 } lg={ 6 }>
               <Quiz />
             </Grid>
             <Grid item xs={ 1 } md={ 2 } lg={ 3 } />
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
