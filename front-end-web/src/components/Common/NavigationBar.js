
// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import './NavigationBar.css';

// const NavigationBar = ({ isLoggedIn, onLogout }) => {
//   const [showAdditionalButton, setShowAdditionalButton] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Update the showAdditionalButton state based on the user's login status
//     setShowAdditionalButton(isLoggedIn);

//     // Retrieve user role from local storage
//     const token = localStorage.getItem('token');
//     if (token) {
//       const [, payload] = token.split('.');
//       const decodedPayload = JSON.parse(atob(payload));
//       setUserRole(decodedPayload.role);
//     }
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     onLogout(); // Notify the higher-level component about the logout
//     navigate('/login');
//   };

//   const handleAdditionalButtonClick = () => {
//     // Add logic for what happens when the additional button is clicked
//   };

//   return (
//     <nav className="navbar">
//       <section className="Header">
//         <div className="container flex justify-between align-center Header_container_main">
//           <div className="flex align-center gap-40 h-full">
//             <div className="logo">
//               <NavLink exact to="/">
//                 <button className="home-button">
//                   <booking>Booking</booking>
//                   <vn>.vn</vn>
//                 </button>
//               </NavLink>
//             </div>

//             <div className="flex gap-24 h-full align-center cursor-pointer Header_nav_container">
//               <NavLink exact to="/gethotel" style={{ textDecoration: 'none' }}>
//                 <button className="h-full flex align-center nav-button">
//                   Tìm khách sạn
//                 </button>
//               </NavLink>
//               <NavLink exact to="/about" style={{ textDecoration: 'none' }}>
//                 <button className="h-full flex align-center nav-button">
//                   Về chúng tôi
//                 </button>
//               </NavLink>
//               <NavLink exact to="/ownerregister" style={{ textDecoration: 'none' }}>
//                 {userRole === 1 ? (
//                   <button className="h-full flex align-center doitac-button gap-24 nav-button">
//                     Quản lý khách sạn của bạn
//                   </button>
//                 ) : (
//                   <button className="h-full flex align-center doitac-button gap-24 nav-button">
//                     Trở thành đối tác của chúng tôi
//                   </button>
//                 )}
//               </NavLink>
//               {isLoggedIn ? (
//                 <>
//                   <button className="flex align-center gap-24 login-button" onClick={handleLogout}>
//                     Đăng xuất
//                   </button>
//                   {showAdditionalButton && (
//                     <NavLink exact to="/membership" style={{ textDecoration: 'none' }}>
//                       <button className="flex align-center gap-24 login-button">
//                         Membership
//                       </button>
//                     </NavLink>
//                   )}
//                 </>
//               ) : (
//                 <NavLink exact to="/login" style={{ textDecoration: 'none' }}>
//                   <button className="flex align-center gap-24 login-button">
//                     Đăng nhập
//                   </button>
//                 </NavLink>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </nav>
//   );
// };

// export default NavigationBar;



import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = ({ keyProp, isLoggedIn, onLogout }) => {
  const [showAdditionalButton, setShowAdditionalButton] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [logoutTrigger, setLogoutTrigger] = useState(false); // new state
  const navigate = useNavigate();


  useEffect(() => {
    // Update the showAdditionalButton state based on the user's login status
    setShowAdditionalButton(isLoggedIn);

    // Retrieve user role from local storage
    const token = localStorage.getItem('token');
    if (token) {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      setUserRole(decodedPayload.role);
    }
  }, [isLoggedIn, keyProp]); // add logoutTrigger to the dependency array

  const handleLogout = () => {
    onLogout(); // Notify the higher-level component about the logout
    navigate('/login');
  };

  const handleAdditionalButtonClick = () => {
    // Add logic for what happens when the additional button is clicked
  };

  return (
    <nav className="navbar">
      <section className="Header">
        <div className="container flex justify-between align-center Header_container_main">
          <div className="flex align-center gap-40 h-full">
            <div className="logo">
              <NavLink exact to="/">
                <button className="home-button">
                  <booking>Booking</booking>
                  <vn>.vn</vn>
                </button>
              </NavLink>
            </div>

            <div className="flex gap-24 h-full align-center cursor-pointer Header_nav_container">
              <NavLink exact to="/getaccommodation" style={{ textDecoration: 'none' }}>
                <button className="h-full flex align-center nav-button">
                  Tìm khách sạn
                </button>
              </NavLink>
              <NavLink exact to="/about" style={{ textDecoration: 'none' }}>
                <button className="h-full flex align-center nav-button">
                  Về chúng tôi
                </button>
              </NavLink>
              {/* {userRole === 1 ? (
                <NavLink exact to="/ownerdashboard" style={{ textDecoration: 'none' }}>
                  <button className="h-full flex align-center doitac-button gap-24 nav-button">
                    Quản lý khách sạn của bạn
                  </button>
                </NavLink>
              ) : (
                <NavLink exact to="/ownerregister" style={{ textDecoration: 'none' }}>
                  <button className="h-full flex align-center doitac-button gap-24 nav-button">
                    Trở thành đối tác của chúng tôi
                  </button>
                </NavLink>
              )} */}
              {userRole === 1 ? (
                <NavLink exact to="/ownerdashboard" style={{ textDecoration: 'none' }}>
                  <button className="h-full flex align-center doitac-button gap-24 nav-button">
                    Quản lý khách sạn của bạn
                  </button>
                </NavLink>
              ) : userRole === 2 ? (
                <NavLink exact to="/accountmanagement" style={{ textDecoration: 'none' }}>
                  <button className="h-full flex align-center doitac-button gap-24 nav-button">
                    Quản lý tài khoản người dùng
                  </button>
                </NavLink>
              ) : (
                <NavLink exact to="/ownerregister" style={{ textDecoration: 'none' }}>
                  <button className="h-full flex align-center doitac-button gap-24 nav-button">
                    Trở thành đối tác của chúng tôi
                  </button>
                </NavLink>
              )}
              {isLoggedIn ? (
                <>
                  <button className="flex align-center gap-24 login-button" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                  {showAdditionalButton && (
                    <NavLink exact to="/membership" style={{ textDecoration: 'none' }}>
                      <button className="flex align-center gap-24 login-button">
                        Thông tin
                      </button>
                    </NavLink>
                  )}
                </>
              ) : (
                <NavLink exact to="/login" style={{ textDecoration: 'none' }}>
                  <button className="flex align-center gap-24 login-button">
                    Đăng nhập
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default NavigationBar;


