/**
 * ScrollReveal — Single Responsibility: observa elementos e dispara animações de entrada.
 * Interface Segregation: expõe apenas observe() e destroy().
 */
export class ScrollReveal {
  #observer = null;
  #observed = new Set();

  constructor(options = {}) {
    this.options = {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
      ...options,
    };
  }

  init() {
    this.#observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          // Não desconectar — permite re-animação se configurado
        }
      });
    }, this.options);

    // Observar todos os elementos marcados
    document.querySelectorAll(
      '.sr-hidden, .sr-left, .sr-right, .sr-scale'
    ).forEach(el => {
      this.#observer.observe(el);
      this.#observed.add(el);
    });
  }

  /** Observa novos elementos adicionados dinamicamente ao DOM */
  observe(el) {
    this.#observer?.observe(el);
    this.#observed.add(el);
  }

  destroy() {
    this.#observer?.disconnect();
    this.#observed.clear();
  }
}