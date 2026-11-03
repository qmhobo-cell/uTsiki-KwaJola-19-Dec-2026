import React from 'react';
import { Calendar, Download, ExternalLink, X, Clock, MapPin } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Event specifics: 19 December 2026 from 10:00 to 18:00 SAST (UTC+2)
  // In UTC format: 20261219T080000Z to 20261219T160000Z
  const eventTitle = "uTsiki kwaJola — K&S";
  const eventLocation = "Glen Adelaide, Cacadu, Eastern Cape, South Africa";
  const eventDescription = "The Mhobo family cordially invites you to uTsiki kwaJola. Join us as we celebrate love, unity and the beautiful journey of two families coming together. Programme starts at 10h00 with guest arrival.";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=20261219T080000Z/20261219T160000Z&details=${encodeURIComponent(
    eventDescription
  )}&location=${encodeURIComponent(eventLocation)}`;

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mhobo Family//uTsiki kwaJola Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:utsiki-kwajola-20261219@mhobofamily.co.za',
      'DTSTAMP:20261014T000000Z',
      'DTSTART:20261219T080000Z',
      'DTEND:20261219T160000Z',
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription.replace(/\n/g, '\\n')}`,
      `LOCATION:${eventLocation}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'uTsiki_kwaJola_19Dec2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#1F1916] border border-[#C6A15B]/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#F6F0E5] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#EDE1CD]/60 hover:text-[#E4D0A0] transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center text-[#E4D0A0]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cormorant text-2xl font-semibold text-[#E4D0A0]">
              Save to Calendar
            </h3>
            <p className="font-montserrat text-xs text-[#EDE1CD]/70">
              Saturday, 19 December 2026
            </p>
          </div>
        </div>

        <div className="bg-[#151210] rounded-xl p-4 border border-[#C6A15B]/20 space-y-2.5 text-xs font-montserrat">
          <div className="flex items-start gap-2 text-[#EDE1CD]/90">
            <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#E4D0A0]">10h00 SAST (estimated until 18h00)</p>
              <p className="text-[11px] text-[#EDE1CD]/60">Guest arrival begins at 10h00</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[#EDE1CD]/90">
            <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <p className="text-[#EDE1CD]/80">Glen Adelaide, Cacadu, Eastern Cape</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl font-montserrat text-xs uppercase tracking-wider font-semibold bg-[#C6A15B] text-[#171513] hover:bg-[#D9B772] transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Add to Google Calendar</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={handleDownloadICS}
            className="w-full py-3.5 px-4 rounded-xl font-montserrat text-xs uppercase tracking-wider font-semibold border border-[#C6A15B]/40 hover:border-[#C6A15B] text-[#E4D0A0] hover:bg-[#C6A15B]/10 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download iCalendar (.ics)</span>
          </button>
        </div>

        <p className="text-[11px] text-center font-montserrat text-[#EDE1CD]/50">
          Compatible with Apple Calendar, Outlook, and Android.
        </p>
      </div>
    </div>
  );
};
