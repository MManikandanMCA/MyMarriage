import React from "react";
import { motion } from "framer-motion";
import groomImg from "../assets/Groom.jpeg";
import brideImg from "../assets/Bride.jpeg";
import { Phone, Laptop, Compass } from "lucide-react";


export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center select-none">
      {/* Decorative Top Arch / Thoranam */}
      <div className="absolute top-0 inset-x-0 h-16 flex justify-around pointer-events-none opacity-80 z-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-[1px] h-4 bg-yellow-600/60" />
            <motion.div
              animate={{ rotate: [i % 2 === 0 ? -3 : 3, i % 2 === 0 ? 3 : -3, i % 2 === 0 ? -3 : 3] }}
              transition={{ repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut" }}
              className="w-5 h-12 bg-gradient-to-b from-emerald-800 to-emerald-600 rounded-b-full shadow-md origin-top transform-gpu"
              style={{
                borderRadius: "50% 50% 50% 50% / 0% 0% 100% 100%",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
              }}
            />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute top-3.5 shadow-sm" />
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto z-20 flex flex-col items-center mt-8"
      >
        {/* Sacred Tamil Ganesha Symbol (Pillayar Suzhi) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-traditional-gold font-cinzel text-3xl mb-4 font-bold"
        >
          உ
        </motion.div>

        {/* Traditional Invitation Header */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-traditional-gold font-tangerine text-4xl md:text-5xl tracking-wide mb-1"
        >
          Kalyana Pathirikai
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-3xl md:text-5xl font-cinzel-deco text-gold-gradient tracking-widest font-bold mb-8"
        >
          திருமண அழைப்பிதழ்
        </motion.h1>

        {/* Couple Section with circular real images */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 my-10">
          
          {/* Groom: Manikandan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center group"
          >
            <div className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
              {/* Rotating Golden aura ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-traditional-gold rounded-full"
              />
              {/* Pulsing Solid Ring */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -inset-1 border border-traditional-gold/40 rounded-full"
              />
              
              {/* Image Frame */}
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-traditional-gold bg-traditional-maroon-dark flex items-center justify-center relative shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <img
                  src={groomImg}
                  alt="Groom Manikandan"
                  className="w-full h-full object-cover object-top scale-[1.05] group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            <h3 className="mt-4 font-cinzel text-xl md:text-2xl text-traditional-gold font-bold tracking-wide">
              M. மணிகண்டன்
            </h3>
            <span className="font-montserrat text-xs tracking-wider text-traditional-cream/70 uppercase mt-1 flex items-center gap-1">
              <Laptop className="w-3.5 h-3.5 text-traditional-mustard" /> Software Engineer
            </span>
            <span className="font-playfair italic text-xs text-traditional-mustard mt-1 max-w-[200px]">
              Furtim Technologies Pvt. Ltd., Chennai
            </span>
            <a
              href="tel:+916385501361"
              className="mt-2.5 flex items-center gap-1.5 bg-traditional-gold/10 border border-traditional-gold/30 hover:bg-traditional-gold/30 hover:border-traditional-gold py-1 px-3 rounded-full text-xs text-traditional-gold font-montserrat transition-all duration-300 pointer-events-auto"
            >
              <Phone className="w-3 h-3" /> 6385501361
            </a>
          </motion.div>

          {/* Sacred Wedding Knot Icon (Mangalyam / Thali) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col items-center relative"
          >
            <div className="w-16 h-16 flex items-center justify-center text-traditional-gold bg-traditional-maroon-light rounded-full border border-traditional-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <svg viewBox="0 0 40 40" fill="currentColor" className="w-10 h-10 animate-float">
                <path d="M20 5 L23 10 Q28 10 28 15 Q28 20 20 30 Q12 20 12 15 Q12 10 17 10 Z" />
                <circle cx="20" cy="6" r="1.5" fill="#110103" />
                <circle cx="20" cy="18" r="1.5" fill="#3d0309" />
              </svg>
            </div>
            <span className="text-xs text-traditional-gold font-cinzel tracking-widest mt-2 uppercase font-semibold">
              Weds
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-traditional-gold to-transparent mt-2" />
          </motion.div>

          {/* Bride: Manicka Vasuki */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center group"
          >
            <div className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
              {/* Rotating Golden aura ring (counter-clockwise) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-traditional-gold rounded-full"
              />
              {/* Pulsing Solid Ring */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -inset-1 border border-traditional-gold/40 rounded-full"
              />

              {/* Image Frame */}
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-traditional-gold bg-traditional-maroon-dark flex items-center justify-center relative shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <img
                  src={brideImg}
                  alt="Bride Manicka Vasuki"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            <h3 className="mt-4 font-cinzel text-xl md:text-2xl text-traditional-gold font-bold tracking-wide">
              S. மாணிக்கவாசுகி
            </h3>
            <span className="font-montserrat text-xs tracking-wider text-traditional-cream/70 uppercase mt-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-traditional-mustard" /> 3D Visualizer
            </span>
            <span className="font-playfair italic text-xs text-traditional-mustard mt-1 max-w-[200px]">
              Creospace Interior Studio, Sivakasi
            </span>
            <div className="mt-2.5 opacity-0 pointer-events-none py-1 px-3 text-xs">
              {/* Mirror structure spacing placeholder */}
              &nbsp;
            </div>
          </motion.div>

        </div>

        {/* Poetry / Story introduction text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 space-y-4 px-6 max-w-2xl mx-auto"
        >
          <p className="font-playfair text-xl md:text-2xl italic text-traditional-cream">
            "Designing our spaces, coding our lives, visualising our forever"
          </p>
          <p className="font-montserrat text-sm md:text-base text-traditional-cream/80 tracking-wide leading-relaxed">
            With the divine blessings of Lord Ganesha and our beloved families, we cordially invite you to join us on this auspicious occasion of our wedding celebration as we exchange our vows and begin our sacred journey of togetherness.
          </p>
          
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-[1px] w-12 bg-traditional-gold/40" />
            <span className="font-cinzel text-xs tracking-widest text-traditional-gold uppercase font-semibold">
              Kalyana Vaibhogam
            </span>
            <div className="h-[1px] w-12 bg-traditional-gold/40" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-6 inset-x-0 mx-auto w-6 h-10 flex items-center justify-center border border-traditional-gold/30 rounded-full opacity-60 z-20"
      >
        <div className="w-1 h-2 bg-traditional-gold rounded-full" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
