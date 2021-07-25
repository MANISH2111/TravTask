import React from 'react';

import {
    makeStyles,
    CssBaseline,
    createTheme,
    ThemeProvider,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store/store';
import SideMenu from './components/SideMenu';
import Launches from './components/Launches';

const themes = createTheme({
    palette: {
        primary: {
            main: '#333996',
            light: '#3c44b126',
        },
        secondary: {
            main: '#f83245',
            light: '#f8324526',
        },
        background: {
            default: '#fff',
        },
    },
    shape: {
        borderRadius: '4px',
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)',
            },
        },
    },
});

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '240px',
        paddingRight: '100px',
        width: '97%',
        paddingBottom: '5px',
    },
});

function App() {
    const classes = useStyles();

    return (
        <Provider store={store}>
            <ThemeProvider theme={themes}>
                <div>
                    <SideMenu />
                </div>

                <div className={classes.appMain}>
                    <Launches />
                </div>

                <CssBaseline />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
