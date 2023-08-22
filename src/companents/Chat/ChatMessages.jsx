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

const ChatMessages = ({ messages, AuthUserName,onDeleteMessage }) => { 
  
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
        <div 
         
        >{message.id}</div>
        {message.sender.userName === "Ibrat_Jann" && !message.sentByCurrentUser && (
          <ListItemText
          
            primary={<>
            <span>{message.sender.userName}</span>
            <span style={{float: "right"}}>{message.read == true ? (
              <span>T</span>
            ) : (
              <span>F</span>
            
            )}</span></>}
            secondary={<div style={{ color:'#fffff'}}>{message.content}+{message.id}</div>}
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
            //  onChange={(e) => setContent(e.target.value)}
            }}
          />

          
        )}

       

        {message.sender.userName !== 'Ibrat_Jann' && (
          <ListItemText
            primary={
            <div>
              <span>{message.sender.userName}</span>
              <span>{message.sender.userName  == name ? (
        <span>{message.read}</span>
      ) : (
        <span>{message.read}</span>
      
      )}</span></div>}
            secondary={message.content}
            sx={{
              backgroundColor: message.sentByCurrentUser ? '#f5f5f5' : '#f5f5f5',
              borderRadius: '10px',
              padding: '10px',
              maxWidth: '70%',
            }}
            onContextMenu={(e) => {
              e.preventDefault(); // Sukutiyani o'zgartiring
              handleMenuOpen(e); // Maxsus ixtiyoriy menuni ochish
            //  onChange={(e) => setContent(e.target.value)}
            }}
          />
        )}

        
        
         <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}> <EditIcon /> <span style={{marginLeft:5}}>Tahrirlash</span> </MenuItem>
        <MenuItem onClick={() => onDeleteMessage(message.id)} onClose={handleMenuClose}>
              <DeleteIcon /> O'chirish
            </MenuItem>
        <MenuItem>{message.id}</MenuItem>
      </Menu>
     
     
     
      </ListItem>
      
    )
    
    )}

    
  </List>
  
  )
 
          };

export default ChatMessages;
