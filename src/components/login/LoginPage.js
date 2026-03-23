import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import './LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 // pages/LoginPage/LoginPage.jsx - Update handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    setIsLoading(true);
    
    try {
      const response = await api.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });

      const data = response.data;

      if (data.success) {
        // Store user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        
        alert(data.message);
        navigate('/profile'); 
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }
};
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setResetMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/forgot-password', {
        email: resetEmail
      });

      setResetMessage({ type: 'success', text: response.data.message });
      
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetMessage('');
        setResetEmail('');
      }, 3000);
    } catch (error) {
      setResetMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to send reset email' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // For Google OAuth, you'd need to implement the actual OAuth flow
      // This is a simplified version - you should use @react-oauth/google
      const response = await api.post('/api/auth/social', {
        provider: provider.toLowerCase(),
        // In real implementation, you'd send the OAuth token here
      });
      
      const data = response.data;
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('email', data.user.email);
        alert(data.message);
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || `${provider} login failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-button" onClick={handleBack}>
          ← Back to Home
        </button>

        <div className="auth-header">
          <h1>Welcome Back to <span className="bet">The</span><span className="akwaaba">Akwaaba</span></h1>
          <p className="header-subtitle">Log in to continue your journey with #BlackExcellence</p>
        </div>

        {!showForgotPassword ? (
          <>
            {/* Social Login Options */}
            <div className="social-auth">
              <p className="social-auth-text">Login with</p>
              <div className="social-buttons">
                <button 
                  type="button" 
                  className="social-btn google"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                >
                  <span className="social-icon">G</span>
                  Google
                </button>
                <button 
                  type="button" 
                  className="social-btn facebook"
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={isLoading}
                >
                  <span className="social-icon">f</span>
                  Facebook
                </button>
                <button 
                  type="button" 
                  className="social-btn apple"
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={isLoading}
                >
                  <span className="social-icon"></span>
                  Apple
                </button>
              </div>
              <div className="divider">
                <span>or login with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'error' : ''}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon password-field">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={errors.password ? 'error' : ''}
                    disabled={isLoading}
                  />
                  <button 
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="forgot-password-link"
                  onClick={() => setShowForgotPassword(true)}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </>
        ) : (
          /* Forgot Password Form */
          <div className="forgot-password-form">
            <h2 className="forgot-password-title">Reset Password</h2>
            <p className="forgot-password-description">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {resetMessage && (
              <div className={`reset-message ${resetMessage.type}`}>
                {resetMessage.text}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="resetEmail">Email Address</label>
              <div className="input-with-icon">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="forgot-password-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetMessage('');
                  setResetEmail('');
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="reset-btn"
                onClick={handleForgotPassword}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>

            <div className="back-to-login">
              <button 
                type="button" 
                className="back-to-login-link"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetMessage('');
                  setResetEmail('');
                }}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        )}

        {!showForgotPassword && (
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
          </div>
        )}

        {/* Features Section */}
        <div className="auth-features">
          <div className="feature">
            <span className="feature-icon">🌟</span>
            <div className="feature-text">
              <h4>Join #BlackExcellence</h4>
              <p>Connect with global stars</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">💼</span>
            <div className="feature-text">
              <h4>Professional Network</h4>
              <p>Access top opportunities</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🌍</span>
            <div className="feature-text">
              <h4>Global Community</h4>
              <p>Spanning Ghana & Africa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};