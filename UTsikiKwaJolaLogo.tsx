import React from 'react';

interface UTsikiKwaJolaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'parchment' | 'gold' | 'white';
  showDivider?: boolean;
}

export const UTsikiKwaJolaLogo: React.FC<UTsikiKwaJolaLogoProps> = ({
  className = '',
  size = 'lg',
  variant = 'parchment',
  showDivider = true,
}) => {
  // Color styling matching IMG_2400.jpeg
  // "uTsiki" in warm rich chestnut brown
  // "kwaJola" in black/deep espresso
  const getColors = () => {
    switch (variant) {
      case 'gold':
        return {
          utsiki: 'text-[#E4D0A0]',
          kwajola: 'text-[#C6A15B]',
          divider: 'text-[#C6A15B]',
        };
      case 'white':
        return {
          utsiki: 'text-[#F6F0E5]',
          kwajola: 'text-[#E4D0A0]',
          divider: 'text-[#C6A15B]',
        };
      case 'parchment':
      default:
        return {
          utsiki: 'text-[#632E14]',
          kwajola: 'text-[#171513]',
          divider: 'text-[#8A6747]',
        };
    }
  };

  const colors = getColors();

  // Size styling
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          utsiki: 'text-2xl sm:text-3xl leading-none',
          kwajola: 'text-xl sm:text-2xl -mt-1',
          dividerWidth: 'w-24',
        };
      case 'md':
        return {
          utsiki: 'text-4xl sm:text-5xl leading-none',
          kwajola: 'text-3xl sm:text-4xl -mt-2',
          dividerWidth: 'w-36',
        };
      case 'xl':
        return {
          utsiki: 'text-7xl sm:text-8xl md:text-9xl leading-[0.85]',
          kwajola: 'text-5xl sm:text-6xl md:text-7xl -mt-3 sm:-mt-5',
          dividerWidth: 'w-56 sm:w-64',
        };
      case 'lg':
      default:
        return {
          utsiki: 'text-6xl sm:text-7xl md:text-8xl leading-[0.9]',
          kwajola: 'text-4xl sm:text-5xl md:text-6xl -mt-2 sm:-mt-4',
          dividerWidth: 'w-44 sm:w-52',
        };
    }
  };

  const sizes = getSizeStyles();

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      
      {/* Top line: uTsiki in the textured dry-brush script from image */}
      <div className="relative">
        <span 
          className={`font-utsiki ${colors.utsiki} ${sizes.utsiki} block tracking-normal drop-shadow-sm`}
          style={{ textShadow: variant === 'parchment' ? '0 1px 2px rgba(99,46,20,0.1)' : '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          uTsiki
        </span>
      </div>

      {/* Second line: kwaJola in the fluid calligraphy signature script */}
      <div className="relative">
        <span 
          className={`font-kwajola ${colors.kwajola} ${sizes.kwajola} block font-normal tracking-wide drop-shadow-sm`}
          style={{ textShadow: variant === 'parchment' ? '0 1px 1px rgba(23,21,19,0.1)' : '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          kwaJola
        </span>
      </div>

      {/* Third line: The exact ornamental divider from IMG_2400.jpeg: — • ❖ • — */}
      {showDivider && (
        <div className={`flex items-center justify-center gap-2 ${sizes.dividerWidth} mt-2 sm:mt-3 opacity-80 ${colors.divider}`}>
          <span className="h-[0.75px] flex-1 bg-gradient-to-r from-transparent via-current to-current" />
          <span className="w-1 h-1 rounded-full bg-current" />
          <span className="text-[10px] sm:text-xs leading-none">❖</span>
          <span className="w-1 h-1 rounded-full bg-current" />
          <span className="h-[0.75px] flex-1 bg-gradient-to-l from-transparent via-current to-current" />
        </div>
      )}

    </div>
  );
};
