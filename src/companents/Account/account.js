import React, { Component } from 'react';
import "./account.css";
import Grid  from '@material-ui/core/Grid';
import StatusBar from '../StatusBar/StatusBar';
import MainPage from '../MainPage/MainPage';
import InfoSection from '../InfoSection/InfoSection';
import Suggestions from '../Suggestions/Suggestions';
import NavBar1 from '../NavBar/Navbar1';
import DrawerMn1 from '../Drawer/DrawerMn1';
import Aside from '../Aside/Aside';
import Contacts from '../Contact/contact';
import FooterBar from '../Media/footerBar'
import Statusa from '../Account/statusa'
import PostUser from '../Post/PostUser'
const userId  = JSON.parse(localStorage.getItem('users')).uid
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <NavBar1/>
                <Grid container>
                    <Grid item xs={3} className='drawer'><DrawerMn1/></Grid>
                    <Grid item xs={6} className="maincontent__container">
                        <div>
                            {/* <Userlll/> */}
                {/* <AccountNav/> */}
                <Statusa userId={userId}/>
                <StatusBar/>
                            <MainPage />
                         
                        
                        </div>
                    </Grid>
                    <Grid item xs={3} sx={{display:{xs:"none", sm:"block"} }}>
                        <Aside/>
                        <Contacts/>
                        {/* <InfoSection />
                        <Suggestions /> */}
                    </Grid>
                
                </Grid>
                <FooterBar/>
             
            </div>
         );
    }
}
 
export default Account;