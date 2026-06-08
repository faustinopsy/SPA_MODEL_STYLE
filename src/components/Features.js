import { Component }      from '../core/Component.js';
import { StickyFeatures } from '../animations/StickyFeatures.js';

const FEATURES = [
  {
    number: '01',
    title: 'Text to Image',
    desc: 'Transform your words into stunning, high-resolution visuals instantly using state-of-the-art AI models.',
    emoji: '🖼️',
    color: '#3b82f6',
    bg: 'linear-gradient(135deg,rgba(59,130,246,0.18),rgba(59,130,246,0.05))',
  },
  {
    number: '02',
    title: 'Images to Image',
    desc: 'Engage with our intelligent AI that understands context and provides accurate, human-like responses.',
    emoji: '🔄',
    color: '#a78bfa',
    bg: 'linear-gradient(135deg,rgba(167,139,250,0.18),rgba(167,139,250,0.05))',
  },
  {
    number: '03',
    title: 'Text to Video',
    desc: 'Create cinematic, high-quality videos from simple text prompts in just a few clicks.',
    emoji: '🎬',
    color: '#ec4899',
    bg: 'linear-gradient(135deg,rgba(236,72,153,0.18),rgba(236,72,153,0.05))',
  },
  {
    number: '04',
    title: 'Image to Video',
    desc: 'Bring your still images to life — animate photos and artwork into fluid, high-quality video clips with AI.',
    emoji: '🎞️',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.05))',
  },
  {
    number: '05',
    title: 'Video Motion',
    desc: 'Add dynamic motion effects, transitions, and cinematic camera moves to any video with a single prompt.',
    emoji: '🎥',
    color: '#10b981',
    bg: 'linear-gradient(135deg,rgba(16,185,129,0.18),rgba(16,185,129,0.05))',
  },
];

export class Features extends Component {
  #sticky = null;

  render() {
    // Cada card é envolto num .feature-card-wrapper com position:absolute;inset:0
    // Isso faz todos ocuparem EXATAMENTE o mesmo espaço — sobrepostos
    const cardsHTML = FEATURES.map((f, i) => `
      <div class="feature-card-wrapper" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:${i === 0 ? '1' : '0'};transform:${i === 0 ? 'scale(1)' : 'translateY(800px)'};will-change:transform,opacity;">
        <div class="feature-card" style="background:${f.bg}; --card-glow:${f.color}">
          <div class="feature-card__text">
            <span class="feature-card__number">${f.number} / 0${FEATURES.length}</span>
            <h3 class="feature-card__title" style="background:linear-gradient(135deg,${f.color},#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
              ${f.title}
            </h3>
            <p class="feature-card__desc">${f.desc}</p>
            <button class="btn-primary" style="width:fit-content;background:linear-gradient(135deg,${f.color},${f.color}cc);">
              Get Started →
            </button>
          </div>
          <div class="feature-card__image" style="background:${f.bg};">
            <div class="feature-card__image-placeholder">
              <span>${f.emoji}</span>
            </div>
          </div>
        </div>
      </div>`
    ).join('');

    const dotsHTML = FEATURES.map((_, i) => `
      <div class="features__progress-dot${i === 0 ? ' active' : ''}"></div>`
    ).join('');

    return `
      <section class="features" id="features">

        <!-- blobs de fundo -->
        <div class="glow-blob" style="top:0;right:-200px;width:500px;height:500px;background:var(--primary);"></div>
        <div class="glow-blob" style="top:0;right:-200px;width:200px;height:200px;background:var(--secondary);animation-delay:1s;"></div>
        <div class="glow-blob" style="bottom:-900px;left:-200px;width:600px;height:600px;background:var(--primary);animation-delay:2s;"></div>

        <!--
          O truque do sticky:
          Este div tem height=420vh → cria espaço de scroll para o efeito.
          O filho .features__sticky-wrapper é position:sticky;top:0;height:100vh
          → ele FICA PARADO enquanto o pai rola, dando controle via scrollY.
        -->
        <div class="features__scroll-container">

          <div class="features__sticky-wrapper">

            <!-- Cabeçalho fixo acima dos cards -->
            <div class="features__header sr-hidden">
              <div class="section-badge">⚡ POWERFUL CAPABILITIES</div>
              <h2>Everything You Need to Create Content</h2>
              <p>The all-in-one AI platform to create stunning images, videos,
                and social media content — in seconds.</p>
            </div>

            <!--
              Viewport dos cards: position:relative + overflow:hidden
              Todos os .feature-card-wrapper têm position:absolute;inset:0
              → ficam empilhados no mesmo lugar, controlados por JS
            -->
            <div class="features__cards-viewport">
              ${cardsHTML}
            </div>

            <!-- Dots indicadores -->
            <div class="features__progress">${dotsHTML}</div>

          </div>
        </div>
      </section>`;
  }

  afterMount() {
    const scrollContainer = this.$('.features__scroll-container');
    this.#sticky = new StickyFeatures(scrollContainer);
    this.#sticky.init();
    this._addCleanup(() => this.#sticky.destroy());

    // Sincronizar dots com o progresso
    this._setupDots();
  }

  _setupDots() {
    const dots       = Array.from(this.$$('.features__progress-dot'));
    const wrappers   = Array.from(this.$$('.feature-card-wrapper'));
    const scrollCont = this.$('.features__scroll-container');
    const N          = wrappers.length;

    const update = () => {
      const containerTop    = scrollCont.getBoundingClientRect().top;
      const containerHeight = scrollCont.offsetHeight;
      const viewH           = window.innerHeight;
      const scrollable      = containerHeight - viewH;
      const scrolled        = Math.max(0, Math.min(-containerTop, scrollable));
      const globalProgress  = (scrolled / scrollable) * N;
      const activeIndex     = Math.min(Math.floor(globalProgress), N - 1);

      dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    };

    window.addEventListener('scroll', update, { passive: true });
    this._addCleanup(() => window.removeEventListener('scroll', update));
  }
}