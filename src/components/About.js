import { motion } from "framer-motion";
import { FaUser, FaCode, FaRocket, FaHeart, FaAward, FaGraduationCap } from "react-icons/fa";
import "./About.css";

const About = () => {
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

  const aboutPoints = [
    {
      icon: FaCode,
      title: "System Analysis",
      description:
        "Learning how to understand and evaluate different IT systems and processes",
    },
    {
      icon: FaRocket,
      title: "Problem Solving",
      description:
        "Practicing how to find issues and come up with simple, effective solutions",
    },
    {
      icon: FaHeart,
      title: "User Support",
      description:
        "Developing skills in helping users and providing basic technical assistance",
    },
    {
      icon: FaAward,
      title: "Quality Assurance",
      description:
        "Becoming familiar with maintaining good standards and practices in IT-related tasks",
    },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="about-header" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Get to know more about my journey and passion for technology
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div className="about-text" variants={itemVariants}>
              <div className="about-intro">
                <FaUser className="intro-icon" />
                <h3>My Story</h3>
                <p>
                  I am an Information Technology graduate with a strong interest
                  in technology and how it can be applied in real situations. I
                  aim to use my technical skills in a professional setting and
                  work effectively as part of a team. My academic background has
                  given me a solid foundation in IT, and I continue to improve
                  my knowledge and skills to become more capable and versatile
                  in the field.
                </p>
              </div>

              <div className="about-values">
                <h4>My Values</h4>
                <ul>
                  <li>Continuous Learning and Growth</li>
                  <li>Doing things with honesty and effort</li>
                  <li>Collaborative Teamwork</li>
                  <li>Open to exploring new tech and ideas</li>
                </ul>
              </div>
            </motion.div>

            <motion.div className="about-features" variants={itemVariants}>
              {aboutPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="feature-icon">
                    <point.icon />
                  </div>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="education-card" variants={itemVariants}>
            <div className="section-header">
              <FaGraduationCap className="section-icon" />
              <h3>Education</h3>
            </div>

            {education.map((edu, index) => (
              <div key={index} className="education-content">
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
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
