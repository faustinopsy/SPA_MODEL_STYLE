/**
 * FloatingIcons — Single Responsibility: controla a animação parallax dos ícones flutuantes no Hero.
 * Usa mousemove + requestAnimationFrame para performance máxima.
 */
export class FloatingIcons {
  #icons = [];
  #raf = null;
  #mouse = { x: 0, y: 0 };
  #current = { x: 0, y: 0 };
  #container = null;
  #onMouseMove = null;

  constructor(container) {
    this.#container = container;
  }

  init() {
    this.#icons = Array.from(
      this.#container.querySelectorAll('.hero__floating-icon')
    );

    this.#onMouseMove = e => {
      this.#mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.#mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', this.#onMouseMove, { passive: true });
    this._startFloating();
    this._loop();
  }

  _startFloating() {
    this.#icons.forEach((icon, i) => {
      const inner = icon.querySelector('.hero__icon-bubble');
      if (!inner) return;
      const delay = i * 0.6;
      const duration = 4 + (i % 3) * 1.5;
      const dir = i % 2 === 0 ? 'float-y' : 'float-x';
      inner.style.animation = `${dir} ${duration}s ${delay}s ease-in-out infinite`;
    });
  }

  _loop() {
    // Lerp suave
    this.#current.x += (this.#mouse.x - this.#current.x) * 0.06;
    this.#current.y += (this.#mouse.y - this.#current.y) * 0.06;

    this.#icons.forEach((icon, i) => {
      // Cada ícone tem depth diferente (efeito parallax camadas)
      const depth = 0.3 + (i % 5) * 0.15;
      const dx = this.#current.x * 28 * depth;
      const dy = this.#current.y * 20 * depth;
      icon.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    this.#raf = requestAnimationFrame(this._loop.bind(this));
  }

  destroy() {
    cancelAnimationFrame(this.#raf);
    window.removeEventListener('mousemove', this.#onMouseMove);
    this.#icons.forEach(icon => {
      icon.style.transform = '';
      const inner = icon.querySelector('.hero__icon-bubble');
      if (inner) inner.style.animation = '';
    });
  }
}