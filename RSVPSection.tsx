import React, { useState, useEffect } from 'react';
import { RSVPRecord } from '../types';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Heart, 
  Users, 
  MessageSquare, 
  Phone, 
  User, 
  Share2, 
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RSVPSection: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [dietaryRequirements, setDietaryRequirements] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRecord, setSubmittedRecord] = useState<RSVPRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedRSVPs, setSavedRSVPs] = useState<RSVPRecord[]>([]);

  // Load any previously submitted RSVP on this device
  useEffect(() => {
    try {
      const stored = localStorage.getItem('utsiki_rsvps');
      if (stored) {
        const parsed = JSON.parse(stored) as RSVPRecord[];
        setSavedRSVPs(parsed);
      }
    } catch {
      // Local storage unreadable
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);

    const newRecord: RSVPRecord = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      contactNumber: contactNumber.trim() || undefined,
      attendance,
      guestCount: attendance === 'attending' ? Math.max(1, guestCount) : 0,
      dietaryRequirements: dietaryRequirements.trim() || undefined,
      message: message.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Attempt backend API call if Express server proxy is running
      try {
        await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord)
        });
      } catch {
        // Backend offline or local static mode; fall back gracefully to local persistence
      }

      // Persist in client storage
      const updated = [newRecord, ...savedRSVPs];
      setSavedRSVPs(updated);
      localStorage.setItem('utsiki_rsvps', JSON.stringify(updated));
      setSubmittedRecord(newRecord);

      // Trigger celebratory golden confetti if joyfully accepting
      if (attendance === 'attending') {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C6A15B', '#E4D0A0', '#4A2B1B']
          });
        } catch {
          // Confetti silent fail
        }
      }

    } catch (err) {
      console.error(err);
      setErrorMessage('An unexpected error occurred while saving your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareRSVPViaWhatsApp = () => {
    if (!submittedRecord) return;
    const text = encodeURIComponent(
      `uTsiki kwaJola RSVP\n\nGuest: ${submittedRecord.fullName}\nStatus: ${
        submittedRecord.attendance === 'attending' ? 'Joyfully Accepts' : 'Regretfully Declines'
      }\nNumber of Guests: ${submittedRecord.guestCount}${
        submittedRecord.dietaryRequirements ? `\nDietary: ${submittedRecord.dietaryRequirements}` : ''
      }${submittedRecord.message ? `\nMessage: "${submittedRecord.message}"` : ''}\n\n19 December 2026 · Glen Adelaide, Cacadu`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <span className="font-montserrat text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
          CELEBRATION ATTENDANCE
        </span>
        <h2 className="font-olio text-3xl sm:text-5xl font-normal text-[#F6F0E5]">
          Kindly Confirm Your Attendance
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-[#EDE1CD]/85">
          “We would be honoured to celebrate this special day with you.”
        </p>
      </div>

      {/* Confirmation State */}
      {submittedRecord ? (
        <div className="w-full bg-[#1F1916] border-2 border-[#C6A15B] rounded-2xl p-8 sm:p-10 shadow-2xl text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center text-[#E4D0A0] mx-auto shadow-lg">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#E4D0A0]">
              Thank You, {submittedRecord.fullName}
            </h3>
            <p className="font-montserrat text-sm text-[#EDE1CD]/90 max-w-md mx-auto leading-relaxed">
              {submittedRecord.attendance === 'attending'
                ? `Your RSVP for ${submittedRecord.guestCount} ${
                    submittedRecord.guestCount === 1 ? 'guest' : 'guests'
                  } has been recorded. We look forward to celebrating uTsiki kwaJola with you!`
                : 'Your response has been noted. You will be dearly missed on this special celebration.'}
            </p>
          </div>

          {/* Quick confirmation details card */}
          <div className="bg-[#151210] border border-[#C6A15B]/25 rounded-xl p-4 max-w-md mx-auto text-left text-xs font-montserrat space-y-1.5 text-[#EDE1CD]/80">
            <div className="flex justify-between">
              <span className="text-[#8A6747]">Status:</span>
              <span className="font-semibold text-[#E4D0A0]">
                {submittedRecord.attendance === 'attending' ? 'Joyfully Accepts' : 'Regretfully Declines'}
              </span>
            </div>
            {submittedRecord.attendance === 'attending' && (
              <div className="flex justify-between">
                <span className="text-[#8A6747]">Guests attending:</span>
                <span className="font-semibold text-[#F6F0E5]">{submittedRecord.guestCount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#8A6747]">Event Date:</span>
              <span>19 December 2026, 10h00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8A6747]">Venue:</span>
              <span>Glen Adelaide, Cacadu</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShareRSVPViaWhatsApp}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-montserrat text-xs uppercase tracking-wider font-semibold bg-[#25D366] text-[#171513] hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              <span>Send RSVP via WhatsApp</span>
            </button>

            <button
              onClick={() => setSubmittedRecord(null)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-montserrat text-xs uppercase tracking-wider text-[#EDE1CD]/70 hover:text-[#EDE1CD] border border-[#C6A15B]/30 hover:border-[#C6A15B] transition-colors"
            >
              Submit Another RSVP
            </button>
          </div>
        </div>
      ) : (
        /* RSVP Form */
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#1E1916] border border-[#C6A15B]/30 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
        >
          {errorMessage && (
            <div className="flex items-center gap-2 p-3.5 bg-red-950/50 border border-red-800 rounded-lg text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label 
              htmlFor="full-name"
              className="block font-montserrat text-xs uppercase tracking-widest text-[#E4D0A0] font-semibold mb-2"
            >
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                id="full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sipho & Nomsa Mhobo"
                className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-4 py-3 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              />
              <User className="w-4 h-4 text-[#C6A15B] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Contact Number (Optional) */}
          <div>
            <label 
              htmlFor="contact-number"
              className="block font-montserrat text-xs uppercase tracking-widest text-[#EDE1CD]/75 font-semibold mb-2"
            >
              Contact Number <span className="text-[10px] text-[#EDE1CD]/50 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                id="contact-number"
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="e.g. +27 82 123 4567"
                className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-4 py-3 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              />
              <Phone className="w-4 h-4 text-[#C6A15B] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Attendance Choice */}
          <div>
            <label className="block font-montserrat text-xs uppercase tracking-widest text-[#E4D0A0] font-semibold mb-2.5">
              Attendance Confirmation <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttendance('attending')}
                className={`py-3.5 px-4 rounded-xl border text-xs uppercase tracking-wider font-montserrat font-semibold flex items-center justify-center gap-2 transition-all ${
                  attendance === 'attending'
                    ? 'bg-[#C6A15B] text-[#171513] border-[#C6A15B] shadow-md'
                    : 'bg-[#14110F] text-[#EDE1CD]/80 border-[#C6A15B]/30 hover:border-[#C6A15B]'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Joyfully Accepts</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('declined')}
                className={`py-3.5 px-4 rounded-xl border text-xs uppercase tracking-wider font-montserrat font-semibold flex items-center justify-center gap-2 transition-all ${
                  attendance === 'declined'
                    ? 'bg-[#4A2B1B] text-[#F6F0E5] border-[#4A2B1B] shadow-md'
                    : 'bg-[#14110F] text-[#EDE1CD]/80 border-[#C6A15B]/30 hover:border-[#C6A15B]'
                }`}
              >
                <span>Regretfully Declines</span>
              </button>
            </div>
          </div>

          {/* Number of Guests (Only if attending) */}
          {attendance === 'attending' && (
            <div>
              <label 
                htmlFor="guest-count"
                className="block font-montserrat text-xs uppercase tracking-widest text-[#E4D0A0] font-semibold mb-2"
              >
                Number of Guests
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="guest-count"
                  type="number"
                  min="1"
                  max="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                  className="w-24 bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-4 py-3 rounded-lg text-sm font-montserrat text-center focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                />
                <span className="text-xs text-[#EDE1CD]/60 font-montserrat">
                  Including yourself
                </span>
              </div>
            </div>
          )}

          {/* Dietary Requirements (Optional) */}
          {attendance === 'attending' && (
            <div>
              <label 
                htmlFor="dietary-requirements"
                className="block font-montserrat text-xs uppercase tracking-widest text-[#EDE1CD]/75 font-semibold mb-2"
              >
                Dietary Requirements <span className="text-[10px] text-[#EDE1CD]/50 font-normal">(Optional)</span>
              </label>
              <input
                id="dietary-requirements"
                type="text"
                value={dietaryRequirements}
                onChange={(e) => setDietaryRequirements(e.target.value)}
                placeholder="e.g. Vegetarian, Halaal, Allergies..."
                className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-4 py-3 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              />
            </div>
          )}

          {/* Message to the Families (Optional) */}
          <div>
            <label 
              htmlFor="family-message"
              className="block font-montserrat text-xs uppercase tracking-widest text-[#EDE1CD]/75 font-semibold mb-2"
            >
              Message to the Families <span className="text-[10px] text-[#EDE1CD]/50 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <textarea
                id="family-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your warm wishes and congratulations with the Mhobo family..."
                className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-4 py-3 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B] resize-none"
              />
              <MessageSquare className="w-4 h-4 text-[#C6A15B] absolute right-3.5 bottom-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Submit RSVP Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] font-bold bg-gradient-to-r from-[#C6A15B] via-[#E4D0A0] to-[#C6A15B] text-[#171513] hover:brightness-110 active:scale-[0.99] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? "RECORDING RSVP..." : "SUBMIT RSVP"}</span>
          </button>

          {/* Honest Backend & Storage Transparency Notice */}
          <div className="pt-2 text-center">
            <p className="text-[11px] font-montserrat text-[#EDE1CD]/50 leading-relaxed">
              Your response is securely preserved on this device and can be forwarded to the host family via WhatsApp.
            </p>
          </div>
        </form>
      )}

      {/* Previously recorded RSVPs on this device */}
      {savedRSVPs.length > 0 && !submittedRecord && (
        <div className="w-full mt-8 p-4 bg-[#171412] rounded-xl border border-[#C6A15B]/20 text-xs font-montserrat text-[#EDE1CD]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-[#E4D0A0]">Previously Recorded on this Device:</span>
            <span className="text-[10px] text-[#EDE1CD]/50">{savedRSVPs.length} saved</span>
          </div>
          <div className="space-y-1">
            {savedRSVPs.slice(0, 2).map((r) => (
              <div key={r.id} className="flex justify-between items-center py-1 border-t border-[#C6A15B]/10">
                <span>{r.fullName}</span>
                <span className="text-[#C6A15B] capitalize">{r.attendance}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
