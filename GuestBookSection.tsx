import React, { useState, useEffect } from 'react';
import { GuestBookEntry } from '../types';
import { 
  XhosaBeadworkBorder, 
  NguniCattleMotif 
} from './CulturalMotifs';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Pin, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Filter, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Trash2, 
  Key, 
  Lock, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'utsiki_guestbook_entries';
const MODERATION_SETTINGS_KEY = 'utsiki_guestbook_settings';
const DEFAULT_HOST_PIN = 'mhobo2026';

// Curated authentic initial blessings
const INITIAL_BLESSINGS: GuestBookEntry[] = [
  {
    id: 'blessing-1',
    authorName: 'The Jola & Mhobo Elders',
    relationship: 'Family & Clan Elders',
    location: 'Cacadu, Eastern Cape',
    message: 'Camagu kuJola! Siyavuya kakhulu ngalo mhla mkhulu. May your home be blessed with deep peace, abundance, and ancestral harmony. Makwande kulo mzi!',
    blessingTag: 'traditional',
    status: 'approved',
    isPinned: true,
    likes: 24,
    createdAt: '2026-10-12T09:30:00Z',
  },
  {
    id: 'blessing-2',
    authorName: 'Auntie Nomsa & Family',
    relationship: 'Family',
    location: 'Komani (Queenstown)',
    message: 'Sending all our warmest love and joy to the couple on this sacred uTsiki celebration. May your love grow stronger with every passing season. Halala!',
    blessingTag: 'love',
    status: 'approved',
    isPinned: false,
    likes: 18,
    createdAt: '2026-10-13T14:15:00Z',
  },
  {
    id: 'blessing-3',
    authorName: 'Sifiso & Thandeka',
    relationship: 'Close Friends',
    location: 'East London',
    message: 'What an honor to celebrate this milestone with both families! Wishing you a journey rich in friendship, boundless grace, and unending laughter.',
    blessingTag: 'family',
    status: 'approved',
    isPinned: false,
    likes: 15,
    createdAt: '2026-10-14T11:00:00Z',
  },
];

