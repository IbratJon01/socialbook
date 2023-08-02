 import React from 'react';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import logo from './logo.svg';
 import './App.css';
 import LoginPage from './companents/LoginPage/LoginPage';

 import Demojs from './companents/Account/demo'
import  AccountUsersD from './companents/Users/AccountUsersD';
import CreatPost from './companents/MainPage/updatePost';


// Check if localStorage is available in the current environment
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

// Function to get users data from localStorage safely
const getUsersDataFromLocalStorage = () => {
  if (isLocalStorageAvailable) {
    const usersData = localStorage.getItem("users");
    return usersData ? JSON.parse(usersData) : null;
  }
  return null;
};


const usersData = getUsersDataFromLocalStorage();
console.log(usersData);
 function App() {
   return (
     <div className="App">
       <Router>
       <Routes>
         <Route path="/d" element={  (localStorage.getItem("users")==undefined|| localStorage.getItem("users")==null)?
  <LoginPage/>:<Demojs/>
} />
<Route
  path="/"
  element={
    usersData && usersData.uid ? <Demojs userId={usersData.uid}/> : <LoginPage />
  }
/>
         <Route path="/account-user"   element={
    usersData && usersData.uid ? <AccountUsersD userId={usersData.uid}/> : <LoginPage /> }
    />
         <Route path="/creat-post" element={<CreatPost/>}/>
      
       </Routes>
     </Router>
 </div>
   );
 }
 export default App;











// import logo from './logo.svg';
// import './App.css';
// import LoginPage from './companents/LoginPage/LoginPage';
// import Home from './companents/HomePage/Home';
// import DrawerMn1 from './companents/Drawer/DrawerMn1';
// import MainContent1 from './companents/MainContent/MainContent1';
// import Account from './companents/Account/account';
// function App() {
//   return (
//     <div className="App">
//       {
//         // (localStorage.getItem("users")==undefined|| localStorage.getItem("users")==null)?
//         // <LoginPage/>:<Home/>

   
        

//         (localStorage.getItem("users")==undefined|| localStorage.getItem("users")==null)?
//         <LoginPage/>:<Account/>
//       }

//     </div>
//   );
// }

// export default App;





