import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

const ChatMessages = ({ messages }) => (
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
        {message.sender.userName === "IbratJann" && !message.sentByCurrentUser && (
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
          />
        )}

       

        {message.sender.userName !== "IbratJann" && (
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
      </ListItem>
    ))}
  </List>
);

export default ChatMessages;
