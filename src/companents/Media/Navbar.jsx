import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import "../NavBar/Navbar1"
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import insta_log from "../../images/logoSocialBook2.png"
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import App from "../search/App"

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});


const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  
  borderRadius: "13px",
 
}));


const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
   
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div  className="navbar__barContent"> 
     {/* <AppBar position="sticky"> */}


       <StyledToolbar >
        <Typography variant="h6">
        <img  sx={{ display: { xs: "none", sm: "block" } }} className="navbar_logo" src={insta_log} width="165px" />
        {/* <img  sx={{ display: { xs: "block", sm: "none" } }} className="navbar_logo" src={insta_log} width="150px" /> */}
        </Typography>

        
        {/* <div sx={{ display: { xs: "none", sm: "none" ,lg:"block"} }} >  <img className="navbar_logo" src={insta_log} width="175px" /></div> */}
        {/* <Pets sx={{ display: { xs: "block", sm: "none" } }} /> */}
     
        <Icons>
          
           <Search sx={{display:{xs:"none",sm:"block"}}}>
           <ListItemButton  component="a" href="/search">
{/*        
           <ListItemIcon> */}
           <SearchIcon color="primary" /> 
         
            {/* </ListItemIcon>
            <ListItemText sx={{marginRight:10}} primary="Search..." /> */}
             
    
       
              
               {/* <div>
    
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Followings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here is a list of your followings:
        </DialogContentText>
      
      <List>
        {following.map((following, index) => (
          <ListItem key={index}>
            <ListItemText>
            <div >
                <div className='account'>
                  <Grid container className='follow_box'>
                  <Grid item xs={2.5}> <img className="prof_img" src={prof_img}/></Grid>
                    <Grid item xs={6}>
                      <span className='text'>
                        <span
                          className='userName'>
                          <Link className='link' to='/account-users' state={{dataUser:following}}> {following.userName} </Link>
                          
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

    <Dialog open={openFollowers} onClose={handleCloseFollowers} maxWidth="xs" fullWidth>
      <DialogTitle>Followings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here is a list of your followings:
        </DialogContentText>
      
      <List>
        {followers.map((follower, index) => (
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
                          onClick={handleCloseFollowers}>
                          <Link to='/account-users' state={{dataUser:follower}}> {follower.userName} </Link>
                          
                        </span>
                        <br />
                        <span className='text_follow_name'>{follower.name}</span>
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
        <Button onClick={handleCloseFollowers} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
               </div> */}
             </ListItemButton>
          
          {/* <InputBase placeholder="search..." /> */}
          </Search>
        <Button variant="contained" endIcon={<AddBoxIcon />} sx={{borderRadius:"15px",width:" 115px",
    height: "40px"}}>Creat</Button>
       
          <Avatar
            sx={{width: "40px", height: "40px" , borderRadius:"15px" }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
         
         <Avatar
            sx={{ width: "40px", height: "40px" , borderRadius:"15px"}}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          {/* <Typography variant="span">John</Typography> */}
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
     
    {/* </AppBar> */}
  </div>
  );
};

export default Navbar;
