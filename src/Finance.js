import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import './Finance.css';

const FinancePage = () => {
  // Sample data for the financial overview
  const financialData = {
    totalTravelExpenses: 3250,
    monthlyBudget: 1500,
    upcomingPayments: 450,
    recentTransactions: [
      { date: '01 Feb 2025', description: 'Flight booking to Dubai', amount: 1200, status: 'Completed' },
      { date: '22 Jan 2025', description: 'Hotel Reservation - Jakarta', amount: 1150, status: 'Completed' },
      { date: '20 Jan 2025', description: 'Car Rental', amount: 520, status: 'Pending' },
    ]
  };

  return (
    <div className="finance-container">
      {/* Navbar */}
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

      <div className="header">
        <h1>Your Financial Overview</h1>
        <p className="subtitle">Track your expenses, set budget, and get customized financial decisions for your travels.</p>
      </div>

      <div className="overview-cards">
        <div className="card">
          <h3>Total Travel Expenses</h3>
          <p className="amount">${financialData.totalTravelExpenses}</p>
        </div>
        
        <div className="card">
          <h3>Monthly Budget</h3>
          <p className="amount">${financialData.monthlyBudget}</p>
        </div>
        
        <div className="card">
          <h3>Upcoming Payments</h3>
          <p className="amount">${financialData.upcomingPayments} <span className="due-text">(Due: 15 Feb)</span></p>
        </div>
      </div>

      <div className="transactions-section">
        <h2>Recent Transactions</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {financialData.recentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>
                  <span className={`status ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancePage;
