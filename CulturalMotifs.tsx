import React from 'react';

/**
 * Xhosa Geometric Beadwork Pattern Border (horizontal runner)
 */
export const XhosaBeadworkBorder: React.FC<{ className?: string; color?: string; accentColor?: string }> = ({
  className = "w-full h-6",
  color = "#4A2B1B",
  accentColor = "#C6A15B"
}) => {
  return (
    <div className={`overflow-hidden flex items-center justify-center opacity-85 select-none ${className}`}>
      <svg
        viewBox="0 0 800 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full preserve-3d"
        preserveAspectRatio="repeat-x"
      >
        <pattern id="xhosa-pattern" width="40" height="24" patternUnits="userSpaceOnUse">
          {/* Central diamond */}
          <polygon points="20,2 38,12 20,22 2,12" fill="none" stroke={color} strokeWidth="1.2" />
          <polygon points="20,6 30,12 20,18 10,12" fill={accentColor} fillOpacity="0.25" stroke={accentColor} strokeWidth="1" />
          <circle cx="20" cy="12" r="2" fill={color} />
          {/* Triangular accents */}
          <polygon points="0,0 6,0 0,6" fill={color} />
          <polygon points="40,0 34,0 40,6" fill={color} />
          <polygon points="0,24 6,24 0,18" fill={color} />
          <polygon points="40,24 34,24 40,18" fill={color} />
          {/* Small chevron */}
          <polyline points="15,12 20,7 25,12" stroke={color} strokeWidth="0.8" fill="none" />
        </pattern>
        <rect width="800" height="24" fill="url(#xhosa-pattern)" />
      </svg>
    </div>
  );
};

/**
 * Nguni Cattle Silhouette with graceful curved horns
 */
export const NguniCattleMotif: React.FC<{ className?: string; fill?: string }> = ({
  className = "w-16 h-12",
  fill = "#4A2B1B"
}) => {
  return (
    <svg
      viewBox="0 0 120 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Curved Majestic Horns */}
      <path
        d="M26 24 C18 16, 8 10, 2 6 C1 5, 2 4, 4 4 C14 8, 24 16, 29 20"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M34 24 C42 16, 52 10, 58 6 C59 5, 58 4, 56 4 C46 8, 36 16, 31 20"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Head and Ears */}
      <ellipse cx="30" cy="25" rx="6" ry="8" fill={fill} />
      <path d="M24 23 C19 22, 17 25, 20 27 Z" fill={fill} />
      <path d="M36 23 C41 22, 43 25, 40 27 Z" fill={fill} />
      {/* Body and Hump */}
      <path
        d="M32 28 C38 27, 44 23, 50 25 C58 27, 65 29, 82 29 C92 29, 102 32, 106 38 C108 42, 107 48, 106 52 C104 53, 103 64, 101 65 C100 66, 98 66, 98 56 C94 57, 90 56, 88 56 C87 59, 85 64, 84 65 C83 66, 81 66, 82 55 C70 56, 58 57, 50 54 C46 56, 44 63, 43 65 C41 66, 40 66, 41 53 C37 53, 34 52, 33 48 C30 46, 28 42, 28 35 Z"
        fill={fill}
      />
      {/* Tail */}
      <path
        d="M106 40 C110 45, 110 52, 108 58 C107 60, 109 62, 107 63"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Tail tuft */}
      <ellipse cx="107" cy="62" rx="2" ry="3" fill={fill} />
    </svg>
  );
};

/**
 * Traditional Woven Grass Basket (Ukhamba) & Clay Pottery (Ingqayi)
 */
