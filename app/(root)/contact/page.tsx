"use client";

import ApocalypticBackground from "@/components/ApocalypticBackground";
import TypewriterText from "@/components/TypewriterText";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Contact = () => {
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackclick = () => {
    router.push("/?showPillChoice=true");
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
      <ApocalypticBackground />
      <div className="w-full max-w-3xl relative z-10">
        <h1 className="text-3xl mb-6 text-center text-glow">
          <TypewriterText text="Contact Me..." />
        </h1>
        {showContent && (
          <div className="flex flex-col items-start space-y-2">
            <span className="w-full">
              <TypewriterText
                text="Cellphone Number: 0729751755"
                startDelay={500}
              />
            </span>
            <span className="w-full">
              <TypewriterText
                text="Email: keitumetsemogotsif@gmail.com"
                startDelay={4000}
              />
            </span>
            <span className="w-full hover:text-green-300">
              <TypewriterText
                text="Linkedln: https://www.linkedin.com/in/keitumetse-mogotsi-a6125910b/"
                startDelay={7000}
                href="https://www.linkedin.com/in/keitumetse-mogotsi-a6125910b/"
                showCursorAfterTyping={true}
              />
            </span>
          </div>
        )}
      </div>
      <button
        onClick={handleBackclick}
        className="fixed bottom-4 left-4 text-green-500 text-glow hover:text-green-400 transition-colors duration-300 z-20"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default Contact;
