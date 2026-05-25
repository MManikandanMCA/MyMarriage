import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioSynth } from "../utils/audioSynth";

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particles animation in background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Diya sparks particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      decay: number;
    }> = [];

    const createParticle = () => {
      // Spawn near bottom or around the center
      const x = Math.random() * width;
      const y = height * 0.8 + Math.random() * (height * 0.2);
      const size = Math.random() * 2 + 1;
      const speedY = -(Math.random() * 0.6 + 0.3);
      const speedX = (Math.random() - 0.5) * 0.4;
      const alpha = Math.random() * 0.5 + 0.3;
      const decay = Math.random() * 0.003 + 0.001;

      particles.push({ x, y, size, speedY, speedX, alpha, decay });
    };

    // Pre-populate particles
    for (let i = 0; i < 50; i++) {
      createParticle();
      // Randomize positions
      particles[i].y = Math.random() * height;
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark red to black radial gradient for a sacred womb-chamber feel
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, "#2c0206");
      grad.addColorStop(0.5, "#150103");
      grad.addColorStop(1, "#080001");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update particles
      particles.forEach((p) => {
        p.y += p.speedY;

        p.x += p.speedX;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < 0) {
          // Recycle
          p.y = height + 10;
          p.x = Math.random() * width;
          p.alpha = Math.random() * 0.5 + 0.3;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        // Golden glowing sparkler effect
        const particleGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        particleGrad.addColorStop(0, "#FFFDD0");
        particleGrad.addColorStop(0.4, "#D4AF37");
        particleGrad.addColorStop(1, "transparent");
        
        ctx.fillStyle = particleGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Periodically spawn new particles
      if (particles.length < 80 && Math.random() < 0.1) {
        createParticle();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleStartBlessing = () => {
    if (hasClicked) return;
    setHasClicked(true);

    // Play synthesized bell sound & chimes
    audioSynth.playTempleBell(220); // Deep A3 bell
    setTimeout(() => {
      audioSynth.playChimes(); // Golden chime ripples
    }, 150);

    // Drone hum
    audioSynth.playDrone(6.0);

    // Start temple door slide animation
    setIsOpened(true);

    // Trigger enter transition after door animation completes
    setTimeout(() => {
      onEnter();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none cursor-pointer" onClick={handleStartBlessing}>
      {/* Background Canvas with glowing sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Temple Doors */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {/* Left Temple Door */}
        <motion.div
          animate={isOpened ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-gradient-to-r from-traditional-maroon-dark to-traditional-maroon border-r border-traditional-gold/30 flex items-center justify-end relative shadow-2xl overflow-hidden"
        >
          {/* Wooden panel texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[size:10px_10px]" />
          
          {/* Half of Kolam/Mandala on edge */}
          <div className="w-24 h-48 border-[3px] border-l-0 border-traditional-gold/40 rounded-r-full mr-[-48px] flex items-center justify-start relative bg-traditional-maroon-dark/80 backdrop-blur-sm">
            <div className="w-16 h-32 border border-l-0 border-traditional-gold/30 rounded-r-full ml-1" />
          </div>
          
          {/* Left Door Ring Handle */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-traditional-gold rounded-full flex items-center justify-center bg-traditional-maroon-dark z-10">
            <div className="w-4 h-4 border border-traditional-gold rounded-full" />
          </div>
        </motion.div>

        {/* Right Temple Door */}
        <motion.div
          animate={isOpened ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-gradient-to-l from-traditional-maroon-dark to-traditional-maroon border-l border-traditional-gold/30 flex items-center justify-start relative shadow-2xl overflow-hidden"
        >
          {/* Wooden panel texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[size:10px_10px]" />
          
          {/* Half of Kolam/Mandala on edge */}
          <div className="w-24 h-48 border-[3px] border-r-0 border-traditional-gold/40 rounded-l-full ml-[-48px] flex items-center justify-end relative bg-traditional-maroon-dark/80 backdrop-blur-sm">
            <div className="w-16 h-32 border border-r-0 border-traditional-gold/30 rounded-l-full mr-1" />
          </div>

          {/* Right Door Ring Handle */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-traditional-gold rounded-full flex items-center justify-center bg-traditional-maroon-dark z-10">
            <div className="w-4 h-4 border border-traditional-gold rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Floating Elements / Content */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-20 pointer-events-none"
          >
            {/* Glowing Gopuram Silhouette */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: [0.3, 0.7, 0.3], y: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-64 h-72 md:w-80 md:h-96 text-traditional-gold filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-8"
            >
              <svg viewBox="0 0 200 240" fill="none" className="w-full h-full">
                {/* Traditional South Indian Gopuram Silhouette */}
                {/* Kalasams at the very top */}
                <path d="M90 20 Q95 5 100 20 Q105 5 110 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="95" cy="5" r="1.5" fill="currentColor" />
                <circle cx="100" cy="3" r="1.5" fill="currentColor" />
                <circle cx="105" cy="5" r="1.5" fill="currentColor" />
                
                {/* Top tier (1) */}
                <polygon points="90,20 110,20 115,45 85,45" stroke="currentColor" strokeWidth="1.5" fill="rgba(212,175,55,0.05)" />
                <line x1="93" y1="32" x2="107" y2="32" stroke="currentColor" strokeWidth="1" />
                
                {/* Tier 2 */}
                <polygon points="82,45 118,45 125,75 75,75" stroke="currentColor" strokeWidth="1.5" fill="rgba(212,175,55,0.05)" />
                <path d="M88 60 H112 M94 45 V75 M106 45 V75" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />

                {/* Tier 3 */}
                <polygon points="72,75 128,75 138,115 62,115" stroke="currentColor" strokeWidth="1.5" fill="rgba(212,175,55,0.05)" />
                <circle cx="100" cy="95" r="6" stroke="currentColor" strokeWidth="1" />
                <path d="M78 95 H122 M90 75 L86 115 M110 75 L114 115" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />

                {/* Tier 4 */}
                <polygon points="58,115 142,115 155,165 45,165" stroke="currentColor" strokeWidth="1.5" fill="rgba(212,175,55,0.05)" />
                <path d="M68 140 H132 M85 115 L80 165 M115 115 L120 165" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
                <rect x="94" y="128" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1" />

                {/* Tier 5 (Base) */}
                <polygon points="40,165 160,165 170,225 30,225" stroke="currentColor" strokeWidth="2" fill="rgba(212,175,55,0.08)" />
                {/* Temple Entrance Door Shape */}
                <path d="M85 225 V190 Q85 180 100 180 Q115 180 115 190 V225" stroke="currentColor" strokeWidth="1.5" fill="rgba(212,175,55,0.2)" />
                <circle cx="100" cy="180" r="2" fill="currentColor" />
                
                {/* Base platform */}
                <rect x="20" y="225" width="160" height="10" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Bell hanging in the center entrance */}
                <path d="M100 180 V195" stroke="currentColor" strokeWidth="1" />
                <path d="M97 195 H103 L101 201 H99 Z" fill="currentColor" />
                <circle cx="100" cy="203" r="1" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Tamil Traditional Text */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-traditional-gold font-cinzel-deco text-2xl md:text-3xl tracking-widest mb-1"
            >
              நல்வரவு
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-traditional-cream font-cinzel text-xs md:text-sm tracking-[0.2em] uppercase mb-8"
            >
              With Divine Blessings
            </motion.p>

            {/* Tap indicator with glowing ring */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Outer pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 border-2 border-traditional-gold rounded-full"
                />
                {/* Inner ring */}
                <div className="w-12 h-12 border border-traditional-gold/40 rounded-full flex items-center justify-center bg-traditional-maroon-dark/50">
                  {/* Glowing Diya Flame inside */}
                  <motion.div
                    animate={{ scaleY: [1, 1.25, 0.9, 1.15, 1], skewX: [0, 5, -5, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-3 h-5 bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-100 rounded-b-full rounded-t-full origin-bottom"
                  />
                </div>
              </div>
              <span className="text-traditional-gold font-playfair italic text-lg md:text-xl tracking-wide mt-2 animate-pulse-slow">
                Tap to Begin the Blessing
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen opening glow */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-t from-[#200104] via-[#5a0912] to-[#110103] flex items-center justify-center pointer-events-none z-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2.5, opacity: 1 }}
              transition={{ duration: 2.0, ease: "easeOut" }}
              className="w-96 h-96 rounded-full bg-gradient-to-r from-traditional-gold-light via-traditional-gold to-traditional-gold-dark filter blur-[80px] opacity-35"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
