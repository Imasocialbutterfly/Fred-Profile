import React, { useCallback, useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  startDelay?: number;
  onComplete?: () => void;
}

const TypewriterText = ({
  text,
  startDelay = 0,
  onComplete,
}: TypewriterTextProps) => {
  const [dispalyedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const typeCharacter = useCallback(() => {
    setDisplayedText((prev) => {
      if (prev.length < text.length) {
        return text.slice(0, prev.length + 1);
      }
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return prev;
    });
  }, [text, onComplete, isComplete]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(typeCharacter, 100);
      return () => clearInterval(typingInterval);
    }, startDelay);

    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(cursorBlinkInterval);
    };
  }, [typeCharacter, startDelay]);

  return (
    <span className="relative">
      {dispalyedText}
      <span className="relative">
        &#160;
        {cursorVisible && <span className="absolute right-0 top-0">|</span>}
      </span>
    </span>
  );
};

export default TypewriterText;
