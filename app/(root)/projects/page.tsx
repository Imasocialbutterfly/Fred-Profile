"use client";

import CircuitBoardBackground from "@/components/CircuitBoardBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Projects = () => {
  const router = useRouter()

  useEffect(() => {

  }, [])

  const handleBackclick = () => {
    router.push('/?showPillChoice=true')
  }

  return (
    <div className="min-h-screen text-green-500 font-mono flex flex-col items-center justify-center p-4">
      <CircuitBoardBackground />
      hello world
      <button
        onClick={handleBackclick}
        className="absolute bottom-4 left-4 text-green-500 text-glow hover:text-green-400 transition-colors duration-300"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default Projects;
