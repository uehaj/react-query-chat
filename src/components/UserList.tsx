import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useQuery } from 'react-query';
import { Message, tables, useQState, User } from '../fetchData';
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
    const { data: allUsers } = useQuery<User[]>(['users'], tables.users.fetchTable)

    // 指定したルームで発言をしているユーザ一IDのリストを収集する。
    const userIds = _.uniq(messagesOnRoom?.map((message) => message.userId))

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

    return (
        <>
            発言者でフィルタ:
            <ul>
                {usersOnTheRoom?.map((user) => (
                    <li
                        onClick={handleClick.bind(undefined, user.userId)}
                        className={user.userId === selectedUser ? classes.selected : ''}
                        key={user.userId}
                        value={user.userId}>
                        {user.userId}:{user.name}
                    </li>
                ))}
                <li onClick={handleClick.bind(undefined, 0)}>フィルタクリア</li>
            </ul>
        </>
    );
}