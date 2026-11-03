# K&S — uTsiki kwaJola Interactive Digital Invitation Website

A luxury, interactive, mobile-first digital invitation website for the Mhobo family's traditional celebration, **uTsiki kwaJola**, taking place on **19 December 2026** in **Glen Adelaide, Cacadu, Eastern Cape, South Africa**, featuring elegant **Olio Brush Script** headings.

---

## Features & Pages

1. **Digital Envelope Landing Page**
   - Recreated from Attachment 2 design language with dark cinematic background, starry night accents, and gold typography.
   - Exact phrasing:
     - `"TWO FAMILIES · ONE BEAUTIFUL BEGINNING"`
     - `"A little envelope."`
     - `"A lifetime of love."` (calligraphy)
     - `"For you, with love"`
     - `"AN INVITATION TO OUR FOREVER"`
     - `"uTSIKI KWAJOLA"`
     - `"19 DECEMBER 2026"`
     - `"BREAK THE SEAL ↗"`
     - `"Your invitation is waiting inside"`
   - Interactive antique-gold wax seal with **K&S** monogram.
   - Smooth 3D animation breaking the seal, opening the flap, rising letter, and golden celebration particles (with a one-click skip option for reduced-motion).

2. **The Official Invitation (Page Two)**
   - Recreated from Attachment 1 parchment design.
   - Exact heading: `“The Mhobo family cordially invites you to…”`
   - Title: `“uTsiki kwaJola”` faithfully matching **IMG_2400.jpeg** with *uTsiki* in textured dry-brush script (warm chestnut brown `#632E14`) stacked over *kwaJola* in fluid calligraphy script (deep black `#171513`), with the delicate diamond and dot ornamental divider (`— • ❖ • —`).
   - Message: `“Join us as we celebrate love, unity and the beautiful journey of two families coming together.”`
   - Three distinct columns:
     - **DATE**: 19 / DECEMBER / 2026
     - **VENUE**: GLEN ADELAIDE / CACADU / EASTERN CAPE
     - **TIME**: 10h00 (SAST)
   - Closing message: `“Your presence will honour us and make this day even more special.”`
   - Integrated live celebration countdown directly on the invitation card featuring continuous Days, Hours, Minutes, and Seconds timers.

3. **Live Countdown (Page Three)**
   - Continuous real-time countdown calculating remaining time to **19 December 2026 at 10h00 SAST (UTC+2, Africa/Johannesburg)**.
   - Shows Days, Hours, Minutes, and Seconds.
   - Automatically handles leap years, month boundaries, and post-event state (`“Today, we celebrate!”`).

4. **Location & Interactive Directions (Page Four)**
   - Pre-populated, protected destination: **Glen Adelaide, Cacadu, Eastern Cape, South Africa**.
   - Searchable origin input with quick selectors for popular Eastern Cape and South African transit hubs (Komani/Queenstown, East London, Mthatha, Gqeberha, Johannesburg).
   - Interactive Leaflet & OpenStreetMap route visualization.
   - Driving distance (km), estimated travel time, route directions via R392, and one-click turn-by-turn navigation in Google Maps and Apple Maps.

5. **Celebration Programme (Page Five & Main Interface)**
   - Displayed both on its dedicated tab and seamlessly embedded directly on the main invitation interface.
   - Exact times and exact wording:
     - **10h00 — Guest Arrival**: Guests arrive, greet the families, and settle in.
     - **11h00 — Traditional Ceremony**: A special celebration honouring tradition, family, and the coming together of two families.
     - **13h00 — Food & Refreshments**: Enjoy the food, refreshments, and warm hospitality.
     - **14h00 till late — Music & Entertainment**: Music, dancing, laughter, and celebration with family and friends.
   - Planning notice: `“Programme times are provided to help you plan your day. Please arrive early so that you do not miss the traditional ceremony.”`

6. **Our Celebration (Page Six)**
   - Cultural significance of the sacred uTsiki welcoming rite, Jola clan heritage, and imibhaco traditional attire.
   - Required message: `“Rooted in tradition and surrounded by the people we love, we come together to celebrate a beautiful beginning. May this day honour our families, strengthen our bonds, and create memories that will be cherished for generations.”`
   - Celebration visual gallery placeholders honoring Eastern Cape landscapes, Nguni cattle, and traditional pottery.

7. **Digital Guest Book & Well Wishes**
   - Curated, respectful platform for extended family, clan elders, and friends to leave blessings and congratulatory messages (*Makwande, Camagu, Halala*).
   - Quick-select traditional celebration prompts.
   - Interactive reaction likes (*Lilizela* / Send Love) with confetti celebration.
   - **Host Moderation Mode**: Protected by host passcode (`mhobo2026`) enabling the Mhobo family to approve, hide, pin highlights, or remove messages to maintain a respectful, celebratory atmosphere.
   - Search by guest name or blessing keywords, and filter by categories (*Pinned*, *Traditional*, *Love & Joy*).

8. **RSVP Attendance (Page Seven)**
   - Full name (required)
   - Contact number (optional)
   - Attendance: "Joyfully accepts" or "Regretfully declines"
   - Number of guests (for attending guests)
   - Dietary requirements (optional)
   - Message to the families (optional)
   - Persistent storage with immediate confirmation card and direct "Send RSVP via WhatsApp" button to notify the family.

9. **Additional Enhancements**
   - **Add to Calendar**: Generates both Google Calendar link and downloadable `.ics` iCalendar file for 19 Dec 2026, 10h00–18h00 SAST.
   - **WhatsApp Sharing**: Shareable invitation link formatted for one-touch mobile forwarding.
   - **Celebration Music**: Plays **“UKhethe Mina” by Ntencane** (from the album *Awuyiphumuze*) upon clicking **Play Music**, featuring an integrated mini-player, dancing equalizer animation, mute control, and expandable song details.
   - **Live Cacadu Weather Widget**: Real-time temperature, humidity, wind speed, 3-day forecast, and celebration season climate advice for Cacadu & Glen Adelaide via Open-Meteo.
   - **Footer**:
     - `“uTsiki kwaJola · K&S · 19 December 2026”`
     - `“Hosted with love by the Mhobo Family”`
     - `“Two families. One beautiful beginning.”`

---

## Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile and check TypeScript types
npm run lint

# Build production bundle
npm run build
```
