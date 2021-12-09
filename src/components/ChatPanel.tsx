import React, { useState } from 'react';

export default function ChatPanel() {
  const [currentRoomId, setCurrentRoomId] = useState<string>('0000');
  const rooms: { name: string, id: string }[] = [
    { name: 'room1', id: '0001' },
    { name: 'room2', id: '0002' }
  ];
  const messages: { roomId: string, userId: string, content: string }[] = [
    { roomId: '0001', userId: '1', content: 'こんばんは' },
    { roomId: '0001', userId: '2', content: 'こんにちは' },
    { roomId: '0003', userId: '4', content: 'なるほどっ' }
  ];
  const users: { userId: string, name: string }[] = [
    { userId: '1', name: 'たんじろう' },
    { userId: '2', name: 'いのすけ' },
    { userId: '3', name: 'ぜんいつ' },
    { userId: '4', name: 'れんごく' }
  ];

  return (
    <>
      Rooms
      <ul>
        {rooms?.map((room) => (
          <li key={room.id} onClick={() => setCurrentRoomId(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
      Messages
      <ul>
        {messages?.map((message) => (
          <li>{message.roomId} : {users.find(user => user.userId === message.userId)?.name} {message.content}</li>
        ))}
      </ul>
    </>
  );
}
