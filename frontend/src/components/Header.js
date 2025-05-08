import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const isModerator = localStorage.getItem('role') === 'moderator';
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm.trim()}`);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.classList.add('header-small');
      } else {
        header.classList.remove('header-small');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Sweet Swap" />
        <h1>Sweet Swap</h1>
      </div>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Search..." 
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <nav className="navigation">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/recipes" className={({ isActive }) => (isActive ? 'active' : '')}>Recipes</NavLink>
        {isLoggedIn && <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>}
        {isLoggedIn && isModerator && <NavLink to="/moderate" className={({ isActive }) => (isActive ? 'active' : '')}>Moderate</NavLink>}
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
        {!isLoggedIn && <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>}
        {!isLoggedIn && <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>Register</NavLink>}
        {isLoggedIn && <button onClick={handleLogout} className="logout-button">Logout</button>}
      </nav>
    </header>
  );
};

export default Header;