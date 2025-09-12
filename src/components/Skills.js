import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaPhp, 
  FaGitAlt, FaGithub, FaServer, FaCode, FaTools,
  FaWrench, FaCar, FaCertificate
} from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: FaCode,
      skills: [
        { name: "HTML", icon: FaHtml5, level: 40, description: "Markup language para sa structure ng webpage" },
        { name: "CSS", icon: FaCss3Alt, level: 40, description: "Styling para sa design ng webpage" },
        { name: "React.js", icon: FaReact, level: 10, description: "Frontend JavaScript library para sa interactive UI" }
      ]
    },
    {
      title: "Backend Development",
      icon: FaServer,
      skills: [
        { name: "PHP", icon: FaPhp, level: 50, description: "Server-side scripting language para sa backend logic" }
      ]
    },
    {
      title: "Tools / Both (Frontend & Backend)",
      icon: FaTools,
      skills: [
        { name: "GitHub", icon: FaGithub, level: 45, description: "Version control & collaboration tool para sa development workflow" }
      ]
    },
    {
      title: "Technical & Vocational Skills",
      icon: FaCertificate,
      skills: [
        { name: "SMAW Welding", icon: FaWrench, level: 50, description: "Shielded Metal Arc Welding NC II - Professional welding techniques and safety procedures" },
        { name: "Professional Driving", icon: FaCar, level: 50, description: "Driving NC II - Professional driving skills and road safety certification" }
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="skills-header" variants={itemVariants}>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">
              My technical expertise and proficiency levels
            </p>
          </motion.div>

          <div className="skills-grid">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="skill-category"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="category-header">
                  <div className="category-icon">
                    <category.icon />
                  </div>
                  <h3>{category.title}</h3>
                </div>
                
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="skill-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.1 }}
                    >
                      <div className="skill-info">
                        <div className="skill-icon">
                          <skill.icon />
                        </div>
                        <div className="skill-details">
                          <span className="skill-name">{skill.name}</span>
                          {skill.description && (
                            <span className="skill-description">{skill.description}</span>
                          )}
                        </div>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="skills-summary" variants={itemVariants}>
            <div className="summary-content">
              <h3>Technical Summary</h3>
              <p>
              Proficient in web development technologies, with skills in creating structured and styled web pages using HTML and CSS, and foundational 
              knowledge in React.js for building interactive user interfaces. Experienced in PHP for backend development and database-driven applications, 
              with familiarity in MySQL and database management. Knowledgeable in using GitHub for version control and collaborative development.
              </p>
              <p>In addition to IT-related skills, certified in Shielded Metal Arc Welding (SMAW NC II) with expertise in welding techniques and safety procedures, 
                as well as Driving NC II, ensuring professional driving competence and adherence to road safety standards.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
