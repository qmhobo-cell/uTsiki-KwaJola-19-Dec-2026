import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Music, 
  ExternalLink, 
  ChevronUp, 
  ChevronDown, 
  Disc3,
  Sparkles
} from 'lucide-react';

// Official video ID for "Ntencane - 5. UKHETHE MINA (Official Audio)"
const YOUTUBE_VIDEO_ID = 'tljS94eB0QU';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Synchronize play state
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      // Post message to YouTube iframe to pause
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      }
    } else {
      setIsPlaying(true);
      // Post message to YouTube iframe to play
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
      }
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = nextMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        `{"event":"command","func":"${command}","args":""}`,
        '*'
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      
      {/* Expanded Track Information Card */}
      {isExpanded && (
        <div className="mb-2 w-72 sm:w-80 bg-[#1A1613]/95 backdrop-blur-md border border-[#C6A15B]/40 rounded-2xl p-4 shadow-2xl text-[#EDE1CD] animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#C6A15B]/20">
            <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#C6A15B] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C6A15B]" />
              Celebration Music
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#EDE1CD]/50 hover:text-[#EDE1CD] p-0.5"
              aria-label="Collapse music player"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 my-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A2B1B] to-[#171513] border border-[#C6A15B]/50 flex items-center justify-center text-[#E4D0A0] shadow-md ${
              isPlaying ? 'animate-spin [animation-duration:8s]' : ''
            }`}>
              <Disc3 className="w-7 h-7 text-[#C6A15B]" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-cormorant text-lg font-bold text-[#F6F0E5] truncate leading-tight">
                UKhethe Mina
              </h4>
              <p className="font-montserrat text-xs text-[#E4D0A0] font-medium truncate">
                Ntencane
              </p>
              <p className="font-montserrat text-[10px] text-[#EDE1CD]/60 truncate">
                Album: Awuyiphumuze (Maskandi)
              </p>
            </div>
          </div>

          {/* Embedded YouTube Player */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[#C6A15B]/30 bg-black my-2">
            {isPlaying ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&enablejsapi=1&origin=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.origin : ''
                )}`}
                title="Ntencane — UKhethe Mina"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div 
                onClick={handleTogglePlay}
                className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#251E19] to-[#12100F] cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[#C6A15B] text-[#171513] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-[#171513]" />
                </div>
                <span className="font-montserrat text-[11px] text-[#E4D0A0] mt-2 font-medium">
                  Click to Play UKhethe Mina
                </span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-montserrat">
            <span className="text-[#EDE1CD]/60">Traditional Celebration</span>
            <a
              href="https://www.youtube.com/watch?v=tljS94eB0QU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C6A15B] hover:text-[#E4D0A0] flex items-center gap-1 font-medium"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Pill Music Control Bar */}
      <div className="flex items-center gap-2 bg-[#171513]/95 backdrop-blur-md border border-[#C6A15B]/40 rounded-full px-3 py-1.5 shadow-2xl text-xs text-[#EDE1CD]">
        
        {/* Play / Pause Toggle Button */}
        <button
          onClick={handleTogglePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#C6A15B] to-[#D9B772] hover:brightness-105 text-[#171513] font-montserrat font-bold text-[11px] uppercase tracking-wide transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF]"
          aria-label={isPlaying ? "Pause UKhethe Mina by Ntencane" : "Play UKhethe Mina by Ntencane"}
          title={isPlaying ? "Pause music" : "Play UKhethe Mina by Ntencane"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-[#171513]" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-[#171513] ml-0.5" />
          )}
          <span>{isPlaying ? "Playing UKhethe Mina" : "Play Music"}</span>
        </button>

        {/* Track Title Indicator */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden sm:flex items-center gap-1.5 cursor-pointer hover:text-[#E4D0A0] transition-colors pl-1 select-none"
          title="Click to view song details"
        >
          <Music className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span className="font-montserrat text-[11px] font-medium text-[#EDE1CD]/90 max-w-[130px] truncate">
            {isPlaying ? "Ntencane — UKhethe Mina" : "UKhethe Mina"}
          </span>
        </div>

        {/* Dancing Visualizer EQ bars when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 px-1" aria-hidden="true">
            <span className="w-0.5 h-2.5 bg-[#C6A15B] animate-pulse rounded-full" />
            <span className="w-0.5 h-3.5 bg-[#E4D0A0] animate-bounce rounded-full" />
            <span className="w-0.5 h-2 bg-[#C6A15B] animate-pulse rounded-full" />
            <span className="w-0.5 h-3 bg-[#E4D0A0] animate-bounce rounded-full" />
          </div>
        )}

        {/* Mute toggle button when playing */}
        {isPlaying && (
          <button
            onClick={handleToggleMute}
            className="p-1 rounded-full text-[#C6A15B] hover:text-[#E4D0A0] transition-colors"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}

        {/* Expand / Collapse Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full text-[#EDE1CD]/60 hover:text-[#E4D0A0] transition-colors"
          aria-label={isExpanded ? "Collapse player" : "Expand music player"}
          title={isExpanded ? "Collapse" : "Song info"}
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {/* Hidden background player when collapsed but playing */}
        {!isExpanded && isPlaying && (
          <div className="sr-only" aria-hidden="true">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&enablejsapi=1`}
              title="Ntencane — UKhethe Mina Audio Stream"
              allow="autoplay"
            />
          </div>
        )}
      </div>

    </div>
  );
};
