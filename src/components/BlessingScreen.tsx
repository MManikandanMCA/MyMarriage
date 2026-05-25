import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const BlessingScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sparkles rising in background
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

    const sparks: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      alpha: number;
      wobble: number;
    }> = [];

    const createSpark = () => {
      sparks.push({
        x: Math.random() * width,
        y: height + 20,
        size: Math.random() * 2.5 + 1.5,
        speedY: -(Math.random() * 0.7 + 0.3),
        alpha: Math.random() * 0.4 + 0.4,
        wobble: Math.random() * Math.PI,
      });
    };

    // Prepopulate
    for (let i = 0; i < 30; i++) {
      createSpark();
      sparks[i].y = Math.random() * height;
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient representing rising dawn of blessing light
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#110103");
      grad.addColorStop(0.6, "#2d0309");
      grad.addColorStop(1, "#664d1a"); // Golden base glow
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update sparks
      sparks.forEach((s) => {
        s.y += s.speedY;
        s.x += Math.sin(s.wobble) * 0.3;
        s.wobble += 0.01;

        if (s.y < 0) {
          s.y = height + 20;
          s.x = Math.random() * width;
          s.alpha = Math.random() * 0.4 + 0.4;
        }

        ctx.fillStyle = `rgba(255, 253, 208, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#D4AF37";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn
      if (sparks.length < 50 && Math.random() < 0.15) {
        createSpark();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden z-20 text-center px-4">
      {/* Canvas backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Blessing Motif & Text */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6">
        
        {/* Priest / Divine Hand Blessing SVG (Abhaya Mudra) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-48 h-48 text-traditional-gold relative flex items-center justify-center"
        >
          {/* Glowing background halo */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute w-36 h-36 rounded-full bg-traditional-gold filter blur-[25px]"
          />

          <svg viewBox="0 0 120 120" fill="none" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            {/* Concentric Divine Rays of Blessing */}
            <circle cx="60" cy="55" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3, 3" opacity="0.5" />
            <circle cx="60" cy="55" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4, 4" opacity="0.3" />
            <circle cx="60" cy="55" r="50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5, 5" opacity="0.2" />

            {/* Sacred Hand Silhouette (Abhaya Mudra style, finger tips pointing up, palm showing) */}
            <path
              d="M60 95 
                 C52 95, 45 88, 45 80 
                 L45 55 
                 C45 53, 47 51, 49 51 
                 C51 51, 53 53, 53 55 
                 L53 45 
                 C53 43, 55 41, 57 41 
                 C59 41, 61 43, 61 45 
                 L61 38 
                 C61 36, 63 34, 65 34 
                 C67 34, 69 36, 69 38 
                 L69 48 
                 C69 46, 71 44, 73 44 
                 C75 44, 77 46, 77 48 
                 L77 62 
                 C77 62, 79 62, 80 64
                 C82 66, 82 70, 77 75 
                 L68 85
                 C65 91, 63 95, 60 95 Z"
              fill="currentColor"
              opacity="0.8"
            />
            {/* Thumb finger */}
            <path
              d="M45 72 
                 C40 70, 34 62, 36 57 
                 C38 53, 42 55, 43 59 
                 L46 68"
              fill="currentColor"
              opacity="0.85"
            />

            {/* Sacred Ring / Tilak / Kumkum design on the Palm */}
            <circle cx="58" cy="65" r="6" stroke="#110103" strokeWidth="1.5" fill="#B4141E" />
            <circle cx="58" cy="65" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Traditional Tamil Blessing Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="space-y-2"
        >
          <span className="font-cinzel text-xs tracking-[0.3em] text-traditional-gold font-bold uppercase block">
            Mangala Vaazhthukkal
          </span>
          <h2 className="font-cinzel-deco text-2xl md:text-3xl font-extrabold text-gold-gradient tracking-wider leading-relaxed">
            தங்கள் வருகையே எங்களது ஆசிர்வாதம்
          </h2>
        </motion.div>

        {/* English Translation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-playfair text-lg md:text-xl italic text-traditional-cream/90 max-w-lg leading-relaxed"
        >
          "Your presence and blessings are the greatest gifts we could receive."
        </motion.p>

        {/* Family Greeting signature block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1 }}
          className="pt-8 text-xs font-montserrat tracking-[0.2em] text-traditional-mustard uppercase font-semibold space-y-1"
        >
          <p>Cordially Invited By</p>
          <p className="text-traditional-cream text-sm font-cinzel font-bold mt-1">
            Manikandan Muruganantham & Manicka Vasuki Selva Murugesan Families
          </p>
        </motion.div>
      </div>

      {/* Extreme bottom soft golden fog fading out */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-traditional-gold/25 to-transparent pointer-events-none" />
    </section>
  );
};

export default BlessingScreen;
