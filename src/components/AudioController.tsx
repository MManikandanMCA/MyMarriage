import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioSynth } from "../utils/audioSynth";

interface AudioControllerProps {
  splashActive: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({ splashActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // If splash becomes inactive, we can automatically prompt or handle music,
    // but the default is OFF as requested.
    return () => {
      audioSynth.stopAmbientRaga();
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      audioSynth.stopAmbientRaga();
      setIsPlaying(false);
    } else {
      // Play a sweet ring sound first as confirmation
      audioSynth.playChimes();
      // Start the procedural flute + drone raga
      setTimeout(() => {
        audioSynth.startAmbientRaga();
      }, 100);
      setIsPlaying(true);
    }
  };

  // Do not show float button if Splash Screen is still active, as clicking there starts the experience
  if (splashActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleToggle}
        className="w-14 h-14 bg-gradient-to-r from-traditional-gold-dark to-traditional-gold rounded-full flex items-center justify-center text-traditional-maroon-dark shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-traditional-cream-dark relative group"
        title={isPlaying ? "Mute Divine Music" : "Play Divine Music"}
      >
        {isPlaying ? (
          <div className="flex items-center justify-center gap-0.5">
            <Volume2 className="w-5 h-5" />
            
            {/* Animated Audio bars */}
            <div className="flex items-end gap-[2px] h-3 ml-1">
              <span className="w-[2px] bg-traditional-maroon-dark rounded-full animate-[pulse_0.8s_infinite_alternate]" style={{ height: "4px" }} />
              <span className="w-[2px] bg-traditional-maroon-dark rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: "12px", animationDelay: "0.2s" }} />
              <span className="w-[2px] bg-traditional-maroon-dark rounded-full animate-[pulse_0.7s_infinite_alternate]" style={{ height: "8px", animationDelay: "0.1s" }} />
            </div>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 opacity-80" />
        )}

        {/* Text tooltip */}
        <span className="absolute right-16 bg-traditional-maroon-dark text-traditional-gold text-[10px] font-cinzel tracking-widest px-3 py-1.5 rounded-lg border border-traditional-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap uppercase">
          {isPlaying ? "Mute Divine Sound" : "Play Divine Sound"}
        </span>
      </button>
    </div>
  );
};

export default AudioController;
