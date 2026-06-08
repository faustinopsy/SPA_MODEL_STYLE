import { Component } from '../core/Component.js';

export class Social extends Component {
  #activeTab = 'instagram';

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
              <div class="section-badge">📸 INSTAGRAM EXCELLENCE</div>
              <h2>
                Master Your <span>Instagram Presence</span>
              </h2>
              <p>
                Create aesthetic posts, viral reels, and engaging stories with
                AI-powered visuals and captions tailored for Instagram.
              </p>
              <div class="social__features">
                <div class="social__feature-item">Aesthetic Posts</div>
                <div class="social__feature-item">Viral Reels</div>
                <div class="social__feature-item">Story Magic</div>
              </div>
            </div>

            <div class="social__mockup sr-right" id="socialMockup">
              <div class="social__mockup-header">
                <span id="mockupPlatform">Reels</span>
                <span style="font-size:0.75rem;color:var(--text-muted);">username</span>
                <button class="social__mockup-follow">Follow</button>
              </div>
              <div class="social__mockup-image" id="mockupImage">
                <span style="font-size:4rem;">📸</span>
              </div>
              <div class="social__mockup-stats">
                <div><strong>124K</strong> followers</div>
                <div><strong>1.2K</strong> likes</div>
              </div>
              <div class="social__message-btn">
                <span>✉️</span> Send message
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  afterMount() {
    this._setupTabs();
  }

  _setupTabs() {
    const tabs = this.$$('.social__tab');
    const mockupImage = this.$('#mockupImage');
    const mockupPlatform = this.$('#mockupPlatform');

    const tabData = {
      instagram: { emoji: '📸', platform: 'Reels', color: '#E1306C' },
      facebook:  { emoji: '👍', platform: 'Posts', color: '#1877F2' },
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const key = tab.dataset.tab;
        const data = tabData[key];

        // Animação de troca
        const mockup = this.$('#socialMockup');
        mockup.style.opacity = '0';
        mockup.style.transform = 'scale(0.95)';

        setTimeout(() => {
          mockupImage.innerHTML = `<span style="font-size:4rem;">${data.emoji}</span>`;
          mockupImage.style.background = `linear-gradient(135deg, ${data.color}33, ${data.color}11)`;
          mockupPlatform.textContent = data.platform;
          mockup.style.opacity = '1';
          mockup.style.transform = '';
        }, 220);

        mockup.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
      });
    });
  }
}