import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BeginnerSection.css';

const OCCASIONS = [
  {
    id: 'interview',
    icon: '💼',
    title: 'Job Interview',
    level: 'Formal',
    color: '#2980b9',
    bg: '#eaf4fb',
    steps: [
      { step: 'Base', item: 'White button-down or plain blouse', tip: 'Fitted but not tight. Iron it.' },
      { step: 'Bottoms', item: 'Dark slim trousers or pencil skirt', tip: 'Black, navy, or charcoal. No patterns.' },
      { step: 'Layer', item: 'Structured blazer', tip: 'Your power piece. Neutral tone.' },
      { step: 'Shoes', item: 'Closed-toe heels or smart loafers', tip: 'No trainers, no open-toe.' },
      { step: 'Accessories', item: 'Small studs + simple watch + one bag', tip: 'Less is more. No statement jewellery.' },
    ],
    rule: 'When in doubt, dress one level smarter than you think you need to.',
  },
  {
    id: 'date',
    icon: '✨',
    title: 'First Date',
    level: 'Smart Casual',
    color: '#c0392b',
    bg: '#fdf3f2',
    steps: [
      { step: 'Statement', item: 'Bold top OR interesting trousers — pick ONE', tip: 'Not both. Balance is everything.' },
      { step: 'Pair with', item: 'A simple complementing piece', tip: 'Bold top? Plain jeans. Bold trousers? Simple top.' },
      { step: 'Shoes', item: 'Elevated but walkable', tip: 'Block heels or clean white trainers both work.' },
      { step: 'Outerwear', item: 'Classic coat or leather jacket', tip: 'Instant polish.' },
      { step: 'Accessories', item: 'One focal point: necklace OR earrings', tip: 'Not both.' },
    ],
    rule: 'Wear something you feel genuinely comfortable in. Confidence outperforms any outfit.',
  },
  {
    id: 'wedding',
    icon: '💒',
    title: 'Wedding Guest',
    level: 'Smart to Formal',
    color: '#8e44ad',
    bg: '#f5eefb',
    steps: [
      { step: 'Dress', item: 'Midi or maxi in a safe colour', tip: 'Dusty rose, sage green, navy — never white.' },
      { step: 'Shoes', item: 'Heeled sandals or court shoes', tip: 'Wedges if there\'s grass.' },
      { step: 'Bag', item: 'Small satin or embroidered clutch', tip: 'No daytime totes.' },
      { step: 'Cover-up', item: 'Chiffon wrap or tailored jacket', tip: 'Needed for places of worship.' },
      { step: 'Hair', item: 'Up or half-up style', tip: 'Shows your outfit and stays neat all day.' },
    ],
    rule: 'Check the dress code. Garden Party, Black Tie, and Smart Casual all mean very different things.',
  },
  {
    id: 'casual',
    icon: '☀️',
    title: 'Casual Day Out',
    level: 'Casual',
    color: '#e67e22',
    bg: '#fff4e6',
    steps: [
      { step: 'Base', item: 'Clean, well-fitted jeans (dark wash)', tip: 'No rips, no logos for versatility.' },
      { step: 'Top', item: 'Plain tee, subtle stripe, or neat polo', tip: 'Tucked in = smarter, untucked = relaxed.' },
      { step: 'Shoes', item: 'White leather trainers or loafers', tip: 'Elevates jeans instantly.' },
      { step: 'Layer', item: 'Knit cardigan or unstructured blazer', tip: 'Easy to tie around your waist if warm.' },
      { step: 'Accessories', item: 'Watch + belt in matching tones', tip: 'Matching metals keep it cohesive.' },
    ],
    rule: 'Smart casual: no logo tees, no athletic wear, no sandals unless it\'s beach weather.',
  },
  {
    id: 'nightout',
    icon: '🌙',
    title: 'Night Out',
    level: 'Evening',
    color: '#1a1a2e',
    bg: '#f0eeff',
    steps: [
      { step: 'Silhouette', item: 'Bodycon mini, satin slip, or wide-leg trousers + crop', tip: 'Pick a clear intention.' },
      { step: 'Shoes', item: 'Any heel makes it night-out ready', tip: 'Even a kitten heel counts.' },
      { step: 'Bag', item: 'Mini bag or clutch only', tip: 'No daytime totes — they kill the look.' },
      { step: 'Outerwear', item: 'Leather jacket or blazer as jacket', tip: 'Never a puffy coat.' },
      { step: 'Beauty', item: 'Red lip OR smoky eye — not both', tip: 'One bold choice is chic. Two is confusion.' },
    ],
    rule: 'Pick one focal point and commit. Intention is the difference between dressed and dressed up.',
  },
  {
    id: 'brunch',
    icon: '🥂',
    title: 'Brunch / Lunch',
    level: 'Casual to Smart',
    color: '#27ae60',
    bg: '#eafaf1',
    steps: [
      { step: 'Outfit', item: 'Floaty midi dress or matching co-ord set', tip: 'Effortless is the goal.' },
      { step: 'Shoes', item: 'Strappy flat sandals or low mules', tip: 'Comfort first — you may walk.' },
      { step: 'Bag', item: 'Small woven tote or structured mini bag', tip: 'Keeps the look light.' },
      { step: 'Sunglasses', item: 'Any frame that suits your face', tip: 'Instant polish at zero effort.' },
      { step: 'Hair', item: 'Silk scrunchie, low bun, or minimal headband', tip: 'Shows the outfit, stays tidy.' },
    ],
    rule: 'Sunday brunch is effortless. The goal is looking like you tried just a little.',
  },
  {
    id: 'cultural',
    icon: '🌍',
    title: 'African Cultural Event',
    level: 'Traditional to Formal',
    color: '#e67e22',
    bg: '#fff4e6',
    steps: [
      { step: 'Fabric', item: 'Ankara, Kente, or Aso-Ebi — choose one', tip: 'One fabric per look. Let it speak.' },
      { step: 'Silhouette', item: 'Kaba & Slit, Iro & Buba, or fitted Ankara dress', tip: 'Match to the formality of the event.' },
      { step: 'Headwear', item: 'Gele for formal, Ankara wrap for casual', tip: 'Optional but transformative.' },
      { step: 'Shoes', item: 'Block heels in nude or metallic', tip: 'Comfortable for long events with dancing.' },
      { step: 'Accessories', item: 'Gold jewellery — statement earrings are enough', tip: 'Let the fabric be the star.' },
    ],
    rule: 'Ask the host about the Aso-Ebi fabric. Arriving in the wrong colour is noticeable.',
  },
  {
    id: 'work',
    icon: '📋',
    title: 'Everyday Work',
    level: 'Business Casual',
    color: '#555',
    bg: '#f5f5f5',
    steps: [
      { step: 'Trousers', item: 'Tailored trousers or pencil skirt', tip: 'Fits properly — not too tight, not baggy.' },
      { step: 'Top', item: 'Neat blouse, turtleneck, or button-down', tip: 'Ironed. Always ironed.' },
      { step: 'Shoes', item: 'Ballet flats, loafers, or low heels', tip: 'Comfortable for a full working day.' },
      { step: 'Bag', item: 'A structured work tote', tip: 'Big enough for a laptop, clean enough to look professional.' },
      { step: 'Outerwear', item: 'A trench coat or structured overcoat', tip: 'Elevates everything you wear underneath.' },
    ],
    rule: 'Dress for the meeting you want to be in, not the one you are currently invited to.',
  },
];

