import React, { Component } from 'react';
import "../Account/account.css";
import Grid  from '@material-ui/core/Grid';
import StatusBarUsers from '../Users/StatusBarUsers';
import MainPageUsers from '../Users/MainPageUsers';
import NavBar1 from '../NavBar/Navbar1';
import DrawerMn1 from '../Drawer/DrawerMn1';
import Aside from '../Aside/Aside';
import Contacts from '../Contact/contact';
import { useLocation } from 'react-router-dom';
import Statusa from '../Users/follow'

function AccountUsers(props) {
   const location = useLocation();
   const dataUser = location.state?.dataUser;
   const userId = dataUser.userId;
   console.log(userId);
   const authUserID  = JSON.parse(localStorage.getItem('users')).uid
   if(dataUser.userId==authUserID){
    return(<div>HELLO UZbekstamn</div>)
   }
  return (
    <div>
    <NavBar1/>
    <Grid container>
        <Grid item xs={3} className='drawer'><DrawerMn1/></Grid>
        <Grid item xs={6} className="maincontent__container">
            <div>
              <Statusa userId={userId}/>
              {/* <h1>{dataUser.userName}ASsaadma</h1> */}
              <StatusBarUsers userId={dataUser.id}/>
              <MainPageUsers userId={dataUser.id}/>
             
            
            </div>
        </Grid>
        <Grid item xs={3}>
            <Aside/>
            <Contacts/>
            {/* <InfoSection />
            <Suggestions /> */}
        </Grid>
    
    </Grid>
 
</div>
  );
}

export default AccountUsers;









// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// function AccountUsers(props ) {
//   const location = useLocation();

//   const dataUser = location.state?.dataUser;



//   return (
//     <div>
//       <h1>{dataUser.userName}</h1>
//       <h2>{dataUser.name}</h2>

      
//     </div>
//   );
// }

// export default AccountUsers;