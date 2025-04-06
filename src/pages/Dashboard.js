import './Dashboard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Wallet, Bot, TrendingUp } from 'lucide-react';

function Dashboard() {
  const recentActivities = [
    {
      id: 1,
      title: 'Paris Trip Planning',
      date: '2 hours ago',
      type: 'trip',
      icon: Plane
    },
    {
      id: 2,
      title: 'Hotel Booking',
      date: 'Yesterday',
      amount: 250,
      type: 'expense',
      icon: Wallet
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-heading">
        <h1>Welcome to Wayfarer</h1>
        <p>Your all-in-one travel companion for planning trips, tracking expenses, and getting AI-powered assistance.</p>
      </div>

      <div className="card-grid">
        <Link to="/planner" className="dashboard-card">
          <div className="card-content">
            <div className="icon-wrapper trip-icon">
              <Plane className="icon" />
            </div>
            <div>
              <h2>Trip Planner</h2>
              <p>Plan your next adventure</p>
            </div>
          </div>
        </Link>

        <Link to="/expenses" className="dashboard-card">
          <div className="card-content">
            <div className="icon-wrapper expense-icon">
              <Wallet className="icon" />
            </div>
            <div>
              <h2>Expense Tracker</h2>
              <p>Manage your travel budget</p>
            </div>
          </div>
        </Link>

        <Link to="/assistant" className="dashboard-card">
          <div className="card-content">
            <div className="icon-wrapper assistant-icon">
              <Bot className="icon" />
            </div>
            <div>
              <h2>AI Assistant</h2>
              <p>Get personalized recommendations</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="recent-activity">
        <div className="recent-header">
          <h2>Recent Activity</h2>
          <TrendingUp className="icon trend-icon" />
        </div>
        <div className="activity-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-info">
                <activity.icon
                  className={`icon ${activity.type === 'trip' ? 'trip-icon' : 'expense-icon'}`}
                />
                <div>
                  <h3>{activity.title}</h3>
                  <p>
                    {activity.amount
                      ? `$${activity.amount} - ${activity.date}`
                      : activity.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
