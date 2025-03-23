import React, { useState } from 'react';
import './Contact.css';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-container">
       <div className="top-nav">
              <div className="logo-container">
                <button className="toggle-menu">
                  <Menu size={24} />
                </button>
                <div className="logo">Wayfarer</div>
              </div>
              <ul className="nav-links">
                <li><Link to="/finance">Finance</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/sign-in" className="sign-in-btn">Sign In</Link></li>
              </ul>
            </div>
      
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p className="subtitle">Have questions or need assistance? We're here to help with your travel needs.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="icon-container">
              <i className="icon location-icon"></i>
            </div>
            <h3>Our Location</h3>
            <p>123 Travel Avenue, Suite 101<br />New York, NY 10001</p>
          </div>
          
          <div className="info-card">
            <div className="icon-container">
              <i className="icon email-icon"></i>
            </div>
            <h3>Email Us</h3>
            <p>support@travello.com<br />bookings@travello.com</p>
          </div>
          
          <div className="info-card">
            <div className="icon-container">
              <i className="icon phone-icon"></i>
            </div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567<br />Mon-Fri: 9am - 6pm EST</p>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {isSubmitted ? (
            <div className="success-message">
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          )}
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us On The Map</h2>
        <div className="map-placeholder">
          {/* This would be replaced with an actual map component like Google Maps */}
          <div className="map-overlay">Map Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;