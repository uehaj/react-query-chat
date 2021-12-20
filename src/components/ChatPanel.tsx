import React, { createRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { tables, Message, User } from '../fetchData';

import { Theme } from '@material-ui/core/styles';
import { Grid, makeStyles } from '@material-ui/core';
import { MessageList, Input, Button } from 'react-chat-elements';
import RoomList from './RoomList'
import UserList from './UserList';
import LoginForm from './LoginForm'
import 'react-chat-elements/dist/main.css';
import { LocationSearchingOutlined } from '@material-ui/icons';

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

  messageList: {
    flex: 1,
    background: '#81b2ce',
    minWidth: '140px',
    overflow: 'auto',
  },

  toolbar: theme.mixins.toolbar,

  selected: {
    background: '#ffcc33',
    color: '#880000',
  },
}));

export default function ChatPanel() {
  const classes = useStyles();
  const queryClient = useQueryClient()

  const { data: loginUser } = useQuery<number>(['loginUser'], { enabled: false, initialData: 0 })
  const { data: selectedRoom } = useQuery<number>(['selectedRoom'], { enabled: false, initialData: 0 });
  const { data: users } = useQuery<User[]>(['usersInRoom', selectedRoom], tables.users.fetchTable);
  const { data: messages } = useQuery<Message[]>(
    ['messagesInRoom', selectedRoom],
    tables.messages.fetchTable,
    {
      select: (mes) => mes.filter((mes) => mes.roomId === selectedRoom)
    })
  const mutation = useMutation(tables.messages.create);

  const inputRef = createRef<HTMLInputElement>();

  function postMessage(e: any) {
    if (inputRef.current && loginUser && selectedRoom) {
      mutation.mutate({ userId: loginUser, roomId: selectedRoom, content: (inputRef.current as any).input.value });
      (inputRef.current as any).clear();
      e.target.value = '';
    }
  }

  return (
    <>
      <Grid className={classes.root}>
        <nav className={classes.navigation}>
          <div className={classes.toolbar} />
          <RoomList />
          <UserList />
        </nav>
        <main className={classes.content}>
          {loginUser !== 0 &&
            <>
              <MessageList
                className={classes.messageList}
                dataSource={messages?.map((m) => ({
                  id: m.messageId,
                  text: m.content,
                  type: 'text',
                  date: Date.parse(m.createdAt as string),
                  title: users?.find((user) => user.userId === m.userId)?.name,
                  position: m.userId === loginUser ? 'right' : 'left',
                })).reverse()}
                downButton={true}
                downButtonBadge={10}
              />
              <Input
                placeholder="Type here..."
                ref={inputRef}
                autofocus={true}
                rightButtons={
                  <Button
                    text="Send"
                    onClick={(event: any) => {
                      postMessage(event);
                      event.preventDefault();
                    }}
                  />
                }
                onKeyPress={(event: any) => {
                  if (event.key === 'Enter') {
                    postMessage(event);
                    event.preventDefault();
                  }
                }}
              />
            </>
          }
        </main>
      </Grid >
      <LoginForm />
    </>
  );
}
