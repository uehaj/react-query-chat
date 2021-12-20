import { QueryKey, useQuery } from "react-query";

export type Message = {
    messageId?: number,
    createdAt?: string,
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

export const FETCH_INTERVAL = 15 * 1000;
export const EXPIRE_TIME = 10 * 1000;
export const ApiKey = "3861d79b4266bb718631e93438682a8f2ecc1d3f1a7a3cd62930df7acc3594fddc6c77ab6c8fb6e9da50f98e3758cc7c993dab22ab1072cba37c139fc4dcb9f5"
class TableInfo<T> {
    tableId: string;
    rawDataToData: (rawData: any) => T;
    dataToRawData: (data: T) => any;
    constructor(
        tableId: string,
        rawDataToData: (rawMessage: any) => T,
        dataToRawData: (data: T) => any
    ) {
        this.tableId = tableId;
        this.rawDataToData = rawDataToData;
        this.dataToRawData = dataToRawData;
    }
    fetchTable = () => {
        return fetch(`/api/items/${this.tableId}/get`, {
            method: 'POST',
            body: JSON.stringify({
                "ApiVersion": '1.1',
                "ApiKey": ApiKey
            })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.Response) {
                    return Promise.reject("Server Error");
                }
                const rawData = data.Response.Data;
                return rawData.map(this.rawDataToData)
            })
    }
    create = (data: T) => {
        return fetch(`/api/items/${this.tableId}/create`, {
            method: 'POST',
            body: JSON.stringify({
                "ApiVersion": '1.1',
                "ApiKey": ApiKey,
                ...this.dataToRawData(data),
            })
        })
    }
}

export const tables = {
    messages: new TableInfo<Message>('448',
        (rawMessage: any) => ({
            messageId: rawMessage.ResultId,
            createdAt: rawMessage.CreatedTime,
            userId: Number(rawMessage.ClassHash.ClassA),
            roomId: Number(rawMessage.ClassHash.ClassB),
            content: rawMessage.Body,
        }),
        (message: Message) => ({
            ClassHash: {
                ClassA: message.userId,
                ClassB: message.roomId,
            },
            Body: message.content,
        })
    ),
    rooms: new TableInfo<Room>('449',
        (rawRoom: any) => ({
            roomId: rawRoom.ResultId,
            name: rawRoom.Title,
        }),
        (room: Room) => ({
            Title: room.name
        }),
    ),
    users: new TableInfo<User>('446',
        (rawUser: any) => ({
            userId: rawUser.ResultId,
            name: rawUser.Title,
        }),
        (user: User) => ({
            Title: user.userId
        }),
    )
}

export const queryFn = async ({ queryKey: [url] }: { queryKey: [string] }) => {
    const res = await fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify({
                "ApiVersion": '1.1',
                "ApiKey": ApiKey
            })
        });
    const data = await res.json();
    if (!data.Response) {
        throw Error(`Server Error on ${url}`);
    }
    return data.Response.Data;
}

export const rawMessageToMessage = (rawMessage: any): Message => ({
    messageId: rawMessage.ResultId,
    createdAt: rawMessage.CreatedTime,
    userId: Number(rawMessage.ClassHash.ClassA),
    roomId: Number(rawMessage.ClassHash.ClassB),
    content: rawMessage.Body,
});

export function useQS<T>(key: QueryKey, initial?: T): T {
    return useQuery<T>(key, {
        enabled: false,
        ...(initial ? { initialData: initial } : {})
    }).data as T;
}