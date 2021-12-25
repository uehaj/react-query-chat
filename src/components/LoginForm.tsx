import React from 'react';
import { Dialog, DialogTitle, DialogContent, Select, MenuItem, DialogActions, Button } from '@mui/material';
import { useQuery } from 'react-query';
import { User, tables, useQState } from '../fetchData';
import { useState } from 'react';

export default function LoginForm() {
    const [selectedUser, setSelectedUser] = useState(0);
    const { data: users, error } = useQuery<User[]>(['users'], tables.users.fetchTable)
    const [loginUser, setLoginUser] = useQState<number>(['loginUser']);

    if (error) {
        return <div>Error: {error}</div>
    }

    const handleChange = (event: any) => {
        setSelectedUser(event.target.value)
    }

    const handleSelect = () => {
        setLoginUser(selectedUser);
    };

    return (
        <div>
            <Dialog open={!loginUser} fullWidth={true}>
                <DialogTitle>ログインアカウント選択</DialogTitle>
                <DialogContent>
                    <Select
                        defaultValue={0}
                        onChange={handleChange}>
                        {users?.map((user) =>
                            <MenuItem key={user.userId} value={user.userId}>
                                {user.name}
                            </MenuItem>
                        )}
                        <MenuItem key={0} value={0}>
                            ログアウト
                        </MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSelect}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
