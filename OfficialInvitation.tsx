import React, { useState, useEffect } from 'react';
import { 
  XhosaBeadworkBorder, 
  CulturalHeritageCrest
} from './CulturalMotifs';
import { UTsikiKwaJolaLogo } from './UTsikiKwaJolaLogo';
import { MapPin, Calendar, Clock, Download, BookOpen } from 'lucide-react';

interface OfficialInvitationProps {
  onViewLocation: () => void;
  onOpenCalendar: () => void;
  onOpenRSVP: () => void;
  onOpenGuestBook?: () => void;
}

export const OfficialInvitation: React.FC<OfficialInvitationProps> = ({
  onViewLocation,
  onOpenCalendar,
  onOpenRSVP,
  onOpenGuestBook,
}) => {
  // Target: 19 December 2026 at 10:00 SAST (UTC+2)
  const targetTimestamp = new Date('2026-12-19T10:00:00+02:00').getTime();

  const calculateTimeRemaining = () => {
    const now = Date.now();
    const difference = targetTimestamp - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="py-12 sm:py-16 px-4 max-w-4xl mx-auto flex flex-col items-center">
      {/* Stationery Container mimicking Attachment 1's parchment card */}
      <article className="relative w-full bg-[#FAF5EC] text-[#171513] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-12 md:p-16 border-2 border-[#C6A15B]/40 overflow-hidden">
        
        {/* Subtle authentic parchment paper texture background */}
        <div className="absolute inset-0 bg-[radial-gradient(#EDE1CD_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />
        
        {/* Animal-hide soft decorative gradient watermark */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-radial from-[#8A6747]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-radial from-[#C6A15B]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Double Gold Line Border Frame */}
        <div className="absolute inset-3 sm:inset-5 border border-[#C6A15B]/50 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 sm:inset-6 border border-[#4A2B1B]/20 rounded-lg pointer-events-none" />

        {/* Corner Xhosa Triangular Motifs */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C6A15B] pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C6A15B] pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#C6A15B] pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C6A15B] pointer-events-none" />

        {/* Main Content inside stationery */}
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Top Traditional Motif & Beadwork Runner */}
          <div className="flex flex-col items-center mb-6">
            <CulturalHeritageCrest className="w-14 h-14 sm:w-16 sm:h-16 mb-2 drop-shadow-sm" color="#4A2B1B" goldColor="#C6A15B" />
            <XhosaBeadworkBorder className="w-48 sm:w-64 h-4" color="#4A2B1B" accentColor="#C6A15B" />
          </div>

          {/* Exact Main Heading */}
          <h2 className="font-olio text-xl sm:text-3xl text-[#4A2B1B] tracking-wide font-normal mb-2">
            The Mhobo family cordially invites you to…
          </h2>

          {/* Event Title Logo matching IMG_2400.jpeg */}
          <div className="my-2 sm:my-4">
            <h1 className="sr-only">uTsiki kwaJola</h1>
            <UTsikiKwaJolaLogo size="lg" variant="parchment" showDivider={true} />
          </div>

          {/* Invitation Message Wording */}
          <p className="font-cormorant text-base sm:text-xl text-[#3A2A1E] max-w-xl leading-relaxed font-medium mb-8 sm:mb-12 px-2">
            “Join us as we celebrate love, unity and the beautiful journey of two families coming together.”
          </p>

          {/* Three Visually Distinct Information Columns */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-4 my-4 py-6 border-y border-[#C6A15B]/30 relative">
            
            {/* Column 1: DATE */}
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#F5ECE0]/60 md:bg-transparent">
              <span className="font-montserrat text-xs tracking-[0.25em] text-[#8A6747] font-semibold uppercase mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                DATE
              </span>
              <div className="flex flex-col items-center">
                <span className="font-playfair text-3xl sm:text-4xl font-bold text-[#171513] leading-none mb-1">
                  19
                </span>
                <span className="font-montserrat text-sm tracking-[0.2em] font-semibold text-[#4A2B1B] uppercase">
                  DECEMBER
                </span>
                <span className="font-montserrat text-xs tracking-[0.15em] text-[#8A6747] mt-0.5">
                  2026
                </span>
              </div>
            </div>

            {/* Column 2: VENUE */}
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#F5ECE0]/60 md:bg-transparent md:border-x md:border-[#C6A15B]/30">
              <span className="font-montserrat text-xs tracking-[0.25em] text-[#8A6747] font-semibold uppercase mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                VENUE
              </span>
              <div className="flex flex-col items-center text-center">
                <span className="font-montserrat font-bold text-base sm:text-lg text-[#171513] tracking-wider uppercase">
                  GLEN ADELAIDE
                </span>
                <span className="font-montserrat text-xs sm:text-sm font-semibold tracking-widest text-[#4A2B1B] uppercase mt-0.5">
                  CACADU
                </span>
                <span className="font-montserrat text-[11px] tracking-widest text-[#8A6747] uppercase mt-0.5">
                  EASTERN CAPE
                </span>
              </div>
            </div>

            {/* Column 3: TIME */}
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#F5ECE0]/60 md:bg-transparent">
              <span className="font-montserrat text-xs tracking-[0.25em] text-[#8A6747] font-semibold uppercase mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                TIME
              </span>
              <div className="flex flex-col items-center">
                <span className="font-playfair text-3xl sm:text-4xl font-bold text-[#171513] tracking-wide">
                  10h00
                </span>
                <span className="font-montserrat text-[10px] tracking-widest text-[#8A6747] uppercase mt-1">
                  South African Standard Time
                </span>
              </div>
            </div>
          </div>

          {/* Integrated Live Countdown replacing cow and traditional ornaments */}
          <div className="w-full max-w-lg my-6 sm:my-8 px-2">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C6A15B]/60" />
              <span className="font-montserrat text-[10px] sm:text-xs tracking-[0.25em] text-[#8A6747] uppercase font-semibold">
                COUNTING DOWN TO OUR CELEBRATION
              </span>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C6A15B]/60" />
            </div>

            {timeLeft.isPast ? (
              <div className="p-4 bg-[#F2E8D8] border border-[#C6A15B] rounded-xl text-center">
                <span className="font-cormorant text-2xl font-bold text-[#4A2B1B]">
                  Today, We Celebrate!
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#F5ECE0] border border-[#C6A15B]/40 shadow-sm">
                  <span className="font-playfair text-2xl sm:text-3xl font-bold text-[#171513] tabular-nums leading-tight">
                    {timeLeft.days}
                  </span>
                  <span className="font-montserrat text-[9px] sm:text-[10px] tracking-widest text-[#8A6747] font-semibold uppercase mt-0.5">
                    DAYS
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#F5ECE0] border border-[#C6A15B]/40 shadow-sm">
                  <span className="font-playfair text-2xl sm:text-3xl font-bold text-[#171513] tabular-nums leading-tight">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="font-montserrat text-[9px] sm:text-[10px] tracking-widest text-[#8A6747] font-semibold uppercase mt-0.5">
                    HOURS
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#F5ECE0] border border-[#C6A15B]/40 shadow-sm">
                  <span className="font-playfair text-2xl sm:text-3xl font-bold text-[#171513] tabular-nums leading-tight">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="font-montserrat text-[9px] sm:text-[10px] tracking-widest text-[#8A6747] font-semibold uppercase mt-0.5">
                    MINS
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#F5ECE0] border border-[#C6A15B]/40 shadow-sm">
                  <span className="font-playfair text-2xl sm:text-3xl font-bold text-[#8B4513] tabular-nums leading-tight animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="font-montserrat text-[9px] sm:text-[10px] tracking-widest text-[#8A6747] font-semibold uppercase mt-0.5">
                    SECS
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Invitation Closing Message */}
          <p className="font-cormorant italic text-base sm:text-lg text-[#4A2B1B] max-w-lg mb-8 font-medium">
            “Your presence will honour us and make this day even more special.”
          </p>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onViewLocation}
              className="px-6 py-3 rounded-full font-montserrat text-xs uppercase tracking-[0.2em] font-semibold bg-[#4A2B1B] text-[#F6F0E5] hover:bg-[#382013] shadow-md hover:shadow-lg transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>View Location & Directions</span>
            </button>

            <button
              onClick={onOpenRSVP}
              className="px-6 py-3 rounded-full font-montserrat text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-[#C6A15B] to-[#D9B772] text-[#171513] hover:brightness-105 shadow-md hover:shadow-lg transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171513]"
            >
              <span>RSVP Attendance</span>
            </button>

            {onOpenGuestBook && (
              <button
                onClick={onOpenGuestBook}
                className="px-5 py-3 rounded-full font-montserrat text-xs uppercase tracking-[0.18em] font-medium border border-[#C6A15B] bg-[#C6A15B]/15 text-[#4A2B1B] hover:bg-[#C6A15B]/25 transition-all flex items-center gap-2 focus:outline-none"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8A6747]" />
                <span>Guest Book</span>
              </button>
            )}

            <button
              onClick={onOpenCalendar}
              className="px-4 py-3 rounded-full font-montserrat text-xs uppercase tracking-[0.15em] font-medium border border-[#8A6747]/40 text-[#4A2B1B] hover:bg-[#EFE5D3] transition-all flex items-center gap-1.5 focus:outline-none"
              title="Add 19 Dec 2026 to calendar"
            >
              <Download className="w-3.5 h-3.5 text-[#8A6747]" />
              <span>Add to Calendar</span>
            </button>
          </div>

          {/* Subtle Bottom Beadwork Runner */}
          <div className="mt-8">
            <XhosaBeadworkBorder className="w-36 sm:w-48 h-3" color="#4A2B1B" accentColor="#C6A15B" />
          </div>

        </div>
      </article>
    </section>
  );
};
