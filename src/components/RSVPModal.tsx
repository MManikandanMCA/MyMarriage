import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check } from "lucide-react";
import { audioSynth } from "../utils/audioSynth";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlessing: (name: string, message: string) => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose, onAddBlessing }) => {
  const [form, setForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    wishes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    // Trigger sweet success synthesized chime
    audioSynth.playChimes();

    // Call callback to add blessing to dynamic wall
    const message = form.wishes.trim() || "மணமக்களுக்கு எங்களது நெஞ்சார்ந்த திருமண நல்வாழ்த்துக்கள்! வாழ்க வளமுடன்!";
    onAddBlessing(form.name, message);

    setIsSubmitted(true);

    // Auto close after some time
    setTimeout(() => {
      setIsSubmitted(false);
      setForm({ name: "", attending: "yes", guests: "1", wishes: "" });
      onClose();
    }, 3500);
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Dark Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#080001]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="royal-card w-full max-w-lg rounded-2xl p-6 md:p-8 relative overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-traditional-gold hover:text-traditional-cream transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Kolam Corner decoration SVGs */}
            <div className="absolute -top-6 -left-6 w-16 h-16 text-traditional-gold/20 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="50" cy="50" r="30" />
                <path d="M50 10 Q30 50 50 90 Q70 50 50 10" />
                <path d="M10 50 Q50 30 90 50 Q50 70 10 50" />
              </svg>
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 text-traditional-gold/20 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="50" cy="50" r="30" />
                <path d="M50 10 Q30 50 50 90 Q70 50 50 10" />
                <path d="M10 50 Q50 30 90 50 Q50 70 10 50" />
              </svg>
            </div>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <span className="font-cinzel text-xs tracking-[0.2em] text-traditional-gold font-bold uppercase">
                    R.S.V.P.
                  </span>
                  <h3 className="font-playfair text-2xl italic text-traditional-cream mt-1">
                    Kindly Respond
                  </h3>
                  <p className="text-[10px] md:text-xs text-traditional-mustard tracking-wider uppercase mt-1">
                    மங்கலப் பதிவுகள்
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Name field */}
                  <div>
                    <label className="block font-cinzel text-xs tracking-wider text-traditional-gold mb-1.5 font-semibold">
                      Your Name / உங்கள் பெயர் *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh & Family"
                      className="w-full bg-traditional-maroon-dark/60 border border-traditional-gold/30 rounded-lg py-2.5 px-4 text-traditional-cream placeholder-traditional-cream/40 focus:outline-none focus:border-traditional-gold transition-colors duration-200 font-montserrat text-sm"
                    />
                  </div>

                  {/* Attending field */}
                  <div>
                    <label className="block font-cinzel text-xs tracking-wider text-traditional-gold mb-2 font-semibold">
                      Will You Attend? / வருகை தருவீர்களா?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex-1 flex items-center justify-center gap-2 border border-traditional-gold/30 rounded-lg py-2.5 px-4 cursor-pointer bg-traditional-maroon-dark/40 hover:bg-traditional-maroon-dark/80 transition-colors duration-200">
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={form.attending === "yes"}
                          onChange={() => setForm({ ...form, attending: "yes" })}
                          className="accent-traditional-gold"
                        />
                        <span className="text-xs md:text-sm text-traditional-cream font-medium">Yes, Attending</span>
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-2 border border-traditional-gold/30 rounded-lg py-2.5 px-4 cursor-pointer bg-traditional-maroon-dark/40 hover:bg-traditional-maroon-dark/80 transition-colors duration-200">
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={form.attending === "no"}
                          onChange={() => setForm({ ...form, attending: "no" })}
                          className="accent-traditional-gold"
                        />
                        <span className="text-xs md:text-sm text-traditional-cream font-medium">Send Blessings Only</span>
                      </label>
                    </div>
                  </div>

                  {/* Guests field */}
                  {form.attending === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block font-cinzel text-xs tracking-wider text-traditional-gold mb-1.5 font-semibold">
                        Number of Guests / விருந்தினர்கள் எண்ணிக்கை
                      </label>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="w-full bg-traditional-maroon-dark/60 border border-traditional-gold/30 rounded-lg py-2.5 px-4 text-traditional-cream focus:outline-none focus:border-traditional-gold transition-colors duration-200 font-montserrat text-sm"
                      >
                        {[1, 2, 3, 4, 5, "6+"].map((num) => (
                          <option key={num} value={num} className="bg-traditional-maroon">
                            {num} {num === 1 ? "Person" : "People"}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  )}

                  {/* Wishes field */}
                  <div>
                    <label className="block font-cinzel text-xs tracking-wider text-traditional-gold mb-1.5 font-semibold">
                      Blessings & Wishes / மணமக்கள் வாழ்த்துக்கள்
                    </label>
                    <textarea
                      rows={3}
                      value={form.wishes}
                      onChange={(e) => setForm({ ...form, wishes: e.target.value })}
                      placeholder="Write your blessings here..."
                      className="w-full bg-traditional-maroon-dark/60 border border-traditional-gold/30 rounded-lg py-2 px-4 text-traditional-cream placeholder-traditional-cream/40 focus:outline-none focus:border-traditional-gold transition-colors duration-200 font-montserrat text-sm resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-traditional-gold text-traditional-maroon-dark font-cinzel text-xs font-extrabold py-3 px-6 rounded-lg shadow-lg hover:bg-traditional-cream hover:text-traditional-maroon transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    Submit Response
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 bg-traditional-gold/10 border-2 border-traditional-gold rounded-full flex items-center justify-center text-traditional-gold animate-bounce mb-2">
                  <Check className="w-8 h-8" />
                </div>
                
                <h3 className="font-playfair text-3xl italic text-traditional-cream">
                  Mikka Nandri!
                </h3>
                
                <span className="font-cinzel-deco text-xl text-traditional-gold font-bold block">
                  மிக்க நன்றி!
                </span>

                <p className="font-montserrat text-sm text-traditional-cream/80 max-w-sm mx-auto leading-relaxed">
                  Your response has been saved. Thank you so much for your presence and lovely blessings!
                </p>
                
                <div className="pt-4 flex items-center justify-center gap-1.5 text-xs text-traditional-gold font-cinzel">
                  <span className="w-1.5 h-1.5 rounded-full bg-traditional-gold animate-ping" />
                  <span>Blessing Register Closed</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;
