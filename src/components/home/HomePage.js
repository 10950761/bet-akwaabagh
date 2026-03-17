import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export const HomePage = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const handleExplore = () => {
  navigate('/explore');
};

  const handleSignUp = () => {
    navigate('/signup');
    setIsAuthMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsAuthMenuOpen(false);
  };

  const services = [
    'Manager Positions',
    'Decorations',
    'Web Designer',
    'Graphic Designer',
    'Event Planner',
    'Fashion',
    'Photography',
    'Videography',
    'Marketing',
    'Public Relations',
    'Other'
  ];

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsAuthMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close auth menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAuthMenuOpen && !event.target.closest('.auth-menu-container')) {
        setIsAuthMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isAuthMenuOpen]);

  const toggleAuthMenu = () => {
    setIsAuthMenuOpen(!isAuthMenuOpen);
  };

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">Bet<span className="akwaama">Akwaaba</span></span>
          </div>

          {/* Services Dropdown - Always Visible */}
          <div className="services-dropdown">
            <button
              className="services-btn"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services ▼
            </button>

            {isServicesOpen && (
              <div className="services-menu">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className="service-item"
                    onClick={() => {
                      console.log(service);
                      setIsServicesOpen(false);
                    }}
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Desktop Auth Buttons (hidden on mobile) */}
          <div className="auth-buttons desktop-auth">
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <button className="signup-btn" onClick={handleSignUp}>Sign Up</button>
          </div>

          {/* Mobile Auth Menu (hamburger for login/signup only) */}
          {isMobile && (
            <div className="auth-menu-container">
              <button
                className={`hamburger-btn ${isAuthMenuOpen ? 'open' : ''}`}
                onClick={toggleAuthMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              {/* Mobile Auth Dropdown Menu */}
              <div className={`auth-mobile-menu ${isAuthMenuOpen ? 'open' : ''}`}>
                <div className="auth-mobile-content">
                  <h3 className="auth-mobile-title">Account</h3>
                  <button className="mobile-login-btn" onClick={handleLogin}>
                    Login
                  </button>
                  <button className="mobile-signup-btn" onClick={handleSignUp}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          <h1 className="main-title">
            Welcome to <span className="bet">Bet</span>
            <span className="akwaama">Akwaaba</span>
          </h1>

          <div className="team-message">
            <h2 className="team-title">Our Team</h2>
            <p className="team-description">
              <span className="highlight">International Global Stars!</span>
              <br />
              <span className="slogan">Let's Lift #BlackExcellence #All over,</span>
              <br />
              <span className="location">#Ghana and Africa</span>
            </p>
          </div>

          <div className="cta-section">
           <button className="cta-button" onClick={handleExplore}>Explore Services</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 BetAkwaaba. All rights reserved.</p>
      </footer>
    </div>
  );
};