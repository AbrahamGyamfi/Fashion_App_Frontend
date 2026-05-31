import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AfricanFashionGallery.css';

const LOOKS = [
  // ── Ghana ──
  {
    id: 1,
    src: '/images/african/ghana-kente-woman.jpg',
    title: 'Kente Kaba & Slit',
    style: 'Kente Heritage',
    nation: 'Ghana',
    tag: 'Ghana',
    description: 'The Kaba & Slit — Ghana\'s iconic two-piece silhouette — cut from hand-woven Kente cloth. Every strip of Kente carries a proverb woven in colour.',
  },
  {
    id: 2,
    src: '/images/african/kente-man.jpg',
    title: 'Royal Kente Drape',
    style: 'Traditional Menswear',
    nation: 'Ghana',
    tag: 'Ghana',
    description: 'Authentic Ghanaian Kente — a hand-woven silk and cotton cloth born in the Ashanti kingdom. Worn by royalty and elders at ceremonies.',
  },
  {
    id: 3,
    src: '/images/african/ankara-dress-vibrant.jpg',
    title: 'Ghanaian Wax Print Dress',
    style: 'Contemporary Ankara',
    nation: 'Ghana',
    tag: 'Fusion',
    description: 'Bold Ankara wax-print fused with modern tailoring — a signature look of Accra\'s thriving fashion scene.',
  },
  // ── Nigeria ──
  {
    id: 4,
    src: '/images/african/nigeria-fashion-portrait.jpg',
    title: 'Lagos Elegance',
    style: 'Nigerian Couture',
    nation: 'Nigeria',
    tag: 'Nigeria',
    description: 'Contemporary Nigerian fashion rooted in the opulence of Lagos — bold silhouettes, rich fabrics, and statement accessories.',
  },
  {
    id: 5,
    src: '/images/african/nigeria-fashion-vibrant.jpg',
    title: 'Ankara Street Style',
    style: 'Afro-Contemporary',
    nation: 'Nigeria',
    tag: 'Fusion',
    description: 'Nigerian street fashion fusing Ankara prints with modern cuts — the look that put Lagos on the global fashion map.',
  },
  {
    id: 6,
    src: '/images/african/nigeria-woman-red.jpg',
    title: 'Aso-Ebi Glam',
    style: 'Aso-Ebi',
    nation: 'Nigeria',
    tag: 'Nigeria',
    description: 'Aso-Ebi — coordinated fabric worn by family and friends at Nigerian weddings and celebrations. Synonymous with unity and luxury.',
  },
  {
    id: 7,
    src: '/images/african/nigeria-woman-outdoor.jpg',
    title: 'Iro & Buba',
    style: 'Yoruba Heritage',
    nation: 'Nigeria',
    tag: 'Nigeria',
    description: 'The Iro (wrap skirt) and Buba (blouse) — the timeless Yoruba womenswear ensemble, often crafted in Aso-Oke fabric.',
  },
  {
    id: 8,
    src: '/images/african/agbada-man-1.jpg',
    title: 'Agbada — Yoruba',
    style: 'Formal Menswear',
    nation: 'Nigeria',
    tag: 'Nigeria',
    description: 'The flowing three-piece Agbada worn by Yoruba men. A symbol of prestige, embroidered at the neckline and sleeves.',
  },
  {
    id: 9,
    src: '/images/african/agbada-man-2.jpg',
    title: 'Regal Agbada',
    style: 'Ceremonial',
    nation: 'Nigeria',
    tag: 'Nigeria',
    description: 'Full ceremonial Agbada with intricate Aso-Oke embroidery — the pinnacle of Nigerian menswear at weddings and chieftaincy events.',
  },
  {
    id: 10,
    src: '/images/african/gele-headwrap.jpg',
    title: 'Gele Headwrap',
    style: 'Nigerian Headwear',
    nation: 'Nigeria',
    tag: 'Nigeria',
    description: 'The sculptural Nigerian Gele — a headwrap tied into elaborate shapes. No Nigerian celebration is complete without it.',
  },
  // ── Fusion ──
  {
    id: 11,
    src: '/images/african/turban-outfit.jpg',
    title: 'Ghana–Nigeria Fusion',
    style: 'Modern Fusion',
    nation: 'Ghana × Nigeria',
    tag: 'Fusion',
    description: 'Ankara head wrap paired with a Kente-accented outfit — where Ghanaian and Nigerian fashion traditions meet in one look.',
  },
];

const FILTERS = ['All', 'Ghana', 'Nigeria', 'Fusion'];

