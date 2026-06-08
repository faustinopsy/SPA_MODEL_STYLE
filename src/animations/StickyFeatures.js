/**
 * StickyFeatures — Scroll-driven stack effect (comportamento exato da página original).
 *
 * Cada card tem 3 estados exclusivos, calculados por progresso de scroll:
 *
 *  Estado 1 — Oculto abaixo:
 *    opacity: 0  |  transform: translateY(800px)
 *    Condição: card ainda não chegou na sua "janela" de scroll.
 *
 *  Estado 2 — Entrando (subindo):
 *    opacity: 0 → 1  |  transform: translateY(800px → 0)
 *    Condição: localProgress entre 0 e 1 (exclusivo).
 *
 *  Estado 3 — Pousado / sendo coberto:
 *    opacity: 1 (FIXO — nunca cai)  |  transform: scale(1.0 → 0.9)
 *    Condição: localProgress === 1.
 *    O scale encolhe conforme o card SEGUINTE sobe (nextProgress 0→1).
 *
 * z-index incremental garante que o card mais novo sempre fica na frente.
 */
export class StickyFeatures {
  #scrollContainer = null;
  #wrappers        = [];
  #raf             = null;
  #onScroll        = null;
  #ticking         = false;
  #N               = 0;

  constructor(scrollContainer) {
    this.#scrollContainer = scrollContainer;
  }

  init() {
    this.#wrappers = Array.from(
      this.#scrollContainer.querySelectorAll('.feature-card-wrapper')
    );
    this.#N = this.#wrappers.length;
    if (this.#N === 0) return;

    // z-index: card 0 mais atrás, card N-1 mais à frente
    this.#wrappers.forEach((w, i) => {
      w.style.zIndex = String(i + 1);
    });

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
    this._update(); // estado inicial sem esperar o primeiro scroll
  }

  _update() {
    const container = this.#scrollContainer;
    const N = this.#N;

    const containerTop    = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;
    const viewH           = window.innerHeight;

    const scrollable     = containerHeight - viewH;
    const scrolled       = Math.max(0, Math.min(-containerTop, scrollable));
    const globalProgress = (scrolled / scrollable) * N;

    this.#wrappers.forEach((wrapper, i) => {
      const localProgress = Math.max(0, Math.min(globalProgress - i,       1));
      const nextProgress  = Math.max(0, Math.min(globalProgress - (i + 1), 1));

      // Estado 1: ainda não entrou
      if (localProgress === 0) {
        wrapper.style.opacity   = '0';
        wrapper.style.transform = 'translateY(800px)';
        return;
      }

      // Estado 2: subindo (fase enter)
      if (localProgress < 1) {
        const translateY = (1 - localProgress) * 800;
        wrapper.style.opacity   = localProgress.toFixed(4);
        wrapper.style.transform = `translateY(${translateY.toFixed(2)}px)`;
        return;
      }

      // Estado 3: pousado — opacity NUNCA cai, só o scale recua
      const scale = 1.0 - (nextProgress * 0.1);
      wrapper.style.opacity   = '1';                          // ← fixo em 1
      wrapper.style.transform = `scale(${scale.toFixed(6)})`; // 1.0 → 0.9
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.#onScroll);
    cancelAnimationFrame(this.#raf);
    this.#wrappers.forEach(w => {
      w.style.opacity   = '';
      w.style.transform = '';
      w.style.zIndex    = '';
    });
  }
}