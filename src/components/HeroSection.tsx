import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CinematicEntrance from './CinematicEntrance'; // Import the new component

const HeroSection = () => {
  const [showCinematicEntrance, setShowCinematicEntrance] = useState(true);
  const particleCount = 100;
  const [animatedText, setAnimatedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50); // Faster initial typing

  const phrases = [
    "Dorin-Marian", // Starts with this, will be deleted
    "A Coding Enthusiast",
    "A Data and BI Explorer",
    "An Insight-Driven Builder",
    "Dorin-Marian"  // Ends with this, and it will stick
  ];
  const period = 500; // Shorter pause before deleting

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map(() => ({
      style: {
        width: Math.random() * 10 + 'px',
        height: Math.random() * 10 + 'px',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
      },
      animate: {
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0.3, 0.8, 0.3],
      },
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: 'reverse' as const, // Added 'as const'
      },
    }));
  }, [particleCount]);

  useEffect(() => {
    if (showCinematicEntrance) return; // Don't run typing animation if cinematic entrance is showing

    // Stop animation if it's the last phrase and it's fully typed
    if (loopNum % phrases.length === phrases.length - 1 && animatedText === phrases[phrases.length - 1] && !isDeleting) {
      return;
    }

    let ticker = setTimeout(() => {
      tick();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [animatedText, isDeleting, loopNum, typingSpeed, showCinematicEntrance, phrases]); // Add showCinematicEntrance and phrases to dependency array

  const tick = () => {
    let i = loopNum % phrases.length;
    let fullText = phrases[i];
    let updatedText = isDeleting
      ? fullText.substring(0, animatedText.length - 1)
      : fullText.substring(0, animatedText.length + 1);

    setAnimatedText(updatedText);

    if (isDeleting) {
      setTypingSpeed(35); // Deleting speed
    }

    if (!isDeleting && updatedText === fullText) {
      // If it's the last phrase, don't start deleting
      if (i === phrases.length - 1) {
        // Animation stops here, useEffect will prevent further ticks
        return;
      }
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(50); // Faster typing for next phrase
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnimationComplete = () => {
    setShowCinematicEntrance(false);
  };

  if (showCinematicEntrance) {
    return <CinematicEntrance onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Particle Background */}
      <div className="absolute inset-0">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-accent/50"
            style={particle.style}
            animate={particle.animate}
            transition={particle.transition}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-accent mb-4">
            <span className="block">Hi I'm</span>
            <span className="block typing-text h-20 md:h-24 lg:h-28">
              {animatedText}
              <span 
                className="blinking-cursor"
                style={{
                  display: 'inline-block',
                  width: '2px', // Adjust for desired thickness
                  height: '1em', // Matches font size height
                  backgroundColor: 'currentColor', // Uses current text color
                  marginLeft: '4px', // Small gap after text
                  verticalAlign: 'baseline', // Aligns with the text baseline
                }}
              ></span>
            </span>
          </h1>
          
          <motion.div
            className="w-24 h-1 bg-accent mb-6"
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-lg md:text-xl text-accent/90 max-w-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A motivated developer focused on building clean, responsive web applications
            and data-driven solutions. My goal is to create digital experiences
            that are both practical and easy to use, turning insights into action.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              onClick={scrollToProjects}
              className="bg-accent text-primary hover:bg-accent/90 px-8 py-6 rounded-full text-lg"
            >
              View My Work
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.div>
      
      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#FFF9EF"
            fillOpacity="1"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,170.7C960,139,1056,85,1152,80C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
