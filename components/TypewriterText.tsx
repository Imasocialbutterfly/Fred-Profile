"use client";

import React, { useCallback, useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
}

const TypewriterText = ({ text }: TypewriterTextProps) => {
  const [dispalyedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const typeCharacter = useCallback(() => {
    setDisplayedText((prev) => {
      if(prev.length < text.length) {
        return text.slice(0, prev.length + 1);
      }
      return prev
    })
  }, [text])

  useEffect(() => {
    setDisplayedText("")

    const typingInterval = setInterval(typeCharacter, 100)

    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorBlinkInterval)
    }
  }, [text, typeCharacter])

  return (
    <span>
      {dispalyedText}
      {cursorVisible && <span>|</span>}
    </span>
  );
};

export default TypewriterText;
