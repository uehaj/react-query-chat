import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { useQuery } from 'react-query';
import { tables, User, Message, useQState } from '../fetchData';
import { MessageList } from 'react-chat-elements';

const useStyles = makeStyles((theme: Theme) => ({
    messageList: {
        flex: 1,
        background: '#81b2ce',
        minWidth: '140px',
        overflow: 'auto',
    },
}));

export default function MessageArea() {
    const classes = useStyles();

    const [loginUser] = useQState<number>(['loginUser'], 0)
    const [selectedRoom] = useQState<number>(['selectedRoom'], 0);
    const [selectedUser] = useQState<number>(['selectedUser'], 0);
    const { data: allUsers, error } = useQuery<User[]>(['users'], tables.users.fetchTable);

    const { data: selectedMessages } = useQuery<Message[]>(
        ['messagesOnRoom', selectedRoom],
        tables.messages.fetchTable,
        {
            select: (mes) => mes.filter((mes) => mes.roomId === selectedRoom)
        });

    const convertedMessages = selectedMessages
        ?.filter((mes: any) => (!selectedUser || mes.userId === selectedUser))
        .map((m) => ({
            id: m.messageId,
            text: m.content,
            type: 'text',
            date: Date.parse(m.createdAt as string),
            title: allUsers?.find((user) => user.userId === m.userId)?.name,
            position: m.userId === loginUser ? 'right' : 'left',
        })).reverse()

    if (error) {
        return <div>Error: {error}</div>
    }

    return <MessageList
        className={classes.messageList}
        dataSource={convertedMessages}
        downButton={true}
        downButtonBadge={10} />;
}
