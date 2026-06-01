import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './StyleQuiz.css';

const QUESTIONS = [
  {
    id: 1,
    question: 'Where would you most like to spend a Saturday?',
    options: [
      { text: 'A street market in Accra or Lagos', scores: { african: 3, fusion: 1 } },
      { text: 'A rooftop gallery in New York or London', scores: { western: 3 } },
      { text: 'A temple garden in Kyoto or Seoul', scores: { asian: 3 } },
      { text: 'A farmers\' market in the countryside', scores: { fusion: 3, western: 1 } },
    ],
  },
  {
    id: 2,
    question: 'Which fabric appeals to you most?',
    options: [
      { text: 'Vibrant Ankara wax print', scores: { african: 3 } },
      { text: 'Crisp tailored wool', scores: { western: 3 } },
      { text: 'Delicate silk or satin', scores: { asian: 3 } },
      { text: 'Natural linen or organic cotton', scores: { fusion: 3 } },
    ],
  },
  {
    id: 3,
    question: 'Your go-to colour palette is…',
    options: [
      { text: 'Bold, warm — golds, reds, deep greens', scores: { african: 3, fusion: 1 } },
      { text: 'Neutral — black, white, camel, navy', scores: { western: 3 } },
      { text: 'Elegant — jade, crimson, ivory', scores: { asian: 3 } },
      { text: 'Earth tones — terracotta, sage, sand', scores: { fusion: 3, western: 1 } },
    ],
  },
  {
    id: 4,
    question: 'For a formal occasion you reach for…',
    options: [
      { text: 'A Kente drape or embroidered Agbada', scores: { african: 3 } },
      { text: 'A sharp tailored suit or evening gown', scores: { western: 3 } },
      { text: 'A Qipao, Hanbok, or kimono-inspired look', scores: { asian: 3 } },
      { text: 'Something handmade with natural dyes', scores: { fusion: 3 } },
    ],
  },
  {
    id: 5,
    question: 'Which fashion icon inspires you most?',
    options: [
      { text: 'A Lagos designer at Africa Fashion Week', scores: { african: 3 } },
      { text: 'A Parisian or NYC fashion week star', scores: { western: 3 } },
      { text: 'A Seoul or Tokyo street style icon', scores: { asian: 3 } },
      { text: 'A sustainable brand founder', scores: { fusion: 3 } },
    ],
  },
];

const RESULTS = {
  african: {
    title: 'African Heritage',
    subtitle: 'Bold · Vibrant · Cultural',
    description: 'You are drawn to rich cultural traditions, bold prints, and garments that tell a story. Your style is rooted in heritage and celebrates community, ceremony, and craftsmanship. Kente, Ankara, Agbada, and Gele speak to your soul.',
    color: '#e67e22',
    bg: '#fff4e6',
    image: '/images/african/ankara-dress-vibrant.jpg',
    cta: 'Explore African Fashion',
    culture: 'African',
  },
  western: {
    title: 'Western Classic',
    subtitle: 'Tailored · Refined · Timeless',
    description: 'You gravitate toward clean lines, sharp tailoring, and enduring silhouettes. Your wardrobe is built on quality basics elevated with precise cuts. You understand that true style is effortless.',
    color: '#2980b9',
    bg: '#eaf4fb',
    image: '/images/western/blazer-white.jpg',
    cta: 'Shop Western Fashion',
    culture: 'Western',
  },
  asian: {
    title: 'Asian Aesthetic',
    subtitle: 'Minimal · Elegant · Crafted',
    description: 'You are inspired by centuries of craft tradition — the flowing grace of a Qipao, the sculptural beauty of a Hanbok, the meditative simplicity of Japanese minimalism. Your style is intentional and deeply considered.',
    color: '#8e44ad',
    bg: '#f5eefb',
    image: '/images/asian/cheongsam-festival.jpg',
    cta: 'Explore Asian Fashion',
    culture: 'Asian',
  },
  fusion: {
    title: 'Eco Fusion',
    subtitle: 'Conscious · Global · Natural',
    description: 'You believe fashion should be kind to the planet and inspired by the whole world. Natural fabrics, ethical production, and cross-cultural silhouettes define your wardrobe. You dress with purpose.',
    color: '#27ae60',
    bg: '#eafaf1',
    image: '/images/fusion/boho-patterned.jpg',
    cta: 'Shop Eco Fusion',
    culture: 'Fusion',
  },
};

function StyleQuiz({ onShopCulture }) {
  const [step, setStep] = useState(0); // 0 = intro
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const current = QUESTIONS[step - 1];

  const handleAnswer = (scores) => {
    const updated = { ...answers };
    Object.entries(scores).forEach(([k, v]) => {
      updated[k] = (updated[k] || 0) + v;
    });
    setAnswers(updated);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const top = Object.entries(updated).sort((a, b) => b[1] - a[1])[0][0];
      setResult(RESULTS[top]);
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResult(null); };

  const progress = step === 0 ? 0 : Math.round((step / QUESTIONS.length) * 100);

  /* ── Intro screen ── */
  if (step === 0) {
    return (
      <div className="quiz-wrap">
        <div className="quiz-intro">
          <span className="quiz-eyebrow">Style Discovery</span>
          <h2 className="quiz-intro-title">What's Your Fashion Identity?</h2>
          <p className="quiz-intro-desc">
            Answer 5 quick questions and we'll match you to your fashion culture —
            and the styles, guides, and products that suit you best.
          </p>
          <div className="quiz-cultures">
            {Object.values(RESULTS).map(r => (
              <span key={r.culture} className="quiz-culture-chip" style={{ background: r.bg, color: r.color }}>
                {r.title}
              </span>
            ))}
          </div>
          <button className="quiz-start-btn" onClick={() => setStep(1)}>
            Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  /* ── Result screen ── */
  if (result) {
    return (
      <div className="quiz-wrap">
        <div className="quiz-result">
          <div className="quiz-result-img" style={{ backgroundImage: `url(${result.image})` }}>
            <div className="quiz-result-overlay" />
            <div className="quiz-result-badge" style={{ background: result.color }}>
              Your Style
            </div>
          </div>
          <div className="quiz-result-body" style={{ '--rc': result.color, '--rbg': result.bg }}>
            <span className="quiz-result-eyebrow">Your Fashion Identity</span>
            <h2 className="quiz-result-title">{result.title}</h2>
            <span className="quiz-result-subtitle">{result.subtitle}</span>
            <p className="quiz-result-desc">{result.description}</p>
            <div className="quiz-result-actions">
              <button
                className="quiz-shop-btn"
                style={{ background: result.color }}
                onClick={() => onShopCulture && onShopCulture(result.culture)}
              >
                {result.cta} →
              </button>
              <button className="quiz-retake-btn" onClick={reset}>
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Question screen ── */
  return (
    <div className="quiz-wrap">
      <div className="quiz-card">
        {/* Progress */}
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-step-label">Question {step} of {QUESTIONS.length}</div>

        <h3 className="quiz-question">{current.question}</h3>

        <div className="quiz-options">
          {current.options.map((opt, i) => (
            <button
              key={i}
              className="quiz-option"
              onClick={() => handleAnswer(opt.scores)}
            >
              <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
              {opt.text}
            </button>
          ))}
        </div>

        <button className="quiz-back-link" onClick={() => step > 1 ? setStep(step - 1) : reset()}>
          ← {step > 1 ? 'Previous question' : 'Back to intro'}
        </button>
      </div>
    </div>
  );
}

StyleQuiz.propTypes = {
  onShopCulture: PropTypes.func,
};

export default StyleQuiz;
