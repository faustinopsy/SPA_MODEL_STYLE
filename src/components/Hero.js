import { Component } from '../core/Component.js';
import { FloatingIcons } from '../animations/FloatingIcons.js';

const ICON_DATA = [
  { emoji: '📸', color: '#E1306C', top: '17%', left: '11%' },
  { emoji: '👍', color: '#1877F2', top: '38%', left: '24%' },
  { emoji: '🐦', color: '#1DA1F2', top: '48%', left: '7%' },
  { emoji: '❤️', color: '#E1306C', top: '65%', left: '15%' },
  { emoji: '🎬', color: '#FF0000', top: 'auto', left: '4%', bottom: '8%' },
  { emoji: '📧', color: '#a78bfa', top: '12%', right: '8%' },
  { emoji: '✅', color: '#10b981', top: '35%', right: '27%' },
  { emoji: '⚙️', color: '#3b82f6', top: '40%', right: '7%' },
  { emoji: '📊', color: '#f59e0b', top: '62%', right: '16%' },
  { emoji: '🎞️', color: '#60a5fa', top: 'auto', right: '4%', bottom: '8%' },
];

export class Hero extends Component {
  #floatingIcons = null;

  render() {
    const iconsHTML = ICON_DATA.map((icon) => {
      const styleParts = [];
      if (icon.top    !== undefined) styleParts.push(`top:${icon.top}`);
      if (icon.bottom !== undefined) styleParts.push(`bottom:${icon.bottom}`);
      if (icon.left   !== undefined) styleParts.push(`left:${icon.left}`);
      if (icon.right  !== undefined) styleParts.push(`right:${icon.right}`);
      const style = styleParts.join(';');

      return `
        <div class="hero__floating-icon" style="${style}" aria-hidden="true">
          <div class="hero__icon-bubble" style="box-shadow:0 8px 32px ${icon.color}40">
            <span style="font-size:2rem;line-height:1;display:flex;align-items:center;justify-content:center;">${icon.emoji}</span>
          </div>
        </div>`;
    }).join('');

    return `
      <section class="hero" id="home">
        <div class="hero__glow hero__glow--left"></div>
        <div class="hero__glow hero__glow--left2"></div>
        <div class="hero__glow hero__glow--right"></div>
        <div class="hero__glow hero__glow--right2"></div>

        ${iconsHTML}

        <div class="hero__content">
          <div class="section-badge">⚡ NEXT-GEN AI PLATFORM</div>
          <h1 class="hero__title">
            Unleash Your<br>
            <span class="gradient-text">Creative Potential</span>
          </h1>
          <p class="hero__subtitle">
            The all-in-one AI platform to create stunning images, videos,
            and social media content — in seconds.
          </p>
          <div class="hero__cta">
            <button class="btn-primary">✨ Get Started Now</button>
            <button class="btn-secondary">Explore Features →</button>
          </div>
        </div>

        <div class="hero__dashboard">
          <div class="hero__dashboard-inner">
            <div class="hero__dashboard-placeholder">
              <div class="hero__dash-row">
                <div class="hero__dash-card"></div>
                <div class="hero__dash-card"></div>
                <div class="hero__dash-card" style="flex:2"></div>
              </div>
              <div class="hero__dash-row">
                <div class="hero__dash-card" style="flex:3;height:120px;animation-delay:.3s"></div>
                <div class="hero__dash-card" style="height:120px;animation-delay:.6s"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero__divider"></div>
      </section>`;
  }

  afterMount() {
    const section = this.$('#home') || this.container.querySelector('.hero');
    this.#floatingIcons = new FloatingIcons(section);
    this.#floatingIcons.init();
    this._addCleanup(() => this.#floatingIcons.destroy());
  }
}