/**
 * Router — Open/Closed: lida com hash navigation sem precisar modificar componentes.
 */
import { bus } from './EventBus.js';

export class Router {
  constructor(routes) {
    this.routes = routes; // { '#section': handlerFn }
    this._onHashChange = this._onHashChange.bind(this);
  }

  init() {
    window.addEventListener('hashchange', this._onHashChange);
    this._onHashChange();
  }

  destroy() {
    window.removeEventListener('hashchange', this._onHashChange);
  }

  _onHashChange() {
    const hash = window.location.hash || '#home';
    bus.emit('route:change', hash);
    this.routes[hash]?.();
  }

  navigate(hash) {
    window.location.hash = hash;
  }
}