import Sidebar from "../Media/Sidebar";
import Feed from "../Media/MainPageUser";
import Rightbar from "../Media/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../Media/Navbar";

import { useState } from "react";
import FooterBar from "../Media/footerBar"

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#f9fafb"} color={"text.primary"}>
      <Navbar/>

        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
        <Feed />
         <Rightbar /> {/* <StatusBar/> */}
       
       
          
        </Stack>
    
        <FooterBar/>

      </Box>
    </ThemeProvider>
  );
}

export default App;