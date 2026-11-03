import React from 'react';
import { ChevronUp } from 'lucide-react';
import { XhosaBeadworkBorder } from './CulturalMotifs';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="relative bg-[#110F0E] text-[#EDE1CD] border-t border-[#C6A15B]/30 pt-12 pb-16 px-4">
      {/* Decorative beadwork border */}
      <div className="flex flex-col items-center mb-8">
        <XhosaBeadworkBorder className="w-56 sm:w-80 h-4" color="#8A6747" accentColor="#C6A15B" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
        
        {/* Monogram Badge */}
        <div className="w-12 h-12 rounded-full border border-[#C6A15B]/60 bg-[#1D1815] flex items-center justify-center text-[#E4D0A0] font-serif font-bold text-lg shadow-md">
          K&S
        </div>

        {/* Exact Requested Phrases */}
        <div className="space-y-1.5 pt-2">
          <div className="flex flex-wrap items-baseline justify-center gap-2 pt-1">
            <span className="font-utsiki text-3xl sm:text-4xl text-[#E4D0A0]">uTsiki</span>
            <span className="font-kwajola text-2xl sm:text-3xl text-[#C6A15B]">kwaJola</span>
            <span className="font-montserrat text-xs text-[#EDE1CD]/70 tracking-widest uppercase ml-1">· K&S · 19 December 2026</span>
          </div>

          <p className="font-montserrat text-xs sm:text-sm text-[#EDE1CD]/90 uppercase tracking-[0.2em]">
            Hosted with love by the Mhobo Family
          </p>

          <p className="font-cormorant italic text-base sm:text-lg text-[#C6A15B] pt-1">
            “Two families. One beautiful beginning.”
          </p>
        </div>

        {/* Venue reminder */}
        <p className="text-[11px] font-montserrat text-[#EDE1CD]/50 tracking-wider">
          Glen Adelaide · Cacadu · Eastern Cape · South Africa
        </p>

        {/* Back to top button */}
        <div className="pt-6">
          <button
            onClick={onBackToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C6A15B]/30 hover:border-[#C6A15B] text-[#EDE1CD]/70 hover:text-[#E4D0A0] text-xs font-montserrat uppercase tracking-wider transition-colors"
            title="Scroll back to top of invitation"
          >
            <ChevronUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
