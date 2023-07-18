import React, { Component } from 'react';
import "./NavBar.css";
import Grid from '@material-ui/core/Grid';
import insta_log from "../../images/logoSocialBook2.png"

import { BorderBottom, CenterFocusStrong } from '@mui/icons-material';

import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
class NavBar1 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className="navbar__barContent">
                    <Grid container>
                        {/* <Grid item xs={1}> xx</Grid> */}
                        <Grid item xs={1}></Grid>
                        <Grid item xs={2}>
                            <img className="navbar_logo" src={insta_log} width="175px" />
                        </Grid>
                        <Grid item xs={3}></Grid><Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                           <input text="text" className="navbar__searchBar" placeholder="Search" />
                           
                        </Grid>
                       
                        
                        <Grid item xs={2} container spacing={2}>
                            {/* <div className='creat'><Button style={CenterFocusStrong} variant="contained" endIcon={<AddBoxIcon />} >Creat</Button></div> */}
                           <div className='creat'><Button variant="contained" endIcon={<AddBoxIcon />} sx={{borderRadius:"15px"}}>Creat</Button></div> 
                            <div className='creat_photo'><Avatar sx={{ bgcolor: deepOrange[400], width:"40px",height:"40px",borderRadius:"15px"}} variant="square">N</Avatar></div>
                 </Grid> 
                     
                       
                    
                    </Grid>
                </div>
            </div>
         );
    }
}
 
export default NavBar1;