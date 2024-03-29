// import React, { useState } from 'react';
// import axios from '../Home/axiosConfig';

// const UpdateUserInfo = ({ role }) => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [showFailurePopup, setShowFailurePopup] = useState(false);

//   const handleUpdateUserInfo = async () => {
//     try {
//       // Check if passwords match
//       if (password !== confirmPassword) {
//         // Show failure popup if passwords don't match
//         setShowFailurePopup(true);
//         return;
//       }

//       // Decode the token to get userID
//       const token = localStorage.getItem('token');

//       // Check if token is available
//       if (!token) {
//         // Show failure popup if token is missing
//         setShowFailurePopup(true);
//         return;
//       }

//       // Prepare the request body
//       const requestBody = {
//         email: email,
//         name: name,
//         password: password,
//         role: role,
//       };

//       // Send a PUT request to update user info with token in headers
//       const response = await axios.put('/user/', requestBody, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Show success popup
//       setShowSuccessPopup(true);
//     } catch (error) {
//       // Show failure popup in case of an error
//       setShowFailurePopup(true);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Email:
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <label>
//         Confirm Password:
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//       </label>
//       <button onClick={handleUpdateUserInfo}>Update User Info</button>

//       {showSuccessPopup && (
//         <div className="popup success-popup">
//           <p>User information updated successfully.</p>
//           <button onClick={() => setShowSuccessPopup(false)}>Close</button>
//         </div>
//       )}

//       {showFailurePopup && (
//         <div className="popup failure-popup">
//           <p>Error updating user information. Please try again.</p>
//           <button onClick={() => setShowFailurePopup(false)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateUserInfo;
import React, { useState } from 'react';
import axios from '../Home/axiosConfig';

import './UpdateUserInfo.css'

const UpdateUserInfo = ({ role }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailurePopup, setShowFailurePopup] = useState(false);

  const handleUpdateUserInfo = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        // Show failure popup if passwords don't match
        setShowFailurePopup(true);
        return;
      }

      // Decode the token to get userID
      const token = localStorage.getItem('token');

      // Check if token is available
      if (!token) {
        // Show failure popup if token is missing
        setShowFailurePopup(true);
        return;
      }

      // Prepare the request body
      const requestBody = {
        email: email,
        name: name,
        password: password,
        role: role,
      };

      // Send a PUT request to update user info with token in headers
      const response = await axios.put('/user/', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show success popup
      setShowSuccessPopup(true);
    } catch (error) {
      // Show failure popup in case of an error
      setShowFailurePopup(true);
    }
  };

  return (
    <div>
      <label className='create-hotel-input-container'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
      </label>

      <label className='create-hotel-input-container'>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Tên'
        />
      </label>

      <label className='create-hotel-input-container'>
        <input
          type={showPasswords ? 'text' : 'password'} // Toggle between text and password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Mật khẩu'
        />
      </label>

      <label className='create-hotel-input-container'>
        <input
          type={showPasswords ? 'text' : 'password'} // Toggle between text and password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Xác nhận mật khẩu'
        />
      </label>

      <button className='create-hotel-button2' onClick={() => setShowPasswords(!showPasswords)}>
        {showPasswords ? 'Ẩn' : 'Hiện'} mật khẩu
      </button>
      <button className='create-hotel-button' onClick={handleUpdateUserInfo}>Cập nhật tài khoản</button>

      {showSuccessPopup && (
        <div className="popup success-popup">
          <p>Cập nhật thành công</p>
          <button className='update-user-info-close-popup-button' onClick={() => setShowSuccessPopup(false)}>Close</button>
        </div>
      )}

      {showFailurePopup && (
        <div className="popup failure-popup">
          <p>Cập nhật không thành công. Hãy thử lại</p>
          <button className='update-user-info-close-popup-button' onClick={() => setShowFailurePopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UpdateUserInfo;
