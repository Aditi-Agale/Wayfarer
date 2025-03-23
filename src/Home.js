import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiggyBank, CreditCard, Plane, BarChart, Globe, Smartphone, Menu, User, Home as HomeIcon } from "lucide-react";
import "./Home.css";

const Home = () => {
  // State to control sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="logo-container">
          <button className="toggle-menu" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="logo">Wayfarer</div>
        </div>
        <ul className="nav-links">
          <li><Link to="/finance">Finance</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/sign-in" className="sign-in-btn">Sign In</Link></li>
        </ul>
      </nav>

      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
          {/* Welcome Back Box */}
          <div className="welcome-box">
            <div className="profile-avatar">
              <User size={24} />
            </div>
            <h3 className="welcome-text">Welcome back</h3>
            <p className="budget-info">Travel Budget: $3,500</p>
            <button className="view-profile-btn">View Profile</button>
          </div>
          
          <h2>Dashboard</h2>
          <ul>
            <li className="nav-item active">
              <HomeIcon size={18} />
              <span>Dashboard</span>
            </li>
            <li className="nav-item">
              <Link to="/track-expenses">
                <CreditCard size={18} />
                <span>Expenses</span>
              </Link>
            </li>
            <li className="nav-item">
              <BarChart size={18} />
              <span>Performance</span>
            </li>
            <li className="nav-item">
              <PiggyBank size={18} />
              <span>Goals</span>
            </li>
            <li className="nav-item">
              <Plane size={18} />
              <span>To-Do List</span>
            </li>
            <li className="nav-item">
              <Link to="/profile">
                <User size={18} />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content - adjusted to respect sidebar state */}
        <main className={`main-content ${sidebarVisible ? '' : 'expanded'}`}>
          {/* Header */}
          <header className="header">
            <h1>Travel & Finance Planner</h1>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <h2>Smart Travel, Smarter Spending</h2>
            <p>Your AI-powered assistant for seamless travel planning and financial management.</p>
            <div className="cta-buttons">
              <Link to="/plan-trip" className="primary-btn">Plan Your Trip</Link>
              <Link to="/track-expenses" className="secondary-btn">Track Expenses</Link>
            </div>
          </section>

          {/* Search Bar */}
          <section className="search-bar">
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="9" cy="9" r="7" fill="none" stroke="#bdc3c7" strokeWidth="2"/>
                <line x1="14" y1="14" x2="18" y2="18" stroke="#bdc3c7" strokeWidth="2"/>
              </svg>
            </div>
            <input type="text" placeholder="Search destinations..." />
            <button id="search-btn">Go</button>
          </section>

          {/* What We Offer */}
          <section className="what-we-do-section">
            <h2>What We Offer</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon"><BarChart className="icon" /></div>
                <h3>AI Budgeting Assistant</h3>
                <p>Plan your trip expenses smartly with AI-driven insights, ensuring you never overspend.</p>
              </div>
              <div className="service-card">
                <div className="service-icon"><Plane className="icon" /></div>
                <h3>Personalized Travel Itineraries</h3>
                <p>Wayfarer curates travel plans based on your budget, preferences, and real-time travel data.</p>
              </div>
              <div className="service-card">
                <div className="service-icon"><CreditCard className="icon" /></div>
                <h3>Expense Tracking & Alerts</h3>
                <p>Automatically track and categorize expenses, with real-time alerts to keep your finances in check.</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="cta-section">
            <h2>Start Your Journey with Confidence</h2>
            <p>Plan better, spend smarter, and enjoy a seamless travel experience with Wayfarer.</p>
            <Link to="/sign-in" className="primary-btn">Get Started</Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;