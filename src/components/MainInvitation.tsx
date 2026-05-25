import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import LoveTimeline from "./LoveTimeline";
import CountdownTimer from "./CountdownTimer";
import EventDetails from "./EventDetails";
import BlessingsWall from "./BlessingsWall";
import BlessingScreen from "./BlessingScreen";
import FlowerPetalsCanvas from "./FlowerPetalsCanvas";

interface BlessingItem {
  name: string;
  message: string;
}

interface MainInvitationProps {
  onOpenRSVP: () => void;
  blessings: BlessingItem[];
}

export const MainInvitation: React.FC<MainInvitationProps> = ({ onOpenRSVP, blessings }) => {
  return (
    <div className="relative min-h-screen w-full bg-traditional-maroon-dark text-traditional-cream overflow-hidden">
      {/* Background Mandala overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center z-0">
        <svg viewBox="0 0 500 500" className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] text-traditional-gold animate-spin-slow">
          {/* Detailed mandala pattern */}
          <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="250" cy="250" r="60" stroke="currentColor" strokeWidth="1.5" fill="none" />
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <g key={i} transform={`rotate(${angle} 250 250)`}>
                <line x1="250" y1="20" x2="250" y2="70" stroke="currentColor" strokeWidth="1.5" />
                <path d="M250 120 Q260 150 250 180 Q240 150 250 120" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="250" cy="95" r="4" fill="currentColor" />
                <circle cx="250" cy="210" r="3" fill="currentColor" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Flower Petals Canvas */}
      <FlowerPetalsCanvas />

      {/* Structured Sections with Framer Motion reveal transitions */}
      <div className="relative z-10">
        
        {/* Section 1: Welcoming Hero Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <HeroSection />
        </motion.div>

        {/* Section 1.5: Love Journey Timeline */}
        <LoveTimeline />

        {/* Section 2: Timer Countdown */}
        <CountdownTimer />

        {/* Section 3: Event Details */}
        <EventDetails onOpenRSVP={onOpenRSVP} />

        {/* Section 3.5: Dynamic Blessings Wall (Guestbook) */}
        <BlessingsWall blessings={blessings} />

        {/* Section 4: Blessing screen at bottom */}
        <BlessingScreen />
        
      </div>

      {/* Footer Details */}
      <div className="relative z-20 py-8 bg-traditional-maroon-dark/95 border-t border-traditional-gold/20 text-center text-[10px] md:text-xs text-traditional-cream/40 font-montserrat uppercase tracking-[0.15em] select-none">
        <span>© 2026 Manikandan & Vasuki Wedding. Made with Love & Blessings.</span>
      </div>
    </div>
  );
};

export default MainInvitation;

