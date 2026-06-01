import React from 'react';

const icon = (paths, opts = {}) => {
  const { size = 20, stroke = 'currentColor', fill = 'none', sw = 1.5 } = opts;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
      stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  );
};

export const BriefcaseIcon = ({ size = 20 }) => icon(
  <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></>,
  { size }
);

export const HeartOutlineIcon = ({ size = 20 }) => icon(
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  { size }
);

export const RingsIcon = ({ size = 20 }) => icon(
  <><circle cx="8" cy="12" r="4"/><circle cx="16" cy="12" r="4"/><path d="M12 12h.01"/></>,
  { size }
);

export const SunIcon = ({ size = 20 }) => icon(
  <><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/></>,
  { size }
);

export const MoonIcon = ({ size = 20 }) => icon(
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
  { size }
);

export const CoffeeIcon = ({ size = 20 }) => icon(
  <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>,
  { size }
);

export const GlobeIcon = ({ size = 20 }) => icon(
  <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  { size }
);

export const ClipboardIcon = ({ size = 20 }) => icon(
  <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></>,
  { size }
);

export const ShirtIcon = ({ size = 20 }) => icon(
  <><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></>,
  { size }
);

export const JeansIcon = ({ size = 20 }) => icon(
  <><path d="M3 3h7l1 9 1-9h7l-2 18H5L3 3z"/><line x1="10" y1="3" x2="10" y2="12"/><line x1="14" y1="3" x2="14" y2="12"/></>,
  { size }
);

export const JacketIcon = ({ size = 20 }) => icon(
  <><path d="M5 3l-2 5v13h18V8l-2-5"/><path d="M5 3l4 4 3-4 3 4 4-4"/><line x1="12" y1="7" x2="12" y2="21"/></>,
  { size }
);

export const ShoeIcon = ({ size = 20 }) => icon(
  <><path d="M2 16s1-1 4-1 5 2 8 2 4-1 4-1v2s-1 1-4 1-5-2-8-2-4 1-4 1v-2z"/><path d="M2 16V9l6-6 4 3-3 3 3 3"/></>,
  { size }
);

export const DressIcon = ({ size = 20 }) => icon(
  <><path d="M12 2l3 6-3 2-3-2 3-6z"/><path d="M9 8l-5 13h16L15 8"/></>,
  { size }
);

export const BagIcon = ({ size = 20 }) => icon(
  <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>,
  { size }
);

export const HeelIcon = ({ size = 20 }) => icon(
  <><path d="M2 20h14l4-10H8L4 4H2"/><path d="M16 20l4-10"/></>,
  { size }
);

export const TrousersIcon = ({ size = 20 }) => icon(
  <><path d="M4 3h16v7l-4 11H4L8 10V3z"/><line x1="12" y1="3" x2="12" y2="10"/></>,
  { size }
);

// Learning hub category icons
export const CultureIcon = ({ size = 18 }) => icon(
  <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  { size }
);

export const SparkleIcon = ({ size = 18 }) => icon(
  <><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></>,
  { size }
);

export const TrendIcon = ({ size = 18 }) => icon(
  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  { size }
);

export const BookIcon = ({ size = 18 }) => icon(
  <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  { size }
);

export const OutfitHelpIcon = ({ size = 18 }) => icon(
  <><path d="M12 2l3 6-3 2-3-2 3-6z"/><path d="M9 8l-5 13h16L15 8"/></>,
  { size }
);

export const QuizIcon = ({ size = 18 }) => icon(
  <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  { size }
);

export const EyeIcon = ({ size = 13 }) => icon(
  <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  { size }
);

export const HeartIcon = ({ size = 13 }) => icon(
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  { size }
);

export const ClockIcon = ({ size = 12 }) => icon(
  <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  { size }
);

export const BackIcon = ({ size = 14 }) => icon(
  <polyline points="15 18 9 12 15 6"/>,
  { size }
);
