import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Scroll, 
  Clock, 
  MapPin, 
  Calendar, 
  Heart, 
  Send, 
  Menu, 
  X,
  Share2,
  Mail,
  BookOpen
} from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onReopenEnvelope: () => void;
  onOpenCalendar: () => void;
  onShareWhatsApp: () => void;
}

const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'invitation', label: 'The Invitation', icon: Scroll },
  { id: 'countdown', label: 'Countdown', icon: Clock },
  { id: 'location', label: 'Location & Directions', icon: MapPin },
  { id: 'programme', label: 'Celebration Programme', icon: Calendar },
  { id: 'celebration', label: 'Our Celebration', icon: Heart },
  { id: 'guestbook', label: 'Guest Book', icon: BookOpen },
  { id: 'rsvp', label: 'RSVP', icon: Send },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onReopenEnvelope,
  onOpenCalendar,
  onShareWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleTabClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#171513]/95 backdrop-blur-md border-b border-[#C6A15B]/25 shadow-xl transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Monogram & Subtitle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTabClick('invitation')}
            className="group text-left flex items-center gap-2.5 focus:outline-none"
            title="Return to Invitation"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E4D0A0] to-[#C6A15B] flex items-center justify-center text-[#171513] font-serif font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              K&S
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 leading-tight">
                <span className="font-utsiki text-lg sm:text-xl text-[#E4D0A0]">uTsiki</span>
                <span className="font-kwajola text-base sm:text-lg text-[#C6A15B]">kwaJola</span>
              </div>
              <span className="font-montserrat text-[10px] tracking-widest text-[#EDE1CD]/70 uppercase block">
                The Mhobo Family
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Horizontal Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs tracking-wider uppercase font-montserrat transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#E4D0A0] font-semibold bg-[#C6A15B]/15'
                    : 'text-[#EDE1CD]/80 hover:text-[#E4D0A0] hover:bg-[#C6A15B]/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C6A15B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Utility Actions (Share, Calendar, Envelope) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onShareWhatsApp}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 text-xs font-montserrat tracking-wide transition-colors"
            title="Share invitation via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Share</span>
          </button>

          <button
            onClick={onOpenCalendar}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C6A15B]/40 bg-[#C6A15B]/10 text-[#E4D0A0] hover:bg-[#C6A15B]/20 text-xs font-montserrat tracking-wide transition-colors"
            title="Add to calendar"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Calendar</span>
          </button>

          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-1 p-2 rounded-full border border-[#C6A15B]/30 hover:border-[#C6A15B] text-[#E4D0A0] transition-colors"
            title="Re-open Envelope Landing Page"
            aria-label="Reopen envelope screen"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#E4D0A0] hover:bg-[#C6A15B]/10 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171513] border-b border-[#C6A15B]/30 px-4 py-4 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-montserrat tracking-wide transition-colors ${
                  isActive
                    ? 'bg-[#C6A15B]/20 text-[#E4D0A0] font-semibold border-l-4 border-[#C6A15B]'
                    : 'text-[#EDE1CD]/85 hover:bg-[#C6A15B]/10 hover:text-[#E4D0A0]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6A15B]' : 'text-[#EDE1CD]/60'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#C6A15B]/20 flex items-center justify-between gap-2 px-1">
            <button
              onClick={() => {
                onShareWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] text-xs font-montserrat font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => {
                onOpenCalendar();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#C6A15B]/40 bg-[#C6A15B]/10 text-[#E4D0A0] text-xs font-montserrat font-medium"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
