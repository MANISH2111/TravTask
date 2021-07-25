import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, makeStyles } from '@material-ui/core';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { filterLaunches } from '../store/actions/';
const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
        position: 'fixed',
        color: 'black',
        paddingLeft: '500px',
        marginLeft: '40px',
    },
    formControl: {
        margin: '10px',
        minWidth: 120,
    },
});

export default function Header() {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setValue(event.target.value);
        dispatch(filterLaunches(launches, event.target.value));
    };

    const launches = useSelector((state) => state.launches.filteredLaunches);

    return (
        <AppBar position='static' className={classes.root}>
            <Toolbar>
                <Grid container alignItems='center'>
                    <Grid item></Grid>
                    <Grid item sm>
                        <h1>SPACEX</h1>
                        <FormControl className={classes.formControl}>
                            <InputLabel id='demo-simple-select-label'>
                                Launches
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={value}
                                onChange={handleChange}
                            >
                                <MenuItem value='all'>All</MenuItem>
                                <MenuItem value='upcoming'>Upcoming</MenuItem>
                                <MenuItem value='past'>Past</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
