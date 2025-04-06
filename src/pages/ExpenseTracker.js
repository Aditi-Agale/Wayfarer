import './ExpenseTracker.css';
import React, { useState } from 'react';
import { DollarSign, Plus, Trash2 } from 'lucide-react';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'transportation',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({
      description: '',
      amount: '',
      category: 'transportation',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="expense-container">
      <div className="expense-card">
        <div className="expense-header">
          <div className="expense-title">
            <DollarSign className="icon green-icon" />
            <h1>Expense Tracker</h1>
          </div>
          <div className="total-box">
            <p>Total: ${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="expense-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Amount ($)</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              >
                <option value="transportation">Transportation</option>
                <option value="accommodation">Accommodation</option>
                <option value="food">Food & Dining</option>
                <option value="activities">Activities</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-footer">
            <button type="submit" className="add-btn">
              <Plus className="icon" />
              <span>Add Expense</span>
            </button>
          </div>
        </form>

        <div className="expense-list">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div>
                <h3>{expense.description}</h3>
                <p>{new Date(expense.date).toLocaleDateString()} - {expense.category}</p>
              </div>
              <div className="expense-actions">
                <span className="amount">${Number(expense.amount).toFixed(2)}</span>
                <button onClick={() => deleteExpense(expense.id)} className="delete-btn">
                  <Trash2 className="icon red-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
