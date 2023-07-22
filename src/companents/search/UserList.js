import React from 'react';
import { List, ListItem, ListItemText ,Stack } from '@mui/material';
import prof_img from '../../images/pp1.png'
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../Account/status.css"
const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          {/* <ListItemText primary={user.userName} /> */}
 
            {/* <Stack direction="row" spacing={2} justifyContent="space-between">
           <img className="prof_img" src={prof_img}/>
           <span className='text'>
                 <span
                   className='userName'
                 >
                   <Link to='/account-users' state={{dataUser:user}}> {user.userName} </Link>
                   
                 </span>
                 <br />
                 <span className='text_follow_name'>{user.name}</span>
            </span>
   
            <Button className='button_dev' variant="outlined">Drsss</Button>
          
        </Stack> */}
             <ListItemText>
             <Grid container className='follow_box'>
                    <Grid item xs={2.5}> <img className="prof_img" src={prof_img}/></Grid>
                      <Grid item xs={6}>
                        <span className='text'>
                          <span
                            className='userName'>
                            <Link className='link' to='/account-user' state={{dataUser:user}}> {user.userName} </Link>
                            
                          </span>
                          <br />
                          <span className='text_follow_name'>{user.name}</span>
                        </span>
                      </Grid>
                      <Grid item xs={1.5}>
                        <Button className='button_dev' variant="outlined">Drsss</Button>
                      </Grid>
                    </Grid></ListItemText>
  
    
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
