import { Component } from '../core/Component.js';
import { bus } from '../core/EventBus.js';

export class Navbar extends Component {
  render() {
    return `
      <nav class="navbar" id="navbar">
        <div class="container navbar__inner">
          <a href="#home" class="navbar__logo">Reel<span>ease</span> AI</a>

          <nav class="navbar__nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#social">Social</a>
            <a href="#pricing">Pricing</a>
            <a href="#blog">Blog</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq" class="active">FAQ</a>
          </nav>

          <div class="navbar__actions">
            <button class="btn-ghost">Sign In</button>
            <button class="btn-primary">Get Started</button>
          </div>

          <button class="navbar__hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div class="mobile-menu" id="mobileMenu">
        <a href="#features">Features</a>
        <a href="#social">Social</a>
        <a href="#pricing">Pricing</a>
        <a href="#blog">Blog</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#faq">FAQ</a>
        <button class="btn-primary" style="width:100%;justify-content:center;">Get Started</button>
      </div>
    `;
  }

  afterMount() {
    this._setupScroll();
    this._setupHamburger();
    this._setupActiveLinks();
  }

  _setupScroll() {
    const navbar = this.$('#navbar');
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    this._addCleanup(() => window.removeEventListener('scroll', onScroll));
  }

  _setupHamburger() {
    const btn = this.$('.navbar__hamburger');
    const menu = this.$('#mobileMenu');
    const toggle = () => {
      const isOpen = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    };
    btn.addEventListener('click', toggle);

    // Fechar ao clicar em link
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('open'));
    });

    this._addCleanup(() => btn.removeEventListener('click', toggle));
  }

  _setupActiveLinks() {
    const links = this.$$('.navbar__nav a, .mobile-menu a');
    const sections = document.querySelectorAll('section[id]');

    const updateActive = () => {
      const scrollY = window.scrollY + 100;
      let current = '';
      sections.forEach(sec => {
        if (sec.offsetTop <= scrollY) current = sec.id;
      });
      links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      });
    };

    window.addEventListener('scroll', updateActive, { passive: true });
    this._addCleanup(() => window.removeEventListener('scroll', updateActive));
  }
}