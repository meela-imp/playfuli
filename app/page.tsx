'use client';

export default function ComingSoon() {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/playfuli-logo-blue.svg" alt="Playfuli" className="coming-soon-logo" />
        <h1>Something magical is coming.</h1>
        <p>We&apos;re putting the finishing touches on a better way to give birthday gifts. Drop your email and we&apos;ll let you know when we&apos;re ready.</p>
        <form className="coming-soon-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="your@email.com" />
          <button type="submit">Notify me</button>
        </form>
        <p className="coming-soon-tagline">Skip the guesswork. Keep the magic.</p>
      </div>
    </div>
  );
}
