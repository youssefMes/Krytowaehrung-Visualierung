import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import CandleSticksChartChart from './components/candlesticks/index'
import BubbleChart from './components/charts/bubble.component'
import BarChart from './components/charts/bar.component'
import Line from './components/charts/line.component'
import ApexLine from './components/charts/ApexLine'
import ApexBar from './components/charts/ApexBar'
import ApexBubble from './components/charts/ApexBubble'
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
import ApexTreeMap from "./components/charts/ApexTreeMap";

function MainApp() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(
    localStorage.getItem('darkState') || false
  );
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [names, setNames] = useState([]);
    console.log(darkState)
  const palletType =  "light";
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
    const prices = res.data.map(coin => coin.price_usd)
    const names = res.data.map(coin => coin.name)
    setNames(names)
    setPrices(prices)
    setData(res.data)
  }
  const prepareTreeMap = () => {
    if (data.length > 0) {
      return data.map(coin => {
        return {
          name: coin.name,
          value: coin.price_usd > 30000 ? coin.price_usd / 1 : coin.price_usd
        }
      })
    }
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
              <ApexLine/>
              <ApexBar prices={prices} names={names}/>
                {data.length > 0 && <ApexTreeMap data={prepareTreeMap()}/>}
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

