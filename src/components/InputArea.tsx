import React, { createRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Input, Button } from 'react-chat-elements';

import { tables } from '../fetchData';

export default function InputArea() {
    const { data: loginUser } = useQuery<number>(['loginUser'], { enabled: false, initialData: 0 })
    const { data: selectedRoom } = useQuery<number>(['selectedRoom'], { enabled: false, initialData: 0 });

    const mutation = useMutation(tables.messages.create);

    const inputRef = createRef<HTMLInputElement>();

    function postMessage(e: any) {
        if (inputRef.current && loginUser && selectedRoom) {
            mutation.mutate({ userId: loginUser, roomId: selectedRoom, content: (inputRef.current as any).input.value });
            (inputRef.current as any).clear();
            e.target.value = '';
        }
    }

    return <Input
        placeholder="Type here..."
        ref={inputRef}
        autofocus={true}
        rightButtons={
            <Button
                text="Send"
                onClick={(event: any) => {
                    postMessage(event);
                    event.preventDefault();
                }} />
        }
        onKeyPress={(event: any) => {
            if (event.key === 'Enter') {
                postMessage(event);
                event.preventDefault();
            }
        }}
    />;
}

