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
import React from "react";
import prof_img from '../../images/pp1.png'
import "../Drawer/styleDraw.css"
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

const Sidebar = ({mode,setMode}) => {
  return (
    <Box  flex={2} p={2} sx={{ margin: "25px",
    display: { xs: "none", sm: "block" } }}>
      <Box  position="fixed" sx={{ overflow: 'auto' ,width:300}} >
            <div className='account'>
              <Grid container className='drawer_box'>
           {/* <Grid item xs={1}></Grid> */}
                <Grid item xs={1} > <img className="prof_img" src={prof_img}/></Grid>
                <Grid item xs={6} sx={{marginLeft:6}}><span className='text'> <span className='userName'>Asadov Ibrat</span></span></Grid>
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
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <MapsUgcOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
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
            <ListItemButton component="a" href="/account-user">
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
