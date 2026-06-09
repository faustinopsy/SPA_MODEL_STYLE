import { Component } from '../core/Component.js';
import { icon } from '../utils/icons.js';

const FAQS = [
  {
    q: 'What is this platform used for?',
    a: 'Reelease AI is an all-in-one content creation platform powered by artificial intelligence. It enables creators and businesses to generate images, videos, and social media content from simple text prompts — in seconds.',
  },
  {
    q: 'How does AI image generation work?',
    a: 'Our AI uses advanced diffusion models trained on billions of images. You provide a text prompt describing what you want, and the AI interprets your description to generate high-resolution, visually accurate images within seconds.',
  },
  {
    q: 'Can I generate videos from images?',
    a: 'Yes! Our Image to Video feature allows you to animate any static image into a smooth, high-quality video clip. Simply upload your image, describe the motion you want, and the AI handles the rest.',
  },
  {
    q: 'What types of images can I create?',
    a: 'You can create virtually any type of visual — from photorealistic portraits and landscapes to anime art, cyberpunk scenes, fantasy environments, product photography, and social media graphics.',
  },
  {
    q: 'What makes a good AI prompt?',
    a: 'A great prompt is specific and descriptive. Include the subject, style, mood, lighting, and composition. For example: "A futuristic city at night, neon lights reflected on wet streets, cinematic wide shot, 8K resolution."',
  },
  {
    q: 'Do I need design experience to use the platform?',
    a: 'Not at all! Reelease AI is designed for everyone — from complete beginners to professional designers. Our intuitive interface guides you through the creation process, and AI does the heavy lifting.',
  },
  {
    q: 'Can I use generated content for social media?',
    a: 'Absolutely. All content generated on our platform can be used for personal and commercial purposes, including social media posts, ads, blog content, and marketing materials.',
  },
  {
    q: 'What video styles are supported?',
    a: 'We support cinematic, anime, cartoon, realistic, time-lapse, slow-motion, and many more styles. You can also add camera movements like zoom, pan, dolly, and rotation effects.',
  },
];

export class FAQ extends Component {
  render() {
    const itemsHTML = FAQS.map((item, i) => `
      <div class="faq-item sr-hidden sr-delay-${Math.min(i + 1, 6)}" data-faq="${i}">
        <button class="faq-item__trigger" aria-expanded="false">
          <span>${item.q}</span>
          <span class="faq-item__icon" aria-hidden="true">${icon('plus', 14, 'currentColor')}</span>
        </button>
        <div class="faq-item__body" role="region">
          <div class="faq-item__answer">${item.a}</div>
        </div>
      </div>`).join('');

    return `
      <section class="faq" id="faq">
        <div class="glow-blob" style="top:10%;left:-10%;width:400px;height:400px;background:var(--primary);"></div>
        <div class="container">
          <div class="faq__inner">
            <div class="faq__header sr-hidden">
              <div class="section-badge">${icon('helpCircle', 14)} COMMON QUESTIONS</div>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know about Reelease AI. Can't find the answer? Contact our team.</p>
            </div>
            <div class="faq__list">
              ${itemsHTML}
            </div>
          </div>
        </div>
      </section>`;
  }

  afterMount() {
    this._setupAccordion();
  }

  _setupAccordion() {
    const items = this.$$('.faq-item');

    items.forEach(item => {
      const trigger = item.querySelector('.faq-item__trigger');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        items.forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
}
