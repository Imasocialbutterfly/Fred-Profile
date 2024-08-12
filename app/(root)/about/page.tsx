"use client";

import BulletBackground from "@/components/BulletBackground";
import TypewriterText from "@/components/TypewriterText";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const About = () => {
  const [showContent, setShowContent] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackclick = () => {
    router.push('/?showPillChoice=true')
  }

  return (
    <div className="min-h-screen text-green-500 font-mono flex flex-col items-center justify-center p-4">
      <BulletBackground />
      <div className="w-full max-w-3xl relative z-10">
        <h1 className="text-3xl mb-6 text-center text-glow">
          <TypewriterText text="About Frederick..." />
        </h1>
        {showContent && (
          <div className="flex flex-col items-start space-y-2">
            <span className="w-full">
              <TypewriterText text="Name: Frederick" startDelay={500} />
            </span>
            <span className="w-full">
              <TypewriterText text="Age: 25 years" startDelay={3000} />
            </span>
            <span className="w-full">
              <TypewriterText
                text="Place of Origin: Mabopane township, on the outskirts of Pretoria North, Gauteng, South Africa"
                startDelay={5500}
              />
            </span>
            <span className="w-full">
              <TypewriterText
                text="Education: Programmer taught by Zaio E-learning from June 2023"
                startDelay={15000}
              />
            </span>
            <span className="w-full">
              <TypewriterText
                text="Projects: Four fullstack projects on Github, featuring React, MongoDB, and Prisma"
                startDelay={22000}
              />
            </span>
            <span className="w-full">
              <TypewriterText
                text="Experience: Two years of indirect experience in programming"
                startDelay={31000}
                showCursorAfterTyping={true}
              />
            </span>
          </div>
        )}
      </div>
      <button
        onClick={handleBackclick}
        className="absolute bottom-4 left-4 text-green-500 text-glow hover:text-green-400 transition-colors duration-300"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default About;
