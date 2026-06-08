/**
 * ParallaxGlow — aplica efeito parallax sutil nos blobs de glow ao scrollar.
 * Open/Closed: pode ser estendido com novos targets sem alterar a lógica.
 */
export class ParallaxGlow {
  #elements = [];
  #onScroll = null;
  #raf = null;
  #ticking = false;

  init() {
    this.#elements = Array.from(document.querySelectorAll('.glow-blob'));
    this.#onScroll = () => {
      if (!this.#ticking) {
        this.#raf = requestAnimationFrame(() => {
          this._update();
          this.#ticking = false;
        });
        this.#ticking = true;
      }
    };
    window.addEventListener('scroll', this.#onScroll, { passive: true });
  }

  _update() {
    const scrollY = window.scrollY;
    this.#elements.forEach((el, i) => {
      const speed = 0.04 + (i % 3) * 0.02;
      const dir = i % 2 === 0 ? 1 : -1;
      el.style.transform = `translateY(${scrollY * speed * dir}px)`;
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.#onScroll);
    cancelAnimationFrame(this.#raf);
  }
}