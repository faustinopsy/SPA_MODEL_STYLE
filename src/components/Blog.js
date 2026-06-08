import { Component } from '../core/Component.js';

const FEATURED_POST = {
  emoji: '🎬',
  tag: 'Insights',
  readTime: '5 min read',
  title: 'The Evolution of Action Cinematography in Modern Films',
  excerpt: 'Action cinematography has transformed drastically over the years. From practical stunts to advanced CGI, filmmakers now create immersive experiences like never before.',
};

const SIDE_POSTS = [
  { emoji: '🏰', tag: 'Insights', readTime: '5 min read', title: 'Building Immersive Fantasy Worlds for Visual Storytelling' },
  { emoji: '🤖', tag: 'Insights', readTime: '5 min read', title: 'The Rise of Cyberpunk Aesthetics in Digital Media' },
  { emoji: '✨', tag: 'Insights', readTime: '5 min read', title: 'Getting Started with AI Image Generation' },
];

const TICKER_ITEMS = [
  'The Evolution of Action Cinematography',
  'Building Immersive Fantasy Worlds',
  'The Rise of Cyberpunk Aesthetics',
  'Getting Started with AI Image Generation',
  'Understanding Lighting Techniques in Photography',
  'Creating Viral Social Media Reels',
];

export class Blog extends Component {
  render() {
    const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS].map(item => `
      <div class="blog__ticker-item">
        <span class="blog__ticker-dot"></span>
        ${item}
      </div>`).join('');

    const sidePostsHTML = SIDE_POSTS.map(p => `
      <div class="blog__card-small">
        <div class="blog__card-small-image">
          <span>${p.emoji}</span>
        </div>
        <div class="blog__card-small-body">
          <div class="blog__tag">${p.tag} · ${p.readTime}</div>
          <div class="blog__card-small-title">${p.title}</div>
        </div>
      </div>`).join('');

    return `
      <section class="blog" id="blog">
        <div class="glow-blob" style="top:-10%;left:20%;width:400px;height:400px;background:var(--secondary);"></div>
        <div class="container">
          <div class="blog__header sr-hidden">
            <div class="section-badge">📝 LATEST INSIGHTS</div>
            <h2>From Our Blog</h2>
            <p>Stay up to date with the latest AI trends, tutorials and product updates.</p>
          </div>

          <div class="blog__grid">
            <div class="blog__featured sr-left">
              <div class="blog__featured-image">
                <span>${FEATURED_POST.emoji}</span>
              </div>
              <div class="blog__featured-body">
                <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
                  <span class="blog__tag">${FEATURED_POST.tag}</span>
                  <span class="blog__read-time">${FEATURED_POST.readTime}</span>
                </div>
                <h3 class="blog__featured-title">${FEATURED_POST.title}</h3>
                <p class="blog__featured-excerpt">${FEATURED_POST.excerpt}</p>
                <button class="blog__read-btn">Read Article →</button>
              </div>
            </div>

            <div class="blog__sidebar sr-right">
              ${sidePostsHTML}
            </div>
          </div>
        </div>

        <div class="blog__ticker">
          <div class="blog__ticker-track">
            ${tickerItems}
          </div>
        </div>
      </section>`;
  }
}