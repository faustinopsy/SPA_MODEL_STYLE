import { Component } from '../core/Component.js';
import { icon } from '../utils/icons.js';

export class Contact extends Component {
  render() {
    return `
      <section class="contact" id="contact">
        <div class="glow-blob" style="bottom:0;right:10%;width:350px;height:350px;background:var(--secondary);"></div>
        <div class="container">
          <div class="contact__inner">
            <div class="contact__info sr-left">
              <div class="section-badge">${icon('mail', 14)} GET IN TOUCH</div>
              <h2>Have Questions?<br>We Have Answers</h2>
              <p>Our support team is available around the clock to help you with anything you need.</p>
              <div class="contact__methods">
                <div class="contact__method">
                  <div class="contact__method-icon contact__method-icon--email">${icon('mail', 22, '#3b82f6')}</div>
                  <div>
                    <div class="contact__method-label">Email Us</div>
                    <div class="contact__method-value">hello@reelease.ai</div>
                  </div>
                </div>
                <div class="contact__method">
                  <div class="contact__method-icon contact__method-icon--chat">${icon('msgCircle', 22, '#10b981')}</div>
                  <div>
                    <div class="contact__method-label">Live Chat</div>
                    <div class="contact__method-value">Available 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            <form class="contact__form sr-right" id="contactForm" novalidate>
              <div class="form-group">
                <label for="contactName">Your Name</label>
                <input type="text" id="contactName" name="name" placeholder="John Doe" required />
              </div>
              <div class="form-group">
                <label for="contactEmail">Email Address</label>
                <input type="email" id="contactEmail" name="email" placeholder="john@example.com" required />
              </div>
              <div class="form-group">
                <label for="contactSubject">Subject</label>
                <input type="text" id="contactSubject" name="subject" placeholder="How can we help?" />
              </div>
              <div class="form-group">
                <label for="contactMessage">Message</label>
                <textarea id="contactMessage" name="message" placeholder="Tell us more about your inquiry..."></textarea>
              </div>
              <button type="submit" class="btn-primary">
                <span id="submitLabel">${icon('send', 16, '#fff')} Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>`;
  }

  afterMount() {
    this._setupForm();
  }

  _setupForm() {
    const form = this.$('#contactForm');
    const label = this.$('#submitLabel');

    form.addEventListener('submit', e => {
      e.preventDefault();
      label.innerHTML = 'Sending...';

      setTimeout(() => {
        label.innerHTML = `${icon('circleCheck', 16, '#10b981')} Message Sent!`;
        form.reset();
        setTimeout(() => {
          label.innerHTML = `${icon('send', 16, '#fff')} Send Message`;
        }, 3000);
      }, 1500);
    });
  }
}
