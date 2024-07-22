"use client";

import React, { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const fontSize = 16;
    let columns: number;
    const rainDrops: number[] = [];

    const katakana =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const latin = "ABCDEFGHIJKLNMOPQRSTUVWZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = canvas.width / fontSize
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate)
    }

    handleResize()
    animate()

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10"
      style={{ 
        backgroundColor: "black", 
        width: "100vw",
        height: "100vh"
      }}
    />
  );
};

export default MatrixBackground;
