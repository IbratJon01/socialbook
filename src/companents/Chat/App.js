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
import Messages from './testChat'
import Sidebar from './SidebarChat'

const App = () => {
  const location = useLocation();
  const { dataUser, authUsers } = location.state || {};
  const userName = dataUser ? dataUser.userName : null;
  const AuthUserName = authUsers ? authUsers.userName : null;
  const [messages, setMessages] = useState([]);

  return(
    <Container>
    <Grid container spacing={3}> 
     <Grid item xs={12} md={1.2}><Sidebar/></Grid>
      <Grid item xs={12} md={4.5}> <Paper>
          <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <br />
            <Search />
          </div>
          <div>
            <UsersChatList authUsers={authUsers} />
          </div>
        </Paper></Grid>
      <Grid item xs={12} md={6}><Messages/></Grid>
     
      
      </Grid></Container>
  )

};

export default App;