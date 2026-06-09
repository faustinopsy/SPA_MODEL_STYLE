import { Component } from '../core/Component.js';
import { icon } from '../utils/icons.js';

const PLANS = [
  {
    name: 'Free Plan',
    label: 'FREE PLAN',
    desc: 'Get started with basic AI features.',
    price: '$0',
    credits: '50 Credits',
    iconName: 'rocket',
    iconBg: 'linear-gradient(135deg,#60a5fa,#22d3ee)',
    glowColor: '#a78bfa',
    features: ['50 Credits', 'Text To Image', 'Image To Image', 'Video Motion', 'Images To Video', 'Text To Video'],
    featured: false,
    btn: 'secondary',
  },
  {
    name: 'Pro Plan',
    label: 'PRO PLAN',
    desc: 'Advanced features for power users.',
    price: '$29',
    credits: '500 Credits',
    iconName: 'zap',
    iconBg: 'linear-gradient(135deg,#3b82f6,#a78bfa)',
    glowColor: '#3b82f6',
    features: ['500 Credits', 'Text To Image', 'Image To Image', 'Video Motion', 'Images To Video', 'Text To Video'],
    featured: true,
    btn: 'primary',
  },
  {
    name: 'Enterprise Plan',
    label: 'ENTERPRISE PLAN',
    desc: 'Unlimited access for teams.',
    price: '$99',
    credits: '2000 Credits',
    iconName: 'building',
    iconBg: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    glowColor: '#f59e0b',
    features: ['2000 Credits', 'Text To Image', 'Image To Image', 'Video Motion', 'Images To Video', 'Text To Video'],
    featured: false,
    btn: 'secondary',
  },
];

export class Pricing extends Component {
  render() {
    const cardsHTML = PLANS.map((plan, i) => `
      <div class="pricing-card${plan.featured ? ' pricing-card--featured' : ''} sr-hidden sr-delay-${i + 1}">
        <div class="pricing-card__glow" style="background:${plan.glowColor};"></div>
        <div class="pricing-card__icon" style="background:${plan.iconBg};">${icon(plan.iconName, 22, '#fff')}</div>
        <div class="pricing-card__name">${plan.name}</div>
        <div class="pricing-card__desc">${plan.desc}</div>
        <div class="pricing-card__price">
          <span class="amount">${plan.price}</span>
          <span class="period">/mo</span>
        </div>
        <div class="pricing-card__features">
          ${plan.features.map(f => `
            <div class="pricing-card__feature">
              <div class="pricing-card__check">${icon('check', 12, '#10b981')}</div>
              <span>${f}</span>
            </div>`).join('')}
        </div>
        <button class="btn-${plan.btn}">Get Started</button>
      </div>`
    ).join('');

    return `
      <section class="pricing" id="pricing">
        <div class="glow-blob" style="bottom:30%;right:-10%;width:500px;height:500px;background:var(--primary);animation-delay:1s;"></div>
        <div class="glow-blob" style="bottom:-10%;left:-10%;width:400px;height:400px;background:var(--secondary);animation-delay:2s;"></div>
        <div class="container">
          <div class="pricing__inner">
            <div class="pricing__left sr-left">
              <div class="section-badge">${icon('dollarSign', 14)} PRICING</div>
              <h2>Simple,<br>Transparent Pricing</h2>
              <p>Choose the plan that fits your needs. No hidden fees, cancel anytime.</p>
            </div>
            <div class="pricing__cards">
              ${cardsHTML}
            </div>
          </div>
        </div>
      </section>`;
  }
}
