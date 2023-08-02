import Sidebar from "../Media/Sidebar";
import Feed from "./MainPageUser";
import Rightbar from "../Media/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../Media/Navbar";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import FooterBar from "../Media/footerBar"
import Account from "./Account"

function App(props) {
  const location = useLocation();
  const dataUser = location.state?.dataUser;
  
  const [mode, setMode] = useState("light");
  console.log(props.userId);
  const authUserID  = props.userId
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // if(dataUser.userId==authUserID){
  //   return(<Account/>)
  //  }
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#f9fafb"} color={"text.primary"}>
      <Navbar userId={authUserID}/>

        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
        <Feed dataUser={dataUser} />
         <Rightbar /> {/* <StatusBar/> */}
       
       
          
        </Stack>
    
        <FooterBar/>

      </Box>
    </ThemeProvider>
  );
}

export default App;