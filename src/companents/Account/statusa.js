

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./status.css";
import { Avatar } from '@material-ui/core';
import prof_img from '../../images/pp1.png'
import { Box ,Grid} from "@mui/material";
import Button from '@mui/material/Button';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText } from '@material-ui/core';
import AccountUsers from './AccountUsers'
import Account from './account';
import { Link } from 'react-router-dom';

const UserStatusList = ({ userId  }) => {

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

   const [userData, setUser] = useState([]);
   const [open, setOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const followings = [{userName:'Gaybul_ov',name:"Gaybulla Negmatov"},{userName:'Alisher_ev',name:"Alisher Fayzullayev'"} ,{userName:'Nodir_007',name:'Nodir Rahimov'} ];
  //Users GET data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        const userData = response.data;
        setUser(userData);
  
        const fetchFollowers = async () => {
          try {
            const followersResponse = await fetch(`http://localhost:8080/users/${userData.id}/followers`);
            const followersData = await followersResponse.json();
            setFollowers(followersData);
  
          } catch (error) {
            console.error('Error fetching followers:', error);
          }
        };
        fetchFollowers();
  
        const fetchFollowing = async () => {
          try {
            const followingResponse = await fetch(`http://localhost:8080/users/${userData.id}/following`);
            const followingData = await followingResponse.json();
            setFollowing(followingData);
  
          } catch (error) {
            console.error('Error fetching following:', error);
          }
        };
        fetchFollowing();
  
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUser();
  }, [userId]);
  



  return (
    <div>
     
      <div className='header'></div>
      {/* <div className='profel_img2'><Avatar className="img__status" src={prof_img}/></div> */}
       <Grid container >
      
           <Grid  item xs={3}><div className='profel_img2'><Avatar className="img__status" src={prof_img}/></div></Grid>
           <Grid item xs={9}>
           <Grid container className='follow_status'> 
           <Grid item xs={3}> <Button variant="text" >0 posts</Button></Grid>
           <Grid item xs={4}><Button variant="text"><span className='follow'>{followers.length} </span> Followers</Button></Grid>
           <Grid item xs={4}><Button variant="text"><span  className='follow'>{following.length} </span>  following</Button></Grid></Grid>
           </Grid>
           
      </Grid>
      <div className='bio'> <span className='text1'> <span className='userName'>Bio :</span> We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.</span> </div>
     
      <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Small Screen
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Followings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here is a list of your followings:
          </DialogContentText>
        
        <List>
          {followings.map((following, index) => (
            <ListItem key={index}>
              <ListItemText>
              <div >
                  <div className='account'>
                    <Grid container className='follow_box'>
                    <Grid item xs={2.5}> <img className="prof_img" src={prof_img}/></Grid>
                      <Grid item xs={6}>
                        <span className='text'>
                          <span
                            className='userName'
                          
                          >
                            <Link
                          to={{
                            pathname: '/account-users',
                            state: { following }
                          }}
                        >
                          {following.userName}
                        </Link>
                            
                          </span>
                          <br />
                          <span className='text_follow_name'>{following.name}</span>
                        </span>
                      </Grid>
                      <Grid item xs={3.5}>
                        <Button className='button_dev' variant="outlined">Drsss</Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </ListItemText>
            </ListItem>
          ))}
        </List>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
     
    </div>
  );
};




export default UserStatusList;


