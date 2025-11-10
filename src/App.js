import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TripPlanner from './pages/TripPlanner';
import ExpenseTracker from './pages/ExpenseTracker';
import AIAssistant from './pages/AIAssistant';
import SignIn from './SignIn';
import Profile from './pages/Profile';
import { auth } from './pages/firebase'; // Import auth from firebase
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false); // Set loading to false once auth state is determined
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar user={user} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<TripPlanner />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
            <Route
              path="/assistant"
              element={
                <PrivateRoute>
                  <AIAssistant />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;