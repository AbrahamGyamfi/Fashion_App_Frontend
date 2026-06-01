import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './FashionLearning.css';
import StyleQuiz from './StyleQuiz';
import BeginnerSection from './BeginnerSection';
import {
  EyeIcon, HeartIcon, ClockIcon, BackIcon,
  CultureIcon, SparkleIcon, TrendIcon, BookIcon,
  OutfitHelpIcon, QuizIcon,
} from './icons';

/* ── Helpers ── */
const CATEGORY_META = {
  'Cultural Fashion': { Icon: CultureIcon,  color: '#e67e22', bg: '#fff4e6' },
  'Styling Tips':     { Icon: SparkleIcon,  color: '#8e44ad', bg: '#f5eefb' },
  'Trends':           { Icon: TrendIcon,    color: '#2980b9', bg: '#eaf4fb' },
  'Fashion Education':{ Icon: BookIcon,     color: '#27ae60', bg: '#eafaf1' },
};

function catMeta(cat) {
  return CATEGORY_META[cat] || { Icon: BookIcon, color: '#555', bg: '#f5f5f5' };
}

function readTime(text) {
  if (!text) return '2 min';
  return `${Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))} min read`;
}

/* ── Guide/Outfit categories ── */
const GUIDE_CATS  = ['All', 'Cultural Fashion', 'Styling Tips', 'Trends', 'Fashion Education'];
const OUTFIT_CATS = ['All', 'Casual', 'Formal', 'Wedding', 'Work', 'Evening'];

