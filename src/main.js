import { Navbar }       from './components/Navbar.js';
import { Hero }         from './components/Hero.js';
import { Features }     from './components/Features.js';
import { Social }       from './components/Social.js';
import { Pricing }      from './components/Pricing.js';
import { Blog }         from './components/Blog.js';
import { Testimonials } from './components/Testimonials.js';
import { FAQ }          from './components/FAQ.js';
import { Contact }      from './components/Contact.js';
import { Footer }       from './components/Footer.js';
import { BackToTop }    from './components/BackToTop.js';

import { ScrollReveal } from './animations/ScrollReveal.js';
import { ParallaxGlow } from './animations/ParallaxGlow.js';

/* ─────────────────────────────────────────────
   Cria um container HTML para cada componente
   e o injeta no #app, respeitando a ordem visual.
───────────────────────────────────────────── */
function createSlot(id) {
  const div = document.createElement('div');
  if (id) div.id = `slot-${id}`;
  return div;
}

/* ─────────────────────────────────────────────
   Bootstrap: instancia, monta e inicializa
   todos os módulos. Segue Dependency Inversion —
   main.js conhece as abstrações, não as implementações.
───────────────────────────────────────────── */
function bootstrap() {
  const app = document.getElementById('app');
  if (!app) throw new Error('Root element #app não encontrado.');

  /* ---------- Layout slots ---------- */
  const slots = {
    navbar:       createSlot('navbar'),
    hero:         createSlot('hero'),
    features:     createSlot('features'),
    social:       createSlot('social'),
    pricing:      createSlot('pricing'),
    blog:         createSlot('blog'),
    testimonials: createSlot('testimonials'),
    faq:          createSlot('faq'),
    contact:      createSlot('contact'),
    footer:       createSlot('footer'),
    backToTop:    createSlot('back-to-top'),
  };

  // Injeta todos os slots de uma vez (um único reflow)
  const fragment = document.createDocumentFragment();
  Object.values(slots).forEach(slot => fragment.appendChild(slot));
  app.appendChild(fragment);

  /* ---------- Instancia componentes ---------- */
  const components = [
    new Navbar      (slots.navbar),
    new Hero        (slots.hero),
    new Features    (slots.features),
    new Social      (slots.social),
    new Pricing     (slots.pricing),
    new Blog        (slots.blog),
    new Testimonials(slots.testimonials),
    new FAQ         (slots.faq),
    new Contact     (slots.contact),
    new Footer      (slots.footer),
    new BackToTop   (slots.backToTop),
  ];

  /* ---------- Monta todos os componentes ---------- */
  components.forEach(c => c.mount());

  /* ---------- Inicializa animações globais ---------- */

  // ScrollReveal: observa todos os elementos .sr-* já renderizados
  const scrollReveal = new ScrollReveal();
  scrollReveal.init();

  // ParallaxGlow: parallax sutil dos blobs de fundo
  const parallaxGlow = new ParallaxGlow();
  parallaxGlow.init();

  /* ---------- Smooth scroll para âncoras ---------- */
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', `#${id}`);
  });

  /* ---------- Cleanup ao desmontar (SPA future-proof) ---------- */
  return () => {
    components.forEach(c => c.destroy());
    scrollReveal.destroy();
    parallaxGlow.destroy();
    app.innerHTML = '';
  };
}

/* ─────────────────────────────────────────────
   Entry point: aguarda o DOM estar pronto
───────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}