import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const isModerator = localStorage.getItem('role') === 'moderator';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Sweet Swap" />
        <h1>Sweet Swap</h1>
      </div>
      <nav className="navigation">
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/recipes" activeClassName="active">Recipes</NavLink>
        {isLoggedIn && <NavLink to="/profile" activeClassName="active">Profile</NavLink>}
        {isLoggedIn && isModerator && <NavLink to="/moderate" activeClassName="active">Moderate</NavLink>}
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
        {!isLoggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
        {!isLoggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
