import Image from "next/image";
import React from "react";
import TypewriterText from "./TypewriterText";

interface ProjectCardProps {
  imageSrc: string;
  projectName: string;
  projectType: string;
  projectEcosystem: string;
  gitRepo?: string;
}

const ProjectCard = ({
  imageSrc,
  projectName,
  projectType,
  projectEcosystem,
  gitRepo,
}: ProjectCardProps) => {
  return (
    <div className="flex gap-8 items-start">
      <div className="w-40 h-40 flex-shrink-0 relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 group">
        <Image
          src={imageSrc}
          alt={projectName}
          fill
          className="rounded-full transition-all duration-300 ease-in-out brightness-0 group-hover:brightness-100"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-grow flex flex-col gap-4">
        <span className="w-full">
          <TypewriterText
            text={`Project Name: ${projectName}`}
            startDelay={500}
          />
        </span>
        <span className="w-full">
          <TypewriterText
            text={`Type of Project: ${projectType}`}
            startDelay={3000}
          />
        </span>
        <span className="w-full">
          <TypewriterText
            text={`Project Ecosystem: ${projectEcosystem}`}
            startDelay={5500}
          />
        </span>
        <span className="w-full hover:text-green-300">
          <TypewriterText
            text={`GitRepo: ${gitRepo}`}
            startDelay={5500}
            href={gitRepo}
          />
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
