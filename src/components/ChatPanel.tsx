import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { tables, Message, User, Room } from '../fetchData';

export default function ChatPanel() {
  const { data: messages } = useQuery<Message[]>('messages', tables.messages.fetcher)
  const { data: rooms } = useQuery<Room[]>('rooms', tables.rooms.fetcher)
  const { data: users } = useQuery<User[]>('users', tables.users.fetcher)
  const [currentRoomId, setCurrentRoomId] = useState<number>();

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
            <li key={user.userId}>
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
              <li>{message.roomId} {message.createdAt} {users?.find((user) => user.userId === message.userId)?.name}:  {message.content}</li>
            ))
        }
      </ul>
    </>
  );
}
