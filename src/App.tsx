import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import MainInvitation from "./components/MainInvitation";
import AudioController from "./components/AudioController";
import RSVPModal from "./components/RSVPModal";

interface BlessingItem {
  name: string;
  message: string;
}

function App() {
  const [splashActive, setSplashActive] = useState(true);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  
  // Interactive Blessings state (Guestbook)
  const [blessings, setBlessings] = useState<BlessingItem[]>([
    {
      name: "Saravana Kumar & Family",
      message: "மணமக்களுக்கு எங்களது நெஞ்சார்ந்த திருமண நல்வாழ்த்துக்கள்! வாழ்க வளமுடன்!"
    },
    {
      name: "Furtim & Mirador Team",
      message: "Congratulations Mani! Wishing you both a lifetime of love, happiness, and clean, compile-ready code in your marriage!"
    },
    {
      name: "Creospace Studio Team",
      message: "Vasuki, wishing you a beautiful future together! May your life be as colourful and visually stunning as your 3D creations!"
    }
  ]);

  const handleAddBlessing = (name: string, message: string) => {
    setBlessings((prev) => [{ name, message }, ...prev]);
  };

  return (
    <>
      {/* Page 1: Cinematic Temple Doors Opening Splash Screen */}
      {splashActive && (
        <SplashScreen onEnter={() => setSplashActive(false)} />
      )}

      {/* Page 2: Main Storytelling Wedding Invitation */}
      {!splashActive && (
        <MainInvitation 
          onOpenRSVP={() => setIsRSVPOpen(true)} 
          blessings={blessings} 
        />
      )}

      {/* Persistent Audio Control Panel */}
      <AudioController splashActive={splashActive} />

      {/* Interactive RSVP Form Modal popup */}
      <RSVPModal 
        isOpen={isRSVPOpen} 
        onClose={() => setIsRSVPOpen(false)} 
        onAddBlessing={handleAddBlessing}
      />
    </>
  );
}

export default App;
