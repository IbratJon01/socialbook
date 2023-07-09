import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./status.css";
import { Avatar } from '@material-ui/core';
import prof_img from '../../images/pp1.png'
import head_img from '../../images/ToasdUsf5.webp'
import { Box ,Grid} from "@mui/material";import Button from '@mui/material/Button';
const userId  = localStorage.getItem("users");
const userId1  = localStorage.getItem("users");
// Bitta statusga tegishli storylar export qilommiz

export const getStatusList = async (statusId, path, timeStamp) => {
  try {
    const response = await axios.get(`http://localhost:8080/status/user/${userId}`, {
      params: {
        statusId,
        path,
        timeStamp,
      },
    });
    console.log(response.data);
    return Array.isArray(response.data) ? response.data : [];
    
  } catch (error) {
    console.error('Error fetching status data:', error);
    return [];
  }
};



const UserStatusList = ({  }) => {


  
  const [userStatuses, setUserStatuses] = useState([]);



  return (
    <div>
     
      <div className='header'></div>
      {/* <div className='profel_img2'><Avatar className="img__status" src={prof_img}/></div> */}
       <Grid container >
      
           <Grid  item xs={3}><div className='profel_img2'><Avatar className="img__status" src={prof_img}/></div></Grid>
           <Grid item xs={9}>
           <Grid container className='follow_status'> 
           <Grid item xs={3}> <Button variant="text" >0 posts</Button></Grid>
           <Grid item xs={4}><Button variant="text">77 following</Button></Grid>
           <Grid item xs={4}><Button variant="text">171 followers</Button></Grid></Grid>
           </Grid>
           
      </Grid>
      <div className='bio'> <span className='text1'> <span className='userName'>Bio :</span> We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.</span> </div>
     
      
           
        
      {/* {userStatuses.length > 0 ? (
        <ul>
          {userStatuses.map(status => (
            <li key={status.statusId}>
              <div>Status ID: {status.statusId}</div>
              <div>Path: {status.path}</div>
              <div>Timestamp: {status.timeStamp}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>User {userId}ning hech qanday statusi yo'q.</p>
      )} */}
    </div>
  );
};




export default UserStatusList;



















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';





// // import React from 'react';
// console.log();


// function UserStatusList() {
//   const [statusList, setStatusList] = useState([]);
//   let payload = {"userId": JSON.parse(localStorage.getItem("users")).uid}
//   console.log(payload);


// const StatusList = ({ status, userId }) => {
//   const filteredStatuses = status.filter(status => status.userId === userId);
// //   console.log(filteredStatuses);

// }

//   useEffect(() => {
//     fetchUserStatuses();
//   }, []);


//   const fetchUserStatuses = () => {
//     axios.get('http://localhost:8080/status')
//       .then(response => {
//         setStatusList(response.data);
    
//         console.log(response.data.filter(status => status.userId === payload));
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };



//   return (
    
//     <div>
//       <h1>User Status List</h1>
//       <ul>
//         {statusList.map(status => (
//           <li key={status.statusId}>
//             <p>Status ID: {status.statusId}</p>
//             <p>User ID: {status.userId}</p>
//             <p>Path: {status.path}</p>
//             <p>Timestamp: {status.timeStamp}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <UserStatusList />
//     </div>
//   );
// }



// export default App;
