// pages/ProfilePage/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import './ProfilePage.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    fetchUserProfile(userId);
  }, [navigate]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await api.get(`/api/auth/profile/${userId}`);
      
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        // Token expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        navigate('/login');
      } else {
        setError('Failed to load profile. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <p>No user data found</p>
          <button className="retry-btn" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="header-content">
            <h1>Welcome, {userData.fullName?.split(' ')[0] || 'User'}!</h1>
            <p>Member since {formatDate(userData.createdAt)}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>

        <div className="profile-content">
          {/* Profile Picture Placeholder - You can add upload later */}
          <div className="profile-picture-section">
            <div className="profile-picture-circle">
              <span className="profile-initials">
                {getInitials(userData.fullName)}
              </span>
            </div>
            <p className="profile-name">{userData.fullName}</p>
            <p className="profile-email">{userData.email}</p>
          </div>

          {/* Profile Information */}
          <div className="profile-info-section">
            <h2 className="section-title">Profile Information</h2>
            
            <div className="info-grid">
              {/* Personal Information Card */}
              <div className="info-card">
                <h3>Personal Details</h3>
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{userData.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">{userData.age || 'Not provided'} years</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{userData.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{userData.phoneNumber || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{userData.location || 'Not provided'}</span>
                </div>
              </div>

              {/* Professional Information Card */}
              <div className="info-card">
                <h3>Professional Details</h3>
                <div className="info-item">
                  <span className="info-label">Service Interested In</span>
                  <span className="info-value profession-badge">
                    {userData.interestedService || 'Not specified'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Experience Level</span>
                  <span className="info-value experience-badge">
                    {userData.experience || 'Not specified'}
                  </span>
                </div>
              </div>

              {/* Additional Information Card */}
              <div className="info-card full-width">
                <h3>Why I Want to Join</h3>
                <p className="why-join-text">
                  {userData.whyJoin || 'No reason provided'}
                </p>
                
                {userData.referralSource && (
                  <div className="referral-info">
                    <span className="info-label">How I heard about us:</span>
                    <span className="referral-badge">{userData.referralSource}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};