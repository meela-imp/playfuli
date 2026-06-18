export default function SocialProof() {
  return (
    <div className="social-proof">
      <div className="social-proof-header">
        <div className="section-label">What parents are saying</div>
        <h2 className="section-title">Playfuli is the life of the party</h2>
      </div>

      <div className="proof-grid">
        <div className="pq-card pq-1" style={{ background: 'var(--baby-blue)' }}>
          <p className="pq-quote">&ldquo;I sent the link in our family group chat and every single gift was something my daughter actually plays with. No returns this year.&rdquo;</p>
          <p className="pq-author">Sarah M. &nbsp;·&nbsp; Lila&apos;s Mom</p>
        </div>

        <div className="ps-card ps-1">
          <div className="ps-stat">100%</div>
          <div className="ps-label">more exciting than an envelope</div>
        </div>

        <div className="ps-card ps-2">
          <div className="ps-stat">0</div>
          <div className="ps-label">hours spent guessing what they&apos;re into</div>
        </div>

        <div className="pq-card pq-2" style={{ background: 'var(--dandelion)' }}>
          <p className="pq-quote">&ldquo;Brilliant idea. I used to spend way too much time guessing what my niece and nephew would like. Now I know they&apos;re getting something they&apos;ll actually use.&rdquo;</p>
          <p className="pq-author">James R. &nbsp;·&nbsp; Funcle</p>
        </div>

        <div className="pq-card pq-3" style={{ background: 'var(--sage)' }}>
          <p className="pq-quote">&ldquo;For kids, opening gifts is magical. When you&apos;re buying for a child you don&apos;t know well, you don&apos;t want to just hand them cash. I loved having real gift ideas that felt more personal.&rdquo;</p>
          <p className="pq-author">Priya K. &nbsp;·&nbsp; Mom of 3</p>
        </div>

        <div className="ps-card ps-3">
          <div className="ps-stat">10k+</div>
          <div className="ps-label">thoughtful gifts given</div>
        </div>

        <div className="ps-card ps-4">
          <div className="ps-stat">∞</div>
          <div className="ps-label">ways to make a kid feel seen</div>
        </div>

        <div className="pq-card pq-4" style={{ background: 'var(--rose)' }}>
          <p className="pq-quote">&ldquo;For the first time ever, it felt like people were buying gifts for our son — not just generic gifts for a 7-year-old boy.&rdquo;</p>
          <p className="pq-author">David L. &nbsp;·&nbsp; Max&apos;s Dad</p>
        </div>
      </div>
    </div>
  );
}
