import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BeginnerSection.css';
import {
  BriefcaseIcon, HeartOutlineIcon, RingsIcon, SunIcon,
  MoonIcon, CoffeeIcon, GlobeIcon, ClipboardIcon,
  ShirtIcon, JeansIcon, JacketIcon, ShoeIcon,
  DressIcon, BagIcon, HeelIcon, TrousersIcon,
} from './icons';

const OCCASIONS = [
  {
    id: 'interview',
    Icon: BriefcaseIcon,
    title: 'Job Interview',
    level: 'Formal',
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
    Icon: HeartOutlineIcon,
    title: 'First Date',
    level: 'Smart Casual',
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
    Icon: RingsIcon,
    title: 'Wedding Guest',
    level: 'Smart to Formal',
    steps: [
      { step: 'Dress', item: 'Midi or maxi in a safe colour', tip: 'Dusty rose, sage green, navy — never white.' },
      { step: 'Shoes', item: 'Heeled sandals or court shoes', tip: "Wedges if there's grass." },
      { step: 'Bag', item: 'Small satin or embroidered clutch', tip: 'No daytime totes.' },
      { step: 'Cover-up', item: 'Chiffon wrap or tailored jacket', tip: 'Needed for places of worship.' },
      { step: 'Hair', item: 'Up or half-up style', tip: 'Shows your outfit and stays neat all day.' },
    ],
    rule: 'Check the dress code. Garden Party, Black Tie, and Smart Casual all mean very different things.',
  },
  {
    id: 'casual',
    Icon: SunIcon,
    title: 'Casual Day Out',
    level: 'Casual',
    steps: [
      { step: 'Base', item: 'Clean, well-fitted jeans (dark wash)', tip: 'No rips, no logos for versatility.' },
      { step: 'Top', item: 'Plain tee, subtle stripe, or neat polo', tip: 'Tucked in = smarter, untucked = relaxed.' },
      { step: 'Shoes', item: 'White leather trainers or loafers', tip: 'Elevates jeans instantly.' },
      { step: 'Layer', item: 'Knit cardigan or unstructured blazer', tip: 'Easy to tie around your waist if warm.' },
      { step: 'Accessories', item: 'Watch + belt in matching tones', tip: 'Matching metals keep it cohesive.' },
    ],
    rule: "Smart casual: no logo tees, no athletic wear, no sandals unless it's beach weather.",
  },
  {
    id: 'nightout',
    Icon: MoonIcon,
    title: 'Night Out',
    level: 'Evening',
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
    Icon: CoffeeIcon,
    title: 'Brunch / Lunch',
    level: 'Casual to Smart',
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
    Icon: GlobeIcon,
    title: 'African Cultural Event',
    level: 'Traditional to Formal',
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
    Icon: ClipboardIcon,
    title: 'Everyday Work',
    level: 'Business Casual',
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
  { item: 'White T-Shirt',       why: 'Pairs with everything. Your most-worn item.',     Icon: ShirtIcon },
  { item: 'Dark Straight Jeans', why: 'Casual to smart casual in seconds.',               Icon: JeansIcon },
  { item: 'Neutral Blazer',      why: 'Elevates any outfit instantly.',                   Icon: JacketIcon },
  { item: 'White Trainers',      why: 'Works with 80% of your wardrobe.',                 Icon: ShoeIcon },
  { item: 'Black Trousers',      why: 'The most versatile formal bottom.',                Icon: TrousersIcon },
  { item: 'Simple Midi Dress',   why: 'One piece = complete outfit.',                     Icon: DressIcon },
  { item: 'Quality Tote Bag',    why: 'Day to evening, always appropriate.',              Icon: BagIcon },
  { item: 'Block Heel Sandals',  why: 'Comfortable and dress-up ready.',                  Icon: HeelIcon },
];

/* Inline tip icon — small lightbulb SVG */
const TipIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

function BeginnerSection({ onViewOutfits }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="beginner-section">

      {/* Hero */}
      <div className="beginner-hero">
        <div className="beginner-hero-text">
          <span className="beginner-eyebrow">Fashion for Everyone</span>
          <h2 className="beginner-title">Not Sure What to Wear?</h2>
          <p className="beginner-desc">
            Pick your occasion and get a complete head-to-toe outfit guide —
            step by step, piece by piece. No fashion knowledge needed.
          </p>
          <button className="beginner-cta" onClick={onViewOutfits}>
            Browse All Outfit Ideas →
          </button>
        </div>
        <div className="beginner-hero-pills">
          {OCCASIONS.slice(0, 4).map(o => (
            <div key={o.id} className="beginner-hero-pill">
              <span className="beginner-hero-pill-icon"><o.Icon size={16} /></span>
              {o.title}
            </div>
          ))}
        </div>
      </div>

      {/* Occasion grid */}
      <div className="beginner-occ-header">
        <h3 className="beginner-occ-title">Pick Your Occasion</h3>
        <p className="beginner-occ-sub">Click any tile to get a complete outfit guide</p>
      </div>

      <div className="beginner-occ-grid">
        {OCCASIONS.map(occ => (
          <button
            key={occ.id}
            className={`beginner-occ-card ${selected?.id === occ.id ? 'active' : ''}`}
            onClick={() => setSelected(selected?.id === occ.id ? null : occ)}
          >
            <span className="beginner-occ-icon"><occ.Icon size={24} /></span>
            <span className="beginner-occ-name">{occ.title}</span>
            <span className="beginner-occ-level">{occ.level}</span>
          </button>
        ))}
      </div>

      {/* Expanded guide panel */}
      {selected && (
        <div className="beginner-guide-panel">
          <div className="beginner-guide-header">
            <div className="beginner-guide-header-icon"><selected.Icon size={20} /></div>
            <div>
              <span className="beginner-guide-level">{selected.level}</span>
              <h3 className="beginner-guide-title">What to Wear: {selected.title}</h3>
            </div>
            <button className="beginner-guide-close" onClick={() => setSelected(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="beginner-steps">
            {selected.steps.map((s, i) => (
              <div key={i} className="beginner-step">
                <div className="beginner-step-num">{i + 1}</div>
                <div className="beginner-step-body">
                  <span className="beginner-step-label">{s.step}</span>
                  <span className="beginner-step-item">{s.item}</span>
                  <span className="beginner-step-tip">
                    <TipIcon /> {s.tip}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="beginner-rule">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="beginner-rule-icon">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="beginner-rule-text">"{selected.rule}"</p>
          </div>
        </div>
      )}

      {/* Capsule wardrobe */}
      <div className="beginner-capsule">
        <div className="beginner-capsule-header">
          <h3 className="beginner-capsule-title">Your Starter Capsule Wardrobe</h3>
          <p className="beginner-capsule-sub">8 pieces that create 30+ outfits. Build this first.</p>
        </div>
        <div className="beginner-capsule-grid">
          {CAPSULE.map((c, i) => (
            <div key={i} className="beginner-capsule-card">
              <span className="beginner-capsule-icon"><c.Icon size={26} /></span>
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
