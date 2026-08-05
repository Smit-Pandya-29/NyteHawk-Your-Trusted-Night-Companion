import React from 'react';
import '../styles/Help.css';
import { HelpCircle, MapPin, Globe, HeadphonesIcon } from 'lucide-react';

const Help = () => {
  return (
    <div className="help-container">
      <div className="help-header">
        <div className="help-icon-wrapper"><HelpCircle size={48} /></div>
        <h1 className="gradient-text">Need Help?</h1>
        <p className="help-subtitle">We're here to answer your questions and guide you.</p>
      </div>

      <div className="help-content">
        <p className="help-intro">
          NyteHawk helps you find essential services like ATMs, pharmacies, and food outlets during late-night hours. Here are some common questions.
        </p>

        <div className="faq-grid">
          <div className="faq-card">
            <div className="faq-icon"><MapPin size={24} /></div>
            <div className="faq-text">
              <h3>Why aren’t we using your current location?</h3>
              <p>
                Many laptops and desktop browsers don’t support precise GPS-based geolocation. Since accurate location access is limited on such devices, we’ve designed NyteHawk to work perfectly using:
              </p>
              <ul className="faq-list">
                <li><span className="bullet-emoji">✅</span> Prime Localities (handpicked zones)</li>
                <li><span className="bullet-emoji">✅</span> Pincode search (for specific targeting)</li>
                <li><span className="bullet-emoji">✅</span> Mobile GPS (works great on phones!)</li>
              </ul>
            </div>
          </div>

          <div className="faq-card">
            <div className="faq-icon"><Globe size={24} /></div>
            <div className="faq-text">
              <h3>Where is NyteHawk currently available?</h3>
              <p>
                NyteHawk is currently optimized for <strong>Ahmedabad</strong>. We are actively planning to expand our intelligent late-night mapping to other major cities soon. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>

        <div className="help-support-card">
          <div className="support-icon"><HeadphonesIcon size={32} /></div>
          <h3>Still need support?</h3>
          <p>
            You can reach out via our <a href="/contact" className="highlight-link">Contact</a> page or email us directly at <strong>support@nytehawk.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
