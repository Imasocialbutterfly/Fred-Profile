import React, { useEffect, useRef } from "react";

const ApocalypticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const circles: Circle[] = [];
    const maxCircles = 15;

    interface Circle {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      rings: number;
      points: { x: number; y: number }[];
      life: number;
      maxLife: number;
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createRuggedCircle = (x: number, y: number, radius: number, points: number) => {
      const angleStep = (Math.PI * 2) / points;
      const circlePoints = [];
      for (let i = 0; i < points; i++) {
        const angle = i * angleStep;
        const randomRadius = radius * (0.9 + Math.random() * 0.2); // 10% variance
        circlePoints.push({
          x: x + Math.cos(angle) * randomRadius,
          y: y + Math.sin(angle) * randomRadius
        });
      }
      return circlePoints;
    };

    const createCircle = () => {
      if (circles.length < maxCircles) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const maxRadius = Math.random() * 50 + 25;
        const circle: Circle = {
          x,
          y,
          radius: 0,
          maxRadius,
          rings: Math.floor(Math.random() * 5) + 3,
          points: createRuggedCircle(x, y, maxRadius, 20),
          life: 0,
          maxLife: Math.random() * 200 + 100,
        };
        circles.push(circle);
      }
    };

    const updateCircles = () => {
      for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].life++;
        circles[i].radius = (circles[i].life / circles[i].maxLife) * circles[i].maxRadius;
        if (circles[i].life > circles[i].maxLife) {
          circles.splice(i, 1);
        }
      }
    };

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        const ringWidth = circle.radius / (circle.rings * 2);
        for (let i = 0; i < circle.rings; i++) {
          const ringRadius = (circle.radius / circle.rings) * (i + 1);
          const opacity = 1 - (i / circle.rings) * 0.7;
          ctx.beginPath();
          circle.points.forEach((point, index) => {
            const scale = ringRadius / circle.maxRadius;
            const x = circle.x + (point.x - circle.x) * scale;
            const y = circle.y + (point.y - circle.y) * scale;
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.closePath();
          ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
          ctx.lineWidth = ringWidth;
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      createCircle();
      updateCircles();
      draw();
      animationId = requestAnimationFrame(animate);
    };

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0"
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        zIndex: 1,
      }}
    />
  );
};

export default ApocalypticBackground;