// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/Home/HomePage.js';
// import LoginPage from './pages/Home/LoginPage.js';
// import AboutPage from './pages/About/AboutPage.js';
// import RegisterPage from './pages/Home/RegisterPage.js';
// import PrivateRoute from './pages/Home/PrivateRoute.js';
// import MembershipClassPage from './pages/Membership/MembershipClassPage.js'
// import NavigationBar from './components/Common/NavigationBar.js';
// import Footer from './components/Common/Footer.js';
// // import GetUserPage from './pages/Home/GetUserPage.js';
// const App = () => {

//   return (
//     <>
//       <Router>
//         <NavigationBar/>

//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path='/login' element={<LoginPage />} />
//           <Route path='/about' element={<AboutPage />} />
//           <Route path='/register' element={<RegisterPage />} />
//           <Route
//             path='/membership'
//             element={
//               <PrivateRoute>
//                 <MembershipClassPage />
//               </PrivateRoute>
//             }

//           />

//           {/* 
//         <Route path="/" element={<HomePage />} /> 
//         <Route path="/getuser" element={<GetUserPage/>} />  */}
//           {/* <PrivateRoute path="/home" element={<HomePage />} /> */}
//         </Routes>
//         <Footer/>
//       </Router>
//       {/* <PrivateRoute path="/membership" element={<MembershipClassPage />} /> */}
//     </>
//   );
// };

// export default App;
// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.js';
import LoginPage from './pages/Home/LoginPage.js';
import AboutPage from './pages/About/AboutPage.js';
import RegisterPage from './pages/Home/RegisterPage.js';
import PrivateRoute from './pages/Home/PrivateRoute.js';
import MembershipPage from './pages/Membership/MembershipClassPage.js';
import NavigationBar from './components/Common/NavigationBar.js';
import Footer from './components/Common/Footer.js';
import GetHotel from './pages/Home/GetHotel.js';
import GetAccommodation from './pages/Home/GetAccommodation.js';
import OwnerRegister from './pages/Home/OwnerRegister.js';
import OwnerDashboard from './pages/Home/OwnerDashboard.js';
import PrivateOwnerRoute from './pages/Home/PrivateOwnerRoute.js';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [key, setKey] = useState(0);
  const handleLogin = () => {
    setIsLoggedIn(true);
    setKey((prevKey) => prevKey + 1);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Router>
        <NavigationBar key={key} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ownerregister" element={<OwnerRegister />} />
          <Route path="/gethotel" element={<GetAccommodation />} />
          {/* <Route path="/ownerdashboard" element={<OwnerDashboard />} /> */}
          <Route
            path="/membership"
            element={
              <PrivateRoute>
                <MembershipPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ownerdashboard"
            element={
              <PrivateOwnerRoute>
                <OwnerDashboard />
              </PrivateOwnerRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;



