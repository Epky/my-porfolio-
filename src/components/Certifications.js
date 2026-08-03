import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaCheckCircle, FaDownload, FaEye, FaMedal, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './Certifications.css';

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/portfolio-knowledge.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load portfolio data");
        return res.json();
      })
      .then((data) => {
        if (active) setCertifications(data.certifications || []);
      })
      .catch(() => {
        if (active) setCertifications([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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
    <section id="certifications" className="certifications">
      <div className="container">
        <motion.div
          className="certifications-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="certifications-header" variants={itemVariants}>
            <h2 className="section-title">Certifications & Achievements</h2>
          </motion.div>

          {loading ? (
            <div className="certifications-loading">
              <p>Loading certifications...</p>
            </div>
          ) : (
            <>
              <div className="certifications-grid">
                {(showAll ? certifications : certifications.slice(0, 4)).map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="certification-card"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="cert-header">
                      <div className="cert-badge">
                        <div className="badge-placeholder">
                          <FaMedal className="badge-icon" />
                        </div>
                      </div>
                      <div className="cert-info">
                        <h3 className="cert-title">{cert.title}</h3>
                        <p className="cert-issuer">{cert.issuer}</p>
                        <div className="cert-meta">
                          <span className="cert-date">
                            <FaCalendarAlt />
                            {cert.date}
                          </span>
                          <span className="cert-id">ID: {cert.credentialId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="cert-content">
                      <p className="cert-description">{cert.description}</p>

                      <div className="cert-skills">
                        <h4>Skills Validated:</h4>
                        <div className="skills-tags">
                          {cert.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="skill-tag">
                              <FaCheckCircle />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="cert-actions">
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-btn verify-btn"
                        >
                          <FaEye />
                          View
                        </a>
                        <a
                          href={cert.certificateUrl}
                          download
                          className="action-btn download-btn"
                        >
                          <FaDownload />
                          Download
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {certifications.length > 4 && (
                <motion.div
                  className="see-all-container"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    className="see-all-btn"
                    onClick={() => setShowAll(!showAll)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showAll ? (
                      <>
                        <FaChevronUp />
                        Show Less
                      </>
                    ) : (
                      <>
                        <FaChevronDown />
                        See All Certifications ({certifications.length})
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
