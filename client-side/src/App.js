/*
  This file is our Main Component
*/

import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import './App.css';
// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import React Router DOM
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// Pages
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
import Products from './pages/Products'
import Register from './pages/Register'
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import UserOrders from './pages/UserOrders';
import UserList from './pages/UserList';

// Bootstrap
import { Container } from 'react-bootstrap';


function App() {

  // State hook for user state that's defined here for a global scope
  // This will be used to store the user information and will be used for validating if a user is logged in on the app or not
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout.
  useEffect(() => {
    console.log(user);
    console.log(localStorage);

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Changes the global "user" state to store the "id" and the "isAdmin" properties of the user which will be used for validation across the whole application
      if(typeof data._id !== "undefined"){

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {

        setUser({
          id: null,
          isAdmin: null
        })
      }

    })

  }, []);

  return (
    // JSX - JavaScript XML
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />
            <Route exact path="/products/:productId" element={<ProductView />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/addProduct" element={<AddProduct/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/userOrders" element={<UserOrders/>} />
            <Route path="/userList" element={<UserList/>}/>

            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
    
  );
}

export default App;
