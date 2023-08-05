import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Post from "../Media/Post";
import StatusBarUsers from "./StatusBarUsers";
import MainPageUsers from "./MainPageUsers";
import Statusa from "./follow"



const Feed = (props) => {
const [userData, setUserData] = useState(null);
  const userId = props.dataUser.userId;
  

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);
  console.log(props.dataUser);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
      
        const response = await fetch(`http://localhost:8080/users/${props.authUserID}`);
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


  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        
        <>
  
        <Statusa userId={userId} userAuthData={userData}/>
        <StatusBarUsers userId={props.dataUser.userId} />
        <MainPageUsers userId={props.dataUser.userId}/>
          <Post />
          <Post />
       
        </>
      )}
    </Box>
  );
};

export default Feed;
