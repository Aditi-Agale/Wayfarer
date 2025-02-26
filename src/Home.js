import React from "react";  
import { Link } from "react-router-dom";
import { PiggyBank, CreditCard, Plane, BarChart, Globe, Smartphone } from "lucide-react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Smart Travel, Smarter Spending</h1>
          <p>Your AI-powered assistant for seamless travel planning and financial management.</p>
          <div className="cta-buttons">
            <Link to="/plan-trip" className="primary-btn">Plan Your Trip</Link>
            <Link to="/track-expenses" className="secondary-btn">Track Expenses</Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-do-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <BarChart className="icon" />
              </div>
              <h3>AI Budgeting Assistant</h3>
              <p>Plan your trip expenses smartly with AI-driven insights, ensuring you never overspend.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <Plane className="icon" />
              </div>
              <h3>Personalized Travel Itineraries</h3>
              <p>Wayfarer curates travel plans based on your budget, preferences, and real-time travel data.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <CreditCard className="icon" />
              </div>
              <h3>Expense Tracking & Alerts</h3>
              <p>Automatically track and categorize expenses, with real-time alerts to keep your finances in check.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Wayfarer?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <PiggyBank className="icon" />
              </div>
              <h3>Save More, Travel More</h3>
              <p>Get AI-powered insights to maximize savings for your next adventure.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Globe className="icon" />
              </div>
              <h3>Global Spending Insights</h3>
              <p>Currency exchange tracking and local expense recommendations wherever you go.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Smartphone className="icon" />
              </div>
              <h3>All-in-One Travel Companion</h3>
              <p>Plan, track, and manage everything from flights to finances on one smart platform.</p>
            </div>
          </div>
        </div>
      </section>

    

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Start Your Journey with Confidence</h2>
          <p>Plan better, spend smarter, and enjoy a seamless travel experience with Wayfarer.</p>
          <Link to="/sign-in" className="primary-btn">Get Started</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
