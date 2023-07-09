import logo from './logo.svg';
import './App.css';
import LoginPage from './companents/LoginPage/LoginPage';
import Home from './companents/HomePage/Home';
import DrawerMn1 from './companents/Drawer/DrawerMn1';
import MainContent1 from './companents/MainContent/MainContent1';
import Account from './companents/Account/account';
function App() {
  return (
    <div className="App">
      {
        // (localStorage.getItem("users")==undefined|| localStorage.getItem("users")==null)?
        // <LoginPage/>:<Home/>

        // <DrawerMn1/>
        // <MainContent1/>
        

        (localStorage.getItem("users")==undefined|| localStorage.getItem("users")==null)?
        <LoginPage/>:<Account/>
      }

    </div>
  );
}

export default App;


