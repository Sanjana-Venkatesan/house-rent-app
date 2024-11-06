import React from 'react';
import './herosection.css'; // Style file for the hero section

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>RentEase</h1>
        <p>Find your perfect rental property today!</p>
        <button>Get Started</button>
      </div>
    </section>
  );
}

export default HeroSection;
