import React, { useState } from 'react';
import './Profile.css';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Alex Morgan');
  const [location, setLocation] = useState('New York, USA');

  const handleSave = () => {
    setIsEditing(false);
    // You can add logic to save data to a server or database here
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            <span className="avatar-placeholder">👤</span>
          </div>
          <div className="profile-info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="edit-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2 className="profile-name">{name}</h2>
                <p className="profile-location">
                  <span className="location-dot">📍</span> {location}
                </p>
              </>
            )}
            <div className="profile-badges">
              <span className="badge premium-badge">Premium Member</span>
              <span className="badge budget-badge">Budget Pro</span>
            </div>
          </div>
          {isEditing ? (
            <button className="edit-profile-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Travel Budget</h3>
              <div className="stat-icon budget-icon">💳</div>
            </div>
            <p className="stat-value">$8,500</p>
            <p className="stat-change positive">+12% from last year</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Monthly Savings</h3>
              <div className="stat-icon savings-icon">📈</div>
            </div>
            <p className="stat-value">$1,250</p>
            <p className="stat-change positive">On track for next trip</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Next Trip</h3>
              <div className="stat-icon calendar-icon">🗓</div>
            </div>
            <p className="stat-value">43 days</p>
            <p className="stat-destination">Bali, Indonesia</p>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="card account-settings">
        <div className="card-header">
          <h3 className="card-title">Account Settings</h3>
        </div>
        <div className="settings-menu">
          <div className="menu-item">
            <div className="menu-item-content">
              <span className="menu-icon">👤</span>
              <span className="menu-text">Personal Information</span>
            </div>
            <span className="chevron-right">›</span>
          </div>
          <div className="menu-item">
            <div className="menu-item-content">
              <span className="menu-icon">💳</span>
              <span className="menu-text">Payment Methods</span>
            </div>
            <span className="chevron-right">›</span>
          </div>
          <div className="menu-item">
            <div className="menu-item-content">
              <span className="menu-icon">⚙</span>
              <span className="menu-text">Preferences</span>
            </div>
            <span className="chevron-right">›</span>
          </div>
          <div className="menu-item logout">
            <div className="menu-item-content">
              <span className="menu-icon">🚪</span>
              <span className="menu-text">Log Out</span>
            </div>
            <span className="chevron-right">›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
