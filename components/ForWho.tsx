'use client';

import { useEffect, useRef } from 'react';

const PASTELS_RGB: [number, number, number][] = [
  [205, 232, 239], [210, 224, 202], [242, 216, 136], [232, 196, 192], [176, 189, 223],
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
      xPct: rng(), yPct: rng(), sz: 3 + rng() * 7,
      isSquare: rng() > 0.65, rot: (15 + rng() * 50) * Math.PI / 180,
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
      canvas.width = w * dpr; canvas.height = h * dpr;
    }
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const t = time / 1000;
    for (const p of pieces) {
      const x = p.xPct * w, y = p.yPct * h;
      const alpha = Math.max(0.04, p.baseAlpha + Math.sin(t * p.twinkleSpeed + p.twinkleOffset) * p.twinkleAmount);
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
      if (p.isSquare) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot);
        ctx.fillRect(-p.sz / 2, -p.sz / 2, p.sz, p.sz); ctx.restore();
      } else {
        ctx.beginPath(); ctx.arc(x, y, p.sz / 2, 0, Math.PI * 2); ctx.fill();
      }
    }
    animId = requestAnimationFrame(render);
  }
  animId = requestAnimationFrame(render);
  return () => cancelAnimationFrame(animId);
}

export default function ForWho() {
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!confettiRef.current) return;
    return createConfetti(confettiRef.current, { count: 40, seed: 31 });
  }, []);

  return (
    <div className="for-who">
      <canvas id="forWhoConfetti" ref={confettiRef} aria-hidden="true" />
      <div className="for-who-inner">
        <div className="section-label">For kids, parents &amp; guests</div>
        <h2 className="section-title">Making celebrations more fun for everyone</h2>
        <div className="for-split">
          <div className="for-card">
            <h3>For parents</h3>
            <ul className="for-list">
              <li>Takes 3 minutes to set up a play profile</li>
              <li>No picking specific products or managing a wish list</li>
              <li>Tell us what to skip — we&apos;ll handle the rest</li>
              <li>Custom to match your kid&apos;s party aesthetic</li>
              <li>Share one link in the group chat and you&apos;re done</li>
            </ul>
          </div>
          <div className="for-card">
            <h3>For gift givers</h3>
            <ul className="for-list">
              <li>Browse curated ideas, no guessing necessary</li>
              <li>See what&apos;s already been covered at a glance</li>
              <li>Buy wherever, online or the local toy shop</li>
              <li>Ensure your gift actually gets played with</li>
              <li>Feels thoughtful, not transactional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
