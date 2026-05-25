import React, { useEffect, useRef } from "react";

export const FlowerPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track scroll velocity for parallax push
    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Flower types: "jasmine" (white), "rose" (red), "marigold" (yellow/orange)
    interface Petal {
      x: number;
      y: number;
      size: number;
      type: "jasmine" | "rose" | "marigold";
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      depth: number; // For parallax (0.5 to 1.5)
    }

    const petals: Petal[] = [];
    const maxPetals = 40; // Balanced for performance

    const createPetal = (isInitial = false): Petal => {
      const depth = Math.random() * 1 + 0.5; // Depth multiplier
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : -20,
        size: (Math.random() * 10 + 8) * (depth * 0.7),
        type: Math.random() < 0.4 ? "jasmine" : Math.random() < 0.5 ? "rose" : "marigold",
        speedY: (Math.random() * 0.8 + 0.5) * depth,
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.3 + 0.6,
        depth,
      };
    };

    // Initialize petals
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    const drawJasmine = (ctx: CanvasRenderingContext2D, size: number) => {
      // Jasmine has 5 delicate white-cream petals and a tiny green stem center
      ctx.fillStyle = "rgba(255, 253, 235, 0.9)";
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.ellipse(0, -size / 2, size / 3, size / 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Green core
      ctx.fillStyle = "rgba(100, 160, 60, 0.9)";
      ctx.beginPath();
      ctx.arc(0, 0, size / 6, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRosePetal = (ctx: CanvasRenderingContext2D, size: number) => {
      // Rose petal is a rounded heart/teardrop shape
      ctx.fillStyle = "rgba(180, 20, 30, 0.85)";
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.quadraticCurveTo(size / 2, -size / 2, size / 2, 0);
      ctx.quadraticCurveTo(size / 2, size / 2, 0, size);
      ctx.quadraticCurveTo(-size / 2, size / 2, -size / 2, 0);
      ctx.quadraticCurveTo(-size / 2, -size / 2, 0, -size / 2);
      ctx.fill();
    };

    const drawMarigoldPetal = (ctx: CanvasRenderingContext2D, size: number) => {
      // Marigold petal is a small golden-orange fluffy shape
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      grad.addColorStop(0, "#ffb81c"); // bright orange
      grad.addColorStop(1, "#d4820a"); // dark yellow-orange
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, size / 1.5, size, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll speed effect
      scrollSpeed *= 0.95;

      petals.forEach((p) => {
        // Apply vertical speed plus scroll speed scaled by depth
        p.y += p.speedY + scrollSpeed * p.depth;
        p.x += p.speedX + Math.sin(p.y * 0.005) * 0.2; // swaying
        p.rotation += p.rotationSpeed;

        // Reset if offscreen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.3 + 0.6;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(Math.sin(p.rotation * 0.5) * 0.3 + 0.8, 1); // 3D flipping simulation
        ctx.globalAlpha = p.opacity;

        if (p.type === "jasmine") {
          drawJasmine(ctx, p.size);
        } else if (p.type === "rose") {
          drawRosePetal(ctx, p.size);
        } else {
          drawMarigoldPetal(ctx, p.size);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-10" />;
};

export default FlowerPetalsCanvas;
