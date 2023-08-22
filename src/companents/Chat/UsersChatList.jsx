import React, { useEffect, useState } from 'react';
import prof_img from '../../images/pp1.png'
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import axios from 'axios';
import {

  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { Link } from 'react-router-dom';
import '../StyleApp/usersStyle.css'
function UsersChatList(authUsers) {


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
    }, [userNameAuth]);


 
 console.log(users);
    return (
    <>
     <List>
          {users.map((users, index) => (
               
            <ListItem key={index}  >
              <ListItemButton component={Link} to='/chat' state={{dataUser:users , authUsers:authUsers.authUsers}}  >
           
           
                    <Grid container className='follow_box'>
                      <Grid item xs={3}> <img className="prof_img" src={prof_img}/></Grid>
                      <Grid item xs={8}>
                        <span className='text'>
                          <span
                            className='userName'>
                           {users.name}
                            
                          </span>
                          <br />
                          <span className='text_follow_name'>{(users.newMessages == null) ? (
              <span>{users.lastMessage.content}</span>
            ) : (
              <span>{users.newMessages[0].content}</span>
            
            )}</span>
                        </span>
                      </Grid>
                      <Grid item xs={1}>
                        {/* <App followingData={following}/> */}
                        <span>{users.newMessages == null ? (
              <span>T</span>
            ) : (
              <span className='messagereceiverCost'>{users.newMessages.length}</span>
            
            )}</span>

                      </Grid>
                    </Grid>
                
              
              </ListItemButton>
            </ListItem>
          ))}
    </List>

    </>  );
}

export default UsersChatList;