const NATION_COLORS = {
  Ghana: { bg: '#fff7e6', text: '#b7700a', border: '#f5c518' },
  Nigeria: { bg: '#e8f5e9', text: '#2e7d32', border: '#4caf50' },
  'Ghana × Nigeria': { bg: '#f3e5f5', text: '#7b1fa2', border: '#9c27b0' },
};

function AfricanFashionGallery({ onShopAfrican }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeFilter === 'All'
    ? LOOKS
    : LOOKS.filter((l) => l.tag === activeFilter);

  return (
    <section className="african-gallery">
      <div className="african-gallery-hero">
        <div className="african-gallery-hero-text">
          <span className="african-gallery-eyebrow">Cultural Spotlight</span>
          <h2 className="african-gallery-title">
            Ghana <span className="hero-x">×</span> Nigeria<br />
            <em>Fashion Fusion</em>
          </h2>
          <p className="african-gallery-desc">
            From Accra's Kente looms to Lagos's Agbada tailors — explore the rich fashion
            heritage of Ghana and Nigeria, and the vibrant fusion styles born where both cultures meet.
          </p>
          <div className="african-gallery-nation-badges">
            <span className="nation-badge ghana">🇬🇭 Ghana</span>
            <span className="nation-badge-sep">×</span>
            <span className="nation-badge nigeria">🇳🇬 Nigeria</span>
          </div>
          <button className="african-gallery-shop-btn" onClick={onShopAfrican}>
            Shop This Collection →
          </button>
        </div>
        <div className="african-gallery-hero-strip">
          <div className="african-gallery-hero-thumb" style={{ backgroundImage: 'url(/images/african/ghana-kente-woman.jpg)' }} />
          <div className="african-gallery-hero-thumb" style={{ backgroundImage: 'url(/images/african/nigeria-fashion-portrait.jpg)' }} />
          <div className="african-gallery-hero-thumb" style={{ backgroundImage: 'url(/images/african/ankara-dress-vibrant.jpg)' }} />
        </div>
      </div>

      <div className="african-gallery-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`african-filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f === 'Ghana' && '🇬🇭 '}
            {f === 'Nigeria' && '🇳🇬 '}
            {f === 'Fusion' && '✨ '}
            {f}
          </button>
        ))}
        <span className="gallery-count">{filtered.length} looks</span>
      </div>

      <div className="african-gallery-grid">
        {filtered.map((look) => {
          const nc = NATION_COLORS[look.nation] || NATION_COLORS['Ghana × Nigeria'];
          return (
            <button
              key={look.id}
              className="african-gallery-card"
              onClick={() => setLightbox(look)}
            >
              <div className="african-gallery-card-img" style={{ backgroundImage: `url(${look.src})` }}>
                <div className="african-gallery-card-overlay">
                  <span className="african-gallery-zoom">View Look</span>
                </div>
                <span
                  className="african-nation-flag"
                  style={{ background: nc.bg, color: nc.text, border: `1px solid ${nc.border}` }}
                >
                  {look.nation}
                </span>
              </div>
              <div className="african-gallery-card-info">
                <span className="african-gallery-card-title">{look.title}</span>
                <span className="african-gallery-card-style">{look.style}</span>
              </div>
            </button>
          );
        })}
      </div>

      {lightbox && (
        <div
          className="african-lightbox-overlay"
          role="presentation"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === 'Escape' && setLightbox(null)}
        >
          <div
            className="african-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="african-lightbox-close" onClick={() => setLightbox(null)}>×</button>
            <img className="african-lightbox-img" src={lightbox.src} alt={lightbox.title} />
            <div className="african-lightbox-info">
              <span
                className="african-nation-flag lb"
                style={{
                  background: NATION_COLORS[lightbox.nation]?.bg,
                  color: NATION_COLORS[lightbox.nation]?.text,
                  border: `1px solid ${NATION_COLORS[lightbox.nation]?.border}`,
                }}
              >
                {lightbox.nation}
              </span>
              <h3 className="african-lightbox-title">{lightbox.title}</h3>
              <span className="african-lightbox-origin">{lightbox.style}</span>
              <p className="african-lightbox-desc">{lightbox.description}</p>
              <button
                className="african-lightbox-shop"
                onClick={() => { setLightbox(null); onShopAfrican && onShopAfrican(); }}
              >
                Shop This Style
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

AfricanFashionGallery.propTypes = {
  onShopAfrican: PropTypes.func,
};

export default AfricanFashionGallery;
