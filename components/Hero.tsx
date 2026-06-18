'use client';

import { useEffect, useRef } from 'react';

const PASTELS_RGB: [number, number, number][] = [
  [205, 232, 239],
  [210, 224, 202],
  [242, 216, 136],
  [232, 196, 192],
  [176, 189, 223],
];

function seedRng(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function createConfetti(canvas: HTMLCanvasElement, { count = 50, seed = 1 } = {}) {
  const rng = seedRng(seed);
  const pieces = Array.from({ length: count }, () => {
    const c = PASTELS_RGB[Math.floor(rng() * PASTELS_RGB.length)];
    return {
      xPct: rng(), yPct: rng(),
      sz: 3 + rng() * 7,
      isSquare: rng() > 0.65,
      rot: (15 + rng() * 50) * Math.PI / 180,
      r: c[0], g: c[1], b: c[2],
      baseAlpha: 0.18 + rng() * 0.18,
      twinkleSpeed: 0.5 + rng() * 1.5,
      twinkleOffset: rng() * Math.PI * 2,
      twinkleAmount: 0.08 + rng() * 0.12,
    };
  });

  let animId: number;
  function render(time: number) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const t = time / 1000;
    for (const p of pieces) {
      const x = p.xPct * w, y = p.yPct * h;
      const twinkle = Math.sin(t * p.twinkleSpeed + p.twinkleOffset) * p.twinkleAmount;
      const alpha = Math.max(0.04, p.baseAlpha + twinkle);
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
      if (p.isSquare) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.rot);
        ctx.fillRect(-p.sz / 2, -p.sz / 2, p.sz, p.sz);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, p.sz / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    animId = requestAnimationFrame(render);
  }
  animId = requestAnimationFrame(render);
  return () => cancelAnimationFrame(animId);
}

