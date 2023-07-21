import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.userName} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
