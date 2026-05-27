import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";

interface EventDetailsProps {
  onOpenRSVP: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ onOpenRSVP }) => {
  
  // Custom client-side ICS generator
  const downloadICS = (title: string, desc: string, location: string, startDateStr: string, endDateStr: string, filename: string) => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Tamil Wedding//Nonsgml Double//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${location}`,
      `DTSTART:${startDateStr}`,
      `DTEND:${endDateStr}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddToCalendar = () => {
    // Muhurtham Event: Sept 13, 2026, 9:00 AM IST (03:30 UTC) to 12:00 PM IST (06:30 UTC)
    downloadICS(
      "Manikandan & Vasuki Tamil Traditional Wedding",
      "Join us for the Subha Muhurtham and traditional marriage ceremonies of Manikandan and Manicka Vasuki.",
      "AG Mahal, Sivakasi, Tamil Nadu, India",
      "20260913T033000Z",
      "20260913T063000Z",
      "Manikandan_Vasuki_Wedding.ics"
    );
  };

  const events = [
    {
      title: "நிச்சயதார்த்தம் (Engagement Welcoming)",
      subtitle: "Nichayathartham & Welcoming",
      date: "Monday, May 18, 2026",
      time: "5:00 PM - 8:30 PM IST",
      description: "Welcoming of families, traditional ring updates, followed by a music recital and dinner. - Function Finished",
      venue: "AG Mahal, Sivakasi",
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: "திருமணம் (Subha Muhurtham)",
      subtitle: "Holy Marriage Ceremony",
      date: "Sunday, September 13, 2026",
      time: "7:00 AM - 8:30 AM IST",
      description: "The sacred binding ceremony involving the Mangalya Dharanam (tying of the Thali) amidst traditional Getti Melam.",
      venue: "AG Mahal, Sivakasi",
      icon: <Calendar className="w-5 h-5" />,
      featured: true
    },
    {
      title: "மதிய விருந்து (Reception & Feast)",
      subtitle: "Kalyana Virundhu & Reception",
      date: "Sunday, September 13, 2026",
      time: "12:30 AM - 2:30 PM IST",
      description: "A grand traditional South Indian banana-leaf feast to celebrate our wedding and thank our guests.",
      venue: "Mini Mandabam, Thalavaipuram",
      icon: <Clock className="w-5 h-5" />
    }
  ];


  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 z-20">
      
      {/* Side Decorative Kuthu Vilakku (Traditional Brass Lamps) */}
      <div className="absolute left-2 top-10 hidden lg:flex flex-col items-center opacity-60">
        <KuthuVilakku />
      </div>
      <div className="absolute right-2 top-10 hidden lg:flex flex-col items-center opacity-60">
        <KuthuVilakku />
      </div>

      <div className="text-center mb-12">
        <h4 className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-traditional-gold uppercase font-bold mb-2">
          மங்கல நிகழ்வுகள்
        </h4>
        <h2 className="font-cinzel text-3xl md:text-4xl text-gold-gradient font-bold">
          Auspicious Celebrations
        </h2>
        <div className="w-24 h-[1px] bg-traditional-gold/50 mx-auto mt-4" />
      </div>

      {/* Events Timeline/Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.15, duration: 0.8 }}
            className={`royal-card rounded-2xl p-6 flex flex-col justify-between text-left relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ${
              event.featured ? "border-traditional-gold border-[3px]" : "border-traditional-gold/30"
            }`}
          >
            {/* Banner for featured (Wedding) event */}
            {event.featured && (
              <div className="absolute top-0 right-0 bg-traditional-gold text-traditional-maroon-dark text-[10px] font-cinzel font-bold px-3 py-1 rounded-bl-lg tracking-widest uppercase">
                Muhurtham
              </div>
            )}

            <div>
              {/* Event Icon */}
              <div className="w-10 h-10 rounded-full bg-traditional-gold/10 border border-traditional-gold/30 flex items-center justify-center text-traditional-gold mb-4 group-hover:bg-traditional-gold/25 transition-colors duration-300">
                {event.icon}
              </div>

              {/* Event Titles */}
              <h3 className="font-playfair text-lg md:text-xl font-bold text-traditional-gold mb-1">
                {event.title}
              </h3>
              <h4 className="font-cinzel text-xs tracking-wider text-traditional-cream/70 font-semibold mb-4 uppercase">
                {event.subtitle}
              </h4>

              {/* Event Details */}
              <div className="space-y-2 text-sm text-traditional-cream/80 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-traditional-mustard shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-traditional-mustard shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-traditional-mustard shrink-0 mt-0.5" />
                  <span>{event.venue}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-traditional-cream/70 leading-relaxed italic mb-6">
                {event.description}
              </p>
            </div>

            {/* Quick Actions inside Card */}
            <div className="flex gap-2 mt-auto">
              <a
                href="https://maps.google.com/?q=AG+Mahal,+Sivakasi,+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-traditional-gold text-traditional-maroon-dark text-center font-cinzel text-[11px] font-bold py-2.5 px-3 rounded-lg hover:bg-traditional-cream hover:text-traditional-maroon transition-all duration-300 uppercase tracking-widest"
              >

                Directions
              </a>
              {event.featured && (
                <button
                  onClick={handleAddToCalendar}
                  className="bg-transparent border border-traditional-gold/40 text-traditional-gold hover:bg-traditional-gold hover:text-traditional-maroon-dark text-center font-cinzel text-[11px] font-bold py-2.5 px-3 rounded-lg transition-all duration-300 uppercase tracking-widest"
                >
                  Invitation
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Primary Call to Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
      >
        <button
          onClick={onOpenRSVP}
          className="w-full sm:w-auto bg-gradient-to-r from-traditional-gold-dark via-traditional-gold to-traditional-gold-light text-traditional-maroon-dark font-cinzel text-sm font-extrabold py-3.5 px-8 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 uppercase tracking-widest"
        >
          R.S.V.P. & Send Blessings
        </button>
        
        <button
          onClick={handleAddToCalendar}
          className="w-full sm:w-auto bg-transparent border border-traditional-gold/60 text-traditional-gold font-cinzel text-sm font-bold py-3.5 px-8 rounded-full hover:bg-traditional-gold/10 hover:border-traditional-gold transition-all duration-300 uppercase tracking-widest"
        >
          Add to Calendar
        </button>
      </motion.div>
    </section>
  );
};

// Sub-component: Traditional Kuthu Vilakku (Tamil Standing Oil Lamp) SVG with flicker
const KuthuVilakku: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-16 h-72 relative">
      {/* Animated Flicker flame at the top */}
      <svg viewBox="0 0 100 300" fill="none" className="w-full h-full text-traditional-gold">
        {/* Flame */}
        <motion.path
          d="M50 45 C45 35 45 20 50 10 C55 20 55 35 50 45 Z"
          fill="url(#flameGrad)"
          animate={{
            scaleY: [1, 1.15, 0.95, 1.1, 1],
            skewX: [0, 4, -4, 2, 0],
            scaleX: [1, 0.9, 1.05, 0.95, 1]
          }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="origin-bottom"
        />

        {/* Inner core flame */}
        <motion.path
          d="M50 40 C47 35 47 25 50 18 C53 25 53 35 50 40 Z"
          fill="#FFFDD0"
          animate={{
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            skewX: [0, 3, -3, 1, 0]
          }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="origin-bottom"
        />

        {/* Lamp Crown */}
        <ellipse cx="50" cy="50" rx="10" ry="5" fill="currentColor" />
        
        {/* Stand / Shaft */}
        <rect x="47" y="55" width="6" height="190" fill="currentColor" />
        {/* Moldings on the shaft */}
        <ellipse cx="50" cy="85" rx="8" ry="4" fill="currentColor" />
        <ellipse cx="50" cy="145" rx="8" ry="4" fill="currentColor" />
        <ellipse cx="50" cy="205" rx="8" ry="4" fill="currentColor" />
        
        {/* Oil Bowl holder */}
        <path d="M25 50 C25 65 75 65 75 50 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="2" fill="#FAF9F6" />

        {/* Pedestal Base */}
        <path d="M30 245 C30 230 70 230 70 245 Z" fill="currentColor" />
        <rect x="25" y="245" width="50" height="10" rx="2" fill="currentColor" />
        <rect x="15" y="255" width="70" height="12" rx="4" fill="currentColor" />

        {/* Gradients */}
        <defs>
          <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#b4141e" />
            <stop offset="50%" stopColor="#e1a95f" />
            <stop offset="100%" stopColor="#fffdd0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
export default EventDetails;
