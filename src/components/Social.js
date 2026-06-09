import { Component } from '../core/Component.js';
import { icon } from '../utils/icons.js';

const PANELS = ['feed', 'reels', 'create', 'profile'];

const PLATFORM = {
  instagram: { accent: '#E1306C', label: 'INSTAGRAM EXCELLENCE', storyGrad: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' },
  facebook:  { accent: '#1877F2', label: 'FACEBOOK MASTERY',     storyGrad: 'linear-gradient(135deg,#1877F2,#0099ff)' },
};

const STORIES = [
  ['L', 'linear-gradient(135deg,#f09433,#dc2743)', 'luna'],
  ['K', 'linear-gradient(135deg,#3b82f6,#8b5cf6)', 'kai'],
  ['M', 'linear-gradient(135deg,#10b981,#3b82f6)', 'mia'],
  ['R', 'linear-gradient(135deg,#f59e0b,#ef4444)', 'rex'],
  ['A', 'linear-gradient(135deg,#a78bfa,#ec4899)', 'ava'],
];

const POSTS = [
  {
    user: 'luna.creates', letter: 'L',
    avGrad: 'linear-gradient(135deg,#f09433,#dc2743)',
    imgGrad: 'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)',
    likes: '12.4K', caption: 'Cyberpunk cityscape at midnight ✨', loc: 'AI Studio',
  },
  {
    user: 'kai.vision', letter: 'K',
    avGrad: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
    imgGrad: 'linear-gradient(135deg,#1a472a 0%,#2d6a4f 50%,#52b788 100%)',
    likes: '8.7K', caption: 'Ancient elven forest 🌿 #Fantasy #AI', loc: 'Fantasy AI',
  },
];

const REELS = [
  {
    letter: 'M', avGrad: 'linear-gradient(135deg,#10b981,#3b82f6)',
    bg: 'linear-gradient(160deg,#0a0a1a 0%,#1a0a2e 40%,#2d1b69 70%,#1a0a3e 100%)',
    user: 'mia.ai', likes: '48K', caption: 'Neon dreams at 3am 🌃 #AIArt #Cyberpunk',
  },
  {
    letter: 'R', avGrad: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    bg: 'linear-gradient(160deg,#0d1117 0%,#1a2744 40%,#0e4429 80%)',
    user: 'rex.creates', likes: '31K', caption: 'Dragon encounter 🔥 #Fantasy #AIVideo',
  },
];

const PROFILE_GRADS = [
  'linear-gradient(135deg,#0f0c29,#302b63)',
  'linear-gradient(135deg,#1a472a,#52b788)',
  'linear-gradient(135deg,#780000,#c1121f)',
  'linear-gradient(135deg,#023e8a,#0096c7)',
  'linear-gradient(135deg,#7b2d8b,#e040fb)',
  'linear-gradient(135deg,#ff6b35,#f7931e)',
];

export class Social extends Component {
  #activePanel    = 'feed';
  #activePlatform = 'instagram';
  #generating     = false;
  #clockInterval  = null;

  render() {
    return `
      <section class="social" id="social">
        <div class="glow-blob" style="top:20%;right:-10%;width:400px;height:400px;background:var(--primary);"></div>
        <div class="container">
          <div class="social__inner">

            <div class="social__text sr-left">
              <div class="social__tabs">
                <button class="social__tab active" data-tab="instagram">Instagram</button>
                <button class="social__tab" data-tab="facebook">Facebook</button>
              </div>
              <div class="section-badge" id="socialBadge">${icon('camera', 14)} INSTAGRAM EXCELLENCE</div>
              <h2>Master Your <span>Social Presence</span></h2>
              <p>
                Create aesthetic posts, viral reels, and engaging stories with
                AI-powered visuals and captions tailored for any platform.
              </p>
              <div class="social__features">
                <div class="social__feature-item">AI-Generated Posts</div>
                <div class="social__feature-item">Viral Reels &amp; Stories</div>
                <div class="social__feature-item">Cross-Platform Content</div>
                <div class="social__feature-item">Auto Caption &amp; Hashtags</div>
              </div>
            </div>

            <div class="phone-wrap sr-right">
              <div class="phone" id="phoneMockup">

                <div class="phone__screen">
                  <!-- Dynamic Island -->
                  <div class="phone__island">
                    <div class="phone__island-cam"></div>
                  </div>

                  <!-- Status bar -->
                  <div class="phone__statusbar">
                    <span class="phone__clock" id="phoneClock">${this._getTime()}</span>
                    <div class="phone__statusbar-right">
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor" aria-hidden="true">
                        <rect x="0" y="6" width="2" height="4" rx="0.5"/>
                        <rect x="3.5" y="4" width="2" height="6" rx="0.5"/>
                        <rect x="7" y="2" width="2" height="8" rx="0.5"/>
                        <rect x="10.5" y="0" width="2" height="10" rx="0.5"/>
                      </svg>
                      <svg width="15" height="10" viewBox="0 0 24 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                        <path d="M1.5 7A15 15 0 0 1 22.5 7"/>
                        <path d="M5 11a10 10 0 0 1 14 0"/>
                        <path d="M8.5 15a5 5 0 0 1 7 0"/>
                        <circle cx="12" cy="18" r="1.2" fill="currentColor"/>
                      </svg>
                      <svg width="24" height="11" viewBox="0 0 26 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="1" y="1.5" width="20" height="10" rx="2"/>
                        <rect x="3" y="3.5" width="14" height="6" rx="1" fill="currentColor" stroke="none"/>
                        <path d="M23 5.5v2.5" stroke-width="2.5"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Screen panels -->
                  <div class="phone__viewport" id="phoneViewport">
                    ${this._renderFeedPanel()}
                    ${this._renderReelsPanel()}
                    ${this._renderCreatePanel()}
                    ${this._renderProfilePanel()}
                  </div>

                  <!-- Bottom navigation -->
                  <nav class="phone__bottomnav" id="phoneBottomNav">
                    <button class="phone__nav-btn active" data-nav="feed">${icon('home', 22)}</button>
                    <button class="phone__nav-btn" data-nav="reels">${icon('film', 22)}</button>
                    <button class="phone__nav-btn" data-nav="create">${icon('plusCircle', 22)}</button>
                    <button class="phone__nav-btn" data-nav="profile">${icon('user', 22)}</button>
                  </nav>
                  <div class="phone__homebar"></div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>`;
  }

  /* ─── Panels ─────────────────────────────── */

  _renderFeedPanel() {
    const stories = STORIES.map(([l, g, name]) => `
      <div class="p-story">
        <div class="p-story__ring"><div class="p-story__av" style="background:${g}">${l}</div></div>
        <span>${name}</span>
      </div>`).join('');

    const posts = POSTS.map(p => `
      <div class="p-post">
        <div class="p-post__head">
          <div class="p-post__user">
            <div class="p-post__av" style="background:${p.avGrad}">${p.letter}</div>
            <div>
              <div class="p-post__name">${p.user}</div>
              <div class="p-post__loc">${p.loc}</div>
            </div>
          </div>
          ${icon('moreHoriz', 16, 'rgba(255,255,255,0.4)')}
        </div>
        <div class="p-post__img" style="background:${p.imgGrad}">
          <span class="p-post__ai-badge">${icon('sparkles', 10, 'rgba(255,255,255,0.75)')} AI</span>
        </div>
        <div class="p-post__actions">
          <div class="p-post__acts-l">
            <button class="p-post__act p-post__act--like">${icon('heart', 20)}</button>
            <button class="p-post__act">${icon('msgCircle', 20)}</button>
            <button class="p-post__act">${icon('send', 20)}</button>
          </div>
          <button class="p-post__act">${icon('bookmark', 20)}</button>
        </div>
        <div class="p-post__likes">${p.likes} likes</div>
        <div class="p-post__caption"><strong>${p.user}</strong> ${p.caption}</div>
      </div>`).join('');

    return `
      <div class="phone__panel phone__panel--active" data-panel="feed">
        <div class="p-feed">
          <div class="p-feed__head">
            <span class="p-feed__logo" id="feedLogo">Reelease</span>
            <div class="p-feed__icons">
              ${icon('heart', 20, 'currentColor')}
              ${icon('msgCircle', 20, 'currentColor')}
            </div>
          </div>
          <div class="p-stories">
            <div class="p-story p-story--add">
              <div class="p-story__ring p-story__ring--add">
                <div class="p-story__av p-story__av--add">${icon('plus', 14, '#fff')}</div>
              </div>
              <span>Your Story</span>
            </div>
            ${stories}
          </div>
          ${posts}
        </div>
      </div>`;
  }

  _renderReelsPanel() {
    return `
      <div class="phone__panel" data-panel="reels">
        <div class="p-reels" id="phoneReels">
          ${REELS.map((r, i) => `
            <div class="p-reel${i === 0 ? ' p-reel--active' : ''}" data-reel="${i}">
              <div class="p-reel__bg" style="background:${r.bg}">
                <div class="p-reel__pulse"></div>
              </div>
              <div class="p-reel__side">
                <div class="p-reel__av" style="background:${r.avGrad}">${r.letter}</div>
                <button class="p-reel__btn p-reel__btn--like">${icon('heart', 22)}</button>
                <span class="p-reel__count">${r.likes}</span>
                <button class="p-reel__btn">${icon('msgCircle', 22)}</button>
                <span class="p-reel__count">1.2K</span>
                <button class="p-reel__btn">${icon('send', 22)}</button>
                <button class="p-reel__btn">${icon('music', 22)}</button>
              </div>
              <div class="p-reel__bottom">
                <div class="p-reel__username">@${r.user} · <span class="p-reel__follow">Follow</span></div>
                <div class="p-reel__caption">${r.caption}</div>
                <div class="p-reel__audio">${icon('music', 11)} Original Audio · ${r.user}</div>
              </div>
              <div class="p-reel__bar-wrap">
                <div class="p-reel__bar${i === 0 ? ' p-reel__bar--play' : ''}"></div>
              </div>
            </div>`).join('')}
          <div class="p-reels__hint">Tap to next reel</div>
        </div>
      </div>`;
  }

  _renderCreatePanel() {
    return `
      <div class="phone__panel" data-panel="create">
        <div class="p-create">
          <div class="p-create__head">
            <span>AI Generate</span>
            ${icon('sparkles', 15, '#a78bfa')}
          </div>

          <div class="p-create__section">
            <div class="p-create__label">Describe your image</div>
            <div class="p-create__prompt">
              A neon-lit cyberpunk alley at night, rain reflections on the ground, dramatic lighting...
            </div>
          </div>

          <div class="p-create__section">
            <div class="p-create__label">Style</div>
            <div class="p-create__styles">
              <button class="p-create__style active" data-style="realistic">Realistic</button>
              <button class="p-create__style" data-style="anime">Anime</button>
              <button class="p-create__style" data-style="cyber">Cyberpunk</button>
            </div>
          </div>

          <button class="p-create__btn" id="generateBtn">
            ${icon('zap', 15, '#fff')} Generate
          </button>

          <div class="p-create__result" id="createResult">
            <div class="p-create__empty">
              ${icon('image', 26, 'rgba(255,255,255,0.15)')}
              <span>Your image appears here</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  _renderProfilePanel() {
    return `
      <div class="phone__panel" data-panel="profile">
        <div class="p-profile">
          <div class="p-profile__top">
            <div class="p-profile__av">R</div>
            <div class="p-profile__stats">
              <div class="p-profile__stat"><strong>48</strong><span>posts</span></div>
              <div class="p-profile__stat"><strong>124K</strong><span>followers</span></div>
              <div class="p-profile__stat"><strong>318</strong><span>following</span></div>
            </div>
          </div>
          <div class="p-profile__name">Reelease AI</div>
          <div class="p-profile__bio">AI-powered content creation ✨<br>Create stunning visuals in seconds</div>
          <div class="p-profile__btns">
            <button class="p-profile__btn p-profile__btn--primary">Edit Profile</button>
            <button class="p-profile__btn">${icon('moreHoriz', 14)}</button>
          </div>
          <div class="p-profile__grid">
            ${PROFILE_GRADS.map((g, i) => `
              <div class="p-profile__cell" style="background:${g}">
                ${i === 0 ? `<div class="p-profile__cell-pin">${icon('sparkles', 10, 'rgba(255,255,255,0.8)')}</div>` : ''}
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  /* ─── Lifecycle ──────────────────────────── */

  afterMount() {
    this._setupClock();
    this._setupTabs();
    this._setupNav();
    this._setupLikes();
    this._setupStyles();
    this._setupGenerate();
    this._setupReels();
  }

  /* ─── Helpers ────────────────────────────── */

  _getTime() {
    const n = new Date();
    return `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}`;
  }

  _setupClock() {
    const el = this.$('#phoneClock');
    if (!el) return;
    this.#clockInterval = setInterval(() => { el.textContent = this._getTime(); }, 10_000);
    this._addCleanup(() => clearInterval(this.#clockInterval));
  }

  _setupTabs() {
    const tabs  = this.$$('.social__tab');
    const phone = this.$('#phoneMockup');
    const badge = this.$('#socialBadge');
    const logo  = this.$('#feedLogo');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.#activePlatform = tab.dataset.tab;
        const p = PLATFORM[this.#activePlatform];
        phone.style.setProperty('--pa', p.accent);
        if (badge) badge.innerHTML = `${icon('camera', 14)} ${p.label}`;
        if (logo)  logo.style.background = p.accent;
        // Update story ring gradient via CSS var
        phone.style.setProperty('--sg', p.storyGrad);
      });
    });
  }

  _setupNav() {
    this.$$('.phone__nav-btn').forEach(btn => {
      btn.addEventListener('click', () => this._switchPanel(btn.dataset.nav));
    });
  }

  _switchPanel(newId) {
    if (newId === this.#activePanel) return;

    const curIdx  = PANELS.indexOf(this.#activePanel);
    const newIdx  = PANELS.indexOf(newId);
    const forward = newIdx > curIdx;

    const curEl = this.$(`[data-panel="${this.#activePanel}"]`);
    const newEl = this.$(`[data-panel="${newId}"]`);

    const T = 'transform 0.34s cubic-bezier(0.4,0,0.2,1)';

    // Snap new panel into off-screen position without transition
    newEl.style.cssText = `transition:none;transform:translateX(${forward ? '100%' : '-100%'})`;
    newEl.offsetHeight; // reflow

    // Animate both panels simultaneously
    curEl.style.cssText = `transition:${T};transform:translateX(${forward ? '-100%' : '100%'})`;
    newEl.style.cssText = `transition:${T};transform:translateX(0)`;

    curEl.classList.remove('phone__panel--active');
    newEl.classList.add('phone__panel--active');

    this.#activePanel = newId;

    // Reset inline styles after animation completes
    const tid = setTimeout(() => {
      curEl.style.cssText = '';
      newEl.style.cssText = '';
    }, 370);
    this._addCleanup(() => clearTimeout(tid));

    // Update nav buttons
    this.$$('.phone__nav-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.nav === newId)
    );
  }

  _setupLikes() {
    this.$$('.p-post__act--like, .p-reel__btn--like').forEach(btn => {
      btn.addEventListener('click', () => btn.classList.toggle('liked'));
    });
  }

  _setupStyles() {
    const btns = this.$$('.p-create__style');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    }));
  }

  _setupGenerate() {
    const btn    = this.$('#generateBtn');
    const result = this.$('#createResult');
    if (!btn || !result) return;

    const RESULTS = [
      'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)',
      'linear-gradient(135deg,#0a192f 0%,#172a45 40%,#1e3a5f 100%)',
      'linear-gradient(135deg,#1a0533 0%,#4a0e8f 50%,#7b2ff7 100%)',
    ];
    let idx = 0;

    btn.addEventListener('click', () => {
      if (this.#generating) return;
      this.#generating = true;

      btn.innerHTML = `<span class="p-spinner"></span> Generating...`;
      btn.disabled  = true;
      result.innerHTML = `
        <div class="p-create__loading">
          <span class="p-spinner p-spinner--lg"></span>
          <span>Processing prompt…</span>
        </div>`;

      setTimeout(() => {
        const bg = RESULTS[idx++ % RESULTS.length];
        result.innerHTML = `
          <div class="p-create__img" style="background:${bg}">
            <span class="p-create__img-badge">${icon('sparkles', 10, 'rgba(255,255,255,0.85)')} AI Generated</span>
          </div>
          <div class="p-create__img-actions">
            <button class="p-create__img-btn">${icon('download', 13)} Save</button>
            <button class="p-create__img-btn">${icon('send', 13)} Share</button>
          </div>`;
        btn.innerHTML = `${icon('zap', 15, '#fff')} Generate Again`;
        btn.disabled  = false;
        this.#generating = false;
      }, 1800);
    });
  }

  _setupReels() {
    const container = this.$('#phoneReels');
    if (!container) return;

    const reels = Array.from(container.querySelectorAll('.p-reel'));
    let active = 0;
    let startY = 0;

    const show = idx => {
      if (idx < 0 || idx >= reels.length) return;
      reels[active].classList.remove('p-reel--active');
      active = idx;
      reels[active].classList.add('p-reel--active');
      // Restart progress bar
      const bar = reels[active].querySelector('.p-reel__bar');
      if (bar) { bar.classList.remove('p-reel__bar--play'); bar.offsetWidth; bar.classList.add('p-reel__bar--play'); }
    };

    container.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
    container.addEventListener('touchend',   e => {
      const dy = startY - e.changedTouches[0].clientY;
      if (dy > 40) show(active + 1); else if (dy < -40) show(active - 1);
    }, { passive: true });

    // Desktop: click anywhere on reel to go to next
    container.addEventListener('click', () => show((active + 1) % reels.length));
  }
}
