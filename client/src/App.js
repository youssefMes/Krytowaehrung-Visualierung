import React, {useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import CssBaseline from '@material-ui/core/CssBaseline';
import CandleSticksChartChart from './components/candlesticks/index'
import BubbleChart from './components/charts/bubble.component'
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
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

const ENDPOINT = "http://localhost:9000";

function MainApp() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [darkState, setDarkState] = useState(
    localStorage.getItem('darkState') || false
  );

  const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     console.log(data)
  //     setResponse(data);
  //   });
  // }, []);

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

  const [filter, setFilter] = useState({})

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleThemeChange = () => {
    localStorage.setItem('darkState', !darkState);
    setDarkState(!darkState);
  };

  return (
    <Router>
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <HeaderBar classes={classes} setSearchText={setSearchText} onFilterChange={handleFilterChange} filter={filter} colorSwitch={handleThemeChange} darkState={darkState} displayAlt={displayAlt}/>
        </div>
        <main>
          <Switch>
            {/*** LANDING PAGE ***/}
            <Route path="/">
              <div>
              <CandleSticksChartChart/>
              <BubbleChart/>
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

