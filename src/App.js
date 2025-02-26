import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Home from "./Home";
import SignIn from "./SignIn";

function App() {
  return (
    <Router> {/* Wrap Routes inside Router */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Use element instead of component */}
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
