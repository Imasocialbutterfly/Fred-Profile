import React, { useCallback, useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  startDelay?: number;
  onComplete?: () => void;
  showCursorAfterTyping?: boolean
}

const TypewriterText = ({
  text,
  startDelay = 0,
  onComplete,
  showCursorAfterTyping = false,
}: TypewriterTextProps) => {
  const [dispalyedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const typeCharacter = useCallback(() => {
    setDisplayedText((prev) => {
      if (prev.length < text.length) {
        return text.slice(0, prev.length + 1);
      }
      setIsTyping (false)
      onComplete?.()
      return prev
    });
  }, [text, onComplete]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true)
      const typingInterval = setInterval(typeCharacter, 100)
      return () => clearInterval(typingInterval)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
    }
  }, [typeCharacter, startDelay])

  useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prev) => isTyping || showCursorAfterTyping ? !prev : false)
    }, 500)

    return () => clearInterval(cursorBlinkInterval)
  }, [isTyping, showCursorAfterTyping])

  return (
    <span className="relative whitespace-pre-line">
      {dispalyedText}
        <span className="relative">
        &#160;
        {cursorVisible && <span className="absolute right-0 top-0">|</span>}
      </span>
    </span>
  );
};

export default TypewriterText;
