import React, { useEffect, useRef } from "react";

interface Bullet {
  x: number;
  y: number;
  speed: number;
  direction: { x: number; y: number };
}

const BulletBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const bullets: Bullet[] = [];
    const bulletSize = 2;
    const bulletCount = 150;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBullets();
    };

    const initBullets = () => {
      bullets.length = 0;
      for (let i = 0; i < bulletCount; i++) {
        bullets.push(createBullet());
      }
    };

    const createBullet = (): Bullet => {
      const direction = Math.random() < 0.5 ? -1 : 1;
      const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4;
      return {
        x: direction > 0 ? 0 : canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 10 + 1,
        direction: {
          x: Math.cos(angle) * direction,
          y: Math.sin(angle),
        },
      };
    };

    const updateBullet = (bullet: Bullet) => {
      bullet.x += bullet.direction.x * bullet.speed;
      bullet.y += bullet.direction.y * bullet.speed;

      if (
        bullet.x < -100 ||
        bullet.x > canvas.width + 100 ||
        bullet.y < -100 ||
        bullet.y > canvas.height + 100
      ) {
        Object.assign(bullet, createBullet());
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bulletSize, 0, Math.PI * 2);
        ctx.fill();
        updateBullet(bullet);
      });
    };

    const animate = () => {
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
      className="fixed top-0 left-0 -z-10"
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default BulletBackground;
