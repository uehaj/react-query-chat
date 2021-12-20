import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select } from '@material-ui/core';
import { useQuery, useQueryClient } from 'react-query';
import { User, tables } from '../fetchData';
import { useState } from 'react';

export default function LoginForm() {
    const queryClient = useQueryClient()

    const [selectedUser, setSelectedUser] = useState(0);
    const { data: users } = useQuery<User[]>(['users'], tables.users.fetchTable)
    const { data: loginUser } = useQuery(['loginUser'], { enabled: false });

    const handleChange = (event: any) => {
        setSelectedUser(event.target.value)
    }

    const handleSelect = () => {
        queryClient.setQueryData(['loginUser'], selectedUser);
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
