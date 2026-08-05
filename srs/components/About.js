import React from 'react';
import '../styles/About.css';
import { Mail, Shield, Target, Rocket, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="gradient-text">About NyteHawk</h1>
        <p className="hero-subtitle">Your smart guide to essential services after dark</p>
      </div>
      
      <div className="about-content">
        <div className="about-cards-grid">
          
          <section className="about-card">
            <div className="card-icon-wrapper"><Target size={28} /></div>
            <h2>Our Mission</h2>
            <p>
              In today's fast-paced urban world, accessing essential services like pharmacies,
              ATMs, food outlets, and fuel stations during nighttime hours is often difficult.
              NyteHawk is built to solve this problem — by helping users instantly locate open
              and nearby late-night services using a smart, location-aware map platform.
            </p>
          </section>

          <section className="about-card">
            <div className="card-icon-wrapper"><Rocket size={28} /></div>
            <h2>What We Do</h2>
            <p>
              NyteHawk provides a modern, mobile-responsive interface powered by real-time data.
              Whether you're a student returning late, a traveler in a new city, or someone facing a medical emergency, we help you find:
            </p>
            <ul className="feature-list">
              <li><span className="feature-emoji">💊</span> Open Pharmacies</li>
              <li><span className="feature-emoji">🏧</span> Nearby ATMs</li>
              <li><span className="feature-emoji">🍴</span> Food & Cafes</li>
              <li><span className="feature-emoji">⛽</span> Fuel Stations</li>
            </ul>
          </section>

          <section className="about-card">
            <div className="card-icon-wrapper"><Users size={28} /></div>
            <h2>Who We Are</h2>
            <p>
              We’re a team of passionate developers and designers from Ahmedabad, driven to
              build real-world solutions through technology. NyteHawk started as a group project,
              and now it’s evolving into a smart city utility app for everyone.
            </p>
          </section>

          <section className="about-card">
            <div className="card-icon-wrapper"><Shield size={28} /></div>
            <h2>Privacy & Transparency</h2>
            <p>
              We do not track your identity. Location data is used solely to improve your
              service-finding experience and is never stored or shared with third parties.
            </p>
          </section>

        </div>

        <section className="about-contact-section">
          <h2><Mail size={24} style={{ marginRight: '10px' }} /> Get in Touch</h2>
          <p>
            Have feedback, questions, or ideas? Reach out to us at{' '}
            <a href="mailto:support@nytehawk.com" className="highlight-link">support@nytehawk.com</a> or connect via
            <a href="/contact" className="highlight-link"> our Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;