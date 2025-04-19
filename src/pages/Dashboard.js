import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Wallet, Bot, TrendingUp } from 'lucide-react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      const expensesSnapshot = await getDocs(collection(db, 'expenses'));
      const tripsSnapshot = await getDocs(collection(db, 'trips'));

      const expenses = expensesSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().description,
        date: doc.data().date,
        amount: doc.data().amount,
        type: 'expense',
        icon: Wallet
      }));

      const trips = tripsSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().tripName || 'New Trip',
        date: doc.data().startDate || new Date().toISOString().split('T')[0],
        type: 'trip',
        icon: Plane
      }));

      const allActivities = [...expenses, ...trips].sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentActivities(allActivities.slice(0, 6)); // limit to 6 recent activities
    };

    fetchRecentActivities();
  }, []);

  useEffect(() => {
    const fetchTripsData = async () => {
      const tripsSnapshot = await getDocs(collection(db, 'trips'));
      const trips = tripsSnapshot.docs.map(doc => ({
        date: doc.data().startDate,
        tripName: doc.data().tripName
      }));

      if (trips.length === 0) {
        setGraphData(null);
        return;
      }

      // Group trips by month
      const groupedData = trips.reduce((acc, trip) => {
        const month = new Date(trip.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (acc[month]) {
          acc[month] += 1; // Increment the trip count for the month
        } else {
          acc[month] = 1; // First trip in this month
        }
        return acc;
      }, {});

      const months = Object.keys(groupedData);
      const tripCounts = months.map(month => groupedData[month]);

      setGraphData({
        labels: months,
        datasets: [
          {
            label: 'Trips Over Time',
            data: tripCounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
          }
        ]
      });
    };

    fetchTripsData();
  }, []);

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
          {recentActivities.length === 0 ? (
            <p>No recent activity found.</p>
          ) : (
            recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-info">
                  <activity.icon
                    className={`icon ${activity.type === 'trip' ? 'trip-icon' : 'expense-icon'}`}
                  />
                  <div>
                    <h3>{activity.title}</h3>
                    <p>
                      {activity.amount
                        ? `$${activity.amount} • ${new Date(activity.date).toLocaleDateString()}`
                        : new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Graph Container */}
      <div className="graph-container" style={{ width: '100%', height: '400px' }}>
        <h3>Trips Over Time</h3>
        {graphData ? (
          <Line data={graphData} options={{ responsive: true, maintainAspectRatio: false }} />
        ) : (
          <p>No trip data available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
