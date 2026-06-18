'use client';


export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col-brand">
          <div className="footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/playfuli-logo-white.svg" alt="Playfuli" style={{ height: 30, width: 'auto', display: 'block' }} />
          </div>
          <p className="footer-tagline">Where great gifts come from.</p>
          <form className="footer-email-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footerEmail" className="sr-only">Email address</label>
            <input id="footerEmail" type="email" placeholder="Your email" />
            <button type="submit" aria-label="Subscribe to updates">→</button>
          </form>
          <div className="footer-legal">
            <a href="/terms">Terms of Service</a> · <a href="/privacy">Privacy Policy</a><br />
            © 2026 Playfuli. All rights reserved.
          </div>
        </div>

        <div className="footer-col">
          <h4>How it Works</h4>
          <ul>
            <li><a href="/app">For Parents</a></li>
            <li><a href="/gift-givers">For Gift Givers</a></li>
            <li><a href="/plus">Playfuli Plus</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Join the Party</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/refer">Refer a friend</a></li>
            <li><a href="/partners">Partner with us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Parents &amp; Kids</h4>
          <ul>
            <li><a href="/blog/gift-guides">Gift Guides</a></li>
            <li><a href="/blog/play-ideas">Play Ideas</a></li>
            <li><a href="/blog/party-planning">Birthday Planning</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="/press">Press</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact us</a></li>
          </ul>
          <div className="footer-social-icons">
            <a href="#" className="footer-social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="#" className="footer-social-icon" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.71a8.28 8.28 0 004.84 1.54V6.79a4.85 4.85 0 01-1.07-.1z" /></svg>
            </a>
            <a href="#" className="footer-social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Playfuli · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a>
      </div>
    </footer>
  );
}
