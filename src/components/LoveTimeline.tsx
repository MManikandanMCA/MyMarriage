import React from "react";
import { motion } from "framer-motion";
import { Heart, Laptop, Sparkles, Compass } from "lucide-react";

export const LoveTimeline: React.FC = () => {
  const timelineEvents = [
    {
      year: "2019",
      title: "முதல் சந்திப்பு (The Spark)",
      tamilDesc: "எங்கள் காதல் பயணம் தொடங்கிய ஆண்டு.",
      description: "Our love story began with simple, beautiful moments. Two worlds connected, and a quiet promise was born in our hearts.",
      icon: <Heart className="w-5 h-5 text-[#b4141e]" />,
    },
    {
      year: "2025",
      title: "கனவுகளை நோக்கி... (Building Dreams)",
      tamilDesc: "பொறியியலும் கலையும் இணைந்த காலம்.",
      description: "Supporting each other's aspirations. One coding software in Chennai, the other visualizing space and interior design in Sivakasi. Coding and designing our shared future.",
      icon: (
        <div className="flex gap-1 text-traditional-gold">
          <Laptop className="w-3.5 h-3.5" />
          <Compass className="w-3.5 h-3.5" />
        </div>
      ),
    },
    {
      year: "2026-05-18",
      title: "நிச்சயதார்த்தம் (The Engagement)",
      tamilDesc: "இரு மனங்கள் இணைந்த நன்னாள்.",
      description: "Our love became a formal promise at AG Mahal, Sivakasi. Surrounded by family blessings, we took our first step toward eternity.",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    },
    {
      year: "2026-09-13",
      title: "திருமணம் (The Wedding)",
      tamilDesc: "எங்கள் வாழ்வின் புதிய தொடக்கம்.",
      description: "Design meets Code for a lifetime. On September 13, 2026, we tie the holy knot to build our dream and live our together-forever.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-traditional-gold">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      highlighted: true,
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 relative z-20">
      <div className="text-center mb-12">
        <h4 className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-traditional-gold uppercase font-bold mb-2">
          எங்கள் காதல் பயணம்
        </h4>
        <h2 className="font-cinzel text-3xl md:text-4xl text-gold-gradient font-bold">
          Our Love Story
        </h2>
        <p className="font-playfair text-sm text-traditional-cream/70 italic mt-2">
          "Designing our spaces, coding our lives, visualising our forever"
        </p>
        <div className="w-24 h-[1px] bg-traditional-gold/50 mx-auto mt-4" />
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-traditional-gold/30 ml-4 md:ml-0 md:flex md:flex-col md:border-l-0">
        
        {/* Central timeline line for Desktop */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-traditional-gold/30 hidden md:block" />

        {timelineEvents.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={event.year} className="relative mb-12 md:mb-16 flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
              
              {/* Timeline dot / icon */}
              <div className="absolute -left-[22px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-10 w-11 h-11 rounded-full bg-traditional-maroon border-2 border-traditional-gold flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                {event.icon}
              </div>

              {/* Left block (Desktop empty / Card) */}
              <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${isLeft ? "md:text-right" : "md:order-last md:text-left"}`}>
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`royal-card rounded-2xl p-5 md:p-6 ${
                    event.highlighted ? "border-traditional-gold border-2" : "border-traditional-gold/20"
                  }`}
                >
                  <span className="font-cinzel text-xs tracking-widest text-traditional-gold font-bold">
                    {event.year}
                  </span>
                  
                  <h3 className="font-playfair text-lg md:text-xl font-bold text-traditional-cream mt-1">
                    {event.title}
                  </h3>
                  
                  <span className="font-cinzel text-[10px] md:text-xs text-traditional-mustard tracking-wider block mt-0.5">
                    {event.tamilDesc}
                  </span>

                  <p className="font-montserrat text-xs md:text-sm text-traditional-cream/70 leading-relaxed mt-3">
                    {event.description}
                  </p>
                </motion.div>
              </div>

              {/* Right block spacer (Desktop empty) */}
              <div className="w-full md:w-[45%] hidden md:block" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LoveTimeline;
