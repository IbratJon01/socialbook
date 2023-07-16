 import React from 'react';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import logo from './logo.svg';
 import './App.css';
 import LoginPage from './companents/LoginPage/LoginPage';
 import Home from './companents/HomePage/Home';
 import DrawerMn1 from './companents/Drawer/DrawerMn1';
 import MainContent1 from './companents/MainContent/MainContent1';
 import Account from './companents/Account/account';
 import AccountUsers from './companents/Account/AccountUsers';
 function App() {
   return (
     <div className="App">
       <Router>
       <Routes>
         <Route path="/" element={  (localStorage.getItem("users")==undefined|| localStorage.getItem("users")==null)?
  <LoginPage/>:<Account/>
} />
         <Route path="/account-users" element={<AccountUsers />} />
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





