import React, { useState, useRef, useEffect } from "react";
import { Volume2, Music } from "lucide-react";

interface AudioControllerProps {
  splashActive: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({ splashActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // YouTube video ID from https://youtu.be/tacmY4We6Ak
  const YOUTUBE_VIDEO_ID = "tacmY4We6Ak";

  // Communicate with YouTube iframe player API
  const postToPlayer = (action: string) => {
    if (playerRef.current?.contentWindow) {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: action, args: [] }),
        "*"
      );
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      postToPlayer("pauseVideo");
      setIsPlaying(false);
    } else {
      postToPlayer("playVideo");
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Mark iframe ready after a short delay to let YouTube load
    const timer = setTimeout(() => setIframeReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (splashActive) return null;

  return (
    <>
      {/* Hidden YouTube IFrame Player */}
      <div className="sr-only" aria-hidden="true" style={{ position: "fixed", bottom: "-9999px", left: "-9999px", width: "1px", height: "1px" }}>
        <iframe
          ref={playerRef}
          id="yt-divine-player"
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          title="Divine Wedding Song"
          onLoad={() => setIframeReady(true)}
        />
      </div>

      {/* Floating Music Control Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleToggle}
          disabled={!iframeReady}
          className="w-14 h-14 bg-gradient-to-r from-traditional-gold-dark to-traditional-gold rounded-full flex items-center justify-center text-traditional-maroon-dark shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-traditional-cream-dark relative group disabled:opacity-50 disabled:cursor-wait"
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
            <Music className="w-5 h-5 opacity-80" />
          )}

          {/* Text tooltip */}
          <span className="absolute right-16 bg-traditional-maroon-dark text-traditional-gold text-[10px] font-cinzel tracking-widest px-3 py-1.5 rounded-lg border border-traditional-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap uppercase">
            {isPlaying ? "Mute Divine Song" : "Play Divine Song"}
          </span>
        </button>
      </div>
    </>
  );
};

export default AudioController;
