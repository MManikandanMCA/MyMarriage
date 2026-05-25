import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const CountdownTimer: React.FC = () => {
  // Target Date: Sept 13, 2026 at 9:00 AM (Subha Muhurtham hour)
  const targetDate = new Date("2026-09-13T09:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timerItems = [
    { label: "Days", tamilLabel: "நாட்கள்", value: timeLeft.days },
    { label: "Hours", tamilLabel: "மணிநேரம்", value: timeLeft.hours },
    { label: "Minutes", tamilLabel: "நிமிடங்கள்", value: timeLeft.minutes },
    { label: "Seconds", tamilLabel: "நொடிகள்", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 relative z-20">
      {/* Divider Kolam Dot pattern */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full bg-traditional-gold/50" />
        <div className="w-3 h-3 rounded-full bg-traditional-gold animate-ping" />
        <div className="w-2 h-2 rounded-full bg-traditional-gold/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="royal-card rounded-2xl p-6 md:p-10 text-center flex flex-col items-center"
      >
        <h4 className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-traditional-gold uppercase font-bold mb-2">
          The Sacred Countdown
        </h4>
        <h3 className="font-playfair text-2xl md:text-3xl italic text-traditional-cream mb-8">
          Counting down to the Subha Muhurtham
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
          {timerItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-traditional-maroon-dark/60 border border-traditional-gold/30 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:border-traditional-gold transition-colors duration-300"
            >
              {/* Card corner gold decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-traditional-gold/60" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-traditional-gold/60" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-traditional-gold/60" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-traditional-gold/60" />

              <span className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-gold-gradient font-bold tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-montserrat text-xs tracking-wider text-traditional-cream uppercase mt-2 font-medium">
                {item.label}
              </span>
              <span className="font-playfair text-[10px] md:text-xs text-traditional-mustard italic mt-0.5">
                {item.tamilLabel}
              </span>
            </motion.div>
          ))}
        </div>

        {timeLeft.isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-traditional-gold font-cinzel text-lg tracking-widest"
          >
            The Auspicious Marriage Ceremony Has Begun!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
