import React from 'react';
import { 
  XhosaBeadworkBorder, 
  NguniCattleMotif, 
  TraditionalPotteryAndBasket,
  CulturalHeritageCrest,
  EasternCapeLandscapeSilhouettes
} from './CulturalMotifs';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';

export const OurCelebration: React.FC = () => {
  // Cultural highlights explaining uTsiki kwaJola sacred customs with utmost respect
  const culturalHighlights = [
    {
      title: "The Sacred uTsiki Rite",
      description: "An esteemed traditional Xhosa custom where the bride is warmly welcomed into her new family through ancestral blessing, sacred meat sharing, and familial acceptance.",
    },
    {
      title: "The Jola & Mhobo Heritage",
      description: "Honouring the lineage, clan names, and ancestral roots of the Mhobo family, bringing together kin and communities under an umbrella of unity and respect.",
    },
    {
      title: "Traditional Attire (Imibhaco)",
      description: "Guests and family grace the occasion in ornate monochrome and ochre traditional Xhosa garments, intricate beadwork, and majestic headwraps (iqhiya).",
    },
  ];

  // Gallery placeholders showcasing authentic celebration art and motifs
  const galleryItems = [
    {
      title: "Eastern Cape Foothills",
      subtitle: "Glen Adelaide Valley",
      type: "landscape",
    },
    {
      title: "Traditional Clay Pottery (Ingqayi)",
      subtitle: "Vessels of Celebration",
      type: "pottery",
    },
    {
      title: "Majestic Nguni Cattle",
      subtitle: "Pride of the Eastern Cape",
      type: "nguni",
    },
    {
      title: "Intricate Xhosa Beadwork",
      subtitle: "Symbols of Unity & Heritage",
      type: "beadwork",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Runner */}
      <div className="flex flex-col items-center mb-6">
        <CulturalHeritageCrest className="w-12 h-12 mb-3" color="#C6A15B" goldColor="#E4D0A0" />
        <XhosaBeadworkBorder className="w-56 sm:w-72 h-4" color="#8A6747" accentColor="#C6A15B" />
      </div>

      {/* Main Title & Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="font-montserrat text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
          HONOURING TRADITION & HERITAGE
        </span>
        <h2 className="font-olio text-3xl sm:text-5xl font-normal text-[#F6F0E5]">
          Two Families. One Beautiful Beginning.
        </h2>
        
        {/* Exact Required Message */}
        <div className="pt-4 max-w-2xl mx-auto">
          <blockquote className="font-cormorant italic text-lg sm:text-2xl text-[#EDE1CD] leading-relaxed border-y border-[#C6A15B]/30 py-6 px-4">
            “Rooted in tradition and surrounded by the people we love, we come together to celebrate a beautiful beginning. May this day honour our families, strengthen our bonds, and create memories that will be cherished for generations.”
          </blockquote>
        </div>
      </div>

      {/* Cultural Pillar Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {culturalHighlights.map((highlight, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#1D1815] border border-[#C6A15B]/25 hover:border-[#C6A15B]/60 transition-all shadow-lg flex flex-col"
          >
            <div className="w-9 h-9 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center text-[#E4D0A0] mb-4">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-cormorant text-2xl font-semibold text-[#E4D0A0] mb-2">
              {highlight.title}
            </h3>
            <p className="font-montserrat text-xs sm:text-sm text-[#EDE1CD]/75 leading-relaxed">
              {highlight.description}
            </p>
          </div>
        ))}
      </div>

      {/* Cultural Gallery Section (Ready for Family Photos) */}
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#C6A15B]/20 pb-4">
          <div>
            <span className="font-montserrat text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
              CELEBRATION GALLERY
            </span>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#F6F0E5]">
              Visual Heritage & Celebration Moments
            </h3>
          </div>
          <p className="font-montserrat text-[11px] text-[#EDE1CD]/60">
            Photographs from the day will be updated following the celebration
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#241E1A] to-[#141210] border border-[#C6A15B]/25 shadow-lg flex flex-col items-center justify-center p-6 text-center hover:border-[#C6A15B] transition-all"
            >
              {/* Subtle background illustration */}
              <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity flex items-center justify-center pointer-events-none">
                {item.type === 'landscape' && <EasternCapeLandscapeSilhouettes className="w-full h-full" fill="#C6A15B" />}
                {item.type === 'pottery' && <TraditionalPotteryAndBasket className="w-44 h-32" fillPrimary="#C6A15B" />}
                {item.type === 'nguni' && <NguniCattleMotif className="w-36 h-24" fill="#C6A15B" />}
                {item.type === 'beadwork' && <XhosaBeadworkBorder className="w-full h-12" color="#C6A15B" />}
              </div>

              {/* Foreground content card */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 flex items-center justify-center text-[#E4D0A0] mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h4 className="font-cormorant text-xl font-semibold text-[#E4D0A0] mb-1">
                  {item.title}
                </h4>
                <p className="font-montserrat text-xs text-[#EDE1CD]/70">
                  {item.subtitle}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C6A15B]/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
