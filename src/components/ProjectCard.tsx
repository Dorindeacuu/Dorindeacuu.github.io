import React, { useRef, useEffect } from 'react'; // Added useEffect
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  videoId: string;
  technologies?: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, videoId, technologies = [], link }) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayerInstance | null>(null); // Ref to store the player instance

  useEffect(() => {
    // Initialize player when iframe ref is available and videoId/title are set
    if (videoId && videoRef.current && window.Vimeo && title) { // Added check for videoId
      // If a player instance already exists, destroy it before creating a new one
      if (playerRef.current) {
        playerRef.current.destroy().catch(e => console.log("Error destroying player:", e));
        playerRef.current = null;
      }

      const player = new window.Vimeo.Player(videoRef.current);
      playerRef.current = player;

      player.ready().then(() => {
        // Ensure the video is paused initially, overriding any autoplay from URL params like background=1
        player.pause().catch(error => {
          console.log('Error attempting to initially pause video:', error.name, error.message);
        });
      }).catch(error => {
        console.log('Vimeo player not ready for initial setup:', error);
      });
    }

    // Cleanup function to destroy player on component unmount or before re-initialization
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy().catch(e => console.log("Error destroying player on cleanup:", e));
        playerRef.current = null;
      }
    };
  }, [videoId, title, videoRef]); // Re-run effect if videoId, title, or ref changes

  const handleMouseEnter = () => {
    if (videoId && playerRef.current) { // Added videoId check
      playerRef.current.play().catch(error => {
        console.log('Error attempting to play video:', error.name, error.message);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoId && playerRef.current) { // Added videoId check
      playerRef.current.pause().catch(error => {
        console.log('Error attempting to pause video:', error.name, error.message);
      });
    }
  };

  const getVideoSrc = (id: string): string => { // Removed currentTitle parameter
    // All projects will use these common parameters for muted playback.
    // Removed background=1 as it can prevent mobile playback.
    // Added byline=0, portrait=0, title=0 to hide Vimeo UI elements for a borderless look.
    // Added controls=0 to hide all player controls.
    const params = 'badge=0&autopause=0&player_id=0&app_id=58479&muted=1&byline=0&portrait=0&title=0&controls=0';
    let hash: string;

    // Set the unique hash based on the videoId itself.
    if (id === "1084008152") { // Original HireHub video
      hash = 'h=0210b60451';
    } else if (id === "1084029075") { // Original Snakke video
      hash = 'h=715bc9b711';
    } else if (id === "1084052914") { // Original Ordia video
      hash = 'h=e1ac07af96'; 
    } else if (id === "1084223219") { // Salby video
      hash = 'h=74347f4544';
    } else if (id === "824807150") { // Original EcoTrack video (currently not assigned to an active project)
      hash = 'h=0210b60451'; 
    } else {
      // Fallback for any unrecognized video ID
      hash = 'h=0210b60451'; // Default hash
      console.warn(`Unrecognized video ID "${id}", using default video hash.`);
    }
    
    return `https://player.vimeo.com/video/${id}?${hash}&${params}`;
  };

  const cardInnerContent = (
    <Card className="overflow-hidden bg-background shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/25 border border-border hover:border-primary/40 h-full flex flex-col">
      {videoId ? (
        <div className="aspect-video w-full relative bg-black"> {/* Added bg-black as fallback */}
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              ref={videoRef}
              src={getVideoSrc(videoId)} // Pass only videoId
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write" // Removed encrypted-media as it's often not needed and can cause issues
              title={title}
              loading="lazy" // Added lazy loading for iframes
            ></iframe>
          </div>
        </div>
      ) : (
        <div className="aspect-video w-full relative bg-muted flex items-center justify-center">
          <p className="text-muted-foreground text-sm">No video preview available</p>
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-grow"> {/* Increased padding slightly */}
        <div className="flex items-center mb-3">
          <h3 className="text-xl lg:text-2xl font-bold text-primary">{title}</h3>
          {link && (
            <span className="ml-2 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
              View Website
            </span>
          )}
        </div>
        <p className="text-muted-foreground mb-4 text-sm lg:text-base leading-relaxed flex-grow">{description}</p> {/* Adjusted text size and leading */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto"> {/* Pushes tags to bottom if card content has variable height */}
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-medium" /* Slightly more padding and font-medium */
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const motionProps = {
    whileHover: { y: -8, transition: { duration: 0.3 } },
    className: "w-full h-full", // Ensure motion div takes full height
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full"> {/* Ensure anchor takes full height */}
        <motion.div {...motionProps}>
          {cardInnerContent}
        </motion.div>
      </a>
    );
  }

  return (
    <motion.div {...motionProps}>
      {cardInnerContent}
    </motion.div>
  );
};

export default ProjectCard;
