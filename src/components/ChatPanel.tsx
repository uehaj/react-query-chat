import React, { useState } from 'react';

export default function ChatPanel() {
  const [currentRoomId, setCurrentRoomId] = useState<string>('0001');
  const rooms: { roomId: string, name: string }[] = [
    { roomId: '0001', name: 'room1' },
    { roomId: '0002', name: 'room2' }
  ];
  const messages: { messageId: string, datetime: string, roomId: string, userId: string, content: string }[] = [
    { messageId: '0001', datetime: "2021/12/24: 10:00:00", roomId: '0001', userId: '1', content: 'こんばんは' },
    { messageId: '0002', datetime: "2021/12/24: 11:00:00", roomId: '0001', userId: '2', content: 'こんにちは' },
    { messageId: '0003', datetime: "2021/12/24: 12:00:00", roomId: '0002', userId: '3', content: 'オレはおります' },
    { messageId: '0003', datetime: "2021/12/24: 13:00:00", roomId: '0002', userId: '4', content: 'なるほどっ' }
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
          <li key={room.roomId} onClick={() => setCurrentRoomId(room.roomId)}>
            {room.name}
          </li>
        ))}
      </ul>
      Messages
      <ul>
        {messages?.filter(message => message.roomId === currentRoomId)?.map((message) => (
          <li>{message.datetime} : {users.find(user => user.userId === message.userId)?.name} {message.content}</li>
        ))}
      </ul>
    </>
  );
}
