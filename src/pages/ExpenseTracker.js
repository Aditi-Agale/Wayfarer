import './ExpenseTracker.css';
import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Trash2 } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'transportation',
    date: new Date().toISOString().split('T')[0]
  });

  const expensesCollectionRef = collection(db, "expenses");

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getDocs(expensesCollectionRef);
      setExpenses(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(expensesCollectionRef, {
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        tripId: "default-trip" // optional: change this per trip
      });

      setExpenses([...expenses, { ...newExpense, id: docRef.id }]);
      setNewExpense({
        description: '',
        amount: '',
        category: 'transportation',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      alert("Error adding expense: " + error.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      alert("Error deleting expense: " + error.message);
    }
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
