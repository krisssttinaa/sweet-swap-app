import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://88.200.63.148:8288/api/contact', formData);
      alert('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error sending message');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-details">
        <h2>Contact us</h2>
        <p>If you have any questions about our recipes or even suggestions, don't hesitate to contact us. We are looking forward to hearing from you!</p>
        <p>E-mail: support@gmail.com</p>
      </div>
      <div className="contact-card">
        <h2 className="contact-title">Send us a message!</h2>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={message} onChange={onChange} required></textarea>
          </div>
          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;