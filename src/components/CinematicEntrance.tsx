import React, { useState, useEffect } from 'react';
import '@/styles/CinematicEntrance.css'; // We'll create this CSS file next

interface CinematicEntranceProps {
  onAnimationComplete: () => void;
}

const CinematicEntrance: React.FC<CinematicEntranceProps> = ({ onAnimationComplete }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  
  useEffect(() => {
    // Generate random particles
    const particlesArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
    }));
    
    setParticles(particlesArray);
    
    // Animation sequence
    const timer1 = setTimeout(() => setTextVisible(true), 1000); // Text appears after 1s
    const timer2 = setTimeout(() => {
      onAnimationComplete(); // Signal completion after 3s total
    }, 3000); 
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onAnimationComplete]);
  
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle" // Class for CSS animation
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: Math.random(),
            transform: `scale(${Math.random() * 3})`,
            animation: `explode 1.5s ease-out forwards`,
            animationDelay: `${Math.random() * 1.5}s`,
          }}
        />
      ))}
      
      <div className={`text-center transform transition-all duration-1000 ${
        textVisible ? 'scale-100 opacity-100' : 'scale-150 opacity-0'
      }`}>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Loading...</h1>
      </div>
    </div>
  );
};

export default CinematicEntrance;
