import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import engagementPhoto from "../assets/engagement.jpg";

interface EventDetailsProps {
  onOpenRSVP: () => void;
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

interface EventMark {
  month: number; // 0-indexed
  year: number;
  days: { day: number; label: string; color: string }[];
}

const EVENT_MARKS: EventMark[] = [
  {
    month: 4, // May
    year: 2026,
    days: [{ day: 18, label: "Engagement", color: "#D4AF37" }]
  },
  {
    month: 8, // September
    year: 2026,
    days: [
      { day: 13, label: "Muhurtham", color: "#b4141e" },
      { day: 13, label: "Reception", color: "#e1a95f" }
    ]
  }
];

const WeddingCalendar: React.FC = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(4); // May 2026

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const mark = EVENT_MARKS.find(m => m.month === viewMonth && m.year === viewYear);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="royal-card rounded-2xl p-6 max-w-sm mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-full border border-traditional-gold/40 flex items-center justify-center text-traditional-gold hover:bg-traditional-gold/20 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-cinzel text-base font-bold text-traditional-gold tracking-widest uppercase">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-full border border-traditional-gold/40 flex items-center justify-center text-traditional-gold hover:bg-traditional-gold/20 transition-colors duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[10px] font-cinzel font-bold text-traditional-gold/50 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const eventDay = mark?.days.find(e => e.day === day);
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();

