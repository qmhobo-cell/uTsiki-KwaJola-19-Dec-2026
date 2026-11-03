import React, { useState } from 'react';
import { WaxSealEmblem } from './CulturalMotifs';
import { UTsikiKwaJolaLogo } from './UTsikiKwaJolaLogo';
import confetti from 'canvas-confetti';

interface DigitalEnvelopeProps {
  onOpenInvitation: () => void;
}

export const DigitalEnvelope: React.FC<DigitalEnvelopeProps> = ({ onOpenInvitation }) => {
  const [isBreaking, setIsBreaking] = useState<boolean>(false);
  const [isSealCracked, setIsSealCracked] = useState<boolean>(false);
  const [isFlapOpen, setIsFlapOpen] = useState<boolean>(false);
  const [isLetterRising, setIsLetterRising] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleBreakSeal = () => {
    if (isBreaking || isCompleted) return;
    setIsBreaking(true);

    // Step 1: Crack the wax seal
    setIsSealCracked(true);

    // Subtle golden confetti blast
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#C6A15B', '#E4D0A0', '#F6F0E5', '#4A2B1B']
      });
    } catch {
      // Fallback if canvas-confetti is unavailable
    }

    // Step 2: Open envelope flap
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 450);

    // Step 3: Letter rises with warm ivory glow
    setTimeout(() => {
      setIsLetterRising(true);
    }, 950);

    // Step 4: Smooth transition to main invitation
    setTimeout(() => {
      setIsCompleted(true);
      onOpenInvitation();
    }, 1750);
  };

  const handleImmediateSkip = () => {
    setIsCompleted(true);
    onOpenInvitation();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#171513] text-[#F6F0E5] px-4 py-8 overflow-hidden select-none">
      {/* Background atmospheric night sky, deep clouds and subtle golden stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft radial midnight-brown & charcoal gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#382316]/50 via-[#1C1815] to-[#12100F]" />
        
        {/* Gold starlight particles */}
        <div className="absolute top-12 left-1/4 w-1 h-1 bg-[#C6A15B] rounded-full animate-ping opacity-60" />
        <div className="absolute top-28 right-1/4 w-1.5 h-1.5 bg-[#E4D0A0] rounded-full animate-pulse opacity-50" />
        <div className="absolute top-44 left-1/6 w-1 h-1 bg-[#E4D0A0] rounded-full opacity-40" />
        <div className="absolute bottom-32 right-1/5 w-1 h-1 bg-[#C6A15B] rounded-full animate-pulse opacity-50" />
        
        {/* Subtle traditional geometric pattern watermark */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Skip button for reduced-motion or instant access */}
      <div className="relative z-20 w-full max-w-xl flex justify-end">
        <button
          onClick={handleImmediateSkip}
          className="text-xs uppercase tracking-widest text-[#C6A15B]/70 hover:text-[#E4D0A0] transition-colors py-1 px-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A15B]"
          title="Directly enter invitation"
        >
          Skip Animation
        </button>
      </div>

      {/* Top Header Section with exact wording */}
      <header className="relative z-10 text-center max-w-lg mx-auto pt-2 pb-6 space-y-2">
        <p className="font-montserrat text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C6A15B] uppercase">
          TWO FAMILIES · ONE BEAUTIFUL BEGINNING
        </p>

        <h2 className="font-olio text-2xl sm:text-3xl text-[#EDE1CD]/90 font-normal tracking-wide">
          A little envelope.
        </h2>

        <p className="font-olio text-4xl sm:text-5xl md:text-6xl text-[#E4D0A0] drop-shadow-md py-1">
          A lifetime of love.
        </p>

        <p className="font-cormorant italic text-sm sm:text-base text-[#EDE1CD]/80 tracking-wider">
          For you, with love
        </p>
      </header>

      {/* Central Digital Envelope Graphic */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] my-auto flex flex-col items-center">
        {/* The Envelope Container with 3D Perspective */}
        <div 
          onClick={handleBreakSeal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBreakSeal(); }}
          aria-label="Break the wax seal to open your invitation"
          className="group relative w-full aspect-[4/3] bg-[#F7F2EA] rounded-xl shadow-2xl p-2 cursor-pointer transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
        >
          {/* Subtle outer gold hairline border */}
          <div className="absolute inset-1.5 border border-[#C6A15B]/30 rounded-lg pointer-events-none" />
          <div className="absolute inset-2.5 border border-[#C6A15B]/15 rounded-lg pointer-events-none" />

          {/* Envelope Pocket Base */}
          <div className="relative w-full h-full bg-[#FAF6EE] rounded-lg overflow-hidden border border-[#E0D4BE]">
            {/* Soft paper grain background */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E8DAC2_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Rising Letter Peek inside */}
            <div 
              className={`absolute left-4 right-4 bg-[#FFFDF9] border border-[#C6A15B]/40 rounded-t-md p-4 shadow-lg transition-all duration-700 ease-out z-0 flex flex-col items-center text-center ${
                isLetterRising 
                  ? '-top-28 sm:-top-36 opacity-100 scale-105 shadow-2xl ring-2 ring-[#C6A15B]/50' 
                  : isFlapOpen 
                    ? '-top-8 opacity-90' 
                    : 'top-6 opacity-0'
              }`}
            >
              <div className="w-8 h-0.5 bg-[#C6A15B] mb-2" />
              <p className="font-montserrat text-[9px] uppercase tracking-widest text-[#8A6747]">Official Invitation</p>
              <div className="my-0.5 leading-tight text-center">
                <span className="font-utsiki text-xl text-[#632E14] block leading-none">uTsiki</span>
                <span className="font-kwajola text-base text-[#171513] block -mt-1">kwaJola</span>
              </div>
              <p className="font-montserrat text-[10px] text-[#C6A15B] font-semibold mt-1">19 · 12 · 2026</p>
            </div>

            {/* Left Diagonal Envelope Fold */}
            <div 
              className="absolute left-0 bottom-0 w-0 h-0 border-solid border-transparent z-10"
              style={{
                borderLeft: '170px solid #EDE2CE',
                borderTop: '115px solid transparent',
                borderBottom: '115px solid #EDE2CE'
              }}
            />

            {/* Right Diagonal Envelope Fold */}
            <div 
              className="absolute right-0 bottom-0 w-0 h-0 border-solid border-transparent z-10"
              style={{
                borderRight: '170px solid #E6D9C2',
                borderTop: '115px solid transparent',
                borderBottom: '115px solid #E6D9C2'
              }}
            />

            {/* Bottom Flap Fold */}
            <div 
              className="absolute left-0 right-0 bottom-0 h-0 border-solid border-transparent z-10"
              style={{
                borderLeft: '190px solid transparent',
                borderRight: '190px solid transparent',
                borderBottom: '135px solid #F3E9D7'
              }}
            />

            {/* Top Flap (Triangular flap that opens) */}
            <div 
              className={`absolute top-0 left-0 right-0 origin-top transition-transform duration-700 ease-in-out z-20 ${
                isFlapOpen ? '-rotate-180 opacity-60' : 'rotate-0'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                borderLeft: '195px solid transparent',
                borderRight: '195px solid transparent',
                borderTop: '140px solid #EADCC5'
              }}
            />

            {/* Top flap hairline decorative shadow */}
            {!isFlapOpen && (
              <div 
                className="absolute top-0 left-0 right-0 h-0 border-solid border-transparent z-20 pointer-events-none opacity-40"
                style={{
                  borderLeft: '195px solid transparent',
                  borderRight: '195px solid transparent',
                  borderTop: '140px solid rgba(198,161,91,0.2)'
                }}
              />
            )}

            {/* Circular Antique-Gold Wax Seal in center */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 flex flex-col items-center ${
                isFlapOpen ? 'scale-75 opacity-40 translate-y-4' : 'scale-100 group-hover:scale-105'
              }`}
            >
              <WaxSealEmblem 
                size={98}
                isCracked={isSealCracked}
                monogram="K&S"
              />

              {/* Caption beneath the seal */}
              <p className="mt-3 font-montserrat text-[9px] uppercase tracking-[0.2em] text-[#4A2B1B] font-bold text-center drop-shadow-sm whitespace-nowrap bg-[#FAF6EE]/80 px-2 py-0.5 rounded">
                AN INVITATION TO OUR FOREVER
              </p>
            </div>
          </div>
        </div>

        {/* Below the envelope exact details */}
        <div className="mt-5 text-center flex flex-col items-center">
          <UTsikiKwaJolaLogo size="md" variant="gold" showDivider={false} />
          <p className="font-montserrat text-xs sm:text-sm tracking-[0.2em] text-[#EDE1CD]/90 font-medium mt-1">
            19 DECEMBER 2026
          </p>
        </div>
      </div>

      {/* Primary Action Button Section */}
      <footer className="relative z-10 text-center max-w-sm mx-auto pb-4 pt-6 space-y-3">
        <button
          onClick={handleBreakSeal}
          disabled={isBreaking}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full font-montserrat text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#171513] uppercase bg-gradient-to-r from-[#C6A15B] via-[#E4D0A0] to-[#C6A15B] shadow-xl hover:shadow-[0_0_25px_rgba(198,161,91,0.5)] hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mx-auto disabled:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF]"
        >
          <span>{isBreaking ? "OPENING INVITATION..." : "BREAK THE SEAL ↗"}</span>
        </button>

        <p className="font-cormorant italic text-sm text-[#EDE1CD]/75 tracking-wide">
          Your invitation is waiting inside
        </p>
      </footer>
    </div>
  );
};
