import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

const DashIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const BoxIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const PenIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const CartIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const ChartIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const ShieldIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',  Icon: DashIcon   },
  { id: 'products',   label: 'Products',   Icon: BoxIcon    },
  { id: 'designers',  label: 'Designers',  Icon: PenIcon    },
  { id: 'orders',     label: 'Orders',     Icon: CartIcon   },
  { id: 'analytics',  label: 'Analytics',  Icon: ChartIcon  },
  { id: 'audit-logs', label: 'Audit Logs', Icon: ShieldIcon, divider: true },
];

function Sidebar({ currentPage, onNavigate, onBackToStore }) {
  return (
    <aside className="sidebar" aria-label="Admin navigation">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="4" fill="#fff" />
            <path d="M16 6L22 12L20 12L20 20L12 20L12 12L10 12L16 6Z" fill="#000" />
            <rect x="8" y="24" width="16" height="2" fill="#000" />
          </svg>
          <span className="sidebar-logo-text">ShopNow</span>
        </div>
        <span className="sidebar-mode-badge">Admin</span>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Management</span>
        {NAV_ITEMS.map(item => (
          <React.Fragment key={item.id}>
            {item.divider && <div className="nav-divider-line" />}
            <button
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              <span className="nav-icon" aria-hidden="true"><item.Icon /></span>
              <span className="nav-label">{item.label}</span>
            </button>
          </React.Fragment>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item back-to-store" onClick={onBackToStore}>
          <span className="nav-icon" aria-hidden="true">←</span>
          <span className="nav-label">Back to Store</span>
        </button>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  currentPage:   PropTypes.string.isRequired,
  onNavigate:    PropTypes.func.isRequired,
  onBackToStore: PropTypes.func.isRequired,
};

export default Sidebar;
