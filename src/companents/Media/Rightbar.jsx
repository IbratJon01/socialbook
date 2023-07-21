import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import prof_img from '../../images/pp1.png'
import Button from '@mui/material/Button';
import Contacts from "../Contact/contact";

const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box  position="fixed" marginRight={8} width={300}>

       <Box sx={{ overflow: 'auto' }} >
           
           <Grid container>
               <Grid className='request'>Request</Grid>
               <Grid xs={6}></Grid>
               <Grid><div className='sanoq'><span>1</span></div></Grid>
           </Grid>
      
       </Box>

       <Box sx={{ overflow: 'auto',fontFamily: 'default' }} >
       <div className='drawer_box'><Grid container >
 
      <Grid item xs={3}> <img className="prof_img" src={prof_img}/></Grid>
      <Grid item xs={8} ><span className='text1'><span className='userName'  >Jeyms Brain</span> wonts to add you to friends</span></Grid>

      </Grid>
      <Grid container className='button_continor' >
      <Grid xs={2}></Grid>
       <Grid xs={5}> 
       <div className='button_dev'>
           <Button className='button_dev' variant="contained" href="#contained-buttons">Accept</Button>
           </div></Grid>
       <Grid xs={5}>
           <div className='button_dev'>
               <Button className='button_dev'  variant="outlined" href="#outlined-buttons">Drsss</Button>
               </div> </Grid>
      </Grid>
    
      </div>



       </Box>

       <Box sx={{ overflow: 'auto',fontFamily: 'default' }} >
  <div className='drawer_box'><Grid container >
 
      <Grid item xs={3}> <img className="prof_img" src={prof_img}/></Grid>
      <Grid item xs={8} ><span className='text1'><span className='userName'  >Leyli Brain</span> wonts to add you to friends</span></Grid>

      </Grid>
      <Grid container className='button_continor' >
      <Grid xs={2}></Grid>
       <Grid xs={5}> 
       <div className='button_dev'>
           <Button className='button_dev' variant="contained" href="#contained-buttons">Accept</Button>
           </div></Grid>
       <Grid xs={5}>
           <div className='button_dev'>
               <Button className='button_dev'  variant="outlined" href="#outlined-buttons">Drsss</Button>
               </div> </Grid>
      </Grid>
    
      </div>



       </Box> 

       <Contacts/>
        </Box>
     
    </Box>
  );
};

export default Rightbar;
