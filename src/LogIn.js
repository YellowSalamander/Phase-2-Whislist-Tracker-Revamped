import React, { useState } from 'react';
import './LogIn.css'
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LogIn = () => {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('Admin');
  const { isLoggedIn, login, logout } = useAuth();
  const history = useHistory()
  const location = useLocation()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Check if username and password match the expected values
    if (username === 'Admin' && password === 'Admin') {
      // Set login status to true
      login();
      console.log(isLoggedIn)
      history.push('/wishlist')
    } else {
      // Display an alert if the username or password is incorrect
      alert(
        'For this beta, access is only given to a single account.\nUsername: Admin\nPassword: Admin\nApologies!'
      );
    }
  };

  const handleLogout = () => {
    // Set login status to false when the user logs out
    logout();
  };

  return (
    <div className='form-container'>
    <h2>{isLoggedIn ? 'Logged In' : 'Login'}</h2>
    {isLoggedIn ? (
      <div>
        {location.pathname === '/' && ( // Check if the route is '/'
          <p>Welcome Beta tester, thank you for your help!</p>
        )}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    ) : (
      <form>
        <div className='form-group'>
          <label className='label'>Username:</label>
          <input
          className='input'
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='form-group'>
            <label className='label'>Password:</label>
            <input
            className='input'
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className='button' type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};
export default LogIn;
