import { Component } from '../core/Component.js';
import { icon } from '../utils/icons.js';

export class Footer extends Component {
  render() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <div class="footer__brand-name">Reelease AI</div>
              <p class="footer__brand-desc">
                The AI-powered platform for creators and businesses
                to build, publish and grow.
              </p>
              <div class="footer__socials">
                <a href="#" class="footer__social-btn" aria-label="Facebook">f</a>
                <a href="#" class="footer__social-btn" aria-label="Twitter">${icon('twitter', 16, 'currentColor')}</a>
                <a href="#" class="footer__social-btn" aria-label="Instagram">${icon('instagram', 16, 'currentColor')}</a>
                <a href="#" class="footer__social-btn" aria-label="LinkedIn">in</a>
              </div>
            </div>

            <div class="footer__col">
              <h4>Platform</h4>
              <nav class="footer__links">
                <a href="#features">Features</a>
                <a href="#social">Social</a>
                <a href="#pricing">Pricing</a>
                <a href="#blog">Blog</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#faq">FAQ</a>
              </nav>
            </div>

            <div class="footer__col">
              <h4>Company</h4>
              <nav class="footer__links">
                <a href="#">Terms &amp; Conditions</a>
                <a href="#">About Us</a>
                <a href="#">Privacy Policy</a>
              </nav>
            </div>

            <div class="footer__col">
              <h4>Contact</h4>
              <div class="footer__contact-item">
                ${icon('mapPin', 14, 'var(--text-muted)')}
                <span>123 AI Street, Tech City, TC 12345</span>
              </div>
              <div class="footer__contact-item">
                ${icon('phone', 14, 'var(--text-muted)')}
                <span>+1 (234) 567-890</span>
              </div>
              <div class="footer__contact-item">
                ${icon('mail', 14, 'var(--text-muted)')}
                <span>support@reelease.ai</span>
              </div>
            </div>
          </div>

          <div class="footer__bottom">
            <span>© 2024 Reelease AI. All Rights Reserved.</span>
            <div class="footer__bottom-links">
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>`;
  }
}
