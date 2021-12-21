import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useQuery } from 'react-query';
import { tables, Room, useQState } from '../fetchData';

const useStyles = makeStyles((theme: Theme) => ({

    selected: {
        background: '#ffcc33',
        color: '#880000',
    },
}));

export default function RoomList() {
    const classes = useStyles();

    const { data: rooms } = useQuery<Room[]>('rooms', tables.rooms.fetchTable)
    const [selectedRoom, setSelectedRoom] = useQState<number>(['selectedRoom']);

    const handleClick = (event: any) => {
        setSelectedRoom(event.target.value);
    };

    return (
        <>
            閲覧するルームを選択してください:
            <ul>
                {rooms?.map((room: Room) => (
                    <li
                        className={room.roomId === selectedRoom ? classes.selected : ''}
                        key={room.roomId}
                        onClick={handleClick}
                        value={room.roomId}>
                        {room.roomId}:{room.name}
                    </li>
                ))}
            </ul>
        </>
    );
}