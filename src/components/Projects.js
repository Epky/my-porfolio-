import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaStar,
  FaEye,
  FaGitAlt,
  FaReact,
  FaNodeJs,
  FaJs,
  FaPython,
  FaDatabase,
  FaCloud,
  FaTools,
} from "react-icons/fa";
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

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

  const projects = [
    {
      id: 1,
      title: "🛒 G.A. Ruiz Enterprise Business Hub",
      description:
        "A web-based e-commerce and business management platform designed to streamline sales and operations for G.A. Ruiz Enterprise. The system provides an online shop, real-time inventory management, sales analytics, and a customer dashboard. Built with PHP and MySQL for backend logic, combined with Bootstrap for responsive UI design.",
      image: "/images/project/GA-Ruez.png",
      github: "https://github.com/Epky/GA-system",
      live: "https://ga-ruiz-enterprise-demo.com",
      category: "fullstack",
      technologies: ["PHP", "MySQL", "Bootstrap", "HTML", "CSS", "JavaScript"],
      features: [
        "User Authentication (customer & admin roles)",
        "Product Listings with Inventory Management",
        "Sales Tracking & Automated Reports",
        "Order Management with Delivery Status Updates",
        "Admin Dashboard with Search & Analytics",
      ],
    },
  ];

  const categories = [
    { id: "all", label: "All Projects", icon: FaCode },
    { id: "frontend", label: "Frontend", icon: FaReact },
    { id: "backend", label: "Backend", icon: FaNodeJs },
    { id: "fullstack", label: "Full Stack", icon: FaTools },
  ];

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
    };
    return iconMap[tech] || FaCode;
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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

          <motion.div className="project-filters" variants={itemVariants}>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`filter-btn ${
                  activeFilter === category.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="projects-grid">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
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
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt />
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
                        {project.features.slice(0, 3).map((feature, index) => (
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
