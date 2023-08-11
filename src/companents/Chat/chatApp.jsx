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
  const dataUser = location.state ? location.state.dataUser : null;
  const userName = dataUser ? dataUser.userName : null;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userName) {
      fetchMessages(userName);
    }
  }, [userName]);

  const fetchMessages = async (otherUser) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chat/messages?user1=IbratJann&user2=${otherUser}`);
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
  if (!userName) {
    return <div>

<Container>
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Paper>
          <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <br />
            <Search />
          </div>
          <div>
            <UsersChatList />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper  style={{ height: '100%', marginTop:'15px'}}> 
          <div style={{ height:"80%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <ContactSupportIcon style={{ fontSize: '48px', marginRight: '10px' }} />
                <div>
                  <h2>Your messages</h2>
                  <p>Send private photos and messages to a friend or group</p>
                </div>
              </div>
        </Paper>
      </Grid>
    </Grid>
   </Container>

    </div>;
  }

  return (
    <Container>
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Paper>
          <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <br />
            <Search />
          </div>
          <div>
            <UsersChatList />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
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
            <ChatMessages messages={messages} />
          </div>
          
            <ChatForm onSubmit={handleSubmit} sender="IbratJann" receiver="KomilJannn" style={{ flexGrow: 1 }} />
          </div>
        </Paper>
      </Grid>
    </Grid>
   </Container>
  );
};

export default App;
