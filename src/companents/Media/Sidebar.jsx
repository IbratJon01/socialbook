import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Grid
} from "@mui/material";
import prof_img from '../../images/pp1.png'
import "../Drawer/styleDraw.css"
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Sidebar = ({mode,setMode ,userId}) => { 

  const [userData, setUserData] = useState(null);

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('users')).uid;
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box  flex={2} p={2} sx={{ margin: "25px",
    display: { xs: "none", sm: "block" } }}>
      <Box  position="fixed" sx={{ overflow: 'auto' ,width:300}} >
            <div className='account'>
              <Grid container className='drawer_box'>
           {/* <Grid item xs={1}></Grid> */}
                <Grid item xs={1} > <img className="prof_img" src={prof_img}/></Grid>
                <Grid item xs={6} sx={{marginLeft:6}}><span className='text'> <span className='userName'>{userData ? userData.userName : 'Loading...'}</span></span></Grid>
                <Grid item xs={1}></Grid>
                </Grid></div>
        
      
       </Box>  
     
     
      <Box sx={{backgroundColor:"white", width:300 , borderRadius:"10px"}} position="fixed" marginTop={18}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Pages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  component={Link} to="/chat" state={{authUsers:userData}} >
              <ListItemIcon>
                <MapsUgcOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Messages"  />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  component={Link} to="/account-user" state={{dataUser:userData}}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        
       
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
