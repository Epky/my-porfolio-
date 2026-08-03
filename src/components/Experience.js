import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaLightbulb,
  FaMapMarkerAlt,
  FaEye,
} from "react-icons/fa";
import "./Experience.css";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const workExperience = [
    {
      title: "Information Technology Intern (On-the-Job Training)",
      company: "BIG 8 Corporate Hotel",
      location: "Digos City, Davao del Sur",
      period: "March - July 2026",
      type: "On-the-Job Training",
      description:
        "Completed an on-the-job training in the Information Technology Department, providing technical support and assisting in the maintenance of the hotel's computer systems, network infrastructure, CCTV surveillance, and office equipment. Collaborated with different departments to resolve technical issues and ensure the smooth operation of daily hotel activities.",
      achievementsLabel: "Key Responsibilities",
      achievements: [
        "Diagnosed and resolved computer hardware and software issues",
        "Installed and configured desktop computer systems",
        "Performed computer setup and workstation transfers",
        "Troubleshot Wi-Fi and network connectivity issues",
        "Monitored and maintained CCTV systems",
        "Assisted in CCTV rewiring and maintenance",
        "Troubleshot and repaired printer-related issues",
        "Installed and replaced UPS (Uninterruptible Power Supply) batteries",
        "Troubleshot telephone line connectivity issues",
        "Provided technical support to multiple hotel departments",
      ],
      technologiesLabel: "Skills & Technologies",
      technologies: [
        "Technical Support",
        "Computer Hardware Troubleshooting",
        "Software Troubleshooting",
        "Computer Installation & Configuration",
        "Network & Wi-Fi Troubleshooting",
        "CCTV Monitoring & Maintenance",
        "Printer Troubleshooting",
        "Hardware Diagnostics",
        "UPS Battery Replacement",
        "Basic IT Infrastructure Support",
      ],
    },
  ];

  const experiences = [
    {
      title: "Hack the System: Offensive Security & Ethical Hacking",
      role: "Participant",
      location: "Mapua Malayan Colleges Mindanao",
      period: "October 7, 2024",
      type: "Workshop",
      description:
        "Hands-on workshop focused on offensive security, penetration testing, and core cybersecurity practices.",
      achievements: [
        "Learned penetration testing techniques and fundamentals of cybersecurity",
        "Acquired practical skills in offensive security methodologies",
        "Developed understanding of system vulnerabilities and defense mechanisms",
      ],
      technologies: [
        "Offensive Security",
        "Penetration Testing",
        "Cybersecurity",
        "Security Analysis",
      ],
    },
    {
      title: "One Day Ideation Bootcamp",
      company: "UMasenso Hub & Wadhwani Foundation",
      location: "UM Digos Gymnasium",
      period: "May 23, 2025",
      type: "Bootcamp",
      description:
        "A dynamic ideation session designed to unlock creativity, spark innovation, and shape entrepreneurial thinking among young minds. Collaborated with students from UM Digos and UM Bansalan to develop innovative solutions for real-world problems.",
      achievements: [
        "Team Member of SalinKaalaman Company - Contributed to winning team's innovative language barrier solution",
        "Participated in team-based ideation sessions with mentorship from industry experts",
        "Presented innovative solution to distinguished panel of judges including UM Research Coordinator",
      ],
      technologies: [
        "Innovation",
        "Entrepreneurship",
        "Team Collaboration",
        "Problem Solving",
        "SDG Alignment",
        "Education Technology",
      ],
    },
  ];

  const timelineBlocks = [
    {
      icon: FaBriefcase,
      title: "Work Experience",
      items: workExperience,
    },
    {
      icon: FaLightbulb,
      title: "Learning Experiences & Projects",
      items: experiences,
    },
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
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">
              My work experience, workshops, and learning journey
            </p>
            <motion.a
              href="https://epky.github.io/resume/"
              className="download-resume-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEye />
              View Resume
            </motion.a>
          </motion.div>

          <div className="experience-timeline">
            {timelineBlocks.map((block, blockIndex) => (
              <motion.div
                className="work-experience"
                variants={itemVariants}
                key={blockIndex}
              >
                <div className="section-header">
                  <block.icon className="section-icon" />
                  <h3>{block.title}</h3>
                </div>

                <div className="timeline">
                  {block.items.map((exp, index) => (
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
                          <h5>{exp.achievementsLabel || "Key Achievements"}</h5>
                          <ul>
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex}>{achievement}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="technologies">
                          <h5>{exp.technologiesLabel || "Technologies Used"}</h5>
                          <div className="tech-tags">
                            {exp.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
