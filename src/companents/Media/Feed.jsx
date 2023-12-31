import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import StatusBar from "../StatusBar/StatusBar";
import MainPageAccount from "../MainPage/MainPageAccount";

import Statusa from "../Account/statusa"

const Feed = (userId) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

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
   
        <StatusBar userId={userId}/>
        <MainPageAccount userId={userId.userId}/>
          <Post />
          <Post />
  
        </>
      )}
    </Box>
  );
};

export default Feed;
