import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import "./style.css"
import { Box } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

function Footer() {
  const handleItemClick = (event) => {
    const listItems = document.querySelectorAll('.list');
    listItems.forEach((item) => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className="custom-appbar" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <div className="footerBar">
          <Box sx={{ display: { xs: "block", sm: "none", lg: 'none' } }}>
            <div className="navigation">
              <ul>
                <li className="list active" onClick={handleItemClick}>
                  <a href="#">
                    <span className="icon">
                      <HouseOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Home</span>
                    <span className="circle"></span>
                  </a>
                </li>
                <li className="list" onClick={handleItemClick}>
                  <a href="#">
                    <span className="icon">
                      <PermIdentityOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Profile</span>
                    <span className="circle"></span>
                  </a>
                </li>
                <li className="list" onClick={handleItemClick}>
                  <a href="#">
                    <span className="icon">
                      <AddCircleOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Add post</span>
                    <span className="circle"></span>
                  </a>
                </li>
                <li className="list" onClick={handleItemClick}>
                  <a href="#">
                    <span className="icon">
                      <ArticleOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Photos</span>
                    <span className="circle"></span>
                  </a>
                </li>
                <li className="list" onClick={handleItemClick}>
                  <a href="#">
                    <span className="icon">
                      <MapsUgcOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Message</span>
                    <span className="circle"></span>
                  </a>
                </li>
                <div className="indicator"></div>
              </ul>
            </div>
          </Box>
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default Footer;