          return (
            <div
              key={day}
              title={eventDay?.label}
              className={`relative flex items-center justify-center rounded-full w-8 h-8 mx-auto text-xs font-montserrat font-semibold transition-all duration-200
                ${eventDay ? "text-traditional-maroon-dark font-extrabold" : "text-traditional-cream/70"}
                ${isToday && !eventDay ? "border border-traditional-gold/40" : ""}
              `}
              style={eventDay ? { backgroundColor: eventDay.color, boxShadow: `0 0 10px ${eventDay.color}88` } : {}}
            >
              {day}
              {eventDay && (
                <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[7px] whitespace-nowrap text-traditional-gold font-cinzel leading-tight hidden sm:block">
                  {eventDay.label.split(" ")[0]}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#D4AF37] inline-block" />
          <span className="text-[10px] font-cinzel text-traditional-cream/60 uppercase tracking-wider">Engagement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#b4141e] inline-block" />
          <span className="text-[10px] font-cinzel text-traditional-cream/60 uppercase tracking-wider">Muhurtham</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#e1a95f] inline-block" />
          <span className="text-[10px] font-cinzel text-traditional-cream/60 uppercase tracking-wider">Reception</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const EventDetails: React.FC<EventDetailsProps> = ({ onOpenRSVP }) => {

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
      id: "engagement",
      title: "நிச்சயதார்த்தம் (Engagement Welcoming)",
      subtitle: "Nichayathartham & Welcoming",
      date: "Monday, May 18, 2026",
      time: "5:00 PM - 8:30 PM IST",
      description: "Welcoming of families, traditional ring updates, followed by a music recital and dinner. - Function Finished",
      venue: "AG Mahal, Sivakasi",
      mapsUrl: null, // Directions disabled for engagement
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "wedding",
      title: "திருமணம் (Subha Muhurtham)",
      subtitle: "Holy Marriage Ceremony",
      date: "Sunday, September 13, 2026",
      time: "7:00 AM - 8:30 AM IST",
      description: "The sacred binding ceremony involving the Mangalya Dharanam (tying of the Thali) amidst traditional Getti Melam.",
      venue: "AG Mahal, Sivakasi",
      mapsUrl: "https://maps.google.com/?q=AG+Mahal,+Sivakasi,+Tamil+Nadu",
      icon: <Calendar className="w-5 h-5" />,
      featured: true
    },
    {
      id: "reception",
      title: "மதிய விருந்து (Reception & Feast)",
      subtitle: "Kalyana Virundhu & Reception",
      date: "Sunday, September 13, 2026",
      time: "12:30 PM - 2:30 PM IST",
      description: "A grand traditional South Indian banana-leaf feast to celebrate our wedding and thank our guests.",
      venue: "Mini Mandabam, Thalavaipuram",
      mapsUrl: "https://maps.google.com/?q=Mini+Mandabam,+Thalavaipuram,+Tamil+Nadu",
      icon: <Clock className="w-5 h-5" />
    }
  ];

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 z-20">

      {/* Side Decorative Kuthu Vilakku */}
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

      {/* ── Engagement Couple Photo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-14 flex flex-col items-center"
      >
        <div className="relative w-full max-w-md mx-auto">
          {/* Decorative border frame */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-traditional-gold-dark via-traditional-gold to-traditional-gold-light opacity-60 blur-sm" />
          <div className="relative rounded-3xl overflow-hidden border-4 border-traditional-gold/70 shadow-[0_0_40px_rgba(212,175,55,0.35)]">
            <img
              src={engagementPhoto}
              alt="Manikandan & Vasuki – Engagement Ceremony"
              className="w-full object-cover object-top"
              style={{ maxHeight: "780px" }}
            />
            {/* Overlay label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-traditional-maroon-dark/90 to-transparent px-6 py-5 text-center">
              <p className="font-playfair text-traditional-gold text-xl font-bold drop-shadow">
                நிச்சயதார்த்தம்
              </p>
              <p className="font-cinzel text-traditional-cream/80 text-xs tracking-widest uppercase mt-1">
                Engagement Ceremony · May 18, 2026
              </p>
            </div>
          </div>

          {/* Floating hearts */}
          {["top-3 left-3", "top-3 right-3", "bottom-16 left-3", "bottom-16 right-3"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} text-traditional-gold`}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.3 }}
            >
              <Heart className="w-5 h-5 fill-traditional-gold" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.15, duration: 0.8 }}
            className={`royal-card rounded-2xl p-6 flex flex-col justify-between text-left relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ${
              event.featured ? "border-traditional-gold border-[3px]" : "border-traditional-gold/30"
            }`}
          >
            {event.featured && (
              <div className="absolute top-0 right-0 bg-traditional-gold text-traditional-maroon-dark text-[10px] font-cinzel font-bold px-3 py-1 rounded-bl-lg tracking-widest uppercase">
                Muhurtham
              </div>
            )}

            <div>
              <div className="w-10 h-10 rounded-full bg-traditional-gold/10 border border-traditional-gold/30 flex items-center justify-center text-traditional-gold mb-4 group-hover:bg-traditional-gold/25 transition-colors duration-300">
                {event.icon}
              </div>

              <h3 className="font-playfair text-lg md:text-xl font-bold text-traditional-gold mb-1">
                {event.title}
              </h3>
              <h4 className="font-cinzel text-xs tracking-wider text-traditional-cream/70 font-semibold mb-4 uppercase">
                {event.subtitle}
              </h4>

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

              <p className="text-xs md:text-sm text-traditional-cream/70 leading-relaxed italic mb-6">
                {event.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-auto">
              {/* Directions button – disabled for engagement */}
              {event.mapsUrl ? (
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-traditional-gold text-traditional-maroon-dark text-center font-cinzel text-[11px] font-bold py-2.5 px-3 rounded-lg hover:bg-traditional-cream hover:text-traditional-maroon transition-all duration-300 uppercase tracking-widest"
                >
                  Directions
                </a>
              ) : (
                <span
                  className="flex-1 bg-traditional-gold/20 text-traditional-gold/40 text-center font-cinzel text-[11px] font-bold py-2.5 px-3 rounded-lg uppercase tracking-widest cursor-not-allowed select-none border border-traditional-gold/20"
                  title="Function already completed"
                >
                  Directions
                </span>
              )}

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

      {/* ── Wedding Calendar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-16"
      >
        <div className="text-center mb-8">
          <h4 className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-traditional-gold uppercase font-bold mb-2">
            திருமண நாள்
          </h4>
          <h3 className="font-playfair text-2xl md:text-3xl text-gold-gradient font-bold">
            Mark Your Calendar
          </h3>
          <div className="w-16 h-[1px] bg-traditional-gold/40 mx-auto mt-3" />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-start">
          {/* May 2026 – Engagement */}
          <div className="w-full sm:w-auto">
            <p className="text-center font-cinzel text-[10px] text-traditional-gold/60 uppercase tracking-widest mb-3">
              ♥ Engagement
            </p>
            <CalendarMonth month={4} year={2026} marks={[{ day: 18, color: "#D4AF37", label: "Engagement" }]} />
          </div>

          {/* Divider */}
          <div className="hidden sm:flex flex-col items-center justify-center self-stretch gap-2 px-4">
            <div className="w-px flex-1 bg-traditional-gold/20" />
            <Heart className="w-5 h-5 text-traditional-gold/50 fill-traditional-gold/30" />
            <div className="w-px flex-1 bg-traditional-gold/20" />
          </div>

          {/* September 2026 – Wedding */}
          <div className="w-full sm:w-auto">
            <p className="text-center font-cinzel text-[10px] text-traditional-gold/60 uppercase tracking-widest mb-3">
              ✦ Muhurtham & Reception
            </p>
            <CalendarMonth month={8} year={2026} marks={[{ day: 13, color: "#b4141e", label: "Muhurtham & Reception" }]} />
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons */}
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

// ─── Static calendar month (no navigation, pure display) ─────────────────────
interface CalMonthProps {
  month: number;
  year: number;
  marks: { day: number; color: string; label: string }[];
}

const CalendarMonth: React.FC<CalMonthProps> = ({ month, year, marks }) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  return (
    <div className="royal-card rounded-2xl p-5 w-full sm:w-72">
      <p className="font-cinzel text-center text-traditional-gold font-bold text-sm mb-4 tracking-widest uppercase">
        {MONTH_NAMES[month]} {year}
      </p>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[10px] font-cinzel font-bold text-traditional-gold/40 uppercase">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const mark = marks.find(m => m.day === day);
          return (
            <motion.div
              key={day}
              title={mark?.label}
              whileHover={mark ? { scale: 1.2 } : {}}
              className={`relative flex items-center justify-center rounded-full w-8 h-8 mx-auto text-xs font-montserrat font-semibold
                ${mark ? "text-white font-extrabold shadow-lg" : "text-traditional-cream/60"}
              `}
              style={mark ? {
                backgroundColor: mark.color,
                boxShadow: `0 0 14px ${mark.color}99`
              } : {}}
            >
              {day}
              {mark && (
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-traditional-gold rounded-full border border-traditional-maroon-dark"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {marks.map(m => (
        <div key={m.day} className="mt-4 flex items-center gap-2 justify-center">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
          <span className="font-cinzel text-[10px] text-traditional-cream/60 uppercase tracking-wider">{m.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Kuthu Vilakku SVG ────────────────────────────────────────────────────────
const KuthuVilakku: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-16 h-72 relative">
      <svg viewBox="0 0 100 300" fill="none" className="w-full h-full text-traditional-gold">
        <motion.path
          d="M50 45 C45 35 45 20 50 10 C55 20 55 35 50 45 Z"
          fill="url(#flameGrad)"
          animate={{ scaleY: [1, 1.15, 0.95, 1.1, 1], skewX: [0, 4, -4, 2, 0], scaleX: [1, 0.9, 1.05, 0.95, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="origin-bottom"
        />
        <motion.path
          d="M50 40 C47 35 47 25 50 18 C53 25 53 35 50 40 Z"
          fill="#FFFDD0"
          animate={{ scaleY: [1, 1.2, 0.9, 1.1, 1], skewX: [0, 3, -3, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="origin-bottom"
        />
        <ellipse cx="50" cy="50" rx="10" ry="5" fill="currentColor" />
        <rect x="47" y="55" width="6" height="190" fill="currentColor" />
        <ellipse cx="50" cy="85" rx="8" ry="4" fill="currentColor" />
        <ellipse cx="50" cy="145" rx="8" ry="4" fill="currentColor" />
        <ellipse cx="50" cy="205" rx="8" ry="4" fill="currentColor" />
        <path d="M25 50 C25 65 75 65 75 50 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="2" fill="#FAF9F6" />
        <path d="M30 245 C30 230 70 230 70 245 Z" fill="currentColor" />
        <rect x="25" y="245" width="50" height="10" rx="2" fill="currentColor" />
        <rect x="15" y="255" width="70" height="12" rx="4" fill="currentColor" />
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
