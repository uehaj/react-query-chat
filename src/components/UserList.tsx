import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import { Message, tables, useQState, User } from '../fetchData';
import PersonIcon from '@material-ui/icons/Person';
import _ from 'lodash';

const useStyles = makeStyles((theme: Theme) => ({
    selected: {
        background: '#ffcc33',
        color: '#880000',
    },
}));

export default function UserList() {
    const classes = useStyles();

    const [selectedRoom] = useQState<number>(['selectedRoom']);
    const [selectedUser, setSelectedUser] = useQState<number>(['selectedUser'], 0);
    const { data: messagesOnRoom } = useQuery<Message[]>(['messagesOnRoom', selectedRoom],
        tables.messages.fetchTable,
        {
            select: (messages) => messages?.filter((message) => message.roomId === selectedRoom)
        })
    const { data: allUsers, error } = useQuery<User[]>(['users'], tables.users.fetchTable)

    // 指定したルームで発言をしているユーザ一IDのリストを収集する。
    const userIds = _.uniq(messagesOnRoom?.map((message) => message.userId))

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!allUsers) {
        return <div>Loading...</div>
    }

    // 指定ルームにログインしているユーザ一覧
    const usersOnTheRoom = allUsers.filter((user) =>
        userIds?.some((i) => i === user.userId)
    )

    const handleClick = (userId: number) => {
        setSelectedUser(userId);
    }
    console.log(`messagesOnRoom=`, messagesOnRoom)
    return (
        <>
            <Typography>発言者でフィルタ:</Typography>
            <List >
                {usersOnTheRoom?.map((user) => (
                    <ListItem
                        onClick={handleClick.bind(undefined, user.userId)}
                        className={user.userId === selectedUser ? classes.selected : ''}
                        key={user.userId}
                        value={user.userId}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${user.userId}:${user.name}`} />
                    </ListItem>
                ))}
                <ListItem onClick={handleClick.bind(undefined, 0)}>
                    <ListItemText primary="フィルタクリア" />
                </ListItem>
            </List>
        </>
    );
}