export const GuestBookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [authorName, setAuthorName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Friend of the Family');
  const [location, setLocation] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [blessingTag, setBlessingTag] = useState<'traditional' | 'love' | 'family' | 'prosperity'>('traditional');
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pinned' | 'traditional' | 'love' | 'pending' | 'hidden'>('all');
  
  // Host Moderation Mode
  const [isModerator, setIsModerator] = useState<boolean>(false);
  const [showModerationModal, setShowModerationModal] = useState<boolean>(false);
  const [hostPinInput, setHostPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [autoApprove, setAutoApprove] = useState<boolean>(true);

  // Load from local storage or initialize with curated blessings
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
      } else {
        setEntries(INITIAL_BLESSINGS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLESSINGS));
      }

      const settings = localStorage.getItem(MODERATION_SETTINGS_KEY);
      if (settings) {
        const parsed = JSON.parse(settings);
        setAutoApprove(parsed.autoApprove ?? true);
      }
    } catch {
      setEntries(INITIAL_BLESSINGS);
    }
  }, []);

  const saveEntries = (updated: GuestBookEntry[]) => {
    setEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save guest book entries:', err);
    }
  };

  const handleQuickPrompt = (phrase: string) => {
    setMessage((prev) => (prev ? `${prev} ${phrase}` : phrase));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newEntry: GuestBookEntry = {
      id: `blessing-${Date.now()}`,
      authorName: authorName.trim(),
      relationship: relationship.trim(),
      location: location.trim() || undefined,
      message: message.trim(),
      blessingTag,
      status: autoApprove ? 'approved' : 'pending',
      isPinned: false,
      likes: 1,
      createdAt: new Date().toISOString(),
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);

    // Particle effect for celebratory submission
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#C6A15B', '#E4D0A0', '#4A2B1B', '#F6F0E5'],
      });
    } catch {
      // Fallback
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setAuthorName('');
    setLocation('');
    setMessage('');

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleLike = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, likes: entry.likes + 1 };
      }
      return entry;
    });
    saveEntries(updated);

    try {
      confetti({
        particleCount: 15,
        spread: 35,
        origin: { y: 0.7 },
        colors: ['#C6A15B', '#E4D0A0'],
      });
    } catch {
      // Fallback
    }
  };

  // Moderator actions
  const handleTogglePin = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, isPinned: !entry.isPinned };
      }
      return entry;
    });
    saveEntries(updated);
  };

  const handleSetStatus = (id: string, status: 'approved' | 'pending' | 'hidden') => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, status };
      }
      return entry;
    });
    saveEntries(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this message from the guest book?')) {
      const updated = entries.filter((entry) => entry.id !== id);
      saveEntries(updated);
    }
  };

  const handleVerifyHostPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (hostPinInput.trim() === DEFAULT_HOST_PIN) {
      setIsModerator(true);
      setShowModerationModal(false);
      setHostPinInput('');
      setPinError(null);
    } else {
      setPinError(`Incorrect Host Passcode. (Default for Mhobo family: ${DEFAULT_HOST_PIN})`);
    }
  };

  // Filter and search logic
  const filteredEntries = entries.filter((entry) => {
    // If not moderator, only show approved
    if (!isModerator && entry.status !== 'approved') {
      return false;
    }

    // Filter selector
    if (selectedFilter === 'pinned' && !entry.isPinned) return false;
    if (selectedFilter === 'traditional' && entry.blessingTag !== 'traditional') return false;
    if (selectedFilter === 'love' && entry.blessingTag !== 'love') return false;
    if (selectedFilter === 'pending' && entry.status !== 'pending') return false;
    if (selectedFilter === 'hidden' && entry.status !== 'hidden') return false;

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchAuthor = entry.authorName.toLowerCase().includes(query);
      const matchMsg = entry.message.toLowerCase().includes(query);
      const matchRel = entry.relationship.toLowerCase().includes(query);
      const matchLoc = entry.location?.toLowerCase().includes(query);
      return matchAuthor || matchMsg || matchRel || matchLoc;
    }

    return true;
  });

  // Sort pinned entries to top
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const pendingCount = entries.filter((e) => e.status === 'pending').length;

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Runner */}
      <div className="flex flex-col items-center mb-6">
        <XhosaBeadworkBorder className="w-56 sm:w-72 h-4" color="#8A6747" accentColor="#C6A15B" />
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="font-montserrat text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
          WORDS OF LOVE & BLESSING
        </span>
        <h2 className="font-olio text-3xl sm:text-5xl font-normal text-[#F6F0E5]">
          The Digital Guest Book
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-[#EDE1CD]/85">
          “Leave your blessings, prayers, and words of celebration for the couple and the Mhobo family.”
        </p>
      </div>

      {/* Moderation Status Bar */}
      <div className="w-full flex items-center justify-between mb-8 pb-3 border-b border-[#C6A15B]/20 text-xs font-montserrat">
        <div className="flex items-center gap-2 text-[#EDE1CD]/70">
          <MessageCircle className="w-4 h-4 text-[#C6A15B]" />
          <span>
            {entries.filter((e) => e.status === 'approved').length} Celebratory Blessings
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isModerator ? (
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#C6A15B]/20 text-[#E4D0A0] text-[11px] font-semibold flex items-center gap-1 border border-[#C6A15B]/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Host Moderation Active</span>
                {pendingCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-black text-[10px] rounded-full font-bold">
                    {pendingCount}
                  </span>
                )}
              </span>
              <button
                onClick={() => setIsModerator(false)}
                className="text-[11px] text-[#EDE1CD]/60 hover:text-[#EDE1CD] underline"
              >
                Exit Host Mode
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowModerationModal(true)}
              className="flex items-center gap-1 text-[11px] text-[#C6A15B]/70 hover:text-[#E4D0A0] transition-colors"
              title="Host access to curate and moderate guest messages"
            >
              <Lock className="w-3 h-3" />
              <span>Host Moderation</span>
            </button>
          )}
        </div>
      </div>

      {/* Submission Form Card */}
      <div className="w-full bg-[#1E1916] border border-[#C6A15B]/30 rounded-2xl p-6 sm:p-8 shadow-xl mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cormorant text-2xl font-semibold text-[#E4D0A0] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C6A15B]" />
            <span>Sign the Guest Book</span>
          </h3>
          <span className="text-[11px] font-montserrat text-[#EDE1CD]/50">
            {autoApprove ? 'Publishes immediately' : 'Submitted for review'}
          </span>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300">
                Siyabulela! Your blessing has been received.
              </p>
              <p className="text-[11px] text-emerald-200/80 mt-0.5">
                {autoApprove 
                  ? 'Your warm wishes are now visible in the guest book below.'
                  : 'Your blessing has been saved and will be displayed following host review.'}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Author Name */}
            <div>
              <label 
                htmlFor="guest-author-name"
                className="block font-montserrat text-xs uppercase tracking-wider text-[#E4D0A0] font-semibold mb-1.5"
              >
                Your Name / Family Name <span className="text-red-400">*</span>
              </label>
              <input
                id="guest-author-name"
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Sindi & Sipho Mhobo"
                className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-3.5 py-2.5 rounded-lg text-xs font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              />
            </div>

            {/* Relationship / Connection */}
            <div>
              <label 
                htmlFor="guest-relationship"
                className="block font-montserrat text-xs uppercase tracking-wider text-[#EDE1CD]/80 font-semibold mb-1.5"
              >
                Connection to Family
              </label>
              <select
                id="guest-relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-3.5 py-2.5 rounded-lg text-xs font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              >
                <option value="Jola Clan Family">Jola Clan Family</option>
                <option value="Mhobo Family Relative">Mhobo Family Relative</option>
                <option value="Friend of the Couple">Friend of the Couple</option>
                <option value="Colleague & Friend">Colleague & Friend</option>
                <option value="Community Elder">Community Elder</option>
                <option value="Honoured Guest">Honoured Guest</option>
              </select>
            </div>

            {/* Hometown / City */}
            <div>
              <label 
                htmlFor="guest-hometown"
                className="block font-montserrat text-xs uppercase tracking-wider text-[#EDE1CD]/80 font-semibold mb-1.5"
              >
                Hometown / City <span className="text-[10px] text-[#EDE1CD]/50">(Optional)</span>
              </label>
              <input
                id="guest-hometown"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Komani, East London, JHB"
                className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-3.5 py-2.5 rounded-lg text-xs font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              />
            </div>
          </div>

          {/* Blessing Category Tag */}
          <div>
            <label className="block font-montserrat text-xs uppercase tracking-wider text-[#EDE1CD]/80 font-semibold mb-1.5">
              Theme of Blessing
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'traditional', label: 'Traditional (Camagu / IsiXhosa)' },
                { id: 'love', label: 'Love & Joy' },
                { id: 'family', label: 'Family & Unity' },
                { id: 'prosperity', label: 'Peace & Prosperity' },
              ].map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setBlessingTag(tag.id as any)}
                  className={`text-[11px] font-montserrat px-3 py-1.5 rounded-lg border transition-colors ${
                    blessingTag === tag.id
                      ? 'bg-[#C6A15B] text-[#171513] font-semibold border-[#C6A15B]'
                      : 'bg-[#14110F] text-[#EDE1CD]/70 border-[#C6A15B]/30 hover:border-[#C6A15B]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Traditional Phrase Suggestions */}
          <div>
            <span className="block font-montserrat text-[10px] uppercase tracking-wider text-[#EDE1CD]/60 mb-1.5">
              Click to insert traditional celebration words:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Camagu kuJola!',
                'Makwande kulo mzi!',
                'Amhlope kwiintsapho zombini!',
                'Wishing you a lifetime of joy and peace.',
                'Halala Mhobo family, halala!',
              ].map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => handleQuickPrompt(phrase)}
                  className="text-[10px] font-montserrat px-2 py-1 rounded bg-[#2A231D] text-[#E4D0A0] hover:bg-[#C6A15B]/20 border border-[#C6A15B]/20 transition-colors"
                >
                  + {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label 
              htmlFor="guest-message-text"
              className="block font-montserrat text-xs uppercase tracking-wider text-[#E4D0A0] font-semibold mb-1.5"
            >
              Your Message & Well Wishes <span className="text-red-400">*</span>
            </label>
            <textarea
              id="guest-message-text"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your prayers, congratulatory message, or reflections on this special celebration..."
              className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-4 py-3 rounded-xl text-xs font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !authorName.trim() || !message.trim()}
              className="w-full sm:w-auto px-7 py-3 rounded-xl font-montserrat text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-[#C6A15B] to-[#D9B772] text-[#171513] hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting Blessing...' : 'Post Well Wishes'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Search and Filters Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blessings or guest name..."
            className="w-full bg-[#1A1613] border border-[#C6A15B]/30 focus:border-[#C6A15B] text-[#F6F0E5] pl-9 pr-4 py-2 rounded-lg text-xs font-montserrat focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#C6A15B] absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`text-xs font-montserrat px-3 py-1.5 rounded-md transition-colors ${
              selectedFilter === 'all'
                ? 'bg-[#C6A15B] text-[#171513] font-semibold'
                : 'text-[#EDE1CD]/70 hover:text-[#E4D0A0]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('pinned')}
            className={`text-xs font-montserrat px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
              selectedFilter === 'pinned'
                ? 'bg-[#C6A15B] text-[#171513] font-semibold'
                : 'text-[#EDE1CD]/70 hover:text-[#E4D0A0]'
            }`}
          >
            <Pin className="w-3 h-3" />
            <span>Pinned</span>
          </button>
          <button
            onClick={() => setSelectedFilter('traditional')}
            className={`text-xs font-montserrat px-3 py-1.5 rounded-md transition-colors ${
              selectedFilter === 'traditional'
                ? 'bg-[#C6A15B] text-[#171513] font-semibold'
                : 'text-[#EDE1CD]/70 hover:text-[#E4D0A0]'
            }`}
          >
            Traditional
          </button>
          <button
            onClick={() => setSelectedFilter('love')}
            className={`text-xs font-montserrat px-3 py-1.5 rounded-md transition-colors ${
              selectedFilter === 'love'
                ? 'bg-[#C6A15B] text-[#171513] font-semibold'
                : 'text-[#EDE1CD]/70 hover:text-[#E4D0A0]'
            }`}
          >
            Love & Joy
          </button>

          {isModerator && (
            <>
              <button
                onClick={() => setSelectedFilter('pending')}
                className={`text-xs font-montserrat px-3 py-1.5 rounded-md transition-colors ${
                  selectedFilter === 'pending'
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'text-amber-300 hover:text-amber-200'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setSelectedFilter('hidden')}
                className={`text-xs font-montserrat px-3 py-1.5 rounded-md transition-colors ${
                  selectedFilter === 'hidden'
                    ? 'bg-red-800 text-white font-semibold'
                    : 'text-red-300 hover:text-red-200'
                }`}
              >
                Hidden
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages Grid */}
      <div className="w-full space-y-4">
        {sortedEntries.length === 0 ? (
          <div className="w-full p-12 text-center bg-[#1A1613] rounded-2xl border border-[#C6A15B]/20">
            <p className="font-cormorant text-2xl text-[#E4D0A0]">
              No blessings found matching your search.
            </p>
            <p className="font-montserrat text-xs text-[#EDE1CD]/60 mt-1">
              Be the first to share a warm message for the couple!
            </p>
          </div>
        ) : (
          sortedEntries.map((entry) => {
            const isTraditional = entry.blessingTag === 'traditional';

            return (
              <article
                key={entry.id}
                className={`relative p-6 sm:p-7 rounded-2xl transition-all shadow-lg ${
                  entry.isPinned
                    ? 'bg-gradient-to-r from-[#29221C] to-[#201A16] border-2 border-[#C6A15B] shadow-[0_4px_20px_rgba(198,161,91,0.15)]'
                    : 'bg-[#1D1815] border border-[#C6A15B]/25 hover:border-[#C6A15B]/50'
                } ${entry.status === 'hidden' ? 'opacity-50 border-dashed border-red-700' : ''}`}
              >
                {/* Pinned Stamp */}
                {entry.isPinned && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#E4D0A0] text-[10px] font-montserrat uppercase tracking-wider font-semibold">
                    <Pin className="w-3 h-3 text-[#C6A15B]" />
                    <span>Family Highlight</span>
                  </div>
                )}

                {/* Status notice in moderator mode */}
                {isModerator && entry.status !== 'approved' && (
                  <div className="mb-3">
                    <span className={`text-[10px] uppercase font-montserrat px-2 py-0.5 rounded ${
                      entry.status === 'pending' ? 'bg-amber-900/60 text-amber-200 border border-amber-600' : 'bg-red-900/60 text-red-200 border border-red-600'
                    }`}>
                      Status: {entry.status}
                    </span>
                  </div>
                )}

                {/* Author Info & Relationship */}
                <div className="flex flex-wrap items-baseline gap-2 mb-3">
                  <h4 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#F6F0E5]">
                    {entry.authorName}
                  </h4>
                  <span className="text-[#C6A15B] text-xs">·</span>
                  <span className="font-montserrat text-xs text-[#E4D0A0] font-medium">
                    {entry.relationship}
                  </span>
                  {entry.location && (
                    <>
                      <span className="text-[#EDE1CD]/40 text-xs">·</span>
                      <span className="font-montserrat text-xs text-[#EDE1CD]/60">
                        {entry.location}
                      </span>
                    </>
                  )}
                </div>

                {/* Message Body */}
                <blockquote className="font-cormorant text-base sm:text-lg text-[#EDE1CD]/95 leading-relaxed italic mb-5 pl-3 border-l-2 border-[#C6A15B]/50">
                  “{entry.message}”
                </blockquote>

                {/* Footer of card: timestamp, reaction button, and moderation controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#C6A15B]/15 text-xs font-montserrat">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[#EDE1CD]/50">
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>

                    {entry.blessingTag && (
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#C6A15B]/10 text-[#C6A15B]">
                        {entry.blessingTag}
                      </span>
                    )}
                  </div>

                  {/* Right side: Reaction & Moderator controls */}
                  <div className="flex items-center gap-2">
                    {/* Send Love Button */}
                    <button
                      onClick={() => handleLike(entry.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/10 hover:bg-[#C6A15B]/20 text-[#E4D0A0] transition-colors border border-[#C6A15B]/20"
                      title="Send love / Lilizela"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#C6A15B] text-[#C6A15B]" />
                      <span className="text-xs font-medium">{entry.likes}</span>
                    </button>

                    {/* Moderator Controls */}
                    {isModerator && (
                      <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[#C6A15B]/20">
                        <button
                          onClick={() => handleTogglePin(entry.id)}
                          className={`p-1.5 rounded hover:bg-[#C6A15B]/20 transition-colors ${
                            entry.isPinned ? 'text-[#C6A15B]' : 'text-[#EDE1CD]/50'
                          }`}
                          title={entry.isPinned ? 'Unpin blessing' : 'Pin to top'}
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>

                        {entry.status === 'approved' ? (
                          <button
                            onClick={() => handleSetStatus(entry.id, 'hidden')}
                            className="p-1.5 rounded text-[#EDE1CD]/60 hover:text-amber-400 hover:bg-[#C6A15B]/20 transition-colors"
                            title="Hide message"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSetStatus(entry.id, 'approved')}
                            className="p-1.5 rounded text-emerald-400 hover:bg-emerald-950/40 transition-colors"
                            title="Approve and show publicly"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="p-1.5 rounded text-red-400 hover:bg-red-950/40 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Decorative Bottom Pottery / Cattle Motif */}
      <div className="flex items-center justify-center gap-4 my-10 opacity-70">
        <NguniCattleMotif className="w-16 h-10" fill="#C6A15B" />
        <p className="font-cormorant italic text-sm text-[#EDE1CD]/70">
          Ukwanda kwaliwa ngumthakathi · May the family flourish
        </p>
      </div>

      {/* Host Moderation PIN Modal */}
      {showModerationModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowModerationModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-[#1E1916] border border-[#C6A15B]/50 rounded-2xl p-6 shadow-2xl text-[#F6F0E5] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center text-[#E4D0A0]">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-cormorant text-xl font-semibold text-[#E4D0A0]">
                  Mhobo Family Moderation
                </h4>
                <p className="font-montserrat text-[11px] text-[#EDE1CD]/70">
                  Enter host passcode to curate guest book messages
                </p>
              </div>
            </div>

            {pinError && (
              <div className="flex items-start gap-2 p-2.5 bg-red-950/50 border border-red-800 rounded-lg text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handleVerifyHostPin} className="space-y-4">
              <div>
                <label 
                  htmlFor="host-pin-input"
                  className="block font-montserrat text-xs uppercase tracking-wider text-[#EDE1CD]/80 mb-1"
                >
                  Host Passcode
                </label>
                <input
                  id="host-pin-input"
                  type="password"
                  autoFocus
                  value={hostPinInput}
                  onChange={(e) => setHostPinInput(e.target.value)}
                  placeholder="Enter passcode (e.g. mhobo2026)"
                  className="w-full bg-[#14110F] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-3.5 py-2.5 rounded-lg text-xs font-montserrat focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-montserrat text-[#EDE1CD]/60 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoApprove}
                    onChange={(e) => {
                      setAutoApprove(e.target.checked);
                      localStorage.setItem(
                        MODERATION_SETTINGS_KEY,
                        JSON.stringify({ autoApprove: e.target.checked })
                      );
                    }}
                    className="accent-[#C6A15B]"
                  />
                  <span>Auto-approve new posts</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModerationModal(false)}
                  className="flex-1 py-2.5 rounded-xl font-montserrat text-xs uppercase text-[#EDE1CD]/70 border border-[#C6A15B]/30 hover:border-[#C6A15B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-montserrat text-xs uppercase font-bold bg-[#C6A15B] text-[#171513] hover:bg-[#D9B772]"
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
