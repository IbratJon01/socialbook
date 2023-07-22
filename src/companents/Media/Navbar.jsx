import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  ListItemButton,

} from "@mui/material";
import React, {  useState } from 'react';
import "../NavBar/Navbar1"
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import insta_log from "../../images/logoSocialBook2.png"
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import App from "../search/App"
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import { blue } from "@mui/material/colors";

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


const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  const [openSearch, setOpenSearch]= useState(false);
  
  const handleOpen = () => {
    setOpenSearch(true);
   };

    const handleCloseSearch = () => {
      setOpenSearch();
      console.log(open);
    };

  return (
    <div  className="navbar__barContent"> 
     {/* <AppBar position="sticky"> */}


       <StyledToolbar >
        <Typography variant="h6">
        <img  sx={{ display: { xs: "none", sm: "block" } }} className="navbar_logo" src={insta_log} width="165px" />
        </Typography>

       
        <Icons>
          
           <Search sx={{display:{xs:"none",sm:"block"}}}>
           <ListItemButton onClick={handleOpen} >
       
      
           <SearchIcon color="primary" /> 
       
              
              
             </ListItemButton>
          
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
      <div>
    
    <Dialog open={openSearch}   maxWidth="xs" fullWidth >
      <DialogTitle>Search...</DialogTitle>
      <DialogContent >
        <DialogContentText>
         
          <App/>
        </DialogContentText>
      

      </DialogContent>
      <DialogActions>
        <Button  onClick={handleCloseSearch} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
                     </Dialog>
                 
               </div> 
    {/* </AppBar> */}
  </div>
  );
};

export default Navbar;
