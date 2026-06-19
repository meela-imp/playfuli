type CarouselItem = {
  name: string;
  price?: number;
  link?: string;
  badge?: string;
  imageUrl?: string;
};

type Props = {
  value: {
    carousel?: {
      title?: string;
      items?: CarouselItem[];
    };
  };
};

export default function CarouselBlock({ value }: Props) {
  const { carousel } = value;
  if (!carousel?.items?.length) return null;

  return (
    <div style={{
      margin: '40px -24px',
      padding: '32px 24px',
      background: '#FAFBFD',
      borderTop: '1.5px solid #eef0f3',
      borderBottom: '1.5px solid #eef0f3',
    }}>
      {carousel.title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: '#B0BDDF', fontFamily: 'var(--font-nunito)',
          }}>
            Shop the guide
          </span>
          <span style={{ flex: 1, height: 1, background: '#eef0f3' }} />
          <span style={{
            fontSize: 14, fontWeight: 600, color: '#084B6D', fontFamily: 'var(--font-fredoka)',
          }}>
            {carousel.title}
          </span>
        </div>
      )}

      <div style={{
        display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 8,
        scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
      }}>
        {carousel.items.map((item, i) => (
          <a
            key={i}
            href={item.link ?? '#'}
            target={item.link ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{
              minWidth: 180, maxWidth: 180, borderRadius: 14, overflow: 'hidden',
              background: '#fff', border: '1.5px solid #eef0f3', textDecoration: 'none',
              display: 'flex', flexDirection: 'column', flexShrink: 0,
              scrollSnapAlign: 'start', transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(8,75,109,0.10)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
          >
            {/* Image */}
            <div style={{
              height: 160, background: '#CDE8EF', display: 'flex',
              alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0,
            }}>
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: 40 }}>🛍️</span>
              )}
              {item.badge && (
                <span style={{
                  position: 'absolute', top: 10, left: 10,
                  background: '#084B6D', color: '#fff',
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.5px',
                  padding: '3px 9px', borderRadius: 99,
                  fontFamily: 'var(--font-nunito)',
                }}>
                  {item.badge}
                </span>
              )}
            </div>

            {/* Body */}
            <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-fredoka)', fontSize: 15, fontWeight: 600,
                color: '#084B6D', lineHeight: 1.25, marginBottom: 6, flex: 1,
              }}>
                {item.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                {item.price != null && (
                  <span style={{
                    fontFamily: 'var(--font-nunito)', fontSize: 14, fontWeight: 700, color: '#B0BDDF',
                  }}>
                    ${item.price.toFixed(2)}
                  </span>
                )}
                <span style={{
                  fontFamily: 'var(--font-nunito)', fontSize: 12, fontWeight: 800,
                  color: '#084B6D', marginLeft: 'auto',
                }}>
                  Shop →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
