import React, { Component } from 'react';
import './contact.css';
import { Box ,Grid} from "@mui/material";
import prof_img from '../../images/pp1.png'

class Contacts extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
        <div className='mainPageR'>

            <Box sx={{ overflow: 'auto' }} >
                       
                       <Grid container>
                           <Grid className='contact'>Contact</Grid>
                           <Grid xs={8}></Grid>
                           <Grid><div className='sanoq_con'><span>1</span></div></Grid>
                       </Grid>
                  
               </Box>
               <Box sx={{ overflow: 'auto' }} >
               <div className='drawer_box'>
               <div className='contact_user'>
                <Grid container >
                  <Grid item xs={3}> <img className="prof_img" src={prof_img}/></Grid>
                  <Grid item xs={8} ><span className='text1'><span className='userName'  >Jeyms Brain</span></span></Grid>
                </Grid>
                </div>
                <div className='contact_user'>
                <Grid container >
                  <Grid item xs={3}> <img className="prof_img" src={prof_img}/></Grid>
                  <Grid item xs={8} ><span className='text1'><span className='userName'  >Jeyms Brain</span> </span></Grid>
                </Grid>
                </div>
             
                  </div>
             
               </Box>


        </div>  );
    }
}
 
export default Contacts;