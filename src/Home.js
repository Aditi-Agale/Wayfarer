import React from "react";
import { Link } from "react-router-dom";
import { PiggyBank, CreditCard, Plane, BarChart, Globe, Smartphone } from "lucide-react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="logo">Wayfarer</div>
        <ul className="nav-links">
          <li><Link to="/finance">Finance</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/sign-in" className="sign-in-btn">Sign In</Link></li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/track-expenses">Expenses</Link></li>
          <li>Performance</li>
          <li>Goals</li>
          <li>To-Do List</li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
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
          <input type="text" placeholder="Search destinations..." />
          <button>Search</button>
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
  );
};

export default Home;
