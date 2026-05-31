import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const STAT_CARDS = (stats) => [
  { icon: '📦', label: 'Total Products',  value: stats.totalProducts, },
  { icon: '💰', label: 'Inventory Value', value: `$${stats.totalValue}`, },
  { icon: '⚠️', label: 'Low Stock Items', value: stats.lowStockItems, warning: true },
  { icon: '📂', label: 'Categories',      value: stats.categories, },
];

function Dashboard() {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, statsRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/stats'),
      ]);
      const products   = productsRes.data;
      const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
      const lowStock   = products.filter(p => p.stock < 20).length;
      setStats({
        totalProducts: products.length,
        totalValue:    totalValue.toFixed(2),
        lowStockItems: lowStock,
        categories:    statsRes.data.categories || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard…</div>;

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        {STAT_CARDS(stats).map((card, i) => (
          <div key={i} className={`stat-card${card.warning ? ' warning' : ''}`}>
            <div className="stat-icon-wrap">
              <span className="stat-icon" aria-hidden="true">{card.icon}</span>
            </div>
            <div className="stat-content">
              <h3>{card.label}</h3>
              <p className="stat-value">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary">Add New Product</button>
          <button className="action-btn">Update Inventory</button>
          <button className="action-btn">View Reports</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
