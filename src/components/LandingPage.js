import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './LandingPage.css';

const STATS = [
  { value: '3+',   label: 'Verified Designers' },
  { value: '16+',  label: 'Curated Pieces' },
  { value: '6',    label: 'World Cultures' },
  { value: '100%', label: 'Authentic Fashion' },
];

const FEATURES = [
  {
    iconPath: 'M3 9L12 2L21 9V20a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
    title: 'Multi-Vendor Marketplace',
    desc: 'Shop verified designers and independent brands — all in one seamless experience.',
  },
  {
    iconPath: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
    title: 'Curated Collections',
    desc: 'Handpicked fashion across 6 world cultures — African, Western, Asian and beyond.',
  },
  {
    iconPath: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4v6l4 2',
    title: 'Fashion Learning Hub',
    desc: 'Master styling with expert guides, colour theory, outfit ideas and trend reports.',
  },
  {
    iconPath: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
    title: 'Wishlist & Saves',
    desc: 'Save pieces you love and revisit them anytime — never lose track of a great find.',
  },
];

const SOCIAL_BADGES = [
  { icon: '🌍', label: '6 Cultures', sub: 'Global fashion hub' },
  { icon: '✅', label: 'Verified Brands', sub: 'Quality guaranteed' },
  { icon: '🌱', label: 'Eco Fashion', sub: 'Sustainable choices' },
];

const HERO_SLIDES = [
  { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80', label: 'Latest Trends' },
  { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80', label: 'Designer Collections' },
  { url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80', label: 'Street Style' },
  { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80', label: 'African Heritage' },
];

const CULTURES = [
  {
    title: 'African Fashion',
    sub: 'Vibrant prints · Kente · Ankara · Dashiki',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80',
  },
  {
    title: 'Western Classic',
    sub: 'Contemporary · Streetwear · Luxury · Tailored',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80',
  },
  {
    title: 'Asian Aesthetic',
    sub: 'Minimalist · Kimono-inspired · Hanbok Fusion',
    img: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=700&q=80',
  },
  {
    title: 'Middle Eastern',
    sub: 'Elegant Modest Wear · Kaftan · Luxury Fabrics',
    img: 'https://images.unsplash.com/photo-1583008957836-d5c5a6c3c6e9?w=700&q=80',
  },
  {
    title: 'Latin American',
    sub: 'Vibrant colours · Traditional textiles · Bold prints',
    img: 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=700&q=80',
  },
  {
    title: 'Eco Fusion',
    sub: 'Sustainable · Cross-cultural · Conscious Fashion',
    img: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=700&q=80',
  },
];

function LandingPage({ onLogin, onRegister }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="landing-page">
      {/* ── Header ── */}
      <header className="landing-header">
        <div className="lp-header-content">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="5" fill="white" />
              <path d="M16 6L22 12L20 12L20 20L12 20L12 12L10 12L16 6Z" fill="#0a0a0a" />
              <rect x="8" y="24" width="16" height="2" rx="1" fill="#0a0a0a" />
            </svg>
            <span className="logo-text">ShopNow</span>
          </div>

          <nav className="landing-nav" role="navigation">
            <a href="#features" className="lp-nav-link">Features</a>
            <a href="#collections" className="lp-nav-link">Collections</a>
            <a href="#learn" className="lp-nav-link">Style Guide</a>
            <div className="lp-nav-divider" aria-hidden="true" />
            <button className="btn-sign-in" onClick={onLogin}>Sign In</button>
            <button className="btn-try-free" onClick={onRegister}>Start Shopping</button>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero-section" aria-label="Hero">
        <div className="hero-carousel" aria-hidden="true">
          {HERO_SLIDES.map((img, i) => (
            <div
              key={i}
              className={`carousel-slide ${i === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img.url})` }}
            />
          ))}
          <div className="carousel-overlay" />
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              Multi-Cultural Fashion Platform
            </span>
            <h1 className="hero-title">
              Discover Fashion
              <br />
              <span className="gradient-text">That Defines You</span>
            </h1>
            <p className="hero-subtitle">
              Curated collections from verified designers across 6 world cultures —
              shop, learn, and express your unique identity.
            </p>
            <div className="hero-actions">
              <button className="btn-signup" onClick={onRegister}>
                Start Shopping — Free
              </button>
              <button className="btn-secondary-hero" onClick={onLogin}>
                Sign In →
              </button>
            </div>
          </div>

          <div className="carousel-indicators" role="tablist" aria-label="Slide indicators">
            {HERO_SLIDES.map((img, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentSlide}
                className={`indicator ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={img.label}
              />
            ))}
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span className="scroll-label">Scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="stats-strip" role="list">
        {STATS.map((s, i) => (
          <div key={i} className="stat-item" role="listitem">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Social Proof ── */}
      <section className="social-proof-section" aria-label="Trust signals">
        <div className="social-proof-inner">
          <p className="social-proof-tagline">
            Fashion for every <em>culture</em>, every story.
          </p>
          <div className="social-proof-badges">
            {SOCIAL_BADGES.map((b, i) => (
              <div key={i} className="sp-badge">
                <span className="sp-badge-icon" aria-hidden="true">{b.icon}</span>
                <span className="sp-badge-text">
                  <span className="sp-badge-label">{b.label}</span>
                  <span className="sp-badge-sub">{b.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture Grid ── */}
      <section className="culture-section" id="collections" aria-label="Collections by culture">
        <div className="container">
          <p className="section-eyebrow">Global Collections</p>
          <h2 className="section-title">Shop by Culture</h2>
          <p className="section-subtitle">
            Fashion that honours heritage and celebrates the world's rich diversity
          </p>
        </div>
        <div className="culture-grid">
          {CULTURES.map((col, i) => (
            <button key={i} className="culture-card" onClick={onLogin} aria-label={`Explore ${col.title}`}>
              <div className="culture-image" style={{ backgroundImage: `url(${col.img})` }} aria-hidden="true" />
              <div className="culture-overlay" aria-hidden="true" />
              <div className="culture-content">
                <h3>{col.title}</h3>
                <p>{col.sub}</p>
                <span className="culture-cta" aria-hidden="true">Explore →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features" aria-labelledby="features-title">
        <div className="container">
          <p className="section-eyebrow">Platform Features</p>
          <h2 className="section-title" id="features-title">Why ShopNow?</h2>
          <p className="section-subtitle">
            Everything you need to discover, buy, and learn about world fashion in one place
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.iconPath} />
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="learn" aria-label="Call to action">
        <div className="container">
          <div className="cta-content">
            <p className="cta-eyebrow">Join the Community</p>
            <h2>Ready to Find Your Style?</h2>
            <p>
              Thousands of fashion pieces. Dozens of verified designers.<br />
              One curated platform built for the modern wardrobe.
            </p>
            <div className="cta-actions">
              <button className="btn-cta" onClick={onRegister}>
                Start Shopping — It's Free
              </button>
              <button className="btn-cta-secondary" onClick={onLogin}>
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <span className="footer-brand">ShopNow</span>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#features">Features</a>
            <a href="#collections">Collections</a>
            <a href="#learn">Style Guide</a>
          </nav>
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} ShopNow Fashion. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

LandingPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LandingPage;
