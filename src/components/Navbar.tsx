import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? 'bg-primary/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center"
          >
            <Code className="h-8 w-8 text-accent" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-accent hover:text-white capitalize transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://github.com/Dorindeacuu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-accent hover:text-white transition-colors"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/dorin-deacu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-accent hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:dorindeacu@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="text-accent hover:text-white transition-colors"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-accent hover:text-white hover:bg-primary/50"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-primary/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-accent hover:text-white py-2 capitalize text-lg"
              >
                {item}
              </button>
            ))}
            <div className="flex items-center space-x-6 pt-4 border-t border-accent/20">
              <a
                href="https://github.com/Dorindeacuu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/dorin-deacu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:dorindeacu@gmail.com"
                className="text-accent hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
