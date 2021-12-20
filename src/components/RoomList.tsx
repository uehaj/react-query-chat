import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useQuery, useQueryClient } from 'react-query';
import { tables, Room } from '../fetchData';

const useStyles = makeStyles((theme: Theme) => ({

    selected: {
        background: '#ffcc33',
        color: '#880000',
    },
}));

export default function RoomList() {
    const queryClient = useQueryClient()

    const { data: rooms } = useQuery<Room[]>('rooms', tables.rooms.fetchTable)
    const { data: selectedRoom } = useQuery(['selectedRoom'], { enabled: false });
    const classes = useStyles();

    const handleClick = (event: any) => {
        queryClient.setQueryData(['selectedRoom'], event.target.value);
    };

    return (
        <>
            Rooms:
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