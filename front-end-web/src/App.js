import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.js';
import LoginPage from './pages/Home/LoginPage.js';
import AboutPage from './pages/About/AboutPage.js';
import RegisterPage from './pages/Home/RegisterPage.js';
import PrivateRoute from './pages/Home/PrivateRoute.js';
import MembershipClassPage from './pages/Membership/MembershipClassPage.js'
// import NavigationBar from './components/Common/NavigationBar.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import GetUserPage from './pages/Home/GetUserPage.js';
const App = () => {

  return (
    <>
      <Router>
        {/* <NavigationBar/> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/membership'
            element={
              <PrivateRoute>
                <MembershipClassPage />
              </PrivateRoute>
            }

          />

          {/* 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/getuser" element={<GetUserPage/>} />  */}
          {/* <PrivateRoute path="/home" element={<HomePage />} /> */}
        </Routes>

      </Router>
      {/* <PrivateRoute path="/membership" element={<MembershipClassPage />} /> */}
    </>
  );
};

export default App;


