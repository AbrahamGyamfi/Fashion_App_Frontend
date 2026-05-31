import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FashionLearning.css';

const SkeletonCard = () => (
  <div className="learning-skeleton">
    <div className="shimmer" style={{ height: 220 }} />
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="shimmer" style={{ height: 11, width: '35%', borderRadius: 100 }} />
      <div className="shimmer" style={{ height: 18, width: '80%' }} />
      <div className="shimmer" style={{ height: 13, width: '60%' }} />
      <div className="shimmer" style={{ height: 13, width: '45%' }} />
    </div>
  </div>
);

function FashionLearning() {
  const [activeTab, setActiveTab] = useState('guides');
  const [guides, setGuides] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchContent = async () => {
    setLoading(true);
    try {
      if (activeTab === 'guides') {
        const response = await axios.get('/api/fashion/guides');
        setGuides(response.data);
      } else {
        const response = await axios.get('/api/fashion/outfits');
        setOutfits(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (type, id) => {
    const ALLOWED_TYPES = ['guides', 'outfits'];
    if (!ALLOWED_TYPES.includes(type) || !/^\d+$/.test(String(id))) {
      console.error('Invalid type or id');
      return;
    }
    try {
      await axios.post(`/api/fashion/${type}/${id}/like`);
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  };

  const viewGuide = async (id) => {
    try {
      const response = await axios.get(`/api/fashion/guides/${id}`);
      setSelectedGuide(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const viewOutfit = async (id) => {
    try {
      const response = await axios.get(`/api/fashion/outfits/${id}`);
      setSelectedOutfit(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ── Guide detail ── */
  if (selectedGuide) {
    return (
      <div className="fashion-learning">
        <button className="back-btn" onClick={() => setSelectedGuide(null)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Guides
        </button>
        <div className="guide-detail">
          <img src={selectedGuide.image_url} alt={selectedGuide.title} />
          <div className="guide-content">
            <span className="guide-category">{selectedGuide.category}</span>
            <h1>{selectedGuide.title}</h1>
            <div className="guide-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                By {selectedGuide.first_name} {selectedGuide.last_name}
              </span>
              <span>{selectedGuide.views} views</span>
              <span>{selectedGuide.likes} likes</span>
            </div>
            <p className="guide-text">{selectedGuide.content}</p>
            <div className="guide-tags">
              {selectedGuide.tags?.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
            <button className="like-btn" onClick={() => handleLike('guides', selectedGuide.id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Like this guide
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Outfit detail ── */
  if (selectedOutfit) {
    return (
      <div className="fashion-learning">
        <button className="back-btn" onClick={() => setSelectedOutfit(null)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Outfits
        </button>
        <div className="outfit-detail">
          <img src={selectedOutfit.image_url} alt={selectedOutfit.title} />
          <div className="outfit-content">
            <h1>{selectedOutfit.title}</h1>
            <p className="outfit-description">{selectedOutfit.description}</p>
            <div className="outfit-meta">
              {selectedOutfit.occasion && <span className="badge">{selectedOutfit.occasion}</span>}
              {selectedOutfit.season    && <span className="badge">{selectedOutfit.season}</span>}
              {selectedOutfit.style_type && <span className="badge">{selectedOutfit.style_type}</span>}
            </div>
            <button className="like-btn" onClick={() => handleLike('outfits', selectedOutfit.id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {selectedOutfit.likes} Likes
            </button>

            {selectedOutfit.products && selectedOutfit.products.length > 0 && (
              <div className="outfit-products">
                <h3>Shop This Look</h3>
                <div className="products-grid">
                  {selectedOutfit.products.map(product => (
                    <div key={product.id} className="product-mini">
                      <img src={product.image_url} alt={product.name} loading="lazy" />
                      <h4>{product.name}</h4>
                      <p>${product.price}</p>
                      <span className="designer">{product.brand_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Main list view ── */
  return (
    <div className="fashion-learning">
      <div className="learning-header">
        <span className="learning-eyebrow">Education &amp; Inspiration</span>
        <h1>Fashion Learning Hub</h1>
        <p>Elevate your style with expert tips, cultural trends, and outfit inspiration</p>
      </div>

      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'guides'}
          className={activeTab === 'guides' ? 'active' : ''}
          onClick={() => setActiveTab('guides')}
        >
          Style Guides
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'outfits'}
          className={activeTab === 'outfits' ? 'active' : ''}
          onClick={() => setActiveTab('outfits')}
        >
          Outfit Ideas
        </button>
      </div>

      {loading ? (
        <div className="learning-loading">
          {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="content-grid" role="list">
          {activeTab === 'guides' ? (
            guides.length > 0 ? guides.map(guide => (
              <article
                key={guide.id}
                className="guide-card"
                onClick={() => viewGuide(guide.id)}
                role="listitem"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && viewGuide(guide.id)}
                aria-label={guide.title}
              >
                <img src={guide.image_url} alt={guide.title} loading="lazy" />
                <div className="card-content">
                  <span className="category">{guide.category}</span>
                  <h3>{guide.title}</h3>
                  <div className="card-meta">
                    <span>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{marginRight:4}}>
                        <path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" strokeWidth="1.3"/>
                        <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
                      </svg>
                      {guide.views}
                    </span>
                    <span>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" style={{marginRight:4, color:'#e11d48'}}>
                        <path d="M12.16 2.77a3.22 3.22 0 00-4.55 0L7 3.38l-.61-.61a3.22 3.22 0 00-4.55 4.55l.61.61L7 12.5l4.55-4.55.61-.61a3.22 3.22 0 000-4.57z"/>
                      </svg>
                      {guide.likes}
                    </span>
                  </div>
                </div>
              </article>
            )) : (
              <p className="loading-text">No style guides available yet.</p>
            )
          ) : (
            outfits.length > 0 ? outfits.map(outfit => (
              <article
                key={outfit.id}
                className="outfit-card"
                onClick={() => viewOutfit(outfit.id)}
                role="listitem"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && viewOutfit(outfit.id)}
                aria-label={outfit.title}
              >
                <img src={outfit.image_url} alt={outfit.title} loading="lazy" />
                <div className="card-content">
                  <h3>{outfit.title}</h3>
                  <p>{outfit.description}</p>
                  <div className="outfit-badges">
                    {outfit.occasion  && <span>{outfit.occasion}</span>}
                    {outfit.style_type && <span>{outfit.style_type}</span>}
                  </div>
                  <div className="card-meta">
                    <span>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" style={{marginRight:4, color:'#e11d48'}}>
                        <path d="M12.16 2.77a3.22 3.22 0 00-4.55 0L7 3.38l-.61-.61a3.22 3.22 0 00-4.55 4.55l.61.61L7 12.5l4.55-4.55.61-.61a3.22 3.22 0 000-4.57z"/>
                      </svg>
                      {outfit.likes}
                    </span>
                  </div>
                </div>
              </article>
            )) : (
              <p className="loading-text">No outfit ideas available yet.</p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default FashionLearning;
