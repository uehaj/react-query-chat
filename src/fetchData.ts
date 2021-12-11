export type Message = {
    messageId: number,
    createdAt: string,
    userId: number,
    roomId: number,
    content: string,
}

export type Room = {
    roomId: number,
    name: string,
}

export type User = {
    userId: number,
    name: string,
}

export const tables: {
    messages: {
        tableId: string,
        mapper: (rawMessage: any) => Message
    }
    rooms: {
        tableId: string,
        mapper: (rawMessage: any) => Room
    }
    users: {
        tableId: string,
        mapper: (rawMessage: any) => User
    }
} = {
    messages: {
        tableId: '448',
        mapper: (rawMessage: any) => ({
            messageId: rawMessage.ResultId,
            createdAt: rawMessage.CreatedTime,
            userId: Number(rawMessage.ClassHash.ClassA),
            roomId: Number(rawMessage.ClassHash.ClassB),
            content: rawMessage.Body,
        })
    },
    rooms: {
        tableId: '449',
        mapper: (rawMessage: any) => ({
            roomId: rawMessage.ResultId,
            name: rawMessage.Title,
        })
    },
    users: {
        tableId: '446',
        mapper: (rawMessage: any) => ({
            userId: rawMessage.ResultId,
            name: rawMessage.Title,
        })
    },
}

const ApiKey = "3861d79b4266bb718631e93438682a8f2ecc1d3f1a7a3cd62930df7acc3594fddc6c77ab6c8fb6e9da50f98e3758cc7c993dab22ab1072cba37c139fc4dcb9f5"

export function fetcher({ tableId, mapper }: { tableId: string, mapper: any }) {
    return () =>
        fetch(`/api/items/${tableId}/get`, {
            method: 'POST',
            body: JSON.stringify({
                "ApiVersion": '1.1',
                "ApiKey": ApiKey
            })
        })
            .then(res => res.json())
            .then(data => {
                const rawMessages = data.Response.Data;
                return rawMessages.map(mapper)
            })
}