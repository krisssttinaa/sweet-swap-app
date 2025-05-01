import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        {/*
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-google-plus-g"></i></a>
        */}
      </div>
      <div className="footer-separator"></div>
      <p>© 2024 Sweet Swap</p>
    </footer>
  );
};

export default Footer;