const CAPSULE = [
  { item: 'White T-Shirt', why: 'Pairs with everything. Your most-worn item.', icon: '👕' },
  { item: 'Dark Straight Jeans', why: 'Casual to smart casual in seconds.', icon: '👖' },
  { item: 'Neutral Blazer', why: 'Elevates any outfit instantly.', icon: '🧥' },
  { item: 'White Trainers', why: 'Works with 80% of your wardrobe.', icon: '👟' },
  { item: 'Black Trousers', why: 'The most versatile formal bottom.', icon: '👔' },
  { item: 'Simple Midi Dress', why: 'One piece = complete outfit.', icon: '👗' },
  { item: 'Quality Tote Bag', why: 'Day to evening, always appropriate.', icon: '👜' },
  { item: 'Block Heel Sandals', why: 'Comfortable and dress-up ready.', icon: '👡' },
];

function BeginnerSection({ onViewOutfits }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="beginner-section">

      {/* Hero banner */}
      <div className="beginner-hero">
        <div className="beginner-hero-text">
          <span className="beginner-eyebrow">Fashion for Everyone</span>
          <h2 className="beginner-title">Not Sure What to Wear?</h2>
          <p className="beginner-desc">
            Tell us your occasion and we'll show you exactly what to wear —
            step by step, piece by piece. No fashion experience needed.
          </p>
          <button className="beginner-cta" onClick={onViewOutfits}>
            Browse All Outfit Ideas →
          </button>
        </div>
        <div className="beginner-hero-icons">
          {OCCASIONS.slice(0, 4).map(o => (
            <div key={o.id} className="beginner-hero-icon-pill" style={{ background: o.bg, color: o.color }}>
              {o.icon} {o.title}
            </div>
          ))}
        </div>
      </div>

      {/* Occasion grid */}
      <div className="beginner-occ-header">
        <h3 className="beginner-occ-title">Pick Your Occasion</h3>
        <p className="beginner-occ-sub">Click any occasion to get a complete head-to-toe outfit guide</p>
      </div>

      <div className="beginner-occ-grid">
        {OCCASIONS.map(occ => (
          <button
            key={occ.id}
            className={`beginner-occ-card ${selected?.id === occ.id ? 'active' : ''}`}
            style={{ '--oc': occ.color, '--obg': occ.bg }}
            onClick={() => setSelected(selected?.id === occ.id ? null : occ)}
          >
            <span className="beginner-occ-icon">{occ.icon}</span>
            <span className="beginner-occ-name">{occ.title}</span>
            <span className="beginner-occ-level">{occ.level}</span>
          </button>
        ))}
      </div>

      {/* Expanded outfit guide */}
      {selected && (
        <div className="beginner-guide-panel" style={{ '--oc': selected.color, '--obg': selected.bg }}>
          <div className="beginner-guide-header">
            <div>
              <span className="beginner-guide-eyebrow">{selected.icon} {selected.level}</span>
              <h3 className="beginner-guide-title">What to Wear: {selected.title}</h3>
            </div>
            <button className="beginner-guide-close" onClick={() => setSelected(null)}>×</button>
          </div>

          <div className="beginner-steps">
            {selected.steps.map((s, i) => (
              <div key={i} className="beginner-step">
                <div className="beginner-step-num">{i + 1}</div>
                <div className="beginner-step-body">
                  <span className="beginner-step-label">{s.step}</span>
                  <span className="beginner-step-item">{s.item}</span>
                  <span className="beginner-step-tip">💡 {s.tip}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="beginner-rule">
            <span className="beginner-rule-label">Golden Rule</span>
            <p className="beginner-rule-text">"{selected.rule}"</p>
          </div>
        </div>
      )}

      {/* Capsule wardrobe */}
      <div className="beginner-capsule">
        <div className="beginner-capsule-header">
          <div>
            <h3 className="beginner-capsule-title">Your Starter Capsule Wardrobe</h3>
            <p className="beginner-capsule-sub">8 pieces that create 30+ outfits. Build this first.</p>
          </div>
        </div>
        <div className="beginner-capsule-grid">
          {CAPSULE.map((c, i) => (
            <div key={i} className="beginner-capsule-card">
              <span className="beginner-capsule-icon">{c.icon}</span>
              <span className="beginner-capsule-item">{c.item}</span>
              <span className="beginner-capsule-why">{c.why}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

BeginnerSection.propTypes = {
  onViewOutfits: PropTypes.func,
};

export default BeginnerSection;
