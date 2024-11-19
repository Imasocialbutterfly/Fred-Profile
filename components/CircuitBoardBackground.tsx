import React, { useEffect, useRef } from "react";

const CircuitBoardBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const lines: { points: { x: number; y: number }[] }[] = [];
    const lineColor = "#00ff00";
    const backgroundColor = "#010101";
    const gridSize = 30;
    const lineWidth = 2;
    let surgeProgress = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines();
    };

    const initLines = () => {
      lines.length = 0;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() < 0.7) {
            const linePoints = generateLinePath(x, y);
            lines.push({ points: linePoints });
          }
        }
      }
    };

    const generateLinePath = (startX: number, startY: number) => {
      const points = [{ x: startX, y: startY }];
      let currentX = startX;
      let currentY = startY;
      const segmentCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < segmentCount; i++) {
        const direction = Math.floor(Math.random() * 8);
        switch (direction) {
          case 0: currentX += gridSize; break;
          case 1: currentX -= gridSize; break;
          case 2: currentY += gridSize; break;
          case 3: currentY -= gridSize; break;
          case 4: currentX += gridSize; currentY += gridSize; break;
          case 5: currentX += gridSize; currentY -= gridSize; break;
          case 6: currentX -= gridSize; currentY += gridSize; break;
          case 7: currentX -= gridSize; currentY -= gridSize; break;
        }
        points.push({ x: currentX, y: currentY });
      }

      return points;
    };

    const drawLine = (line: (typeof lines)[0]) => {
      const { points } = line;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      ctx.stroke();

      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, lineWidth, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 0, 0.3)"
        ctx.fill();
      });

      const surgeStart = surgeProgress % 1;
      const surgeEnd = (surgeProgress + 0.1) % 1;
      const gradient = ctx.createLinearGradient(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y);
      gradient.addColorStop(Math.max(0, surgeStart - 0.1), "rgba(0, 255, 0, 0)");
      gradient.addColorStop(surgeStart, "rgba(0, 255, 0, 0.8)");
      gradient.addColorStop(surgeEnd, "rgba(0, 255, 0, 0.8)");
      gradient.addColorStop(Math.min(1, surgeEnd + 0.1), "rgba(0, 255, 0, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth * 2;
      ctx.stroke();
    };

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = lineColor;
      ctx.fillStyle = lineColor;
      ctx.lineWidth = lineWidth;

      lines.forEach((line) => {
        drawLine(line);
      });

      surgeProgress = (surgeProgress + 0.005) % 2
      animationId = requestAnimationFrame(draw);
    };

    handleResize();
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{ 
        position: "fixed",
        top: 0, 
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
    }} />
  );
};

export default CircuitBoardBackground;