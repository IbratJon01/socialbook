
import React, { Component } from 'react';
import { Drawer,Divider, Toolbar,ListItemText ,Box,ListItem,ListItemButton,List, Grid} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemIcon from '@mui/material/ListItemIcon'
import "./styleDraw.css";
import prof_img from '../../images/pp1.png'
import MainContent1 from '../MainContent/MainContent1';


import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;
class DrawerMn1 extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( <div>
        
            <div className='mainPage'> 
     
             <Box sx={{ overflow: 'auto' }} >
            <div className='account'><Grid container className='drawer_box'>
           
                <Grid item xs={3}> <img className="prof_img" src={prof_img}/></Grid>
                <Grid item xs={8} ><span className='text'> <span className='userName'>Asadov Ibrat</span></span></Grid>
       
                </Grid></div>
        
      
         </Box>  
          <div className='drawer_box1' ><List>
  {[
    { text: 'Home', path:<MainContent1/>, icon: <HomeIcon /> },
    { text: 'People', icon: <PeopleIcon /> },
    { text: 'Photo', icon: <PhotoIcon /> },
    { text: 'Profel', icon: <AccountBoxIcon /> },
    { text: 'News Feed', icon: <RssFeedIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ].map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton   key={item.path}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
       
      </ListItemButton>
    </ListItem>
  ))}
</List>

         </div>
         
      
            </div>
        </div> );
    }
}
 
export default DrawerMn1;