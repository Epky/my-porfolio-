import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCode, FaRocket, FaHeart, FaGraduationCap, FaAward } from 'react-icons/fa';
import './About.css';

const About = () => {
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

  const aboutPoints = [
    {
      icon: FaCode,
      title: "Web Development",
      description: "Expertise in both frontend and backend technologies"
    },
    {
      icon: FaRocket,
      title: "Performance Optimization",
      description: "Creating fast, scalable, and efficient applications"
    },
    {
      icon: FaHeart,
      title: "User Experience",
      description: "Designing intuitive and engaging user interfaces"
    },
    {
      icon: FaAward,
      title: "Quality Code",
      description: "Writing clean, maintainable, and well-documented code"
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="about-header" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Get to know more about my journey and passion for development
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div className="about-text" variants={itemVariants}>
              <div className="about-intro">
                <FaUser className="intro-icon" />
                <h3>My Story</h3>
                <p>
                I’m a 4th-year student at the University of Mindanao and an aspiring web developer. 
                My journey started with curiosity about how websites are built, 
                and it grew into a passion for creating clean, functional, and user-friendly applications.
                </p>
                <p>
                I focus on learning and applying modern web technologies, working on both 
                frontend and backend development. My goal is to keep improving my skills and build 
                applications that provide real value and a great user experience.
                </p>
              </div>

              <div className="about-values">
                <h4>My Values</h4>
                <ul>
                  <li>Continuous Learning and Growth</li>
                  <li>Clean, Maintainable Code</li>
                  <li>User-Centered Design</li>
                  <li>Collaboration and Teamwork</li>
                  <li>Innovation and Creativity</li>
                </ul>
              </div>
            </motion.div>

            <motion.div className="about-features" variants={itemVariants}>
              {aboutPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="feature-icon">
                    <point.icon />
                  </div>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
