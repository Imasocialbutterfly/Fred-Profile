"use client";

import TypewriterText from "@/components/TypewriterText";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [showImageAndPath, setShowImageAndPath] = useState(false);
  const [firstTextComplete, setFirstTextComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
      setShowImageAndPath(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-center">
      <div className="text-center">
        {showTitle && (
          <h1 className='text-3xl mb-8 text-glow animate-fade-in'>
            <TypewriterText
              text="Welcome To Frederick's Profile, Unknown User"
              onComplete={() => setFirstTextComplete(true)}
            />
          </h1>
        )}

        {showImageAndPath && (
          <>
            <div className="flex justify-center mb-4 animate-fade-in">
              <div className="w-40 h-40 relative">
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
              <TypewriterText text="Choose your path..." startDelay={1000} />
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
