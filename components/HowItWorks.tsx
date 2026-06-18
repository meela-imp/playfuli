export default function HowItWorks() {
  return (
    <div className="how-it-works" id="how-it-works">
      <div className="section-label">How it works</div>
      <h2 className="section-title">Three steps to better birthday gifts</h2>
      <p className="section-desc" style={{ whiteSpace: 'nowrap' }}>No registry. No guessing. Just a simple way to make sure every gift is a hit.</p>
      <div className="steps">
        <div className="step">
          <div className="step-number" style={{ background: 'var(--baby-blue)', color: 'var(--baby-blue-dark)' }}>1</div>
          <div className="step-icon">📋</div>
          <h3>Build a play profile</h3>
          <p>Tell us how your kid plays. Their interests, favorite characters, what they want, and what they already have too much of.</p>
        </div>
        <div className="step-connector">→</div>
        <div className="step">
          <div className="step-number" style={{ background: 'var(--dandelion)', color: 'var(--dandelion-dark)' }}>2</div>
          <div className="step-icon">🔗</div>
          <h3>Share your link</h3>
          <p>Drop the profile link in an invite or share with guests. They&apos;ll see a snapshot of your kid&apos;s favorite ways to play and curated gift ideas based on their personality.</p>
        </div>
        <div className="step-connector">→</div>
        <div className="step">
          <div className="step-number" style={{ background: 'var(--rose)', color: 'var(--rose-dark)' }}>3</div>
          <div className="step-icon">🎁</div>
          <h3>Guests pick &amp; claim</h3>
          <p>Friends and family can browse for inspiration, claim a unique idea, and find the easiest way to buy—whether they&apos;re shipping it or shopping local.</p>
        </div>
      </div>
    </div>
  );
}
