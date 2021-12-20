import React from 'react';
import { useQuery } from 'react-query';

import { Theme } from '@material-ui/core/styles';
import { Grid, makeStyles } from '@material-ui/core';
import RoomList from './RoomList'
import UserList from './UserList';
import LoginForm from './LoginForm'
import MessageArea from './MessageArea';
import InputArea from './InputArea';

import 'react-chat-elements/dist/main.css';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    body: {
      height: '100%',
      overflow: 'hidden',
      background: 'navajowhite',
    },
    input: {
      fontFamily: 'verdana, ubuntu',
    },
    button: {
      fontFamily: 'verdana, ubuntu',
    },
  },

  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '90%',
    overflow: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  navigation: {
    minWidth: '240px',
    maxWidth: '380px',
    overflow: 'auto',
    padding: '1rem',
  },

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  toolbar: theme.mixins.toolbar,
}));

export default function ChatPanel() {
  const classes = useStyles();

  const { data: loginUser } = useQuery<number>(['loginUser'], { enabled: false, initialData: 0 })

  return (
    <>
      <Grid className={classes.root}>
        <nav className={classes.navigation}>
          <div className={classes.toolbar} />
          {loginUser &&
            <>
              <RoomList />
              <UserList />
            </>
          }
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {loginUser !== 0 &&
            <>
              <MessageArea />
              <InputArea />
            </>
          }
        </main>
      </Grid >
      <LoginForm />
    </>
  );
}
