import React, { useState, useEffect } from 'react';
import { 
  NguniCattleMotif, 
  EasternCapeLandscapeSilhouettes, 
  XhosaBeadworkBorder 
} from './CulturalMotifs';
import { MapPin, Calendar, Bell } from 'lucide-react';

interface CountdownSectionProps {
  onViewLocation: () => void;
  onOpenCalendar: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isToday: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  onViewLocation,
  onOpenCalendar,
}) => {
  // Target: 19 December 2026 at 10:00 SAST (UTC+2) -> 2026-12-19T10:00:00+02:00
  const targetTimestamp = new Date('2026-12-19T10:00:00+02:00').getTime();

  const calculateTimeRemaining = (): TimeRemaining => {
    const now = Date.now();
    const difference = targetTimestamp - now;

    if (difference <= 0) {
      // Check if it's the celebration day (within 24 hours of start)
      const dayDiff = Math.abs(difference) / (1000 * 60 * 60 * 24);
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPast: true,
        isToday: dayDiff < 1,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isPast: false,
      isToday: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section className="relative py-16 px-4 max-w-5xl mx-auto flex flex-col items-center">
      {/* Container Card with cinematic dark charcoal & gold accents */}
      <div className="relative w-full bg-gradient-to-b from-[#1E1A17] to-[#151311] border border-[#C6A15B]/30 rounded-2xl p-6 sm:p-12 shadow-2xl overflow-hidden">
        
        {/* Subtle decorative Eastern Cape landscape backdrop */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-30">
          <EasternCapeLandscapeSilhouettes className="w-full h-32" fill="#3B2E24" />
        </div>

        {/* Top Beadwork Motif */}
        <div className="flex flex-col items-center mb-6">
          <XhosaBeadworkBorder className="w-48 sm:w-64 h-4" color="#8A6747" accentColor="#C6A15B" />
        </div>

        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-10 relative z-10 space-y-3">
          <span className="font-montserrat text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
            uTsiki kwaJola · 19 December 2026
          </span>
          <h2 className="font-olio text-3xl sm:text-5xl font-normal text-[#F6F0E5] tracking-tight">
            Counting down to our celebration
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-[#EDE1CD]/80">
            “Two families. One beautiful beginning. A day to remember forever.”
          </p>
        </div>

        {/* Live Counters or Celebration Message */}
        <div className="relative z-10 max-w-3xl mx-auto mb-10">
          {timeLeft.isPast ? (
            <div className="bg-[#2A231C]/90 border border-[#C6A15B] rounded-xl p-8 text-center space-y-3 shadow-xl">
              <h3 className="font-cormorant text-3xl sm:text-4xl text-[#E4D0A0] font-semibold">
                {timeLeft.isToday ? "Today, we celebrate!" : "Our celebration has begun — thank you for being part of our journey."}
              </h3>
              <p className="font-montserrat text-sm text-[#EDE1CD]/80">
                19 December 2026 · Glen Adelaide, Cacadu, Eastern Cape
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              
              {/* DAYS */}
              <div className="flex flex-col items-center p-5 sm:p-6 rounded-xl bg-[#26211C]/80 border border-[#C6A15B]/30 shadow-lg relative group hover:border-[#C6A15B] transition-colors">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C6A15B]/40 group-hover:bg-[#C6A15B]" />
                <span className="font-playfair text-4xl sm:text-6xl font-bold text-[#E4D0A0] tracking-tight mb-2 tabular-nums">
                  {timeLeft.days}
                </span>
                <span className="font-montserrat text-[11px] sm:text-xs tracking-[0.25em] text-[#EDE1CD]/70 uppercase font-semibold">
                  DAYS
                </span>
              </div>

              {/* HOURS */}
              <div className="flex flex-col items-center p-5 sm:p-6 rounded-xl bg-[#26211C]/80 border border-[#C6A15B]/30 shadow-lg relative group hover:border-[#C6A15B] transition-colors">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C6A15B]/40 group-hover:bg-[#C6A15B]" />
                <span className="font-playfair text-4xl sm:text-6xl font-bold text-[#E4D0A0] tracking-tight mb-2 tabular-nums">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="font-montserrat text-[11px] sm:text-xs tracking-[0.25em] text-[#EDE1CD]/70 uppercase font-semibold">
                  HOURS
                </span>
              </div>

              {/* MINUTES */}
              <div className="flex flex-col items-center p-5 sm:p-6 rounded-xl bg-[#26211C]/80 border border-[#C6A15B]/30 shadow-lg relative group hover:border-[#C6A15B] transition-colors">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C6A15B]/40 group-hover:bg-[#C6A15B]" />
                <span className="font-playfair text-4xl sm:text-6xl font-bold text-[#E4D0A0] tracking-tight mb-2 tabular-nums">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="font-montserrat text-[11px] sm:text-xs tracking-[0.25em] text-[#EDE1CD]/70 uppercase font-semibold">
                  MINUTES
                </span>
              </div>

              {/* SECONDS */}
              <div className="flex flex-col items-center p-5 sm:p-6 rounded-xl bg-[#26211C]/80 border border-[#C6A15B]/30 shadow-lg relative group hover:border-[#C6A15B] transition-colors">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C6A15B]/40 group-hover:bg-[#C6A15B]" />
                <span className="font-playfair text-4xl sm:text-6xl font-bold text-[#C6A15B] tracking-tight mb-2 tabular-nums animate-pulse">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="font-montserrat text-[11px] sm:text-xs tracking-[0.25em] text-[#EDE1CD]/70 uppercase font-semibold">
                  SECONDS
                </span>
              </div>

            </div>
          )}
        </div>

        {/* Time Zone & Event Detail Tag */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-xs font-montserrat text-[#EDE1CD]/60 tracking-wider mb-8">
          <span>EVENT TIME: 10h00 SAST (UTC+2)</span>
          <span>·</span>
          <span>TIME ZONE: Africa/Johannesburg</span>
        </div>

        {/* Cattle Silhouettes & Action Button */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#C6A15B]/20">
          <div className="flex items-center gap-3">
            <NguniCattleMotif className="w-16 h-10 text-[#C6A15B]/60" fill="#C6A15B" />
            <p className="font-cormorant italic text-sm text-[#EDE1CD]/70">
              Gathering in Glen Adelaide, Eastern Cape
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onViewLocation}
              className="px-6 py-3 rounded-full font-montserrat text-xs uppercase tracking-[0.18em] font-semibold bg-[#C6A15B] text-[#171513] hover:bg-[#D9B772] transition-colors flex items-center gap-2 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF]"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View Location & Directions</span>
            </button>

            <button
              onClick={onOpenCalendar}
              className="px-5 py-3 rounded-full font-montserrat text-xs uppercase tracking-[0.15em] font-medium border border-[#C6A15B]/40 text-[#E4D0A0] hover:bg-[#C6A15B]/10 transition-colors flex items-center gap-2 focus:outline-none"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Save Date</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
