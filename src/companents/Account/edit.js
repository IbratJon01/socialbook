import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

const options = [
  'Edit',
  'Delete',
  'About',
];

const ITEM_HEIGHT = 48;

const Edit = (props) => {
  const { postId } = props; // postId ni props dan olib olamiz



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/status/post/delete/${postId}`)
      .then((response) => {
        // Handle successful deletion response
        console.log('Post deleted successfully');
        // Perform any additional actions or update the UI as needed
        handleClose();
      })
      .catch((error) => {
        // Handle error response
        console.error('Error deleting post:', error);
        // Perform any error handling or show error messages
        // based on your application's requirements
      });
  };
  
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Delete'}
            onClick={option === 'Delete' ? handleDelete : handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Edit;
