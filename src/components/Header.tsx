import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useQState, User } from '../fetchData';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();

    const [loginUser, setLoginUser] = useQState<number>(['loginUser'])
    const [allUsers] = useQState<User[]>(['users'])

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Typography variant="h5" color="inherit" className={classes.title}>
                    React Query Chat
                </Typography>
                <Typography variant="h6" component="div" >
                    ログインユーザ: {allUsers?.find((user) => user.userId === loginUser)?.name}
                </Typography>
                {
                    loginUser ?
                        <Button color="inherit" onClick={
                            () => { setLoginUser(0) }
                        }><ExitToAppIcon /></Button> : ''
                }
            </Toolbar>
        </AppBar>
    );
}