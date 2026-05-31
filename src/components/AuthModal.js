import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './AuthModal.css';

function AuthModal({ type, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    user_type: 'buyer',
    brand_name: '',
    description: '',
  });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const set = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(endpoint, formData);
      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isRegister = type === 'register';

  return (
    <div
      className="auth-modal-overlay"
      onClick={onClose}
      role="presentation"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={isRegister ? 'Create account' : 'Sign in'}
      >
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 2L2 10M2 2l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="auth-modal-brand">
          <span className="auth-modal-logo">ShopNow</span>
        </div>

        <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="auth-modal-sub">
          {isRegister
            ? 'Join a world of curated fashion from 6 cultures'
            : 'Sign in to continue shopping your curated collections'}
        </p>

        {error && (
          <div className="auth-error" role="alert">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" flexShrink={0} aria-hidden="true">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <>
              {/* Account type */}
              <div className="user-type-selector" role="radiogroup" aria-label="Account type">
                {[
                  {
                    value: 'buyer',
                    title: 'Buyer',
                    desc: 'Shop and explore fashion',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.1 15.9 4.5 17 5.5 17H17M17 17C15.9 17 15 17.9 15 19C15 20.1 15.9 21 17 21C18.1 21 19 20.1 19 19C19 17.9 18.1 17 17 17ZM9 19C9 20.1 8.1 21 7 21C5.9 21 5 20.1 5 19C5 17.9 5.9 17 7 17C8.1 17 9 17.9 9 19Z" />
                      </svg>
                    ),
                  },
                  {
                    value: 'vendor',
                    title: 'Vendor',
                    desc: 'Sell your fashion designs',
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9L12 2L21 9V20a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path d="M9 22V12h6v10" />
                      </svg>
                    ),
                  },
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`user-type-option ${formData.user_type === opt.value ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="user_type"
                      value={opt.value}
                      checked={formData.user_type === opt.value}
                      onChange={set('user_type')}
                    />
                    <div className="user-type-content">
                      {opt.icon}
                      <h3>{opt.title}</h3>
                      <p>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="auth-two-col">
                <div className="auth-field">
                  <label className="auth-label" htmlFor="auth-first">First Name</label>
                  <input id="auth-first" type="text" placeholder="First name" value={formData.first_name} onChange={set('first_name')} required />
                </div>
                <div className="auth-field">
                  <label className="auth-label" htmlFor="auth-last">Last Name</label>
                  <input id="auth-last" type="text" placeholder="Last name" value={formData.last_name} onChange={set('last_name')} required />
                </div>
              </div>

              {formData.user_type === 'vendor' && (
                <>
                  <div className="auth-divider"><span>Brand Details</span></div>
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="auth-brand">Brand Name</label>
                    <input id="auth-brand" type="text" placeholder="Your brand name" value={formData.brand_name} onChange={set('brand_name')} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="auth-desc">Brand Description</label>
                    <textarea id="auth-desc" placeholder="Tell us about your brand…" value={formData.description} onChange={set('description')} rows="2" />
                  </div>
                  <div className="auth-divider"><span>Account</span></div>
                </>
              )}
            </>
          )}

          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-email">Email Address</label>
            <input id="auth-email" type="email" placeholder="you@example.com" value={formData.email} onChange={set('email')} required autoComplete="email" />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="auth-password">Password</label>
            <input id="auth-password" type="password" placeholder="••••••••" value={formData.password} onChange={set('password')} required autoComplete={isRegister ? 'new-password' : 'current-password'} />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => window.location.reload()} // NOSONAR
          >
            {isRegister ? 'Sign In' : 'Create one — free'}
          </button>
        </p>
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  type: PropTypes.oneOf(['login', 'register']).isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AuthModal;
