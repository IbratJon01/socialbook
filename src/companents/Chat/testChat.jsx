import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import Search from '../search/App';
import UsersChatList from './UsersChatList';
import { useLocation } from 'react-router-dom';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Avatar from '@mui/material/Avatar';

const App = () => {
  const location = useLocation();
  const { dataUser, authUsers } = location.state || {};
  const userName = dataUser ? dataUser.userName : null;
  const AuthUserName = authUsers ? authUsers.userName : null;
  const [messages, setMessages] = useState([]);

  console.log(authUsers);
  useEffect(() => {
    if (userName) {
      fetchMessages(userName);
    }
  }, [userName]);

  const fetchMessages = async (otherUser) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chat/messages?user1=${AuthUserName}&user2=${otherUser}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching messages:', error);
    }
  };

  const handleSubmit = async (data) => {
    if (userName) {
      await fetch('http://localhost:8080/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      fetchMessages(userName);
    }
  };


  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chat/delete/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Message deleted successfully');
        // Fetch updated messages after successful deletion
        fetchMessages(userName);
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  



  if (!userName) {
    return <div>

        <Paper  style={{ height: '100%', marginTop:'15px'}}> 
          <div style={{ height:"80%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <ContactSupportIcon style={{ fontSize: '48px', marginRight: '10px' }} />
                <div>
                  <h2>Your messages</h2>
                  <p>Send private photos and messages to a friend or group</p>
                </div>
              </div>
        </Paper>


    </div>;
  }

  console.log(messages);

  return (


        <Paper style={{marginTop: 15 }}>
          <div style={{ display: 'flex', flexDirection: 'column',height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ marginRight: '15px' ,marginLeft:'15px' ,width:45,height:45}}/>
                <div>
                  <div></div>
                  <div>{userName}</div>
                </div>
              </div>
              <div>Header Actions (if any)</div>
            </div>
          <div style={{ overflowY: 'auto', flexGrow: 1, maxHeight: '70vh' }}>
             <ChatMessages messages={messages} AuthUserName={AuthUserName} onDeleteMessage={handleDeleteMessage} />
          </div>
          
            <ChatForm onSubmit={handleSubmit} sender={AuthUserName} receiver={userName} style={{ flexGrow: 1 }} />
          </div>
        </Paper>

  );
};

export default App;
