import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoomOutlined';

import { useQuery } from 'react-query';
import { tables, Room, useQState } from '../fetchData';
import { Theme } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({

    selected: {
        background: '#ffcc33',
        color: '#880000',
    },
}));

export default function RoomList() {
    const classes = useStyles();

    const { data: rooms, error } = useQuery<Room[]>('rooms', tables.rooms.fetchTable)
    const [selectedRoom, setSelectedRoom] = useQState<number>(['selectedRoom']);

    const handleClick = (room: number) => {
        setSelectedRoom(room);
    };

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <Typography>閲覧するルームを選択してください:</Typography >
            <List >
                {rooms?.map((room) => (
                    <ListItem
                        onClick={() => handleClick(room.roomId)}
                        className={room.roomId === selectedRoom ? classes.selected : ''}
                        key={room.roomId}
                        value={room.roomId}>
                        <ListItemIcon>
                            <MeetingRoomIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${room.roomId}:${room.name}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}