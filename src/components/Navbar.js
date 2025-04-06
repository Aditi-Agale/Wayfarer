import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Wallet, Calendar, Bot, Menu } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Calendar },
    { path: '/planner', label: 'Trip Planner', icon: Plane },
    { path: '/expenses', label: 'Expenses', icon: Wallet },
    { path: '/assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-main">
          <Link to="/" className="navbar-brand">
            <Plane className="icon logo-icon" />
            <span className="brand-name">Wayfarer</span>
          </Link>

          <div className="navbar-links desktop-only">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              >
                <Icon className="icon" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <button
            className="menu-btn mobile-only"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="icon" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="navbar-links mobile-only">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="icon" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
