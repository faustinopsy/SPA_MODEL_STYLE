import { Component } from '../core/Component.js';
import { TestimonialsMarquee } from '../animations/TestimonialsMarquee.js';

const TESTIMONIALS = [
  { name: 'Michael Carter',  role: 'Social Media Creator',     initial: 'M', text: 'I use this platform daily for generating Instagram reels and creative visuals. The prompts work amazingly well, and the output quality is far better than many other AI tools I have tried.' },
  { name: 'Sarah Johnson',   role: 'Creative Director',         initial: 'S', text: 'This platform completely changed the way we create social media content. The AI-generated visuals are incredibly detailed, and the video generation tools save us hours of editing time.' },
  { name: 'Emma Williams',   role: 'Marketing Manager',         initial: 'E', text: 'The interface is very beginner-friendly, and generating cinematic visuals takes only a few seconds. It helped our marketing team create campaigns much faster.' },
  { name: 'Daniel Lee',      role: 'Digital Artist',            initial: 'D', text: 'I was amazed by the fantasy environments and anime-style outputs. The platform makes it easy to bring creative ideas to life with detailed prompts.' },
  { name: 'Olivia Brown',    role: 'Influencer & Content Creator', initial: 'O', text: 'The image-to-video feature is outstanding. I can create short cinematic reels for social media in minutes without advanced editing skills.' },
  { name: 'James Anderson',  role: 'Brand Strategist',          initial: 'J', text: 'The generated visuals look premium and polished. We used the platform for ad creatives and received excellent engagement from our campaigns.' },
  { name: 'Sophia Martinez', role: 'Freelance Designer',        initial: 'S', text: 'From cyberpunk to realistic photography, the platform supports a huge range of creative styles. It gives creators endless possibilities.' },
  { name: 'Ethan Walker',    role: 'UI/UX Designer',            initial: 'E', text: 'Everything from prompt writing to video generation feels smooth and intuitive. The platform is fast, reliable, and constantly improving.' },
  { name: 'Ava Thompson',    role: 'Creative Agency Owner',     initial: 'A', text: 'Our agency uses this platform to generate creative concepts and marketing visuals for clients. It has significantly improved our workflow efficiency.' },
  { name: 'Noah Garcia',     role: 'Entrepreneur',              initial: 'N', text: 'Even without design experience, I was able to create stunning visuals using simple prompts. The platform makes creativity accessible to everyone.' },
];

const AVATAR_COLORS = [
  'linear-gradient(135deg,#3b82f6,#a78bfa)',
  'linear-gradient(135deg,#ec4899,#f59e0b)',
  'linear-gradient(135deg,#10b981,#3b82f6)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#a78bfa,#ec4899)',
];

function cardHTML(t, i) {
  return `
    <div class="testimonial-card">
      <div class="testimonial-card__stars">★★★★★</div>
      <p class="testimonial-card__text">"${t.text}"</p>
      <div class="testimonial-card__author">
        <div class="testimonial-card__avatar" style="background:${AVATAR_COLORS[i % AVATAR_COLORS.length]}">
          ${t.initial}
        </div>
        <div>
          <div class="testimonial-card__name">${t.name}</div>
          <div class="testimonial-card__role">${t.role}</div>
        </div>
      </div>
    </div>`;
}

export class Testimonials extends Component {
  #marquee = null;

  render() {
    const half = Math.ceil(TESTIMONIALS.length / 2);
    const row1 = TESTIMONIALS.slice(0, half);
    const row2 = TESTIMONIALS.slice(half);

    // Duplicar para loop contínuo
    const row1HTML = [...row1, ...row1].map((t, i) => cardHTML(t, i)).join('');
    const row2HTML = [...row2, ...row2].map((t, i) => cardHTML(t, i)).join('');

    return `
      <section class="testimonials" id="testimonials">
        <div class="container">
          <div class="testimonials__header sr-hidden">
            <div class="section-badge">❤️ WALL OF LOVE</div>
            <h2>Loved by Creators Everywhere</h2>
            <p>Join thousands of creators who are already using Reelease AI to supercharge their content.</p>
          </div>
        </div>
        <div class="testimonials__marquee">
          <div class="testimonials__track testimonials__track--row1">
            ${row1HTML}
          </div>
          <div class="testimonials__track testimonials__track--row2">
            ${row2HTML}
          </div>
        </div>
      </section>`;
  }

  afterMount() {
    this.#marquee = new TestimonialsMarquee(this.container);
    this.#marquee.init();
    this._addCleanup(() => this.#marquee.destroy());
  }
}