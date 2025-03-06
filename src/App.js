import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Home from "./Home";
import SignIn from "./SignIn";
import FinancePage from "./Finance";
import ContactPage from "./Contact";

function App() {
  return (
    <Router> {/* Wrap Routes inside Router */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Use element instead of component */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
    </Router>
  );
}

export default App;
