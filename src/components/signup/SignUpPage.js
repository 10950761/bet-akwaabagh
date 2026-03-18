import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import './SignUpPage.css';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phoneNumber: '',
    location: '',
    interestedService: '',
    experience: '',
    whyJoin: '',
    referralSource: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const experienceLevels = [
    'Beginner (0-1 years)',
    'Intermediate (2-4 years)',
    'Advanced (5-8 years)',
    'Expert (8+ years)'
  ];

  const referralSources = [
    'Social Media',
    'Friend/Family',
    'Google Search',
    'Advertisement',
    'Event',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number and one special character';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 18) {
      newErrors.age = 'You must be at least 18 years old';
    } else if (formData.age > 100) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.interestedService) {
      newErrors.interestedService = 'Please select a service you\'re interested in';
    }

    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }

    if (!formData.whyJoin.trim()) {
      newErrors.whyJoin = 'Please tell us why you want to join';
    } else if (formData.whyJoin.length < 20) {
      newErrors.whyJoin = 'Please provide more details (at least 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 // pages/SignUpPage/SignUpPage.jsx - Update handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    setIsLoading(true);
    
    try {
      const response = await api.post('/api/auth/signup', formData);

      const data = response.data;

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        
        alert(data.message);
        navigate('/profile'); 
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || 'Signup failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }
};

  const handleSocialSignUp = async (provider) => {
    setIsLoading(true);
    
    try {
      // For Google OAuth, you'd need to implement the actual OAuth flow
      const response = await api.post('/api/auth/social', {
        provider: provider.toLowerCase()
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
      alert(error.response?.data?.message || `${provider} signup failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <button className="back-button" onClick={handleBack}>
          ← Back to Home
        </button>

        <div className="auth-header">
          <h1>Join <span className="bet">Bet</span><span className="akwaaba">Akwaaba</span></h1>
          <p className="header-subtitle">Become part of the #BlackExcellence movement in Ghana and Africa</p>
        </div>

        {/* Social Sign Up Options */}
        <div className="social-auth">
          <p className="social-auth-text">Sign up with</p>
          <div className="social-buttons">
            <button
              type="button"
              className="social-btn google"
              onClick={() => handleSocialSignUp('Google')}
              disabled={isLoading}
            >
              <span className="social-icon">G</span>
              Google
            </button>
            <button
              type="button"
              className="social-btn facebook"
              onClick={() => handleSocialSignUp('Facebook')}
              disabled={isLoading}
            >
              <span className="social-icon">f</span>
              Facebook
            </button>
            <button
              type="button"
              className="social-btn apple"
              onClick={() => handleSocialSignUp('Apple')}
              disabled={isLoading}
            >
              <span className="social-icon"></span>
              Apple
            </button>
          </div>
          <div className="divider">
            <span>or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Personal Information */}
          <div className="form-section">
            <h2 className="section-title">Personal Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <div className="input-with-icon">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'error' : ''}
                    disabled={isLoading}
                  />
                </div>
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <div className="input-with-icon">
                  <span className="input-icon">🎂</span>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    min="18"
                    max="100"
                    className={errors.age ? 'error' : ''}
                    disabled={isLoading}
                  />
                </div>
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-with-icon">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={errors.email ? 'error' : ''}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <div className="input-with-icon">
                  <span className="input-icon">📱</span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+233 XX XXX XXXX"
                    className={errors.phoneNumber ? 'error' : ''}
                    disabled={isLoading}
                  />
                </div>
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location (City, Country) *</label>
              <div className="input-with-icon">
                <span className="input-icon">📍</span>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Accra, Ghana"
                  className={errors.location ? 'error' : ''}
                  disabled={isLoading}
                />
              </div>
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
          </div>

          {/* Password Section */}
          <div className="form-section">
            <h2 className="section-title">Account Security</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-with-icon password-field">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-with-icon password-field">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h2 className="section-title">Professional Information</h2>

            <div className="form-group">
              <label htmlFor="interestedService">Service Interested In *</label>
              <div className="select-wrapper">
                <select
                  id="interestedService"
                  name="interestedService"
                  value={formData.interestedService}
                  onChange={handleChange}
                  className={errors.interestedService ? 'error' : ''}
                  disabled={isLoading}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              {errors.interestedService && <span className="error-message">{errors.interestedService}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience Level *</label>
              <div className="select-wrapper">
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? 'error' : ''}
                  disabled={isLoading}
                >
                  <option value="">Select your experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              {errors.experience && <span className="error-message">{errors.experience}</span>}
            </div>
          </div>

          {/* Additional Questions */}
          <div className="form-section">
            <h2 className="section-title">Additional Information</h2>

            <div className="form-group">
              <label htmlFor="whyJoin">Why do you want to join BetAkwaaba? *</label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                placeholder="Tell us about your motivation and what you hope to achieve..."
                rows="4"
                className={errors.whyJoin ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.whyJoin && <span className="error-message">{errors.whyJoin}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="referralSource">How did you hear about us?</label>
              <div className="select-wrapper">
                <select
                  id="referralSource"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value="">Select an option</option>
                  {referralSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="form-section">
            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required disabled={isLoading} />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleBack} disabled={isLoading}>
                Cancel
              </button>
              <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </div>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};