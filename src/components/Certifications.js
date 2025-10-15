import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCertificate, FaGraduationCap, FaExternalLinkAlt, 
  FaCalendarAlt, FaCheckCircle, FaDownload, FaEye, FaMedal, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './Certifications.css';

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);

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

  const certifications = [
    {
      id: 1,
      title: "FreeCodeCamp Certification",
      issuer: "FreeCodeCamp",
      date: "2024",
      credentialId: "FCC-2024-001",
      description: "Comprehensive web development certification covering HTML, CSS, JavaScript, and modern web technologies.",
      skills: ["HTML", "CSS", "JavaScript", "Web Development", "Responsive Design"],
      verificationUrl: "https://www.freecodecamp.org/certification/fcc27367a88-81ce-4624-a026-854993e51971/responsive-web-design",
      certificateUrl: "/images/certifications/freecodecamp.png",
      badge: "/images/certifications/freecodecamp.png"
    },
    {
      id: 2,
      title: "Introduction to CSS",
      issuer: "Technical Education and Skills Development Authority",
      date: "2024",
      credentialId: "TESDA-CSS-2024-002",
      description: "Fundamental CSS certification covering styling, layout, and responsive design principles.",
      skills: ["CSS", "Styling", "Layout", "Responsive Design", "Web Design"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/Intoduction to CSS.pdf",
      badge: "/images/certifications/Intoduction to CSS.pdf"
    },
    {
      id: 3,
      title: "Installing and Configuring Computer Systems",
      issuer: "Technical Education and Skills Development Authority",
      date: "2022",
      credentialId: "TESDA-ICCS-2022-003",
      description: "Certification in computer system installation, configuration, and troubleshooting.",
      skills: ["Computer Hardware", "System Installation", "Configuration", "Troubleshooting", "Maintenance"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/Installing and Configuring Computer Systems.pdf",
      badge: "/images/certifications/Installing and Configuring Computer Systems.pdf"
    },
    {
      id: 4,
      title: "Setting Up Computer Servers",
      issuer: "Technical Education and Skills Development Authority",
      date: "2023",
      credentialId: "TESDA-SUCS-2023-004",
      description: "Certification in server setup, configuration, and management for enterprise environments.",
      skills: ["Server Administration", "Network Setup", "System Configuration", "Security", "Monitoring"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/Setting Up Computer Servers.pdf",
      badge: "/images/certifications/Setting Up Computer Servers.pdf"
    },
    {
      id: 5,
      title: "Setting Up Computer Networks",
      issuer: "Technical Education and Skills Development Authority",
      date: "2023",
      credentialId: "TESDA-SUCN-2023-005",
      description: "Comprehensive network setup and configuration certification covering LAN, WAN, and network security.",
      skills: ["Network Setup", "LAN/WAN", "Network Security", "Protocols", "Troubleshooting"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/Setting Up Computer Networks.pdf",
      badge: "/images/certifications/Setting Up Computer Networks.pdf"
    },
    {
      id: 6,
      title: "Maintaining Computer Systems and Networks",
      issuer: "Technical Education and Skills Development Authority",
      date: "2023",
      credentialId: "TESDA-MCSN-2023-006",
      description: "Advanced certification in computer system and network maintenance, monitoring, and optimization.",
      skills: ["System Maintenance", "Network Monitoring", "Performance Optimization", "Preventive Maintenance", "Documentation"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/Maintaining Computer Systems and Networks.pdf",
      badge: "/images/certifications/Maintaining Computer Systems and Networks.pdf"
    },
    {
      id: 7,
      title: "SMAW (Shielded Metal Arc Welding) NC II",
      issuer: "Technical Education and Skills Development Authority",
      date: "2023",
      credentialId: "TESDA-SMAW-2023-007",
      description: "National Certificate Level II in Shielded Metal Arc Welding, demonstrating proficiency in welding techniques and safety procedures.",
      skills: ["Welding", "Metal Fabrication", "Safety Procedures", "Quality Control", "Equipment Operation"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/smaw-ncll.jpg",
      badge: "/images/certifications/smaw-ncll.jpg"
    },
    {
      id: 8,
      title: "Driving NC II",
      issuer: "Technical Education and Skills Development Authority",
      date: "2023",
      credentialId: "TESDA-DRIVING-2023-008",
      description: "National Certificate Level II in Driving, certifying competency in professional driving skills and road safety.",
      skills: ["Professional Driving", "Road Safety", "Vehicle Maintenance", "Traffic Rules", "Customer Service"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/driving-ncll.jpg",
      badge: "/images/certifications/driving-ncll.jpg"
    },
    {
      id: 9,
      title: "API (Application Programming Interface) Certification",
      issuer: "Technical Education and Skills Development Authority",
      date: "2023",
      credentialId: "TESDA-API-2023-009",
      description: "Certification in Application Programming Interface development, covering RESTful services, API design, and integration techniques.",
      skills: ["API Development", "RESTful Services", "JSON", "HTTP Protocols", "Integration"],
      verificationUrl: "https://tesda.gov.ph",
      certificateUrl: "/images/certifications/api-cert.jpg",
      badge: "/images/certifications/api-cert.jpg"
    },
    {
      id: 10,
      title: "DICT Digital Literacy Certification",
      issuer: "Department of Information and Communications Technology",
      date: "2024",
      credentialId: "DICT-DLC-2024-010",
      description: "Comprehensive digital literacy certification covering digital skills, online safety, and modern technology applications.",
      skills: ["Digital Literacy", "Online Safety", "Digital Tools", "Technology Applications", "Digital Communication"],
      verificationUrl: "https://dict.gov.ph",
      certificateUrl: "/images/certifications/certificate2.png",
      badge: "/images/certifications/certificate2.png"
    },
    {
      id: 11,
      title: "DICT Cybersecurity Fundamentals",
      issuer: "Department of Information and Communications Technology",
      date: "2024",
      credentialId: "DICT-CSF-2024-011",
      description: "Fundamental cybersecurity certification covering basic security principles, threat awareness, and protection strategies.",
      skills: ["Cybersecurity", "Threat Awareness", "Security Principles", "Data Protection", "Risk Management"],
      verificationUrl: "https://dict.gov.ph",
      certificateUrl: "/images/certifications/certificate3.png",
      badge: "/images/certifications/certificate3.png"
    },
    {
      id: 12,
      title: "DICT Digital Innovation Program",
      issuer: "Department of Information and Communications Technology",
      date: "2024",
      credentialId: "DICT-DIP-2024-012",
      description: "Advanced digital innovation certification focusing on emerging technologies, digital transformation, and innovation strategies.",
      skills: ["Digital Innovation", "Emerging Technologies", "Digital Transformation", "Innovation Strategies", "Technology Leadership"],
      verificationUrl: "https://dict.gov.ph",
      certificateUrl: "/images/certifications/certificate4.png",
      badge: "/images/certifications/certificate4.png"
    }
  ];


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


        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
