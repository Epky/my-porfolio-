import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaDownload, FaCode, FaLaptopCode } from 'react-icons/fa';
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

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/Epky', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/edsel-payan-67452b255/', label: 'LinkedIn' },
    { icon: FaFacebook, url: 'https://www.facebook.com/edselpayan', label: 'Facebook' },
    { icon: FaEnvelope, url: 'https://mail.google.com/mail/u/2/#inbox', label: 'gmail' }
  ];

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
              <span className="title">Web Developer</span>
            </motion.h1>
            
            <motion.p className="hero-description" variants={itemVariants}>
              "I'm a web developer who builds user-friendly and responsive websites to help people and businesses online."
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
                href="/images/resume/Edsel.pdf"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                download
              >
                <FaDownload />
                Download Resume
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
                  src="/images/profile/sel.jpg" 
                  alt="Edsel Suralta Payan - Web Developer"
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
                <FaLaptopCode />
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
                <FaCode />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="social-links vertical"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
