import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ChatMessages = ({ messages, AuthUserName }) => { 
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
const name = AuthUserName;
  console.log(AuthUserName);
  const handleDeleteMessage = async (messageId) => {
    try {
      // Replace 'YOUR_API_URL' with the actual API endpoint for deleting a message
      const response = await fetch(`http://localhost:8080/api/chat/delete/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(messageId);
        // You can update your local state here or fetch updated data from the server
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
     <List>
    {messages.map((message, index) => (
      
      <ListItem
        key={index}
        sx={{
          display: 'flex',
          flexDirection: message.sentByCurrentUser ? 'row-reverse' : 'row', // Align messages to the right or left based on sender
          alignItems: 'flex-start',
        }}
      >
        {message.sender.userName === "Ibrat_Jann" && !message.sentByCurrentUser && (
          <ListItemText
          
            primary={message.sender.userName}
            secondary={<div style={{ color:'#fffff'}}>{message.content}</div>}
            sx={{
            
              backgroundColor: message.sentByCurrentUser ? '#fffff' : '#1976d2',
              color:'#ffffff',
              borderRadius: '10px',
              padding: '10px',
              // marginLeft:'190px',
              // marginRight:'-20px',
              marginLeft: message.sentByCurrentUser ? 0 : '150px',
              marginRight: message.sentByCurrentUser ? '150px' : 0,
              maxWidth: '70%',
              float: "right"
              
            }}
            onContextMenu={(e) => {
              e.preventDefault(); // Sukutiyani o'zgartiring
              handleMenuOpen(e); // Maxsus ixtiyoriy menuni ochish
            }}
          />
        )}

       

        {message.sender.userName !== 'Ibrat_Jann' && (
          <ListItemText
            primary={message.sender.userName}
            secondary={message.content}
            sx={{
              backgroundColor: message.sentByCurrentUser ? '#f5f5f5' : '#f5f5f5',
              borderRadius: '10px',
              padding: '10px',
              maxWidth: '70%',
            }}
          />
        )}
        
         <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}> <EditIcon /> <span style={{marginLeft:5}}>Tahrirlash</span> </MenuItem>
        <MenuItem   onClick={() => handleDeleteMessage(message.id)}> <DeleteIcon /> <span style={{marginLeft:5}}>O'chirish</span></MenuItem>
        <MenuItem>{message.id}</MenuItem>
      </Menu>
     
     
     
      </ListItem>
      
    ))}

    
  </List>
  
  )
 
          };

export default ChatMessages;
