import React from 'react';
import { makeStyles } from '@material-ui/core';
import LaunchCard from './Launch';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        width: '100%',
        background: 'none',
        marginTop: theme.spacing(1),
    },
}));

export default function Launches() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.pageContent}>
                <LaunchCard />
            </div>
        </>
    );
}
