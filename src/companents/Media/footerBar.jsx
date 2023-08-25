// Footer.js
import React, { useState, useEffect } from 'react';
import { AppBar, CssBaseline, Box } from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton } from "@mui/material";
import "./style.css";

function Footer() {
  const [userData, setUserData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className="custom-appbar" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <div className="footerBar">
          <Box sx={{ display: { xs: "block", sm: "none", lg: 'none' } }}>
            <div className="navigation">
              <ul>
                <ListItem className={`list ${activeIndex === 0 ? 'active' : ''}`}>
                  <ListItemButton component={Link} to="/" onClick={() => handleItemClick(0)}>
                    <span className="icon">
                      <HouseOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Home</span>
                    <span className="circle"></span>
                  </ListItemButton>
                </ListItem>
                <ListItem className={`list ${activeIndex === 1 ? 'active' : ''}`}>
                  <ListItemButton component={Link} to="/account-user" state={{ dataUser: userData }} onClick={() => handleItemClick(1)}>
                    <span className="icon">
                      <PermIdentityOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Profile</span>
                    <span className="circle"></span>
                  </ListItemButton>
                </ListItem>
                <ListItem className={`list ${activeIndex === 2 ? 'active' : ''}`}>
                  <ListItemButton component={Link} to="/add-post" onClick={() => handleItemClick(2)}>
                    <span className="icon">
                      <AddCircleOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Add post</span>
                    <span className="circle"></span>
                  </ListItemButton>
                </ListItem>
                <ListItem className={`list ${activeIndex === 3 ? 'active' : ''}`}>
                  <ListItemButton component={Link} to="/photos" onClick={() => handleItemClick(3)}>
                    <span className="icon">
                      <ArticleOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Photos</span>
                    <span className="circle"></span>
                  </ListItemButton>
                </ListItem>
                <ListItem className={`list ${activeIndex === 4 ? 'active' : ''}`}>
                  <ListItemButton component={Link} to="/chat" state={{ authUsers: userData }} onClick={() => handleItemClick(4)}>
                    <span className="icon">
                      <MapsUgcOutlinedIcon sx={{ fontSize: 30 }} />
                    </span>
                    <span className="text">Message</span>
                    <span className="circle"></span>
                  </ListItemButton>
                </ListItem>
                <div className={`indicator ${activeIndex === 0 ? 'active' : ''}`}></div>
              </ul>
            </div>
          </Box>
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default Footer;
