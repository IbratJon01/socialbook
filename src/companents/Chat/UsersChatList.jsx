import React, { useEffect, useState } from 'react';
import prof_img from '../../images/pp1.png'
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import axios from 'axios';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

function UsersChatList(authUsers) {

console.log(authUsers.authUsers);
const userNameAuth =authUsers.authUsers.userName
    const [users, setUsers] = useState([]);

    useEffect(() => {
      async function fetchUsers() {
        try {
          const response = await axios.get(`http://localhost:8080/api/chat/allmessages/${userNameAuth}`); // Your API endpoint here
          setUsers(response.data.allUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
      fetchUsers();
    }, []);
 
    return (
    <>
     <List>
          {users.map((users, index) => (
            <ListItem key={index}>
              <ListItemText>
              <div >
                  <div className='account'>
                    <Grid container className='follow_box'>
                    <Grid item xs={2.5}> <img className="prof_img" src={prof_img}/></Grid>
                      <Grid item xs={6}>
                        <span className='text'>
                          <span
                            className='userName'>
                            <Link className='link' to='/chat' state={{dataUser:users , authUsers:authUsers.authUsers}}> {users.userName} </Link>
                            
                          </span>
                          <br />
                          <span className='text_follow_name'>{users.name}</span>
                        </span>
                      </Grid>
                      <Grid item xs={3.5}>
                        {/* <App followingData={following}/> */}
                        <Button className='button_dev' variant="outlined">Drsss</Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </ListItemText>
            </ListItem>
          ))}
    </List>

    </>  );
}

export default UsersChatList;