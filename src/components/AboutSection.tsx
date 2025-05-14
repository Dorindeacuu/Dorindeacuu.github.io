import React from 'react';
import { motion } from 'framer-motion';
import { Code, BarChart, Users } from 'lucide-react';

const skills = [
  {
    icon: <BarChart size={40} />,
    title: 'Data & BI',
    description: 'Turning raw data into clear, useful insights through dashboards, reports, and visual storytelling.'
  },
  {
    icon: <Code size={40} />,
    title: 'Software Development',
    description: 'Building reliable, maintainable tools and apps that solve real problems and support decision-making.'
  },
  {
    icon: <Users size={40} />,
    title: 'Collaboration & Guidance',
    description: 'Supporting others by sharing knowledge, simplifying complexity, and building solutions together.'
  }
  
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
          I'm a motivated developer with a growing focus on building clean, responsive web applications.
          My goal is to create digital experiences that are both practical and easy to use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary rounded-lg p-6 md:p-10 h-full">
              <h3 className="text-2xl font-bold mb-6 text-accent">My Journey</h3>
              <p className="text-accent/90 mb-4">
              With a growing focus on software development and business intelligence, I've worked on projects that deepened my data skills and helped others turn insights into action.              </p>
              <p className="text-accent/90 mb-4">
              I specialize in developing data-driven solutions and visualizations using modern tools and technologies to create meaningful, interactive experiences.              </p>
              <p className="text-accent/90">
              My approach to development centers on building clean, efficient solutions that make data accessible and drive impactful insights for users.              </p>
            </div>
          </motion.div>

          <div>
            <div className="grid grid-cols-1 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="text-primary mr-4">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-primary">{skill.title}</h3>
                      <p className="text-primary/70">{skill.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
