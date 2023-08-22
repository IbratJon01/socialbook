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
      <Box sx={{ 
      display: { xs: "none", sm: "block" ,marginTop:20 } }}>
  
       
        <Box sx={{backgroundColor:"white", borderRadius:"10px"}} position="fixed" >
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/">
                <ListItemIcon style={{fontSize:55 , textAlign:'center'}}>
                  <Home />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding style={{backgroundColor:"#f5f5f5"}}>
              <ListItemButton  component={Link} to="/chat" state={{authUsers:userData}} >
                <ListItemIcon>
                  <MapsUgcOutlinedIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Storefront />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton  component={Link} to="/account-user" state={{dataUser:userData}}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          
         
          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;
  