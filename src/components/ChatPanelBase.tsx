import React, { createRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { tables, Message, User, Room } from '../fetchData';

export default function ChatPanel() {
  const { data: messages, isFetched: messageFetched } = useQuery<Message[]>('messages', tables.messages.fetch)
  const { data: rooms } = useQuery<Room[]>('rooms', tables.rooms.fetch)
  const { data: users } = useQuery<User[]>('users', tables.users.fetch)
  const mutation = useMutation(tables.messages.create);

  const [currentRoomId, setCurrentRoomId] = useState<number>(0);
  if (currentRoomId === 0 && messages) {
    setCurrentRoomId(messages[0].roomId)
  }
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  if (currentUserId === undefined && users) {
    setCurrentUserId(users[0].userId)
  }
  const inputRef = createRef<HTMLInputElement>();

  return (
    <>
      <p>CurrentRoomId: {currentRoomId}</p>
      Rooms({rooms?.length})
      <ul>
        {rooms
          ?.map((room) => (
            <li key={room.roomId} onClick={() => setCurrentRoomId(room.roomId)}>
              {room.roomId}:{room.name}
            </li>
          ))}
      </ul>
      Users:
      <ul>
        {users
          ?.map((user) => (
            <li key={user.userId} onClick={() => setCurrentUserId(user.userId)}>
              {user.userId}:{user.name}
            </li>
          ))}
      </ul>
      Messages({messages?.length})
      <ul>
        {
          messages
            ?.filter((message) => message.roomId === currentRoomId)
            ?.map((message) => (
              <li>
                [{rooms?.find((room) => room.roomId === message.roomId)?.name}]
                {message.createdAt}
                [{users?.find((user) => user.userId === message.userId)?.name}]:
                {message.content}</li>
            ))
        }
      </ul>
      <form
        onSubmit={(event) => {
          if (inputRef.current) {
            mutation.mutate({ userId: currentUserId, roomId: currentRoomId, content: inputRef.current.value })
            inputRef.current.value = '';
            event.preventDefault();
          }
        }}>
        <input type="text" ref={inputRef}></input>
        <button type="submit">send</button>
      </form>
    </>
  );
}
