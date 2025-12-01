import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaCalendarAlt,
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

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "University of Mindanao",
      location: "Digos City, Philippines",
      period: "2022 - 2026",
      relevant: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "Database Systems",
        "Web Development",
        "Mobile Application Development",
      ],
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
            <h2 className="section-title">Learning Experiences & Education</h2>
            <p className="section-subtitle">
              My learning experiences, workshops, and academic background
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
            <motion.div className="work-experience" variants={itemVariants}>
              <div className="section-header">
                <FaBriefcase className="section-icon" />
                <h3>Learning Experiences & Projects</h3>
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
                    </div>

                    <div className="relevant-courses">
                      <h5>Relevant Coursework:</h5>
                      <div className="course-tags">
                        {edu.relevant.map((course, courseIndex) => (
                          <span key={courseIndex} className="course-tag">
                            {course}
                          </span>
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
