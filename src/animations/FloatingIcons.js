/**
 * FloatingIcons — parallax de mouse + convergência ao painel ao rolar.
 *
 * Ao rolar para baixo:  ícones se movem em direção ao centro do .hero__dashboard-inner
 * Ao rolar para cima:   ícones retornam às posições originais
 */
export class FloatingIcons {
  #icons     = [];
  #iconData  = [];   // { targetDx, targetDy, depth } por ícone
  #raf       = null;
  #mouse     = { x: 0, y: 0 };
  #current   = { x: 0, y: 0 };
  #container = null;
  #scrollProgress = 0;

  #onMouseMove = null;
  #onScroll    = null;
  #onResize    = null;

  constructor(container) {
    this.#container = container;
  }

  init() {
    this.#icons = Array.from(
      this.#container.querySelectorAll('.hero__floating-icon')
    );

    // Captura posições após layout estar estável
    requestAnimationFrame(() => this._capturePositions());

    this.#onMouseMove = e => {
      this.#mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      this.#mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    this.#onScroll = () => {
      const heroH = this.#container.offsetHeight;
      // Progresso completo em 50% da altura do hero
      const raw = window.scrollY / (heroH * 0.5);
      this.#scrollProgress = Math.min(1, Math.max(0, raw));
    };

    this.#onResize = () => requestAnimationFrame(() => this._capturePositions());

    window.addEventListener('mousemove', this.#onMouseMove, { passive: true });
    window.addEventListener('scroll',    this.#onScroll,    { passive: true });
    window.addEventListener('resize',    this.#onResize,    { passive: true });

    this._startFloating();
    this._loop();
  }

  // Calcula o deslocamento absoluto de cada ícone em relação ao centro do dashboard
  _capturePositions() {
    const dashboard = this.#container.querySelector('.hero__dashboard-inner');
    if (!dashboard || !this.#icons.length) return;

    const dashRect = dashboard.getBoundingClientRect();
    const dashCx   = dashRect.left + dashRect.width  / 2 + window.scrollX;
    const dashCy   = dashRect.top  + dashRect.height / 2 + window.scrollY;

    this.#iconData = this.#icons.map((icon, i) => {
      const rect = icon.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2 + window.scrollX;
      const cy   = rect.top  + rect.height / 2 + window.scrollY;
      return {
        targetDx: dashCx - cx,
        targetDy: dashCy - cy,
        depth:    0.3 + (i % 5) * 0.15,
      };
    });
  }

  _startFloating() {
    this.#icons.forEach((icon, i) => {
      const inner = icon.querySelector('.hero__icon-bubble');
      if (!inner) return;
      const delay    = i * 0.6;
      const duration = 4 + (i % 3) * 1.5;
      const dir      = i % 2 === 0 ? 'float-y' : 'float-x';
      inner.style.animation = `${dir} ${duration}s ${delay}s ease-in-out infinite`;
    });
  }

  // ease-in-out suave
  _ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  _loop() {
    // Lerp do mouse
    this.#current.x += (this.#mouse.x - this.#current.x) * 0.06;
    this.#current.y += (this.#mouse.y - this.#current.y) * 0.06;

    const ep            = this._ease(this.#scrollProgress);
    const parallaxScale = 1 - ep;  // parallax desaparece enquanto ícones convergem

    this.#icons.forEach((icon, i) => {
      const data = this.#iconData[i];

      // Fallback antes de _capturePositions() completar
      if (!data) {
        const depth = 0.3 + (i % 5) * 0.15;
        icon.style.transform = `translate(${this.#current.x * 28 * depth}px, ${this.#current.y * 20 * depth}px)`;
        return;
      }

      const parallaxDx = this.#current.x * 28 * data.depth * parallaxScale;
      const parallaxDy = this.#current.y * 20 * data.depth * parallaxScale;
      const scrollDx   = data.targetDx * ep;
      const scrollDy   = data.targetDy * ep;
      const scale      = 1 - ep * 0.35;   // reduz levemente ao convergir

      icon.style.transform = `translate(${parallaxDx + scrollDx}px, ${parallaxDy + scrollDy}px) scale(${scale})`;
      icon.style.opacity   = String(Math.max(0, 1 - ep));

      // Pausa a animação flutuante assim que começa a convergir
      const inner = icon.querySelector('.hero__icon-bubble');
      if (inner) {
        inner.style.animationPlayState = ep > 0.04 ? 'paused' : 'running';
      }
    });

    this.#raf = requestAnimationFrame(this._loop.bind(this));
  }

  destroy() {
    cancelAnimationFrame(this.#raf);
    window.removeEventListener('mousemove', this.#onMouseMove);
    window.removeEventListener('scroll',    this.#onScroll);
    window.removeEventListener('resize',    this.#onResize);

    this.#icons.forEach(icon => {
      icon.style.transform  = '';
      icon.style.opacity    = '';
      const inner = icon.querySelector('.hero__icon-bubble');
      if (inner) {
        inner.style.animation          = '';
        inner.style.animationPlayState = '';
      }
    });
  }
}
