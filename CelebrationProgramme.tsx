import React from 'react';
import { 
  XhosaBeadworkBorder, 
  NguniCattleMotif, 
  TraditionalPotteryAndBasket 
} from './CulturalMotifs';
import { Users, Sparkles, Utensils, Music2, Info, Clock } from 'lucide-react';

interface ProgrammeItem {
  time: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  badge: string;
}

const PROGRAMME_DATA: ProgrammeItem[] = [
  {
    time: "10h00",
    title: "Guest Arrival",
    description: "Guests arrive, greet the families, and settle in.",
    icon: Users,
    badge: "Welcome & Fellowship"
  },
  {
    time: "11h00",
    title: "Traditional Ceremony",
    description: "A special celebration honouring tradition, family, and the coming together of two families.",
    icon: Sparkles,
    badge: "uTsiki Sacred Rite"
  },
  {
    time: "13h00",
    title: "Food & Refreshments",
    description: "Enjoy the food, refreshments, and warm hospitality.",
    icon: Utensils,
    badge: "Celebration Feast"
  },
  {
    time: "14h00 till late",
    title: "Music & Entertainment",
    description: "Music, dancing, laughter, and celebration with family and friends.",
    icon: Music2,
    badge: "Joy & Dancing"
  }
];

export const CelebrationProgramme: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto flex flex-col items-center">
      {/* Beadwork runner */}
      <div className="flex flex-col items-center mb-4">
        <XhosaBeadworkBorder className="w-48 sm:w-64 h-4" color="#8A6747" accentColor="#C6A15B" />
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="font-montserrat text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
          ORDER OF EVENTS · 19 DECEMBER 2026
        </span>
        <h2 className="font-olio text-3xl sm:text-5xl font-normal text-[#F6F0E5]">
          The Celebration Programme
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-[#EDE1CD]/85">
          “A day of family, tradition, food, music and togetherness.”
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full">
        {/* Central connecting gold line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#C6A15B]/20 via-[#C6A15B]/60 to-[#C6A15B]/20 -translate-x-1/2" />
        
        {/* Left connecting line for mobile */}
        <div className="md:hidden absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#C6A15B]/20 via-[#C6A15B]/60 to-[#C6A15B]/20" />

        <div className="space-y-8 md:space-y-12">
          {PROGRAMME_DATA.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.time} 
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1F1A17] border-2 border-[#C6A15B] shadow-xl flex items-center justify-center text-[#E4D0A0] z-10">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Card */}
                <div className="w-full pl-14 md:pl-0 md:w-1/2">
                  <div className={`p-6 sm:p-7 rounded-2xl bg-[#1E1916] border border-[#C6A15B]/30 hover:border-[#C6A15B] transition-all shadow-xl group ${
                    isEven ? 'md:mr-10 text-left' : 'md:ml-10 text-left'
                  }`}>
                    {/* Time display */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-1.5 text-[#C6A15B]">
                        <Clock className="w-4 h-4" />
                        <span className="font-playfair text-xl sm:text-2xl font-bold tracking-wide">
                          {item.time}
                        </span>
                      </div>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider px-2 py-0.5 rounded bg-[#C6A15B]/15 text-[#E4D0A0] border border-[#C6A15B]/20">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#F6F0E5] mb-2 group-hover:text-[#E4D0A0] transition-colors">
                      {item.title}
                    </h3>

                    {/* Exact Description */}
                    <p className="font-montserrat text-xs sm:text-sm text-[#EDE1CD]/80 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Empty spacer for grid alignment on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Traditional Pottery and Cattle silhouette */}
      <div className="flex items-center justify-center gap-8 my-10 opacity-75">
        <TraditionalPotteryAndBasket className="w-24 h-14" fillPrimary="#8A6747" fillSecondary="#C6A15B" />
        <NguniCattleMotif className="w-20 h-12" fill="#8A6747" />
      </div>

      {/* Small Note Card */}
      <div className="w-full max-w-2xl bg-[#241D19] border border-[#C6A15B]/40 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-lg">
        <Info className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
        <p className="font-montserrat text-xs sm:text-sm text-[#EDE1CD]/90 leading-relaxed">
          “Programme times are provided to help you plan your day. Please arrive early so that you do not miss the traditional ceremony.”
        </p>
      </div>
    </section>
  );
};
