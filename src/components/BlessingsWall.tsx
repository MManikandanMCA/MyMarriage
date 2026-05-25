import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

interface BlessingItem {
  name: string;
  message: string;
}

interface BlessingsWallProps {
  blessings: BlessingItem[];
}

export const BlessingsWall: React.FC<BlessingsWallProps> = ({ blessings }) => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 relative z-20">
      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full bg-traditional-gold/50" />
        <div className="w-3 h-3 rounded-full bg-traditional-gold animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-traditional-gold/50" />
      </div>

      <div className="text-center mb-10">
        <h4 className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-traditional-gold uppercase font-bold mb-2">
          அன்பு வாழ்த்துக்கள்
        </h4>
        <h2 className="font-cinzel text-2xl md:text-3xl text-gold-gradient font-bold">
          Blessings & Wishes
        </h2>
        <div className="w-16 h-[1px] bg-traditional-gold/50 mx-auto mt-3" />
      </div>

      {/* Guestbook Cards Board */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {blessings.map((item, idx) => (
            <motion.div
              key={`${item.name}-${idx}`}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: Math.min(idx * 0.1, 0.5), duration: 0.6 }}
              className="bg-traditional-maroon-dark/50 border border-traditional-gold/20 rounded-xl p-5 relative overflow-hidden group hover:border-traditional-gold/60 transition-colors duration-300 flex flex-col justify-between"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-10 text-traditional-gold group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                <MessageCircleHeart className="w-full h-full" />
              </div>

              <p className="font-montserrat text-xs md:text-sm text-traditional-cream/80 italic leading-relaxed mb-4">
                "{item.message}"
              </p>
              
              <div className="border-t border-traditional-gold/10 pt-3 flex items-center justify-between mt-auto">
                <span className="font-cinzel text-[10px] md:text-xs text-traditional-gold font-bold tracking-wide">
                  {item.name}
                </span>
                <span className="text-[10px] text-traditional-mustard font-playfair italic">
                  Blessed
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BlessingsWall;
