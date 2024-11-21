"use client";

import CircuitBoardBackground from "@/components/CircuitBoardBackground";
import ProjectCard from "@/components/ProjectCard";
import TypewriterText from "@/components/TypewriterText";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Projects = () => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackclick = () => {
    router.push("/?showPillChoice=true");
  };

  return (
    <div className="min-h-screen text-green-500 font-mono flex flex-col items-center justify-center p-4">
      <CircuitBoardBackground />
      <div className="w-full max-w-6xl relative z-10">
        <h1 className="text-3xl mb-6 text-center text-glow">
          <TypewriterText text="Projects..." />
        </h1>
        {showContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <ProjectCard
              imageSrc="/Screenshot (101).png"
              projectName="Amazon Clone"
              projectType="Fullstack"
              projectEcosystem="React, Firebase, TailwindCSS"
              gitRepo="https://github.com/Imasocialbutterfly/amazon-clone-withReactAndRedux"
            />
            <ProjectCard
              imageSrc="/Screenshot (102).png"
              projectName="Spotify Clone"
              projectType="Fullstack"
              projectEcosystem="NextJS, React, Stripe, Supabase, PostgreSQL, TailwindCSS"
              gitRepo="https://github.com/Imasocialbutterfly/SpotifyCLone-By-Fred"
            />
            <ProjectCard
              imageSrc="/Screenshot (104).png"
              projectName="Duolingo Clone"
              projectType="Fullstack"
              projectEcosystem="NextJS, React, Drizzle ORM, Stripe, TailwindCSS"
              gitRepo="https://github.com/Imasocialbutterfly/duolingo-clone"
            />
            <ProjectCard
              imageSrc="/Screenshot (120).png"
              projectName="Tic Tac Toe"
              projectType="React"
              projectEcosystem="Frontend"
              gitRepo="https://github.com/Imasocialbutterfly/TicTacToe"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleBackclick}
        className="fixed bottom-4 left-4 text-green-500 text-glow hover:text-green-400 transition-colors duration-300"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default Projects;
