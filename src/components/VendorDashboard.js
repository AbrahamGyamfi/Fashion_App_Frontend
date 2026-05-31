import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VendorDashboard.css';

const CATEGORIES = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear'];
const CULTURES   = ['Western', 'African', 'Asian', 'Middle Eastern', 'Latin American', 'Fusion'];

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: 'Tops',
  culture_category: 'Western',
  size: '',
  color: '',
  image_url: '',
};

function VendorDashboard({ user }) {
  const [products, setProducts]         = useState([]);
  const [designer, setDesigner]         = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData]         = useState(EMPTY_FORM);
  const [submitting, setSubmitting]     = useState(false);

  useEffect(() => { fetchVendorData(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchVendorData = async () => {
    try {
      const designerRes = await axios.get('/api/designers');
      const myDesigner  = designerRes.data.find(d => d.email === user.email);
      setDesigner(myDesigner);
      if (myDesigner) {
        const productsRes = await axios.get(`/api/designers/${myDesigner.id}/products`);
        setProducts(productsRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/api/products', {
        ...formData,
        designer_id: designer.id,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
      });
      setShowAddModal(false);
      setFormData(EMPTY_FORM);
      fetchVendorData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const initials = designer?.brand_name
    ? designer.brand_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'VD';

  if (!designer) {
    return (
      <div className="vendor-dashboard">
        <div className="no-designer">
          <h2>Vendor Profile Not Found</h2>
          <p>Please contact support to set up your vendor account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vendor-dashboard">
      {/* ── Profile Header ── */}
      <div className="vendor-header">
        <div className="vendor-meta">
          <div className="vendor-avatar" aria-hidden="true">{initials}</div>
          <div className="vendor-info">
            <h1>{designer.brand_name}</h1>
            {designer.description && <p>{designer.description}</p>}
            <div className="vendor-stats">
              <div className="stat">
                <span className="stat-value">{products.length}</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-value">{designer.rating ? Number(designer.rating).toFixed(1) : '—'}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat">
                <span className="stat-value">{designer.review_count || 0}</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>
          </div>
        </div>
        <button className="btn-add" onClick={() => setShowAddModal(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Add Product
        </button>
      </div>

      {/* ── Products Grid ── */}
      <div className="products-section">
        <h2>My Products ({products.length})</h2>
        {products.length === 0 ? (
          <div style={{ textAlign:'center', padding:'56px 24px', color:'#a09890' }}>
            <p style={{ fontSize:15 }}>No products yet. Add your first product above.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-item">
                {product.image_url
                  ? <img src={product.image_url} alt={product.name} loading="lazy" />
                  : <div style={{ height:220, background:'#f2f0ed', display:'flex', alignItems:'center', justifyContent:'center', color:'#c5c0b8', fontSize:13 }}>No Image</div>
                }
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${Number(product.price).toFixed(2)}</p>
                  <p className="stock">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{flexShrink:0}}>
                      <rect x="1" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                    Stock: {product.stock}
                  </p>
                  <span className={`status ${product.status}`}>{product.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Add Product Modal ── */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Add new product">
            <div className="modal-title-row">
              <h2>Add New Product</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)} aria-label="Close modal">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label" htmlFor="prod-name">Product Name *</label>
                <input id="prod-name" type="text" name="name" placeholder="e.g. Ankara Print Dress" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="prod-desc">Description</label>
                <textarea id="prod-desc" name="description" placeholder="Tell buyers about this piece…" value={formData.description} onChange={handleChange} rows="3" />
              </div>

              <div className="two-col">
                <div className="field-group">
                  <label className="field-label" htmlFor="prod-price">Price (USD) *</label>
                  <input id="prod-price" type="number" name="price" step="0.01" min="0" placeholder="0.00" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="prod-stock">Stock *</label>
                  <input id="prod-stock" type="number" name="stock" min="0" placeholder="0" value={formData.stock} onChange={handleChange} required />
                </div>
              </div>

              <div className="two-col">
                <div className="field-group">
                  <label className="field-label" htmlFor="prod-cat">Category</label>
                  <select id="prod-cat" name="category" value={formData.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="prod-culture">Culture</label>
                  <select id="prod-culture" name="culture_category" value={formData.culture_category} onChange={handleChange}>
                    {CULTURES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="two-col">
                <div className="field-group">
                  <label className="field-label" htmlFor="prod-size">Size</label>
                  <input id="prod-size" type="text" name="size" placeholder="e.g. S, M, L, XL" value={formData.size} onChange={handleChange} />
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="prod-color">Color</label>
                  <input id="prod-color" type="text" name="color" placeholder="e.g. Indigo" value={formData.color} onChange={handleChange} />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="prod-img">Image URL *</label>
                <input id="prod-img" type="url" name="image_url" placeholder="https://..." value={formData.image_url} onChange={handleChange} required />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Adding…' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;
