import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useQuery, useQueryClient } from 'react-query';
import { Message, tables, User } from '../fetchData';
import _ from 'lodash';

const useStyles = makeStyles((theme: Theme) => ({
    selected: {
        background: '#ffcc33',
        color: '#880000',
    },
}));

export default function UserList() {
    const classes = useStyles();
    const queryClient = useQueryClient()


    const { data: loginUser } = useQuery<number>(['loginUser'], { enabled: false })
    const { data: selectedRoom } = useQuery(['selectedRoom'], { enabled: false });
    const { data: messages } = useQuery<Message[]>(['messagesInRoom', selectedRoom], tables.messages.fetchTable)
    const { data: loginUsers } = useQuery<User[]>(['usersInRoom', selectedRoom], tables.users.fetchTable)

    // ログインしているルームの発言をしているユーザ一覧を収集する。
    const userIds = _.uniq(messages?.filter(
        (message) => message.roomId === selectedRoom
    ).map((message) => message.userId))
    const users = loginUsers?.filter((user) => userIds.some((i) => user.userId))

    return (
        <>
            Users:
            {loginUser &&
                <ul>
                    {users?.map((user) => (
                        <li
                            className={user.userId === loginUser ? classes.selected : ''}
                            key={user.userId}
                            value={user.userId}>
                            {user.userId}:{user.name}
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}