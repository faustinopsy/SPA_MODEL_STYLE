/**
 * Component — classe base seguindo o princípio de Liskov Substitution.
 * Todos os componentes herdam esta interface e garantem render/mount/destroy.
 */
export class Component {
  /** @param {HTMLElement} container */
  constructor(container) {
    if (!container) throw new Error(`${this.constructor.name}: container é obrigatório.`);
    this.container = container;
    this._cleanups = [];
  }

  /** @abstract */
  render() {
    throw new Error(`${this.constructor.name}.render() não implementado.`);
  }

  mount() {
    this.container.innerHTML = this.render();
    this.afterMount?.();
  }

  destroy() {
    this._cleanups.forEach(fn => fn());
    this._cleanups = [];
    this.container.innerHTML = '';
  }

  /** Utilitário: registra um cleanup a ser chamado em destroy() */
  _addCleanup(fn) {
    this._cleanups.push(fn);
  }

  /** Utilitário: querySelector dentro do container */
  $(sel) { return this.container.querySelector(sel); }
  $$(sel) { return this.container.querySelectorAll(sel); }
}