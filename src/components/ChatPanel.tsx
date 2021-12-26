import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Theme } from '@mui/material';
import RoomList from './RoomList'
import UserList from './UserList';
import MessageArea from './MessageArea';
import InputArea from './InputArea';

import 'react-chat-elements/dist/main.css';
import { useQState } from '../fetchData';

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
    background: '#ffcc33',
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
  const [selectedRoom] = useQState<number>(['selectedRoom']);
  const [loginUser] = useQState<number>(['loginUser'], 0)

  return (
    <>
      <Grid className={classes.root}>
        <nav className={classes.navigation}>
          <div className={classes.toolbar} />
          {loginUser !== 0 &&
            <>
              <RoomList />
              <UserList />
            </>
          }
          <div>
          </div>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {loginUser !== 0 &&
            <>
              <MessageArea />
              {selectedRoom && <InputArea />}
            </>
          }
        </main>
      </Grid >
    </>
  );
}
