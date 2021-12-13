import React, { createRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { tables, Message, User, Room } from '../fetchData';

import { Theme } from '@material-ui/core/styles';
import { Grid, makeStyles } from '@material-ui/core';
import { MessageList, Input, Button } from 'react-chat-elements';
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

  messageList: {
    flex: 1,
    background: '#81b2ce',
    minWidth: '140px',
    overflow: 'auto',
  },

  toolbar: theme.mixins.toolbar,

  selected: {
    background: '#ffff33'
  },
}));

export default function ChatPanel() {
  const { data: messages } = useQuery<Message[]>('messages', tables.messages.fetch)
  const { data: rooms } = useQuery<Room[]>('rooms', tables.rooms.fetch)
  const { data: users } = useQuery<User[]>('users', tables.users.fetch)
  const mutation = useMutation(tables.messages.create);

  const [currentRoomId, setCurrentRoomId] = useState<number>(0);
  if (currentRoomId === 0 && messages) {
    setCurrentRoomId(messages[0].roomId)
  }
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  if (currentUserId === 0 && users) {
    setCurrentUserId(users[0].userId)
  }
  const inputRef = createRef<HTMLInputElement>();

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <nav className={classes.navigation}>
        <div className={classes.toolbar} />
        Rooms:
        <ul>
          {rooms?.map((room: Room) => (
            <li
              className={room.roomId === currentRoomId ? classes.selected : ''}
              key={room.roomId}
              onClick={() => {
                setCurrentRoomId(room.roomId);
              }}>
              {room.name}
            </li>
          ))}
        </ul>
        Users:
        <ul>
          {users
            ?.map((user) => (
              <li
                className={user.userId === currentUserId ? classes.selected : ''}
                key={user.userId} onClick={() => setCurrentUserId(user.userId)}>
                {user.userId}:{user.name}
              </li>
            ))}
        </ul>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MessageList
          className={classes.messageList}
          dataSource={messages?.filter((m) => (m.roomId === currentRoomId)).map((m) => ({
            id: m.messageId,
            text: m.content,
            type: 'text',
            date: Date.parse(m.createdAt as string),
            title: users?.find((user) => user.userId === m.userId)?.name,
            position: m.userId === currentUserId ? 'right' : 'left',
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
                if (inputRef.current) {
                  console.log(`inputRef.current.value = ${inputRef.current.value}`)
                  mutation.mutate({ userId: currentUserId, roomId: currentRoomId, content: (inputRef.current as any).input.value });
                  //                  inputRef.current.value = '';
                  (inputRef.current as any).clear();
                  event.preventDefault();
                }
              }}
            />
          }
          onKeyPress={(event: any) => {
            if (event.key === 'Enter') {
              if (inputRef.current) {
                console.log(`inputRef.current.value = ${inputRef.current.value}`)
                mutation.mutate({ userId: currentUserId, roomId: currentRoomId, content: (inputRef.current as any).input.value })
                inputRef.current.value = '';
                event.preventDefault();
              }
              event.target.value = '';
              event.preventDefault();
              return false;
            }
          }}
        />
      </main>
    </Grid>
  );
}
