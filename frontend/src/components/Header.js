import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Sweet Swap" />
        <h1>Sweet Swap</h1>
      </div>
      <nav className="navigation">
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/recipes" activeClassName="active">Recipes</NavLink>
        <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        <NavLink to="/contact" activeClassName="active">Contact</NavLink>
      </nav>
    </header>
  );
};

export default Header;

