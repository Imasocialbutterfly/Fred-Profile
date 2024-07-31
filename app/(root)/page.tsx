"use client";

import MatrixBackground from "@/components/MatrixBackground";
import TypewriterText from "@/components/TypewriterText";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();

  const [showTitle, setShowTitle] = useState(true);
  const [showImageAndPath, setShowImageAndPath] = useState(false);
  const [showPillChoice, setShowPillChoice] = useState(false);
  const [firstTextComplete, setFirstTextComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
      setShowImageAndPath(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleImageClick = () => {
    setShowImageAndPath(false);
    setShowPillChoice(true);
  };

  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-center">
      <MatrixBackground />
      <div className="text-center relative z-10">
        {showTitle && (
          <h1 className="text-3xl mb-8 text-glow animate-fade-in">
            <TypewriterText
              text="Welcome To Frederick's Profile, Unknown User"
              onComplete={() => setFirstTextComplete(true)}
            />
          </h1>
        )}

        {showImageAndPath && (
          <>
            <div className="flex justify-center mb-4 animate-fade-in">
              <div
                className="w-40 h-40 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={handleImageClick}
              >
                <Image
                  src="/DSC03892.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  alt="PR picture"
                />
              </div>
            </div>
            <p className="text-lg text-glow animate-fade-in">
              <TypewriterText
                text="Click on image to choose your path..."
                startDelay={1000}
              />
            </p>
          </>
        )}

        {showPillChoice && (
          <div className="animate-fade-in">
            <div className="flex justify-center space-x-16">
              <div className="flex flex-col items-center">
                <div
                  className="w-40 h-40 relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 group mb-2"
                  onClick={() => router.push("/about")}
                >
                  <Image
                    src="/DSC06706.jpg"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full transition-all duration-300 ease-in-out brightness-0 group-hover:brightness-100"
                    alt="About"
                  />
                </div>
                <p className="text-lg text-glow animate-fade-in">
                  <TypewriterText text="About Me" startDelay={1000} />
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-40 h-40 relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 group mb-2"
                  onClick={() => router.push("/projects")}
                >
                  <Image
                    src="/Screenshot (73).png"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full transition-all duration-300 ease-in-out brightness-0 group-hover:brightness-100"
                    alt="Projects"
                  />
                </div>
                <p className="text-lg text-glow animate-fade-in">
                  <TypewriterText text="Projects" startDelay={2500} />
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-40 h-40 relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 group mb-2"
                  onClick={() => router.push("/contact")}
                >
                  <Image
                    src="/IMG_3698.JPG"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full transition-all duration-300 ease-in-out brightness-0 group-hover:brightness-100"
                    alt="Contact"
                  />
                </div>
                <p className="text-lg text-glow animate-fade-in">
                  <TypewriterText
                    text="Contact"
                    startDelay={4000}
                    showCursorAfterTyping={true}
                  />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
