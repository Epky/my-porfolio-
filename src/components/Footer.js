import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaHeart, 
  FaArrowUp, FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';
import './Footer.css';
import './SocialIcons.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/Epky', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: FaFacebook, url: 'https://www.facebook.com/edselpayan', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://instagram.com/yourusername', label: 'Instagram' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-section footer-about">
              <h3 className="footer-title">Edsel Suralta Payan</h3>
              <p className="footer-description">
                Web Developer passionate about creating user-friendly and responsive websites 
                to help people and businesses online. Let's build something amazing together!
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <FaEnvelope />
                  <span>hadogchess@gmail.com</span>
                </div>
                <div className="contact-item">
                  <FaPhone/>
                  <span>09913615463</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>Digos City, Philippines</span>
                </div>
              </div>
            </div>

            <div className="footer-section footer-links">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-nav">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="footer-link"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section footer-social">
              <h4 className="footer-subtitle">Connect With Me</h4>
              <div className="social-links horizontal">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link footer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
              <p className="social-text">
                Connect with me on social media
              </p>
            </div>
          </motion.div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="footer-copyright">
              <p>
                © {currentYear} Edsel Suralta Payan. Made with{' '}
                <FaHeart className="heart-icon" /> and React
              </p>
            </div>
          </motion.div>
        </div>

        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <FaArrowUp />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