export default function Hero() {
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Confetti
    let stopConfetti: (() => void) | undefined;
    if (confettiRef.current) {
      stopConfetti = createConfetti(confettiRef.current, { count: 60, seed: 7 });
    }

    // Chip pop animation
    const chips = document.querySelectorAll('.si-chip');
    chips.forEach((chip, i) => {
      setTimeout(() => chip.classList.add('popped'), 200 + i * 100);
    });

    // Typing animation for slide 1
    const typeTarget = "She's an explorer who loves pretend play and getting her hands dirty. No glitter or slime please!";
    const typingEl = document.getElementById('siTypingText');
    let typingTimer: ReturnType<typeof setInterval>;
    let i = 0;
    if (typingEl) {
      typingTimer = setInterval(() => {
        if (i < typeTarget.length) {
          typingEl.textContent = typeTarget.slice(0, ++i);
        } else {
          clearInterval(typingTimer);
          setTimeout(() => {
            const btn = document.getElementById('siContinueBtn');
            btn?.classList.add('btn-clicking');
            setTimeout(() => btn?.classList.remove('btn-clicking'), 300);
          }, 300);
        }
      }, 36);
    }

    // Slide rotation
    const slides = [slide1Ref.current, slide2Ref.current, slide3Ref.current];
    let current = 0;
    const HOLD = 4200;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function goToSlide(idx: number) {
      slides.forEach((s, j) => s?.classList.toggle('active', j === idx));
    }

    function scheduleNext() {
      timers.push(setTimeout(() => {
        current = (current + 1) % slides.length;
        goToSlide(current);

        if (current === 1) {
          timers.push(setTimeout(() => {
            const btn = document.getElementById('claimBtn1');
            if (!btn) return;
            btn.classList.add('btn-clicking');
            setTimeout(() => {
              btn.classList.remove('btn-clicking');
              btn.classList.add('btn-claimed');
              btn.textContent = 'Claimed ✓';
            }, 260);
          }, 1400));
        }

        if (current === 2) {
          timers.push(setTimeout(() => {
            const copy = document.querySelector('.ss-copy-btn') as HTMLElement;
            if (!copy) return;
            copy.classList.add('btn-clicking');
            setTimeout(() => {
              copy.classList.remove('btn-clicking');
              copy.classList.add('btn-copied');
              copy.textContent = 'Copied ✓';
            }, 240);
          }, 650));
          timers.push(setTimeout(() => document.getElementById('ssNotif2')?.classList.add('visible'), 1700));
          timers.push(setTimeout(() => document.getElementById('ssNotif3')?.classList.add('visible'), 2800));
        }

        scheduleNext();
      }, HOLD));
    }

    scheduleNext();

    return () => {
      stopConfetti?.();
      clearInterval(typingTimer);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="hero">
      <canvas id="heroConfetti" ref={confettiRef} aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-text">
          <h1>Where great gifts<br />come from</h1>
          <p className="subhead">Create a profile for your kid and share it with party guests — so every gift is something they&apos;ll actually play with.</p>
          <div className="cta-row">
            <a href="/app" className="btn-primary">Create a Play Profile</a>
            <a href="#how-it-works" className="btn-secondary">See how it works →</a>
          </div>
        </div>

        <div className="hero-anim-wrap" aria-hidden="true">
          {/* Slide 1: Intake */}
          <div className="hero-slide active" id="heroSlide1" ref={slide1Ref}>
            <div className="slide-topbar">
              <div className="slide-dots">
                <span className="slide-dot on"></span>
                <span className="slide-dot"></span>
                <span className="slide-dot"></span>
              </div>
              <span className="slide-step-lbl">Step 1 of 3 · Build a profile</span>
            </div>
            <div className="slide-intake-body">
              <div className="si-question">Tell us about Emma 🎂</div>
              <div className="si-sub">What does she love to play?</div>
              <div className="si-chips">
                <span className="si-chip" style={{ background: 'var(--baby-blue)', color: 'var(--baby-blue-dark)' }}>🌳 Outdoor Play</span>
                <span className="si-chip" style={{ background: 'var(--sage)', color: 'var(--sage-dark)' }}>🔧 Building</span>
                <span className="si-chip" style={{ background: 'var(--rose)', color: 'var(--rose-dark)' }}>👑 Dress Up</span>
                <span className="si-chip" style={{ background: 'var(--dandelion)', color: 'var(--dandelion-dark)' }}>🦖 Dinosaurs</span>
                <span className="si-chip" style={{ background: '#E8E0F0', color: '#5A3A7A' }}>🎨 Art &amp; Crafts</span>
                <span className="si-chip" style={{ background: '#F0E8D0', color: '#6A4A10' }}>🎵 Music</span>
              </div>
              <div className="si-field-wrap">
                <div className="si-field-lbl">In Emma&apos;s own words...</div>
                <div className="si-field-text"><span id="siTypingText"></span><span className="si-cursor"></span></div>
              </div>
              <div className="si-continue" id="siContinueBtn">Continue →</div>
            </div>
          </div>

          {/* Slide 2: Profile */}
          <div className="hero-slide" id="heroSlide2" ref={slide2Ref}>
            <div className="sp-topbar-extra">
              <div className="slide-dots">
                <span className="slide-dot"></span>
                <span className="slide-dot on"></span>
                <span className="slide-dot"></span>
              </div>
              <button className="sp-share-btn">Share profile →</button>
            </div>
            <div className="sp-body">
              <div className="mock-top">
                <div className="mock-accent"></div>
                <div className="mock-body">
                  <div className="mock-header">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="mock-avatar" src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=140&h=140&fit=crop&crop=face" alt="Emma" />
                    <div>
                      <div className="mock-name">Emma&apos;s Play Profile</div>
                      <div className="mock-label">Turning 4 · April 12 · Brooklyn, NY</div>
                    </div>
                  </div>
                  <div className="mock-play-desc">&ldquo;Emma is a hands-on explorer with a big imagination and a flair for the dramatic.&rdquo;</div>
                  <div className="mock-pills">
                    <span className="mock-pill" style={{ background: 'var(--baby-blue)', color: 'var(--baby-blue-dark)' }}>🌳 Outdoor Play</span>
                    <span className="mock-pill" style={{ background: 'var(--sage)', color: 'var(--sage-dark)' }}>🔧 Building</span>
                    <span className="mock-pill" style={{ background: 'var(--rose)', color: 'var(--rose-dark)' }}>👑 Dress Up</span>
                    <span className="mock-pill" style={{ background: 'var(--dandelion)', color: 'var(--dandelion-dark)' }}>🦖 Dinosaurs</span>
                  </div>
                  <div className="mock-gifts">
                    <div className="mock-gift">
                      <div className="mock-gift-swatch" style={{ background: 'var(--baby-blue)' }}></div>
                      <div className="mock-gift-emoji">🪁</div>
                      <div className="mock-gift-name">Rainbow Kite</div>
                      <div className="mock-gift-price">$18</div>
                      <button className="mock-claim" id="claimBtn1">Claim this gift</button>
                    </div>
                    <div className="mock-gift">
                      <div className="mock-gift-swatch" style={{ background: 'var(--sage)' }}></div>
                      <div className="mock-gift-emoji">🧲</div>
                      <div className="mock-gift-name">Magna-Tiles</div>
                      <div className="mock-gift-price">$48</div>
                      <button className="mock-claim">Claim this gift</button>
                    </div>
                    <div className="mock-gift">
                      <div className="mock-gift-swatch" style={{ background: 'var(--rose)' }}></div>
                      <div className="mock-gift-emoji">👸</div>
                      <div className="mock-gift-name">Velvet Cape</div>
                      <div className="mock-gift-price">$28</div>
                      <button className="mock-claim">Claim this gift</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: Share */}
          <div className="hero-slide" id="heroSlide3" ref={slide3Ref}>
            <div className="slide-topbar">
              <div className="slide-dots">
                <span className="slide-dot"></span>
                <span className="slide-dot"></span>
                <span className="slide-dot on"></span>
              </div>
              <span className="slide-step-lbl">Step 3 · Share &amp; celebrate</span>
            </div>
            <div className="slide-share-body">
              <div className="ss-success">
                <div className="ss-success-icon">🎉</div>
                <div>
                  <div className="ss-success-text">Emma&apos;s profile is ready!</div>
                  <div className="ss-success-sub">Drop the link anywhere — your guests are set.</div>
                </div>
              </div>
              <div className="ss-link-row">
                <span className="ss-link-url">playfuli.com/emma-b-day</span>
                <button className="ss-copy-btn">Copy link</button>
              </div>
              <div className="ss-channels">
                <div className="ss-ch">📱 iMessage</div>
                <div className="ss-ch">💬 WhatsApp</div>
                <div className="ss-ch">📧 Email</div>
              </div>
              <div className="ss-activity-label">Live activity</div>
              <div className="ss-viewers">
                <div className="ss-avatar">JS</div>
                <div className="ss-avatar">MR</div>
                <div className="ss-avatar">PK</div>
                <div className="ss-avatar">+4</div>
                <span className="ss-viewer-lbl">7 guests viewing</span>
              </div>
              <div className="ss-notif" id="ssNotif1">
                <span className="ss-notif-icon">🎁</span>
                <span className="ss-notif-text">Sara just claimed <strong>Magna-Tiles</strong> for Emma!</span>
              </div>
              <div className="ss-notif ss-notif-extra" id="ssNotif2">
                <span className="ss-notif-icon">🎁</span>
                <span className="ss-notif-text">Jake just claimed <strong>Rainbow Kite</strong> for Emma!</span>
              </div>
              <div className="ss-notif ss-notif-extra" id="ssNotif3">
                <span className="ss-notif-icon">🎁</span>
                <span className="ss-notif-text">Priya just claimed <strong>Velvet Cape</strong> for Emma!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
