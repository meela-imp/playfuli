export default function BrandStrip() {
  const brands = ['LEGO', 'Lovevery', 'Melissa & Doug', 'Tonies', 'Hot Wheels', 'Nerf', 'Barbie', 'Fisher-Price', 'Crayola', 'Magna-Tiles', '& more'];

  return (
    <div className="brand-strip">
      <div className="brand-strip-eyebrow">Backed by the best in play</div>
      <div className="brand-track-wrap">
        <div className="brand-track">
          {[...brands, ...brands].map((name, i) => (
            <span key={i}>
              <span className="brand-name">{name}</span>
              <span className="brand-sep">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
