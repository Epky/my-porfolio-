import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaLightbulb,
  FaMapMarkerAlt,
  FaEye,
} from "react-icons/fa";
import "./Experience.css";
import portfolioData from "../data/portfolioData";

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

  const workExperience = portfolioData.workExperience.map((exp) => ({
    ...exp,
    achievementsLabel: "Key Responsibilities",
    achievements: exp.responsibilities,
    technologiesLabel: "Skills & Technologies",
    technologies: exp.skills,
  }));

  const experiences = portfolioData.learningExperiences.map((exp) => ({
    ...exp,
    achievementsLabel: "Key Achievements",
    achievements: exp.highlights,
    technologiesLabel: "Technologies Used",
    technologies: exp.technologies,
  }));

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
