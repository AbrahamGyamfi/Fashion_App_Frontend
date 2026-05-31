import React from 'react';
import './Sidebar.css';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'products',  label: 'Products',  icon: '📦' },
  { id: 'designers', label: 'Designers', icon: '👔' },
  { id: 'orders',    label: 'Orders',    icon: '🛒' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
];

function Sidebar({ currentPage, onNavigate, onBackToStore }) {
  return (
    <aside className="sidebar" aria-label="Admin navigation">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <h1>ShopNow</h1>
          <span className="sidebar-role">Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <span className="sidebar-section-label">Management</span>
          {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={onBackToStore}>
          <span className="nav-icon" aria-hidden="true">🏪</span>
          <span className="nav-label">Back to Store</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
