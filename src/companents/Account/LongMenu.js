import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import UpdatePost from '../MainPage/updatePost'
const options = ['Delete', 'Edit'];

const ITEM_HEIGHT = 48;

export default function LongMenu({ deletePost , postId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isPostDeleted, setPostDeleted] = React.useState(false);
  const [isEditMode, setEditMode] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    deletePost();
    setPostDeleted(true);
  };

  const handleEdit = () => {
    setEditMode(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setEditMode(false);
  };
console.log(postId);
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={anchorEl ? 'long-menu' : undefined}
        aria-expanded={Boolean(anchorEl)}
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
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={option === 'Delete' ? handleDelete : handleEdit}>
            {option === 'Delete' && (
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
            )}
            {option === 'Edit' && (
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
            )}
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* Dialog oynasi */}
      <Dialog open={isEditMode} maxWidth="sx" onClose={handleDialogClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <UpdatePost postId={postId}/>
        

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogClose} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Button from '@mui/material/Button';
// import React, { useEffect, useState } from 'react';
// import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText } from '@material-ui/core';

// const options = [
//   'Delete',
//   'Edit',
// ];

// const ITEM_HEIGHT = 48;

// export default function LongMenu({ deletePost }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [isPostDeleted, setPostDeleted] = React.useState(false);

//   // React.useEffect(() => {
//   //   if (isPostDeleted) {
//   //     // Refresh the page or perform any necessary actions
//   //     window.location.reload();
//   //   }
//   // }, [isPostDeleted]);

//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDelete = () => {
//     handleClose();
//     deletePost(); // Delete post function
//     setPostDeleted(true);
//   };
//   const [openEdit, setOpen] = useState(false);
//  const handleOpen = () => {
//    setOpen(true);
//  };

//  const handleCloseEdit = () => {
//    setOpen(false);
//  };
//   return (
//     <div>
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? 'long-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           'aria-labelledby': 'long-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           style: {
//             maxHeight: ITEM_HEIGHT * 4.5,
//             width: '20ch',
//           },
//         }}
//       >
//         {options.map((option) => (
//          <> <MenuItem key={option} onClick={option === 'Delete' ? handleDelete : handleClose}>
//             {option === 'Delete' && (
//               <ListItemIcon>
//                 <DeleteIcon />
//               </ListItemIcon>
//             )}
//             {option}
//           </MenuItem >

//            <MenuItem key={option} onClick={option === 'Edit' ? handleOpen : handleClose}>
//           <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="xs" fullWidth>
//               <DialogTitle>Followings</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   Here is a list of your followings:
//                 </DialogContentText>


//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleCloseEdit} color="primary">
//                   Close
//                 </Button>
//               </DialogActions>
//             </Dialog>
//              </MenuItem> </>
//         ))}
//       </Menu>
//     </div>
//   );
// }
