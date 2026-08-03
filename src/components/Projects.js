import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaCode,
  FaReact,
  FaNodeJs,
  FaJs,
  FaPython,
  FaDatabase,
  FaCloud,
  FaDocker,
} from "react-icons/fa";
import "./Projects.css";

const Projects = () => {
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

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/portfolio-knowledge.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load portfolio data");
        return res.json();
      })
      .then((data) => {
        if (active) setProjects(data.projects || []);
      })
      .catch(() => {
        if (active) setProjects([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const getTechIcon = (tech) => {
    const iconMap = {
      React: FaReact,
      "Node.js": FaNodeJs,
      JavaScript: FaJs,
      Python: FaPython,
      MongoDB: FaDatabase,
      PostgreSQL: FaDatabase,
      MySQL: FaDatabase,
      PHP: FaCode,
      HTML: FaCode,
      CSS: FaCode,
      Bootstrap: FaCode,
      Firebase: FaCloud,
      AWS: FaCloud,
      "Tailwind CSS": FaCode,
      "Tailwind": FaCode,
      FastAPI: FaPython,
      "Docker Compose": FaDocker,
    };
    return iconMap[tech] || FaCode;
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="projects-header" variants={itemVariants}>
            <h2 className="section-title"> My Projects</h2>
            <p className="section-subtitle">
              A showcase of my recent work and GitHub repositories
            </p>
          </motion.div>

          <motion.div className="projects-grid">
            {loading ? (
              <div className="projects-loading">
                <p>Loading projects...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="project-card"
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="project-image">
                      {project.image &&
                        project.image !== "/api/placeholder/400/250" ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-img"
                          width="400"
                          height="250"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="image-placeholder"
                        style={{
                          display:
                            project.image &&
                              project.image !== "/api/placeholder/400/250"
                              ? "none"
                              : "flex",
                        }}
                      >
                        <FaCode className="placeholder-icon" />
                      </div>
                      <div className="project-overlay">
                        <div className="project-links">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            title="View on GitHub"
                          >
                            <FaGithub />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="project-content">
                      <div className="project-header">
                        <h3 className="project-title">{project.title}</h3>
                      </div>

                      <p className="project-description">{project.description}</p>

                      <div className="project-features">
                        <h4>Key Features:</h4>
                        <ul>
                          {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="project-technologies">
                        <h4>Technologies:</h4>
                        <div className="tech-list">
                          {project.technologies.map((tech, index) => {
                            const TechIcon = getTechIcon(tech);
                            return (
                              <span key={index} className="tech-item">
                                <TechIcon />
                                <span>{tech}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>

          <motion.div className="github-cta" variants={itemVariants}>
            <div className="cta-content">
              <h3>Want to see more projects?</h3>
              <p>
                Check out my GitHub profile for more repositories and
                contributions
              </p>
              <motion.a
                href="https://github.com/Epky"
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub />
                View All Projects on GitHub
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
