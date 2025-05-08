import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for show password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://88.200.63.148:8288/api/users/login', {
        username,
        password
      });
      //console.log('API response:', response.data); 
  
      const { token, user } = response.data;
      //console.log('Token:', token); 
      //console.log('User:', user); 
  
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('username', user.username);
        navigate('/');
      } else {
        setError('Invalid credentials');
        console.error('No token or user data found. Please log in again.');
      }
    } catch (error) {
      console.error('Login error', error);
      setError('Invalid credentials');
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show password</label>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <button 
          type="button" 
          className="register-link" 
          onClick={() => navigate('/register')}
        >
          or Register
        </button>
      </div>
    </div>
  );
};

export default Login;