// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.js';
import AboutPage from './pages/About/AboutPage.js';
import NavigationBar from './components/Common/NavigationBar.js';
import LoginPage from './pages/Home/LoginPage.js';
const App = () => {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/login' element={<LoginPage/>} />

      </Routes>
    </Router>
  );
};

export default App;
