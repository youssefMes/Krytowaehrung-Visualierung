import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import CandleSticksChartChart from './components/candlesticks/index'
import BubbleChart from './components/charts/bubble.component'
import BarChart from './components/charts/bar.component'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Style Components
import './style/main.style.css';

//Cofig Components
import {useStyles} from './config/usestyles.config';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  red,
  lightBlue,
  deepPurple,
  blueGrey
} from "@material-ui/core/colors";

//Html components
import {Copyright} from './components/copyright/copyright.component';
import {HeaderBar} from './components/appbar/appbar.component';
import axios from "axios";

function MainApp() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(
    localStorage.getItem('darkState') || false
  );
  const [data, setData] = useState([]);
    console.log(darkState)
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? red[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? blueGrey[900] : deepPurple[500];
  const darkTheme = createTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  const displayAlt = darkState ? "Switch to Light Mode" : "Switch to Dark Mode";

  const handleThemeChange = () => {
    localStorage.setItem('darkState', !darkState);
    setDarkState(!darkState);
  };
  const getData = async () => {
    const res = await axios.get('http://localhost:9000/api/asset/price')
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Router>
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <HeaderBar classes={classes} colorSwitch={handleThemeChange} darkState={darkState} displayAlt={displayAlt}/>
        </div>
        <main>
          <Switch>
            {/*** LANDING PAGE ***/}
            <Route path="/">
              <div>
              <CandleSticksChartChart/>
              <BubbleChart data={data}/>
              <BarChart data={data}/>
              </div>
            </Route>
            {/*** END LANDING PAGE ***/}
          </Switch>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Copyright />
        </footer>
        {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
     </Router>
  );
}

export default MainApp;

