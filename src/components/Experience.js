import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
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

  const experiences = [
    {
      title: "Hack the System: Offensive Security & Ethical Hacking",
      role: "Participant",
      location: "Mapua Malayan Colleges Mindanao",
      period: "October 7, 2024",
      type: "Workshop",
      description: "Hands-on workshop focused on offensive security, penetration testing, and core cybersecurity practices.",
      achievements: [
        "Learned penetration testing techniques and fundamentals of cybersecurity",
        "Acquired practical skills in offensive security methodologies",
        "Developed understanding of system vulnerabilities and defense mechanisms"
      ],
      technologies: ["Offensive Security", "Penetration Testing", "Cybersecurity", "Security Analysis"]
    },
    {
      title: "Entrepreneurial Journey Program",
      company: "Wadhwani Foundation",
      location: "University of Mindanao",
      period: "2024",
      type: "Program",
      description: "Explored Ignite, Liftoff, and Accelerate programs designed to build entrepreneurial mindset and skills.",
      achievements: [
        "Engaged in global learning sessions focused on innovation and startup development",
        "Developed entrepreneurial mindset and business skills",
        "Participated in comprehensive programs covering business fundamentals"
      ],
      technologies: ["Entrepreneurship", "Business Development", "Innovation", "Startup Management"]
    },
    {
      title: "RentMate",
      company: "University of Mindanao - Capstone Project",
      location: "Digos City, Philippines",
      period: "Ongoing",
      type: "Project",
      description: "A full-featured rental management platform designed to streamline operations for rental businesses with multi-role architecture and automated processes.",
      achievements: [
        "Implemented multi-role system (Admin, Staff, Customer) with role-specific dashboards",
        "Built real-time inventory management with dynamic tracking and automated updates",
        "Integrated PayMongo payment gateway with multiple payment methods and webhook processing",
        "Developed comprehensive analytics dashboard with revenue reporting and performance tracking",
        "Created customer engagement tools with messaging system and real-time notifications",
        "Automated complete rental lifecycle from booking to payment verification"
      ],
      technologies: ["PHP 8.x", "MySQL", "JavaScript", "Bootstrap 5", "PayMongo API", "MVC Pattern", "RESTful API", "Webhook Processing"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "University of Mindanao",
      location: "Digos City, Philippines",
      period: "2022 - 2026",
      gpa: "2.0/2.5",
      relevant: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "Database Systems",
        "Web Development",
        "Mobile Application Development"
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          className="experience-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="experience-header" variants={itemVariants}>
            <h2 className="section-title">Experience & Education</h2>
            <p className="section-subtitle">
              My professional journey and academic background
            </p>
            <motion.a
              href="/images/certifications/Edsel Suralta Payan.pdf"
              className="download-resume-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              <FaDownload />
              Download Resume
            </motion.a>
          </motion.div>

          <div className="experience-timeline">
            <motion.div className="work-experience" variants={itemVariants}>
              <div className="section-header">
                <FaBriefcase className="section-icon" />
                <h3>Work Experience</h3>
              </div>
              
              <div className="timeline">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="timeline-item"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="job-header">
                        <h4 className="job-title">{exp.title}</h4>
                        <div className="job-meta">
                          <span className="company">{exp.company}</span>
                          <span className="period">{exp.period}</span>
                        </div>
                        <div className="job-location">
                          <FaMapMarkerAlt />
                          <span>{exp.location}</span>
                          <span className="job-type">{exp.type}</span>
                        </div>
                      </div>
                      
                      <p className="job-description">{exp.description}</p>
                      
                      <div className="achievements">
                        <h5>Key Achievements:</h5>
                        <ul>
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="technologies">
                        <h5>Technologies Used:</h5>
                        <div className="tech-tags">
                          {exp.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="education" variants={itemVariants}>
              <div className="section-header">
                <FaCalendarAlt className="section-icon" />
                <h3>Education</h3>
              </div>
              
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="education-content">
                    <h4 className="degree">{edu.degree}</h4>
                    <div className="education-meta">
                      <span className="school">{edu.school}</span>
                      <span className="location">{edu.location}</span>
                      <span className="period">{edu.period}</span>
                      <span className="gpa">GPA: {edu.gpa}</span>
                    </div>
                    
                    <div className="relevant-courses">
                      <h5>Relevant Coursework:</h5>
                      <div className="course-tags">
                        {edu.relevant.map((course, courseIndex) => (
                          <span key={courseIndex} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
