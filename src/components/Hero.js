import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaEye, FaServer, FaNetworkWired } from 'react-icons/fa';
import './Hero.css';
import './SocialIcons.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };



  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-shapes">
          <motion.div
            className="shape shape-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="shape shape-2"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="shape shape-3"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1 className="hero-title">
              <span className="greeting">Hello, I'm</span>
              <span className="name">Edsel Suralta Payan</span>
              <span className="title">4th-year student</span>
            </motion.h1>
            
            <motion.p className="hero-description" variants={itemVariants}>
              "I’m an IT student focused on building my knowledge and gaining experience in various aspects of the Information Technology field."
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope />
                Get In Touch
              </motion.a>
              
              <motion.a
                href="https://epky.github.io/resume/"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEye />
                View Resume
              </motion.a>
            </motion.div>

          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image" 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="image-container">
            <div className="profile-image">
                <img 
                  src="/images/profile/edsel.png" 
                  alt="Edsel Suralta Payan - IT Student"
                  className="profile-photo"
                  onError={(e) => {
                    e.target.src = '/images/profile/profile-placeholder.svg';
                    e.target.onerror = null;
                  }}
                />
            </div>
            <div className="floating-elements">
              <motion.div
                className="floating-element element-1"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaServer />
              </motion.div>
              <motion.div
                className="floating-element element-2"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaNetworkWired />
              </motion.div>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;
