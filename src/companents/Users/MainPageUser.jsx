import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Post from "../Media/Post";
import StatusBarUsers from "./StatusBarUsers";
import MainPageUsers from "./MainPageUsers";
import Statusa from "./follow"

const Feed = (props) => {

  const userId = props.dataUser.userId;
  console.log(userId);

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);
  console.log(props.dataUser);
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
  
        <Statusa userId={userId}/>
        <StatusBarUsers userId={props.dataUser.id} />
        <MainPageUsers userId={props.dataUser.id}/>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </>
      )}
    </Box>
  );
};

export default Feed;