/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { DigitalEnvelope } from './components/DigitalEnvelope';
import { Navigation } from './components/Navigation';
import { OfficialInvitation } from './components/OfficialInvitation';
import { CountdownSection } from './components/CountdownSection';
import { LocationDirections } from './components/LocationDirections';
import { CelebrationProgramme } from './components/CelebrationProgramme';
import { OurCelebration } from './components/OurCelebration';
import { GuestBookSection } from './components/GuestBookSection';
import { RSVPSection } from './components/RSVPSection';
import { TravelInfoSection } from './components/TravelInfoSection';
import { CalendarModal } from './components/CalendarModal';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';

export default function App() {
  // Screen 1: Digital Envelope Landing Page (shown initially)
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(false);
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('invitation');
  
  // Calendar modal state
  const [calendarModalOpen, setCalendarModalOpen] = useState<boolean>(false);

  // Scroll to top when active tab changes
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInvitation = () => {
    setHasOpenedEnvelope(true);
    setActiveTab('invitation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReopenEnvelope = () => {
    setHasOpenedEnvelope(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareWhatsApp = () => {
    const appUrl = window.location.origin;
    const shareMessage = encodeURIComponent(
      `The Mhobo family cordially invites you to uTsiki kwaJola on Saturday, 19 December 2026 at 10h00 in Glen Adelaide, Cacadu, Eastern Cape.\n\nOpen your interactive digital invitation here:\n${appUrl}`
    );
    window.open(`https://wa.me/?text=${shareMessage}`, '_blank');
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If visitor is on the digital envelope landing screen
  if (!hasOpenedEnvelope) {
    return (
      <div className="min-h-screen bg-[#171513] text-[#F6F0E5]">
        <DigitalEnvelope onOpenInvitation={handleOpenInvitation} />
      </div>
    );
  }

  // Once envelope is opened, show the full interactive invitation website
  return (
    <div className="min-h-screen flex flex-col bg-[#171513] text-[#F6F0E5] relative selection:bg-[#C6A15B] selection:text-[#171513]">
      
      {/* Sticky Top Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onReopenEnvelope={handleReopenEnvelope}
        onOpenCalendar={() => setCalendarModalOpen(true)}
        onShareWhatsApp={handleShareWhatsApp}
      />

      {/* Main Content Area rendering according to activeTab with smooth page transitions */}
      <main className="flex-1 w-full pb-16">
        {activeTab === 'invitation' && (
          <div className="animate-in fade-in duration-300 space-y-4">
            <OfficialInvitation
              onViewLocation={() => handleSelectTab('location')}
              onOpenCalendar={() => setCalendarModalOpen(true)}
              onOpenRSVP={() => handleSelectTab('rsvp')}
              onOpenGuestBook={() => handleSelectTab('guestbook')}
            />
            {/* Celebration Programme directly in main interface */}
            <CelebrationProgramme />
            {/* Contextual travel summary & live Cacadu weather widget on invitation page */}
            <TravelInfoSection onViewLocation={() => handleSelectTab('location')} />
          </div>
        )}

        {activeTab === 'countdown' && (
          <div className="animate-in fade-in duration-300">
            <CountdownSection
              onViewLocation={() => handleSelectTab('location')}
              onOpenCalendar={() => setCalendarModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'location' && (
          <div className="animate-in fade-in duration-300">
            <LocationDirections />
            <TravelInfoSection onViewLocation={() => handleSelectTab('location')} />
          </div>
        )}

        {activeTab === 'programme' && (
          <div className="animate-in fade-in duration-300">
            <CelebrationProgramme />
          </div>
        )}

        {activeTab === 'celebration' && (
          <div className="animate-in fade-in duration-300">
            <OurCelebration />
          </div>
        )}

        {activeTab === 'guestbook' && (
          <div className="animate-in fade-in duration-300">
            <GuestBookSection />
          </div>
        )}

        {activeTab === 'rsvp' && (
          <div className="animate-in fade-in duration-300">
            <RSVPSection />
          </div>
        )}
      </main>

      {/* Footer with exact wording */}
      <Footer onBackToTop={handleBackToTop} />

      {/* Add to Calendar Modal */}
      <CalendarModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
      />

      {/* Background Atmosphere & Audio Player (strictly user-controlled, no autoplay) */}
      <AudioPlayer />
    </div>
  );
}
