const PROPS = [
  { icon: '✨', title: 'A profile, not a registry', desc: "The play profile captures who your kid is — how they play, what they love. And it grows with them, birthday to birthday." },
  { icon: '🧠', title: 'AI-powered curation', desc: "We generate unique gift ideas based on your kid's actual play style. It's inspired, not just another algorithm." },
  { icon: '📸', title: 'Snap a photo, we do the rest', desc: "Upload a photo of the playroom and our AI figures out what they already own. Less work for you, better gifts for them." },
  { icon: '💡', title: 'Give gift guidance', desc: "Tell us what to skip and we'll make sure guests know, gently. No awkward conversations or returns." },
  { icon: '🚫', title: 'No more duplicates', desc: "We tell guests what's been bought so you don't end up with three of the same toy, but keep the surprise intact." },
  { icon: '🎨', title: 'Custom themes', desc: "Match the profile to your kid's party or personality. Dinosaurs, rainbows, outer space, and more." },
  { icon: '🛍️', title: 'Shop any way you like', desc: "Every gift shows delivery estimates and nearby toy shops — so guests can ship it in time or pick it up around the corner." },
  { icon: '✉️', title: 'Gift tracker & thank yous', desc: "See who gave what, add notes, and send personalised thank you notes without the pen-and-paper guilt trip." },
  { icon: '🐷', title: 'Fun features', desc: "Little details add a spark, like our piggy bank. Guests can add a dollar so your child gets to pick a gift, too." },
];

export default function ValueProps() {
  return (
    <div className="value-props">
      <div className="props-header">
        <div className="section-label">Why Playfuli</div>
        <h2 className="section-title">Thoughtful gifting, made fun</h2>
        <p className="section-desc">We traded the transactional registry for a personality-first profile built around how your child actually plays.</p>
      </div>
      <div className="props-grid">
        {PROPS.map((p) => (
          <div className="prop-card" key={p.title}>
            <span className="prop-icon">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
