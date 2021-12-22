import { Dispatch, SetStateAction } from "react";
import { QueryKey, useQuery, useQueryClient } from "react-query";

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
export const APIKEY = process.env.REACT_APP_APIKEY ?? 'Please setup API key'

const TABLE_ID_MESSAGES = process.env.REACT_APP_TABLE_ID_MESSAGES ?? 'Please setup users table ID(site id)'
const TABLE_ID_ROOMS = process.env.REACT_APP_TABLE_ID_ROOMS ?? 'Please setup rooms table ID(site id)'
const TABLE_ID_USERS = process.env.REACT_APP_TABLE_ID_USERS ?? 'Please setup messages table ID(site id)'
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
                "ApiKey": APIKEY,
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
                "ApiKey": APIKEY,
                ...this.dataToRawData(data),
            })
        })
    }
}

export const tables = {
    messages: new TableInfo<Message>(TABLE_ID_MESSAGES,
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
    rooms: new TableInfo<Room>(TABLE_ID_ROOMS,
        (rawRoom: any) => ({
            roomId: rawRoom.ResultId,
            name: rawRoom.Title,
        }),
        (room: Room) => ({
            Title: room.name
        }),
    ),
    users: new TableInfo<User>(TABLE_ID_USERS,
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
                "ApiKey": APIKEY
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

export function useQState<T>(key: QueryKey, initial?: T): [T, Dispatch<SetStateAction<T>>] {
    const stateValue = useQuery<T>(key, {
        enabled: false,
        ...(initial ? { initialData: initial } : {})
    }).data as T;
    const queryClient = useQueryClient();
    const stateSetter = (arg: ((arg: T) => void) | T): void => {
        let newValue;
        if (typeof (arg) === 'function') {
            const prevValue = queryClient.getQueryData<T>(key);
            newValue = (arg as any)(prevValue)
        }
        else {
            newValue = arg;
        }
        queryClient.setQueryData<T>(key, newValue);

    }
    return [stateValue, stateSetter];
}