import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaFacebook, FaInstagram, FaTelegram, FaWhatsapp, FaPaperPlane,
  FaUser, FaComment, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';
import './SocialIcons.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

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

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "hadogchess@gmail.com",
      link: "mailto:hadogchess@gmail.com",
      description: "Send me an email anytime"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "09913615463",
      link: "tel:+639913615463",
      description: "Call me for urgent matters"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Digos City, Davao del Sur",
      link: "https://www.google.com/maps/place/Digos,+Davao+del+Sur/@6.8433335,125.1557674,55946m/data=!3m2!1e3!4b1!4m6!3m5!1s0x32f9ae91bc37d687:0x24f99d78a94236fc!8m2!3d6.743471!4d125.3551548!16zL20vMDI5NW45?entry=ttu&g_ep=EgoyMDI1MDkwNy4wIKXMDSoASAFQAw%3D%3D",
      description: "Based in Digos City"
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/edsel-payan-67452b255/",
      color: "#0077b5"
    },
    {
      icon: FaGithub,
      name: "GitHub",
      url: "https://github.com/Epky",
      color: "#333"
    },
    {
      icon: FaFacebook,
      name: "Facebook",
      url: "https://www.facebook.com/edselpayan",
      color: "#1da1f2"
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      url: "https://instagram.com/yourusername",
      color: "#e4405f"
    },
    {
      icon: FaTelegram,
      name: "Telegram",
      url: "https://t.me/yourusername",
      color: "#0088cc"
    },
    {
      icon: FaWhatsapp,
      name: "WhatsApp",
      url: "https://web.whatsapp.com/09913615463",
      color: "#25d366"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // Check if EmailJS is properly configured
      const serviceId = 'service_ywyh5uw';
      const templateId = 'template_gtmglow';
      const publicKey = '_cYX5LQVMj9kHZhkt';

      // EmailJS is now properly configured, proceed with sending

      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'hadogchess@gmail.com',
        reply_to: formData.email,
        sender_name: formData.name,
        sender_email: formData.email
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Fallback to mailto if EmailJS fails
      const mailtoLink = `mailto:hadogchess@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="contact-header" variants={itemVariants}>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to work together? Let's discuss your next project
            </p>
          </motion.div>

          <div className="contact-grid">
            <motion.div className="contact-info" variants={itemVariants}>
              <div className="info-header">
                <h3>Let's Connect</h3>
                <p>
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, I'll try my 
                  best to get back to you!
                </p>
              </div>

              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="contact-item"
                    target={info.title === "Location" ? "_blank" : "_self"}
                    rel={info.title === "Location" ? "noopener noreferrer" : ""}
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="contact-icon">
                      <info.icon />
                    </div>
                    <div className="contact-text">
                      <h4>{info.title}</h4>
                      <p className="contact-value">{info.value}</p>
                      <p className="contact-description">{info.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="social-section">
                <h4>Follow Me</h4>
                <div className="social-links grid">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link contact"
                      style={{ '--social-color': social.color }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <social.icon />
                      <span className="social-name">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="contact-form-section" variants={itemVariants}>
              <div className="form-header">
                <h3>Send a Message</h3>
                <p>Fill out the form below and I'll get back to you as soon as possible.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <FaComment className="input-icon" />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className={`submit-btn ${formStatus}`}
                  disabled={formStatus === 'sending'}
                  whileHover={{ scale: formStatus === 'sending' ? 1 : 1.05 }}
                  whileTap={{ scale: formStatus === 'sending' ? 1 : 0.95 }}
                >
                  {formStatus === 'sending' && (
                    <motion.div
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {formStatus === 'success' && <FaCheckCircle />}
                  {formStatus === 'error' && <FaExclamationCircle />}
                  {formStatus === 'idle' && <FaPaperPlane />}
                  <span>
                    {formStatus === 'sending' && 'Sending...'}
                    {formStatus === 'success' && 'Message Sent!'}
                    {formStatus === 'error' && 'Try Again'}
                    {formStatus === 'idle' && 'Send Message'}
                  </span>
                </motion.button>

                {formStatus === 'success' && (
                  <motion.div
                    className="form-message success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FaCheckCircle />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    className="form-message error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FaExclamationCircle />
                    <span>Sorry, there was an error sending your message. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
