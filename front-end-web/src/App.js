import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.js';
import AboutPage from './pages/About/AboutPage.js';
import NavigationBar from './components/Common/NavigationBar.js';
import LoginPage from './pages/Home/LoginPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/Home/RegisterPage.js';
import GetUserPage from './pages/Home/GetUserPage.js';
import { useEffect, useState } from 'react';
const App = () => {
 
  return (
    <Router>
      <NavigationBar/>
      
      <Routes>
        
        <Route path="/" element={<HomePage />} /> 
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path="/" element={<HomePage />} /> 
        <Route path="/getuser" element={<GetUserPage/>} /> 
      </Routes>
    </Router>
  );
};

export default App;