/* ── Reading progress hook ── */
function useReadProgress(ref) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const top = el.getBoundingClientRect().top;
      const height = el.scrollHeight - window.innerHeight;
      const scrolled = Math.max(0, -top);
      setPct(Math.min(100, Math.round((scrolled / height) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
  return pct;
}

/* ── Skeleton ── */
const Skeleton = () => (
  <div className="lh-skeleton">
    <div className="lh-skel-img shimmer" />
    <div className="lh-skel-body">
      <div className="lh-skel-line short shimmer" />
      <div className="lh-skel-line shimmer" />
      <div className="lh-skel-line medium shimmer" />
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════ */
function GuideDetail({ guide, guides, onBack, onLike, onOpen }) {
  const ref = useRef(null);
  const progress = useReadProgress(ref);
  const related = guides
    .filter(g => g.id !== guide.id && g.category === guide.category)
    .slice(0, 3);
  const cm = catMeta(guide.category);

  return (
    <div className="fashion-learning" ref={ref}>
      {/* Reading progress bar */}
      <div className="lh-read-progress">
        <div className="lh-read-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="lh-detail-body">
        <button className="lh-back-btn" onClick={onBack}>
          <BackIcon /> Back to Learning Hub
        </button>
        <div className="lh-detail-grid">
          <div className="lh-detail-img-wrap">
            <img src={guide.image_url} alt={guide.title} className="lh-detail-img" />
          </div>
          <div className="lh-detail-content">
            <span className="lh-detail-cat" style={{ background: cm.bg, color: cm.color }}>
              <cm.Icon size={13} /> {guide.category}
            </span>
            <h1 className="lh-detail-title">{guide.title}</h1>
            <div className="lh-detail-meta">
              {guide.first_name && (
                <span className="lh-meta-item">By {guide.first_name} {guide.last_name}</span>
              )}
              <span className="lh-meta-item"><ClockIcon /> {readTime(guide.content)}</span>
              <span className="lh-meta-item"><EyeIcon /> {guide.views} views</span>
              <span className="lh-meta-item"><HeartIcon /> {guide.likes} likes</span>
              <span className="lh-meta-item lh-progress-meta">{progress}% read</span>
            </div>
            <p className="lh-detail-text">{guide.content}</p>
            {guide.tags?.length > 0 && (
              <div className="lh-detail-tags">
                {guide.tags.map(t => <span key={t} className="lh-tag">#{t}</span>)}
              </div>
            )}
            <button className="lh-like-btn" onClick={() => onLike('guides', guide.id)}>
              <HeartIcon /> Like this guide
            </button>
          </div>
        </div>

        {/* Related guides */}
        {related.length > 0 && (
          <div className="lh-related">
            <h3 className="lh-related-title">Related Guides</h3>
            <div className="lh-related-grid">
              {related.map(g => {
                const rcm = catMeta(g.category);
                return (
                  <div key={g.id} className="lh-related-card" onClick={() => onOpen(g.id)}>
                    <div className="lh-related-img-wrap">
                      <img src={g.image_url} alt={g.title} className="lh-related-img" />
                    </div>
                    <div className="lh-related-body">
                      <span className="lh-card-cat" style={{ background: rcm.bg, color: rcm.color }}>
                        <rcm.Icon size={13} /> {g.category}
                      </span>
                      <h4 className="lh-related-card-title">{g.title}</h4>
                      <span className="lh-related-read-time"><ClockIcon /> {readTime(g.content)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FashionLearning({ onShopCulture }) {
  const [tab, setTab]         = useState('guides');
  const [guides, setGuides]   = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGuide, setActiveGuide]   = useState(null);
  const [activeOutfit, setActiveOutfit] = useState(null);
  const [search, setSearch]   = useState('');
  const [catFilter, setCatFilter] = useState('All');

  useEffect(() => {
    fetchContent();
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchContent = async () => {
    setLoading(true);
    try {
      if (tab === 'guides') {
        const r = await axios.get('/api/fashion/guides');
        setGuides(r.data);
      } else {
        const r = await axios.get('/api/fashion/outfits');
        setOutfits(r.data);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const openGuide = async (id) => {
    try {
      const r = await axios.get(`/api/fashion/guides/${id}`);
      setActiveGuide(r.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { console.error(e); }
  };

  const openOutfit = async (id) => {
    try {
      const r = await axios.get(`/api/fashion/outfits/${id}`);
      setActiveOutfit(r.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { console.error(e); }
  };

  const handleLike = async (type, id) => {
    const ALLOWED = ['guides', 'outfits'];
    if (!ALLOWED.includes(type) || !/^\d+$/.test(String(id))) return;
    try {
      await axios.post(`/api/fashion/${type}/${id}/like`);
      fetchContent();
    } catch (e) { console.error(e); }
  };

  /* ── Filtering ── */
  const q = search.toLowerCase();
  const visibleGuides = guides.filter(g => {
    const matchQ   = !q || g.title?.toLowerCase().includes(q) || g.content?.toLowerCase().includes(q);
    const matchCat = catFilter === 'All' || g.category === catFilter;
    return matchQ && matchCat;
  });
  const visibleOutfits = outfits.filter(o => {
    const matchQ   = !q || o.title?.toLowerCase().includes(q);
    const matchCat = catFilter === 'All' || o.occasion === catFilter;
    return matchQ && matchCat;
  });

  /* ── Featured (most viewed) ── */
  const featuredGuide = [...guides].sort((a, b) => b.views - a.views)[0];

  /* ── Cultural guides spotlight ── */
  const culturalGuides = guides.filter(g => g.category === 'Cultural Fashion').slice(0, 3);

  const chips = tab === 'guides' ? GUIDE_CATS : OUTFIT_CATS;
  const visible = tab === 'guides' ? visibleGuides : visibleOutfits;
  const showQuiz = tab === 'quiz';
  const showBeginner = tab === 'beginner';

  /* ════════════════════ DETAIL: GUIDE ════════════════════ */
  if (activeGuide) {
    return (
      <GuideDetail
        guide={activeGuide}
        guides={guides}
        onBack={() => setActiveGuide(null)}
        onLike={handleLike}
        onOpen={openGuide}
      />
    );
  }

  /* ════════════════════ DETAIL: OUTFIT ════════════════════ */
  if (activeOutfit) {
    return (
      <div className="fashion-learning">
        <div className="lh-detail-body">
          <button className="lh-back-btn" onClick={() => setActiveOutfit(null)}>
            <BackIcon /> Back to Learning Hub
          </button>
          <div className="lh-detail-grid">
            <div className="lh-detail-img-wrap">
              <img src={activeOutfit.image_url} alt={activeOutfit.title} className="lh-detail-img" />
            </div>
            <div className="lh-detail-content">
              <div className="lh-outfit-badges">
                {activeOutfit.occasion   && <span className="lh-badge">{activeOutfit.occasion}</span>}
                {activeOutfit.season     && <span className="lh-badge">{activeOutfit.season}</span>}
                {activeOutfit.style_type && <span className="lh-badge accent">{activeOutfit.style_type}</span>}
              </div>
              <h1 className="lh-detail-title">{activeOutfit.title}</h1>
              <p className="lh-detail-text">{activeOutfit.description}</p>
              <button className="lh-like-btn" onClick={() => handleLike('outfits', activeOutfit.id)}>
                <HeartIcon /> {activeOutfit.likes} Likes
              </button>
              {activeOutfit.products?.length > 0 && (
                <div className="lh-shop-look">
                  <h3>Shop This Look</h3>
                  <div className="lh-products-row">
                    {activeOutfit.products.map(p => (
                      <div key={p.id} className="lh-product-mini">
                        <div className="lh-product-img">
                          <img src={p.image_url} alt={p.name} />
                        </div>
                        <span className="lh-product-name">{p.name}</span>
                        <span className="lh-product-price">${p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════ MAIN HUB ════════════════════ */
  return (
    <div className="fashion-learning">
      {/* Hero */}
      <div className="lh-hero">
        <div className="lh-hero-inner">
          <span className="lh-hero-eyebrow">Style Education</span>
          <h1 className="lh-hero-title">Fashion<br /><em>Learning Hub</em></h1>
          <p className="lh-hero-sub">Expert guides, cultural fashion history, and outfit inspiration — elevate your style knowledge.</p>
          <div className="lh-hero-stats">
            <span><strong>{guides.length}</strong> Guides</span>
            <span><strong>{outfits.length}</strong> Outfit Ideas</span>
            <span><strong>4</strong> Cultures</span>
          </div>
        </div>
      </div>

      <div className="lh-body">

        {/* ── Featured Guide ── */}
        {!loading && featuredGuide && catFilter === 'All' && !search && tab === 'guides' && (
          <div className="lh-featured" onClick={() => openGuide(featuredGuide.id)}>
            <div className="lh-featured-img" style={{ backgroundImage: `url(${featuredGuide.image_url})` }} />
            <div className="lh-featured-overlay" />
            <div className="lh-featured-content">
              <span className="lh-featured-label">Featured Guide</span>
              {/* featured category icon */}
              <span className="lh-featured-cat" style={{ color: catMeta(featuredGuide.category).color }}>
                {catMeta(featuredGuide.category).Icon && React.createElement(catMeta(featuredGuide.category).Icon, { size: 13 })}
                {' '}{featuredGuide.category}
              </span>
              <h2 className="lh-featured-title">{featuredGuide.title}</h2>
              <div className="lh-featured-meta">
                <span><ClockIcon /> {readTime(featuredGuide.content)}</span>
                <span><EyeIcon /> {featuredGuide.views} views</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Cultural Spotlight Row ── */}
        {!loading && culturalGuides.length > 0 && catFilter === 'All' && !search && tab === 'guides' && (
          <div className="lh-cultural-section">
            <div className="lh-section-header">
              <h3 className="lh-section-title"><CultureIcon size={16} /> Cultural Fashion</h3>
              <button className="lh-section-link" onClick={() => setCatFilter('Cultural Fashion')}>
                See all →
              </button>
            </div>
            <div className="lh-cultural-row">
              {culturalGuides.map(g => {
                const cm = catMeta(g.category);
                const CmIcon = cm.Icon;
                return (
                  <div key={g.id} className="lh-cultural-card" onClick={() => openGuide(g.id)}>
                    <div className="lh-cultural-img" style={{ backgroundImage: `url(${g.image_url})` }} />
                    <div className="lh-cultural-info">
                      <span className="lh-cultural-badge" style={{ background: cm.bg, color: cm.color }}>
                        {CmIcon && <CmIcon size={11} />} {g.category}
                      </span>
                      <h4 className="lh-cultural-title">{g.title}</h4>
                      <div className="lh-cultural-meta">
                        <span><ClockIcon /> {readTime(g.content)}</span>
                        <span><HeartIcon /> {g.likes}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Tabs + Search ── */}
        <div className="lh-toolbar">
          <div className="lh-tabs">
            <button
              className={`lh-tab ${tab === 'guides' ? 'active' : ''}`}
              onClick={() => { setTab('guides'); setCatFilter('All'); setSearch(''); }}
            >
              Style Guides
              {guides.length > 0 && <span className="lh-tab-count">{guides.length}</span>}
            </button>
            <button
              className={`lh-tab ${tab === 'outfits' ? 'active' : ''}`}
              onClick={() => { setTab('outfits'); setCatFilter('All'); setSearch(''); }}
            >
              Outfit Ideas
              {outfits.length > 0 && <span className="lh-tab-count">{outfits.length}</span>}
            </button>
            <button
              className={`lh-tab lh-tab-beginner ${tab === 'beginner' ? 'active' : ''}`}
              onClick={() => { setTab('beginner'); setCatFilter('All'); setSearch(''); }}
            >
              <OutfitHelpIcon size={15} /> Outfit Help
            </button>
            <button
              className={`lh-tab lh-tab-quiz ${tab === 'quiz' ? 'active' : ''}`}
              onClick={() => { setTab('quiz'); setCatFilter('All'); setSearch(''); }}
            >
              <QuizIcon size={15} /> Style Quiz
            </button>
          </div>

          <div className="lh-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lh-search-icon">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="lh-search"
              type="text"
              placeholder={tab === 'guides' ? 'Search guides…' : 'Search outfits…'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="lh-search-clear" onClick={() => setSearch('')}>×</button>}
          </div>
        </div>

        {/* ── Outfit Help (Beginner) ── */}
        {showBeginner && (
          <BeginnerSection
            onViewOutfits={() => { setTab('outfits'); setCatFilter('All'); setSearch(''); }}
          />
        )}

        {/* ── Style Quiz ── */}
        {showQuiz && (
          <StyleQuiz onShopCulture={onShopCulture} />
        )}

        {/* ── Category chips (hidden when quiz/beginner tab active) ── */}
        {!showQuiz && !showBeginner && <div className="lh-chips">
          {chips.map(c => (
            <button
              key={c}
              className={`lh-chip ${catFilter === c ? 'active' : ''}`}
              onClick={() => setCatFilter(c)}
            >
              {c}
            </button>
          ))}
          <span className="lh-count">{visible.length} {tab === 'guides' ? 'guide' : 'outfit'}{visible.length !== 1 ? 's' : ''}</span>
        </div>}

        {/* ── Content grid (hidden when quiz/beginner tab active) ── */}
        {!showQuiz && !showBeginner && <>
          {loading && (
            <div className="lh-grid">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
            </div>
          )}
          {!loading && visible.length === 0 && (
            <div className="lh-empty">
              <span className="lh-empty-icon"><BookIcon size={36} /></span>
              <h3>Nothing found</h3>
              <p>Try a different search term or category</p>
              <button className="lh-back-btn" onClick={() => { setSearch(''); setCatFilter('All'); }}>
                Clear filters
              </button>
            </div>
          )}
          {!loading && visible.length > 0 && tab === 'guides' && (
            <div className="lh-grid">
              {visibleGuides.map(g => {
                const cm = catMeta(g.category);
                const CmIcon = cm.Icon;
                return (
                  <div key={g.id} className="lh-guide-card" onClick={() => openGuide(g.id)}>
                    <div className="lh-card-img-wrap">
                      <img src={g.image_url} alt={g.title} loading="lazy" className="lh-card-img" />
                      <span className="lh-card-read-time"><ClockIcon /> {readTime(g.content)}</span>
                    </div>
                    <div className="lh-card-body">
                      <span className="lh-card-cat" style={{ background: cm.bg, color: cm.color }}>
                        {CmIcon && <CmIcon size={11} />} {g.category}
                      </span>
                      <h3 className="lh-card-title">{g.title}</h3>
                      <p className="lh-card-excerpt">{g.content?.slice(0, 110)}…</p>
                      <div className="lh-card-footer">
                        <span><EyeIcon /> {g.views}</span>
                        <span><HeartIcon /> {g.likes}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {!loading && visible.length > 0 && tab === 'outfits' && (
            <div className="lh-grid">
              {visibleOutfits.map(o => (
                <div key={o.id} className="lh-outfit-card" onClick={() => openOutfit(o.id)}>
                  <div className="lh-card-img-wrap">
                    <img src={o.image_url} alt={o.title} loading="lazy" className="lh-card-img" />
                    <div className="lh-outfit-badges-overlay">
                      {o.style_type && <span className="lh-overlay-badge">{o.style_type}</span>}
                    </div>
                  </div>
                  <div className="lh-card-body">
                    <h3 className="lh-card-title">{o.title}</h3>
                    <p className="lh-card-excerpt">{o.description?.slice(0, 100)}…</p>
                    <div className="lh-outfit-meta">
                      {o.occasion && <span className="lh-badge">{o.occasion}</span>}
                      {o.season   && <span className="lh-badge">{o.season}</span>}
                    </div>
                    <div className="lh-card-footer">
                      <span><HeartIcon /> {o.likes}</span>
                      <span className="lh-read-more">View Look →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>}
      </div>
    </div>
  );
}

FashionLearning.defaultProps = { onShopCulture: null };

export default FashionLearning;
