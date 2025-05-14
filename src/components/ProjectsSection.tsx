import React from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "HireHub",
      description: "A full-stack application for managing contacts, job applications, resumes, and cover letters, similar to Simplify.jobs.",
      videoId: "1084008152", // Original HireHub video
      technologies: ["React","Vite", "TypeScript", "MongoDB", "Tailwind CSS", "shadcn-ui"]
    },
    {
      title: "Snakke",
      description: "A web-based learning platform focused on Danish language education with interactive features, with AI powered explanations and translation.",
      videoId: "1084029075", // Stays the same
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"]
    },
    {
      title: "Ordia",
      description: "A personal productivity dashboard that tracks, and analyse daily tasks by category, priority, and time allocation using visual analytics and interactive timers.",
      videoId: "1084052914", // Original Ordia video
      technologies: ["React", "TypeScript", "Vite","Supabase", "Tailwind CSS", "shadcn-ui"]
    },  
    {
      title: "Salby",
      description: "OS app that helps users reduce social media usage through financial accountability and behavioural science.",
      videoId: "1084223219", // Salby video ID
      technologies: ["Swift", "SwiftUI", "Figma", "React", "Vite", "Tailwind CSS"],
      link: "https://salby.net/"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">My Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each showcases different skills and technologies I've mastered.
          </p>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto mt-2 flex items-center justify-center">
            <ArrowDownCircle className="mr-2 h-5 w-5 text-primary" />
            Hover over the project cards to see a quick demo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              videoId={project.videoId}
              technologies={project.technologies}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
