import React, { createRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Button } from 'react-chat-elements';

import { tables, useQState } from '../fetchData';

export default function InputArea() {
    const [loginUser] = useQState<number>(['loginUser'], 0)
    const [selectedRoom] = useQState<number>(['selectedRoom'], 0);
    const queryClient = useQueryClient();

    const mutation = useMutation(tables.messages.create, {
        onSuccess: () => {
            queryClient.invalidateQueries(['messagesOnRoom', selectedRoom])
        }
    });

    const inputRef = createRef<HTMLInputElement>();

    function postMessage(e: any) {
        if (inputRef.current && loginUser && selectedRoom) {
            mutation.mutate({
                userId: loginUser,
                roomId: selectedRoom,
                content: (inputRef.current as any).input.value,
            });
            (inputRef.current as any).clear();
            e.target.value = '';
        }
    }

    return (
        <>
            <Input
                placeholder="Type here..."
                ref={inputRef}
                autofocus={true}
                rightButtons={
                    <Button
                        text="Send"
                        onClick={(event: any) => {
                            postMessage(event);
                            event.preventDefault();
                        }}
                    />
                }
                onKeyPress={(event: any) => {
                    if (event.key === 'Enter') {
                        postMessage(event);
                        event.preventDefault();
                    }
                }}
            />
        </>);
}

