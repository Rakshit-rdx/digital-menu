import React from 'react';
import ParticleBackground from './ParticleBackground';
import Logo from './Logo';

const WelcomeScreen: React.FC = () => {
  return (
    <div
      className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center`}
    >
      <ParticleBackground />
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="animate-entrance-1">
          <Logo />
        </div>
        
        <h1 className="font-playfair mt-8 text-5xl md:text-6xl text-[#D4AF37] text-soft-glow animate-entrance-2">
          Ember & Ash
        </h1>
        <p className="mt-2 text-lg text-[#F5F5F5]/80 tracking-widest animate-entrance-3">
          FINE DINING
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;