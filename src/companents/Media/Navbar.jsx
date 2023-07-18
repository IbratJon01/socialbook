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
} from "@mui/material";
import React, { useState } from "react";
import "../NavBar/Navbar1"
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import insta_log from "../../images/logoSocialBook2.png"
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: "20px",
  backgroundColor: "#f5f5f5",

}));
// const Search = styled("div")(({ theme }) => ({
//   backgroundColor: "#fafafa",
//   padding: "0 10px",
//   borderRadius: "20px",
//   width: "30%",
//   height:" 30px",
//   border:" 1px solid #dbdbdb"
//   // width:" 335px"


// }));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "15px",
  backgroundColor: "#f5f5f5",
  border:" 1px solid #dbdbdb",
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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
    <div className="navbar__barContent"> 
     {/* <AppBar position="sticky"> */}
      <StyledToolbar>
        <Typography variant="h6">
        <img  sx={{ display: { xs: "none", sm: "block" } }} className="navbar_logo" src={insta_log} width="165px" />
        {/* <img  sx={{ display: { xs: "block", sm: "none" } }} className="navbar_logo" src={insta_log} width="150px" /> */}
        </Typography>

        
        {/* <div sx={{ display: { xs: "none", sm: "none" ,lg:"block"} }} >  <img className="navbar_logo" src={insta_log} width="175px" /></div> */}
        {/* <Pets sx={{ display: { xs: "block", sm: "none" } }} /> */}
     
        <Icons>
          
           <Search sx={{display:{xs:"none",sm:"block"}}}>
        <SearchIconWrapper>
              <SearchIcon color="primary"/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
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
