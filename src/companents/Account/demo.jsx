import Sidebar from "../Media/Sidebar";
import Feed from "../Media/Feed";
import Rightbar from "../Media/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../Media/Navbar";
import React, { useState, useEffect } from 'react';
import FooterBar from "../Media/footerBar"
import  StatusBar from "../StatusBar/StatusBar"
import Grid  from '@material-ui/core/Grid';
function App() {
  const [mode, setMode] = useState("light");
  const [userData, setUserData] = useState(null);
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });


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

  console.log(userData);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#f9fafb"} color={"text.primary"}>
      <Navbar/>

        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode} />
        <Feed/>
         <Rightbar /> {/* <StatusBar/> */}
       
       
          
        </Stack>
    
        <FooterBar/>

      </Box>
    </ThemeProvider>
  );
}

export default App;