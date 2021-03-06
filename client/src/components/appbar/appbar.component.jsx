import React, {useState, useRef, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
//import axios from "axios";
import {/*Route, Switch,*/ useHistory} from "react-router-dom";
import classNames from 'classnames';
import CssBaseline from "@material-ui/core/CssBaseline";
//Import Menu
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Switch from "@material-ui/core/Switch";


export const HeaderBar = (props) => {
    const history = useHistory();
    const { classes, colorSwitch, darkState, displayAlt} = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleClose = (event) => {
        console.log("handleClose Ev:", event);
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handlePaintLink = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        history.push("/paintings");
    };
    const handleGraphLink = (event) => {
        console.log("handleClose Ev:", event);
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        history.push("/graphics");
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <AppBar position="fixed"
                className={classNames(classes.appBar, {})}
        >
            <CssBaseline />
            <Toolbar>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    <Link href="/" style={{color:'white'}}>
                        Krypto-Visualisierung
                    </Link>
                </Typography>
                <div>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handlePaintLink}>Gem??lde</MenuItem>
                                <MenuItem onClick={handleGraphLink}>Grafiken</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                    <Switch checked={darkState} onChange={colorSwitch} title={displayAlt} className={classes.switch}/>
                </div>

            </Toolbar>
        </AppBar>
    );
}