export const TraditionalPotteryAndBasket: React.FC<{ className?: string; fillPrimary?: string; fillSecondary?: string }> = ({
  className = "w-24 h-16",
  fillPrimary = "#4A2B1B",
  fillSecondary = "#C6A15B"
}) => {
  return (
    <svg
      viewBox="0 0 140 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Clay Pot (Left) */}
      <g>
        <ellipse cx="45" cy="55" rx="30" ry="24" fill={fillPrimary} />
        {/* Pot Neck & Rim */}
        <path d="M30 35 C32 30, 58 30, 60 35 L62 40 L28 40 Z" fill={fillPrimary} />
        <ellipse cx="45" cy="33" rx="15" ry="4" fill="#381F12" />
        {/* Decorative Burnished Band */}
        <path
          d="M20 54 C28 62, 62 62, 70 54"
          stroke={fillSecondary}
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
        {/* Chevron markings */}
        <path d="M35 48 L40 53 L45 48 L50 53 L55 48" stroke={fillSecondary} strokeWidth="1.5" fill="none" />
      </g>

      {/* Woven Basket with lid (Right) */}
      <g transform="translate(68, 20)">
        {/* Basket bowl */}
        <path
          d="M5 45 C5 26, 60 26, 60 45 C60 58, 48 65, 32 65 C16 65, 5 58, 5 45 Z"
          fill="#8A6747"
        />
        {/* Woven texture lines */}
        <ellipse cx="32" cy="45" rx="26" ry="12" stroke={fillSecondary} strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <ellipse cx="32" cy="52" rx="22" ry="10" stroke={fillSecondary} strokeWidth="1" strokeDasharray="2 3" fill="none" />
        <ellipse cx="32" cy="38" rx="27" ry="10" stroke={fillSecondary} strokeWidth="1.2" strokeDasharray="4 2" fill="none" />
        {/* Basket conical lid */}
        <path
          d="M10 32 C18 20, 46 20, 54 32 Z"
          fill="#A88157"
          stroke={fillPrimary}
          strokeWidth="1"
        />
        {/* Lid Top Knob */}
        <ellipse cx="32" cy="18" rx="4" ry="4" fill={fillSecondary} />
        {/* Geometric lid patterns */}
        <path d="M22 28 L32 20 L42 28" stroke={fillPrimary} strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
};

/**
 * Elegant Golden Wax Seal with K&S Monogram
 */
export const WaxSealEmblem: React.FC<{
  className?: string;
  isCracked?: boolean;
  monogram?: string;
  size?: number;
}> = ({
  className = "",
  isCracked = false,
  monogram = "K&S",
  size = 110
}) => {
  return (
    <div
      className={`relative rounded-full wax-seal-shadow cursor-pointer select-none transition-transform duration-500 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sealGoldGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="25%" stopColor="#E6C47A" />
            <stop offset="65%" stopColor="#C6A15B" />
            <stop offset="90%" stopColor="#926F2D" />
            <stop offset="100%" stopColor="#5E4314" />
          </radialGradient>
          <radialGradient id="innerRimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#C6A15B" stopOpacity="0.1" />
            <stop offset="95%" stopColor="#5E4314" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3C2A0A" stopOpacity="0.9" />
          </radialGradient>
          <filter id="sealInnerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="1" dy="2" />
            <feGaussianBlur stdDeviation="1.5" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="#3A280D" floodOpacity="0.8" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Organic wavy rim of the hot melted wax */}
        <path
          d="M50 4 C64 3, 76 9, 86 18 C95 28, 97 41, 95 54 C93 67, 88 80, 77 88 C66 96, 52 97, 39 95 C26 93, 14 86, 7 74 C1 62, 2 48, 6 35 C10 22, 22 10, 36 5 C41 3, 46 4, 50 4 Z"
          fill="url(#sealGoldGrad)"
          stroke="#936D28"
          strokeWidth="1.5"
        />

        {/* Inner concentric pressed ring */}
        <circle cx="50" cy="50" r="37" fill="url(#innerRimGrad)" stroke="#B38734" strokeWidth="1.2" strokeDasharray="3 1.5" />
        <circle cx="50" cy="50" r="33" stroke="#ECCB85" strokeWidth="1" strokeOpacity="0.8" />

        {/* Subtle royal laurel branch or traditional bead dots */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 50 + 29 * Math.cos(rad);
          const cy = 50 + 29 * Math.sin(rad);
          return <circle key={deg} cx={cx} cy={cy} r="1" fill="#75541B" />;
        })}

        {/* Monogram Text with 3D bevel look */}
        <text
          x="51"
          y="56"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Cormorant Garamond, Playfair Display, serif"
          fontSize="24"
          fontWeight="bold"
          letterSpacing="2"
          fill="#47310D"
          opacity="0.8"
        >
          {monogram}
        </text>
        <text
          x="50"
          y="55"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Cormorant Garamond, Playfair Display, serif"
          fontSize="24"
          fontWeight="bold"
          letterSpacing="2"
          fill="#FFF4DB"
        >
          {monogram}
        </text>

        {/* Crack lines when breaking */}
        {isCracked && (
          <g stroke="#3A280D" strokeWidth="2" strokeLinecap="round">
            <path d="M50 4 L48 25 L53 45 L46 60 L52 80 L49 95" />
            <path d="M53 45 L68 52 L78 48" />
            <path d="M48 25 L35 30 L22 25" />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Traditional Royal Xhosa Spear & Shield / Cultural Crest
 */
export const CulturalHeritageCrest: React.FC<{ className?: string; color?: string; goldColor?: string }> = ({
  className = "w-20 h-20",
  color = "#4A2B1B",
  goldColor = "#C6A15B"
}) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Traditional Oval Nguni Hide Shield */}
      <ellipse cx="50" cy="50" rx="22" ry="36" fill="#EDE1CD" stroke={color} strokeWidth="2" />
      {/* Hide pattern markings (Isihlangu) */}
      <path d="M42 22 C48 30, 48 45, 40 55 C36 60, 38 72, 45 78" stroke={color} strokeWidth="1.5" fill="none" />
      <ellipse cx="55" cy="40" rx="6" ry="12" fill={color} fillOpacity="0.8" />
      <ellipse cx="44" cy="62" rx="4" ry="8" fill={color} fillOpacity="0.7" />
      {/* Central spine stitching (Mgcobo) */}
      <line x1="50" y1="16" x2="50" y2="84" stroke={color} strokeWidth="2.5" />
      {[24, 32, 40, 48, 56, 64, 72].map((y) => (
        <rect key={y} x="47" y={y} width="6" height="2.5" fill={goldColor} rx="0.5" />
      ))}
      {/* Assegai spear tip & knobkerrie silhouettes */}
      <line x1="20" y1="82" x2="80" y2="18" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
      <polygon points="80,18 73,18 80,25" fill={goldColor} />
      <line x1="80" y1="82" x2="20" y2="18" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="20" r="4.5" fill={color} stroke={goldColor} strokeWidth="1" />
    </svg>
  );
};

/**
 * Subtle Eastern Cape Mountain & Acacia Landscape Silhouette
 */
export const EasternCapeLandscapeSilhouettes: React.FC<{ className?: string; fill?: string }> = ({
  className = "w-full h-24",
  fill = "#241E1A"
}) => {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Distant mountain ridge (Amathole & Stormberg foothills) */}
      <path
        d="M0 70 Q120 45 250 62 T500 40 T780 65 T1020 38 T1200 60 L1200 120 L0 120 Z"
        fill={fill}
        fillOpacity="0.4"
      />
      {/* Midground rolling hills of Cacadu */}
      <path
        d="M0 85 Q160 65 340 80 T700 68 T1050 82 T1200 75 L1200 120 L0 120 Z"
        fill={fill}
        fillOpacity="0.7"
      />
      {/* Foreground hill with flat-top Acacia trees and grazing Nguni silhouettes */}
      <path
        d="M0 98 Q220 88 440 102 T880 92 T1200 100 L1200 120 L0 120 Z"
        fill={fill}
      />
      {/* Flat crown Acacia tree at x=280 */}
      <g transform="translate(260, 58) scale(0.6)">
        <path d="M40 70 Q38 40 40 25 Q35 15 25 10 M40 25 Q45 15 55 10 M40 32 Q32 20 28 15" stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="23" cy="8" rx="14" ry="4" fill={fill} />
        <ellipse cx="57" cy="8" rx="16" ry="5" fill={fill} />
        <ellipse cx="40" cy="5" rx="18" ry="4" fill={fill} />
      </g>
      {/* Cattle silhouettes grazing on the hillside at x=620 and x=720 */}
      <g transform="translate(620, 80) scale(0.35)">
        <ellipse cx="30" cy="22" rx="18" ry="10" fill={fill} />
        <ellipse cx="14" cy="18" rx="6" ry="5" fill={fill} />
        <line x1="16" y1="30" x2="16" y2="40" stroke={fill} strokeWidth="3" />
        <line x1="24" y1="30" x2="24" y2="40" stroke={fill} strokeWidth="3" />
        <line x1="38" y1="30" x2="38" y2="40" stroke={fill} strokeWidth="3" />
        <line x1="44" y1="30" x2="44" y2="40" stroke={fill} strokeWidth="3" />
      </g>
      <g transform="translate(710, 77) scale(0.28)">
        <ellipse cx="30" cy="22" rx="18" ry="10" fill={fill} />
        <ellipse cx="14" cy="18" rx="6" ry="5" fill={fill} />
        <line x1="16" y1="30" x2="16" y2="40" stroke={fill} strokeWidth="3" />
        <line x1="24" y1="30" x2="24" y2="40" stroke={fill} strokeWidth="3" />
        <line x1="38" y1="30" x2="38" y2="40" stroke={fill} strokeWidth="3" />
        <line x1="44" y1="30" x2="44" y2="40" stroke={fill} strokeWidth="3" />
      </g>
    </svg>
  );
};
