import { Component } from '../core/Component.js';

export class BackToTop extends Component {
  render() {
    return `<button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>`;
  }

  afterMount() {
    const btn = this.$('#backToTop');

    const onScroll = () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    };

    const onClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', onClick);

    this._addCleanup(() => {
      window.removeEventListener('scroll', onScroll);
      btn.removeEventListener('click', onClick);
    });
  }
}