import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { FormControl, Tab, Tabs } from '@material-ui/core';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { useDispatch } from 'react-redux';
import { filterLaunches, sortLaunches } from '../store/actions/';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Launches from './Launches';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#222B36',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    formControl: {
        margin: theme.spacing(2),
        marginTop: '40px',
        minWidth: '90%',
        marginBottom: '100px',
    },
}));

export default function SideMenu() {
    const classes = useStyles();
    const theme = useTheme();
    const obj = {
        eventType: 'all',
        time: { startTime: null, endTime: null },
    };

    const sortO = {
        sort: '',
    };
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const [filtersObj, setFiltersObj] = React.useState(obj);
    const [sortObj, setSortObj] = React.useState(sortO);

    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleDateChange = (type, value) => {
        const obj = Object.assign({}, filtersObj, {
            time: {
                ...filtersObj.time,
                [type === 0 ? 'startTime' : 'endTime']: value
                    ? moment(value).format()
                    : null,
            },
        });
        setFiltersObj(obj);
        dispatch(filterLaunches(obj, sortObj));
    };
    const handleChange = (text) => {
        const obj = Object.assign({}, filtersObj, {
            eventType: text.target.value,
        });
        setFiltersObj(obj);
        dispatch(filterLaunches(obj, sortObj));
    };

    const handleTabChange = (event, value) => {
        const obj = Object.assign({}, sortObj, {
            sort: value,
        });
        setSortObj(obj);
        dispatch(sortLaunches(obj));
        setValue(value);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h5' noWrap>
                        SPACEX
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                {/* <Divider /> */}
                <FormControl className={classes.formControl}>
                    <Typography> Launches</Typography>
                    <InputLabel id='demo-simple-select-label'></InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={filtersObj.eventType}
                        onChange={handleChange}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='upcoming'>Upcoming</MenuItem>
                        <MenuItem value='past'>Past</MenuItem>
                    </Select>
                </FormControl>
                <Divider />
                <List>
                    {[filtersObj.time.startTime, filtersObj.time.endTime].map(
                        (text, index) => (
                            <ListItem button key={index}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        placeholder='MM/DD/YYYY'
                                        format={'MM/DD/YYYY'}
                                        value={text}
                                        onChange={(val) =>
                                            handleDateChange(index, val)
                                        }
                                        disableOpenOnEnter
                                        animateYearScrolling={true}
                                        clearable
                                        onInputChange={(e) => {}}
                                    />
                                </MuiPickersUtilsProvider>
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
                <Tabs
                    orientation='vertical'
                    variant='scrollable'
                    scrollButtons='auto'
                    className={classes.tab}
                    value={value}
                    onChange={handleTabChange}
                    textColor='primary'
                    indicatorColor='primary'
                >
                    <Typography variant='h6' Wrap>
                        Sort
                    </Typography>
                    <Tab label='Name' value={'name'} />
                    <Tab label='Date' value={'date'} />
                </Tabs>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <Launches />
                <div className={classes.drawerHeader} />
            </main>
        </div>
    );
}
