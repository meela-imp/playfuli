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

export default function FinalCta() {
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!confettiRef.current) return;
    return createConfetti(confettiRef.current, { count: 45, seed: 19 });
  }, []);

  return (
    <div className="final-cta">
      <canvas id="ctaConfetti" ref={confettiRef} aria-hidden="true" />
      <div className="final-cta-inner">
        <div className="final-cta-eyebrow">Get started</div>
        <h2>Make gifting easy for everyone.</h2>
        <p>Give your friends and family a window into your child&apos;s world with a 5-minute play profile.</p>
        <a href="/app" className="btn-primary">Create a Play Profile</a>
        <div className="final-cta-trust">Free to use · No credit card required</div>
      </div>
    </div>
  );
}
