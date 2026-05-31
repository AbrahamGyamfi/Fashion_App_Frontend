import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AfricanFashionGallery.css';

const AFRICAN_LOOKS = [
  {
    id: 1,
    src: '/images/african/ankara-dress-vibrant.jpg',
    title: 'Ankara Print Dress',
    style: 'Wax Print',
    origin: 'West Africa',
    description: 'Vibrant Ankara wax-print dress — bold geometric patterns inspired by West African textile heritage.',
    tags: ['Ankara', 'Wax Print', 'Women'],
  },
  {
    id: 2,
    src: '/images/african/traditional-clothing-woman.jpg',
    title: 'Traditional Attire',
    style: 'Heritage Wear',
    origin: 'Sub-Saharan Africa',
    description: 'Classic traditional clothing blending hand-dyed fabrics with timeless silhouettes.',
    tags: ['Traditional', 'Heritage', 'Women'],
  },
  {
    id: 3,
    src: '/images/african/traditional-attire-woman.jpg',
    title: 'Cultural Dress',
    style: 'Ceremonial',
    origin: 'East Africa',
    description: 'Ceremonial dress featuring intricate embroidery and rich earthy tones.',
    tags: ['Ceremonial', 'Embroidery', 'Women'],
  },
  {
    id: 4,
    src: '/images/african/traditional-attire-portrait.jpg',
    title: 'Heritage Portrait',
    style: 'Contemporary African',
    origin: 'Central Africa',
    description: 'Contemporary African fashion fusing traditional motifs with modern tailoring.',
    tags: ['Contemporary', 'Fusion', 'Women'],
  },
  {
    id: 5,
    src: '/images/african/gele-headwrap.jpg',
    title: 'Gele Headwrap',
    style: 'Headwear',
    origin: 'Nigeria',
    description: 'The iconic Nigerian Gele — a sculptural headwrap worn at weddings and festivals.',
    tags: ['Gele', 'Nigeria', 'Accessories'],
  },
  {
    id: 6,
    src: '/images/african/turban-outfit.jpg',
    title: 'Ankara Turban Look',
    style: 'Head Wrap',
    origin: 'West Africa',
    description: 'Ankara head wrap paired with a coordinating outfit — a staple of West African street fashion.',
    tags: ['Headwrap', 'Ankara', 'Women'],
  },
  {
    id: 7,
    src: '/images/african/agbada-man-1.jpg',
    title: 'Agbada — Yoruba',
    style: 'Formal Wear',
    origin: 'Nigeria',
    description: 'The flowing Agbada — a three-piece flowing robe worn by Yoruba men at celebrations.',
    tags: ['Agbada', 'Yoruba', 'Men'],
  },
  {
    id: 8,
    src: '/images/african/agbada-man-2.jpg',
    title: 'Regal Agbada',
    style: 'Ceremonial',
    origin: 'Nigeria',
    description: 'Regal embroidered Agbada with intricate aso-oke details — the pinnacle of Nigerian menswear.',
    tags: ['Agbada', 'Ceremonial', 'Men'],
  },
  {
    id: 9,
    src: '/images/african/kente-man.jpg',
    title: 'Kente Cloth',
    style: 'Royal Wear',
    origin: 'Ghana',
    description: 'Authentic Ghanaian Kente cloth — hand-woven silk and cotton worn by royalty and elders.',
    tags: ['Kente', 'Ghana', 'Men'],
  },
];

const ALL_TAGS = ['All', 'Women', 'Men', 'Accessories', 'Ankara', 'Kente', 'Agbada', 'Ceremonial'];

function AfricanFashionGallery({ onShopAfrican }) {
  const [activeTag, setActiveTag] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeTag === 'All'
    ? AFRICAN_LOOKS
    : AFRICAN_LOOKS.filter((l) => l.tags.includes(activeTag));

  return (
    <section className="african-gallery">
      <div className="african-gallery-hero">
        <div className="african-gallery-hero-text">
          <span className="african-gallery-eyebrow">Cultural Collection</span>
          <h2 className="african-gallery-title">African Fashion Heritage</h2>
          <p className="african-gallery-desc">
            From the bold geometry of Ankara wax prints to the hand-woven grandeur of Kente cloth —
            explore the richness of African fashion across cultures, ceremonies, and generations.
          </p>
          <button className="african-gallery-shop-btn" onClick={onShopAfrican}>
            Shop African Fashion →
          </button>
        </div>
        <div className="african-gallery-hero-strip">
          {AFRICAN_LOOKS.slice(0, 3).map((look) => (
            <div
              key={look.id}
              className="african-gallery-hero-thumb"
              style={{ backgroundImage: `url(${look.src})` }}
            />
          ))}
        </div>
      </div>

      <div className="african-gallery-filters">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            className={`african-filter-pill ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="african-gallery-grid">
        {filtered.map((look) => (
          <button
            key={look.id}
            className="african-gallery-card"
            onClick={() => setLightbox(look)}
          >
            <div
              className="african-gallery-card-img"
              style={{ backgroundImage: `url(${look.src})` }}
            >
              <div className="african-gallery-card-overlay">
                <span className="african-gallery-zoom">⤢ View</span>
              </div>
            </div>
            <div className="african-gallery-card-info">
              <div className="african-gallery-card-header">
                <span className="african-gallery-card-title">{look.title}</span>
                <span className="african-gallery-card-origin">{look.origin}</span>
              </div>
              <span className="african-gallery-card-style">{look.style}</span>
              <div className="african-gallery-card-tags">
                {look.tags.map((t) => (
                  <span key={t} className="african-tag-chip">{t}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
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
            <img
              className="african-lightbox-img"
              src={lightbox.src}
              alt={lightbox.title}
            />
            <div className="african-lightbox-info">
              <h3 className="african-lightbox-title">{lightbox.title}</h3>
              <span className="african-lightbox-origin">{lightbox.style} · {lightbox.origin}</span>
              <p className="african-lightbox-desc">{lightbox.description}</p>
              <div className="african-lightbox-tags">
                {lightbox.tags.map((t) => (
                  <span key={t} className="african-tag-chip">{t}</span>
                ))}
              </div>
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
