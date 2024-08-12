import React, { useEffect, useRef } from "react";

const ApocalypticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const lightbulbs: Lightbulb[] = [];
    const maxLightbulbs = 2;

    interface Lightbulb {
      x: number;
      y: number;
      radius: number;
      isOn: boolean;
      life: number;
      maxLife: number;
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createLightbulb = () => {
      if (lightbulbs.length < maxLightbulbs) {
        const lightbulb: Lightbulb = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 10 + 15,
          life: 0,
          maxLife: 60,
          isOn: true,
        };
        lightbulbs.push(lightbulb);
      }
    };

    const updateLightbulbs = () => {
      for (let i = lightbulbs.length - 1; i >= 0; i--) {
        const bulb = lightbulbs[i];
        bulb.life++;

        if (bulb.life > bulb.maxLife) {
          lightbulbs.splice(i, 1);
        }
      }
    };

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lightbulbs.forEach((bulb) => {
        const intensity = Math.sin((bulb.life / bulb.maxLife) * Math.PI);

        if (intensity > 0) {
          ctx.beginPath();
          ctx.moveTo(bulb.x - bulb.radius * 0.2, bulb.y + bulb.radius * 0.6);
          ctx.lineTo(bulb.x + bulb.radius * 0.2, bulb.y + bulb.radius * 0.6);
          ctx.lineTo(bulb.x + bulb.radius * 0.3, bulb.y + bulb.radius);
          ctx.lineTo(bulb.x - bulb.radius * 0.3, bulb.y + bulb.radius);
          ctx.closePath();
          ctx.fillStyle = `rgba(100, 100, 100, ${intensity})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(bulb.x, bulb.y, bulb.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 200, ${intensity * 0.5})`;
          ctx.fill();

          const gradient = ctx.createRadialGradient(
            bulb.x,
            bulb.y,
            bulb.radius * 0.5,
            bulb.x,
            bulb.y,
            bulb.radius * 2
          );
          gradient.addColorStop(0, `rgba(0, 255, 0, ${intensity * 0.8})`);
          gradient.addColorStop(1, `rgba(0, 255, 0, 0)`);
          ctx.beginPath();
          ctx.arc(bulb.x, bulb.y, bulb.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(bulb.x - bulb.radius * 0.3, bulb.y);
          ctx.lineTo(bulb.x - bulb.radius * 0.1, bulb.y - bulb.radius * 0.2);
          ctx.lineTo(bulb.x + bulb.radius * 0.1, bulb.y + bulb.radius * 0.2);
          ctx.lineTo(bulb.x + bulb.radius * 0.3, bulb.y);
          ctx.strokeStyle = `rgba(150, 255, 150, ${intensity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      if (Math.random() < 0.05) createLightbulb();
      updateLightbulbs();
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
