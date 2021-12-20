import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useQuery } from 'react-query';
import { tables, User, Message } from '../fetchData';
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

    const { data: loginUser } = useQuery<number>(['loginUser'], { enabled: false, initialData: 0 })
    const { data: selectedRoom } = useQuery<number>(['selectedRoom'], { enabled: false, initialData: 0 });
    const { data: selectedUser } = useQuery<number>(['selectedUser'], { enabled: false, initialData: 0 });
    const { data: allUsers } = useQuery<User[]>(['users', selectedRoom], tables.users.fetchTable);
    const { data: selectedMessages } = useQuery<Message[]>(
        ['messagesInRoom', selectedRoom, selectedUser],
        tables.messages.fetchTable,
        {
            select: (mes) => {
                const result = mes.filter((mes) =>
                    mes.roomId === selectedRoom && (!selectedUser || mes.userId === selectedUser)
                )
                return result;
            },
        });

    const convertedMessages = selectedMessages?.map((m) => ({
        id: m.messageId,
        text: m.content,
        type: 'text',
        date: Date.parse(m.createdAt as string),
        title: allUsers?.find((user) => user.userId === m.userId)?.name,
        position: m.userId === loginUser ? 'right' : 'left',
    })).reverse()

    return <MessageList
        className={classes.messageList}
        dataSource={convertedMessages}
        downButton={true}
        downButtonBadge={10} />;
}
