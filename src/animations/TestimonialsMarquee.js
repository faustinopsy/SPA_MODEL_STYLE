/**
 * TestimonialsMarquee — controla pausa do marquee ao hover e velocidade variável.
 * Interface Segregation: expõe apenas init/destroy.
 */
export class TestimonialsMarquee {
  #tracks = [];
  #cleanups = [];

  constructor(container) {
    this.container = container;
  }

  init() {
    this.#tracks = Array.from(
      this.container.querySelectorAll('.testimonials__track')
    );

    this.#tracks.forEach(track => {
      const pause  = () => { track.style.animationPlayState = 'paused'; };
      const resume = () => { track.style.animationPlayState = 'running'; };
      track.addEventListener('mouseenter', pause);
      track.addEventListener('mouseleave', resume);
      this.#cleanups.push(() => {
        track.removeEventListener('mouseenter', pause);
        track.removeEventListener('mouseleave', resume);
      });
    });
  }

  destroy() {
    this.#cleanups.forEach(fn => fn());
    this.#cleanups = [];
  }
}