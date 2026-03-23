import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ExplorePage.css';

export const ExplorePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  // Event details based on your description
  const eventHighlights = [
    {
      title: "Red Carpet Arrival",
      description: "Stars strut their stuff, flaunting designer outfits and fresh looks",
      icon: "👗",
      color: "#4ECDC4" // Green-blue
    },
    {
      title: "Movie Launches",
      description: "Premieres of highly-anticipated projects",
      icon: "🎬",
      color: "#2C3E50" // Dark blue
    },
    {
      title: "Banquet & Buffet",
      description: "Fine dining, global flavors, and good vibes",
      icon: "🍽️",
      color: "#4ECDC4" // Green-blue
    },
    {
      title: "Night of Fun",
      description: "Music, entertainment, and mingling with the stars",
      icon: "🎉",
      color: "#2C3E50" // Dark blue
    }
  ];

  return (
    <div className="explore-page">
      {/* Simple Navigation - NO login/signup buttons */}
      <nav className="explore-nav">
        <div className="nav-container">
          <button className="back-btn" onClick={handleBack}>
            ← Back to Home
          </button>
          
          <div className="logo">
            <span className="logo-text">The<span className="akwaama">Akwaaba</span></span>
          </div>
          
          {/* Empty div for spacing */}
          <div className="nav-spacer"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="bet">The</span><span className="akwaaba">Akwaaba</span>
          </h1>
          <p className="hero-subtitle">
            An annual extravaganza where international actors and actresses converge 
            for a night of glamour and celebration
          </p>
          <p className="hero-location">#Ghana • #Africa • #BlackExcellence</p>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="highlights-section">
        <h2 className="section-title">Event Highlights</h2>
        <p className="section-subtitle">A night to remember at TheAkwaaba</p>
        
        <div className="highlights-grid">
          {eventHighlights.map((item, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-icon">{item.icon}</div>
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Celebration Section */}
      <section className="celebration-section">
        <div className="celebration-content">
          <h2 className="celebration-title">
            A Global Celebration of <span className="highlight">Film, Fashion, and Fun</span>
          </h2>
          <p className="celebration-text">
            Join us in Ghana for the most anticipated event of the year. 
            International stars, movie premieres, fine dining, and unforgettable entertainment 
            all in one spectacular night.
          </p>
          
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">International Stars</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Movie Premieres</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <div className="stat-label">Night to Remember</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Info Section - NO signup/login calls */}
      <section className="info-section">
        <div className="info-container">
          <h2 className="info-title">Experience TheAkwaaba</h2>
          <p className="info-text">
            Join international actors and actresses for a spectacular night of glamour, 
            movie premieres, fine dining, and entertainment in the heart of Ghana.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="explore-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2026 TheAkwaaba. All rights reserved. 
            <Link to="/privacy">Privacy</Link> • 
            <Link to="/terms">Terms</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};