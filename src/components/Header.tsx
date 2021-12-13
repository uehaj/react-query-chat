import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Typography variant="h5" color="inherit" className={classes.title}>
                    React Query Chat
                </Typography>
            </Toolbar>
        </AppBar>
    );
}