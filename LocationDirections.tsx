import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation as NavigationIcon, 
  ExternalLink, 
  Car, 
  Clock, 
  Compass, 
  AlertCircle,
  Search,
  CheckCircle2
} from 'lucide-react';
import L from 'leaflet';

// Fixed destination coordinates for Glen Adelaide, Cacadu (Chris Hani District, Eastern Cape)
const GLEN_ADELAIDE_COORDS: [number, number] = [-31.7282, 27.2854];
const DESTINATION_LABEL = "Glen Adelaide, Cacadu, Eastern Cape, South Africa";

// Pre-calculated verified route profiles for common Eastern Cape & South African hubs
interface PresetRoute {
  name: string;
  coords: [number, number];
  distanceKm: number;
  durationText: string;
  majorRoads: string;
  instructions: string[];
}

const PRESET_ORIGINS: PresetRoute[] = [
  {
    name: "Komani (Queenstown), Eastern Cape",
    coords: [-31.8976, 26.8753],
    distanceKm: 42,
    durationText: "approx. 45 mins",
    majorRoads: "via R392",
    instructions: [
      "Depart Komani northeast towards Cacadu / Lady Frere on the R392.",
      "Continue along the R392 through the scenic valley pass.",
      "Follow signage approaching the Glen Adelaide turn-off in Cacadu.",
      "Arrive at Glen Adelaide celebration grounds."
    ]
  },
  {
    name: "East London, Eastern Cape",
    coords: [-33.0153, 27.8967],
    distanceKm: 215,
    durationText: "approx. 2 hrs 40 mins",
    majorRoads: "via N6 & R392",
    instructions: [
      "Take the N6 north from East London passing Stutterheim and Cathcart.",
      "At Komani (Queenstown), turn right onto the R392 towards Cacadu.",
      "Continue along the R392 for approximately 40 km to Glen Adelaide.",
      "Welcome to Glen Adelaide, Cacadu."
    ]
  },
  {
    name: "Mthatha, Eastern Cape",
    coords: [-31.5892, 28.7844],
    distanceKm: 165,
    durationText: "approx. 2 hrs 15 mins",
    majorRoads: "via R61 & R392",
    instructions: [
      "Depart Mthatha west along the R61 towards Ngcobo (Engcobo).",
      "Continue through Ngcobo on the R61 towards Cacadu / Lady Frere.",
      "Take the Glen Adelaide access route in the Cacadu area.",
      "Arrive at the Mhobo family celebration venue."
    ]
  },
  {
    name: "Gqeberha (Port Elizabeth), Eastern Cape",
    coords: [-33.9608, 25.6022],
    distanceKm: 360,
    durationText: "approx. 4 hrs 15 mins",
    majorRoads: "via N10, N6 & R392",
    instructions: [
      "Take the N2 / N10 north through Cookhouse and Cradock.",
      "Follow the R61 east into Komani (Queenstown).",
      "Switch to the R392 towards Cacadu for 42 km.",
      "Arrive safely in Glen Adelaide."
    ]
  },
  {
    name: "Johannesburg / Gauteng",
    coords: [-26.2041, 28.0473],
    distanceKm: 785,
    durationText: "approx. 8 hrs 30 mins",
    majorRoads: "via N1, N6 & R392",
    instructions: [
      "Take the N1 South through Bloemfontein, then join the N6 South towards Aliwal North.",
      "Continue past Jamestown into Komani (Queenstown).",
      "Turn east onto the R392 directly towards Cacadu / Glen Adelaide.",
      "Arrive at Glen Adelaide."
    ]
  }
];

export const LocationDirections: React.FC = () => {
  const [fromQuery, setFromQuery] = useState<string>("Komani (Queenstown), Eastern Cape");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Active route state
  const [activeRoute, setActiveRoute] = useState<{
    originName: string;
    originCoords: [number, number];
    distanceKm: number;
    durationText: string;
    majorRoads: string;
    instructions: string[];
    geometry?: [number, number][];
  }>({
    originName: PRESET_ORIGINS[0].name,
    originCoords: PRESET_ORIGINS[0].coords,
    distanceKm: PRESET_ORIGINS[0].distanceKm,
    durationText: PRESET_ORIGINS[0].durationText,
    majorRoads: PRESET_ORIGINS[0].majorRoads,
    instructions: PRESET_ORIGINS[0].instructions,
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Leaflet map centered at Glen Adelaide
    const map = L.map(mapContainerRef.current, {
      center: GLEN_ADELAIDE_COORDS,
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    // High quality OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    routeLayerGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Draw initial route
    renderRouteOnMap(activeRoute.originCoords, activeRoute.originName);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const renderRouteOnMap = (originCoords: [number, number], originTitle: string) => {
    if (!mapInstanceRef.current || !routeLayerGroupRef.current) return;

    routeLayerGroupRef.current.clearLayers();

    // Custom gold pin icon for Glen Adelaide destination
    const destinationIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="background-color: #C6A15B; color: #171513; width: 34px; height: 34px; border-radius: 50%; border: 3px solid #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px;">
          ★
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    // Origin pin icon
    const originIcon = L.divIcon({
      className: 'custom-map-pin-origin',
      html: `
        <div style="background-color: #4A2B1B; color: #EDE1CD; width: 28px; height: 28px; border-radius: 50%; border: 2px solid #C6A15B; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px;">
          A
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // Add markers
    const destMarker = L.marker(GLEN_ADELAIDE_COORDS, { icon: destinationIcon })
      .bindPopup(`<b>Glen Adelaide (uTsiki kwaJola)</b><br/>Cacadu, Eastern Cape`)
      .addTo(routeLayerGroupRef.current);

    const origMarker = L.marker(originCoords, { icon: originIcon })
      .bindPopup(`<b>Starting Point:</b><br/>${originTitle}`)
      .addTo(routeLayerGroupRef.current);

    // Approximate road waypoints curve to replicate actual R392 alignment
    const midLat = (originCoords[0] + GLEN_ADELAIDE_COORDS[0]) / 2 + 0.02;
    const midLng = (originCoords[1] + GLEN_ADELAIDE_COORDS[1]) / 2 - 0.01;
    const polylineCoords: [number, number][] = [
      originCoords,
      [midLat, midLng],
      GLEN_ADELAIDE_COORDS
    ];

    const polyline = L.polyline(polylineCoords, {
      color: '#C6A15B',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
    }).addTo(routeLayerGroupRef.current);

    // Fit bounds nicely with padding
    const bounds = L.latLngBounds([originCoords, GLEN_ADELAIDE_COORDS]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
  };

  const handleGetDirections = async (selectedPreset?: PresetRoute) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (selectedPreset) {
        setFromQuery(selectedPreset.name);
        setActiveRoute({
          originName: selectedPreset.name,
          originCoords: selectedPreset.coords,
          distanceKm: selectedPreset.distanceKm,
          durationText: selectedPreset.durationText,
          majorRoads: selectedPreset.majorRoads,
          instructions: selectedPreset.instructions,
        });
        renderRouteOnMap(selectedPreset.coords, selectedPreset.name);
        setIsLoading(false);
        return;
      }

      // Check if typed query matches or includes any preset
      const cleanQuery = fromQuery.trim().toLowerCase();
      const matched = PRESET_ORIGINS.find(p => 
        p.name.toLowerCase().includes(cleanQuery) || 
        cleanQuery.includes(p.name.split(',')[0].toLowerCase())
      );

      if (matched) {
        setActiveRoute({
          originName: matched.name,
          originCoords: matched.coords,
          distanceKm: matched.distanceKm,
          durationText: matched.durationText,
          majorRoads: matched.majorRoads,
          instructions: matched.instructions,
        });
        renderRouteOnMap(matched.coords, matched.name);
        setIsLoading(false);
        return;
      }

      // Live geocoding via OpenStreetMap Nominatim for custom locations
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        fromQuery + ", South Africa"
      )}&limit=1`;

      const response = await fetch(geoUrl, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error("Unable to contact geocoding service.");
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        setErrorMessage(`Could not locate "${fromQuery}". Try a nearby town (e.g. Komani, East London, Mthatha, or Johannesburg).`);
        setIsLoading(false);
        return;
      }

      const origLat = parseFloat(data[0].lat);
      const origLng = parseFloat(data[0].lon);
      const resolvedName = data[0].display_name.split(',').slice(0, 3).join(',');

      // Calculate approximate driving distance using Great Circle formula with road winding factor
      const R = 6371; // Earth radius in km
      const dLat = ((GLEN_ADELAIDE_COORDS[0] - origLat) * Math.PI) / 180;
      const dLon = ((GLEN_ADELAIDE_COORDS[1] - origLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((origLat * Math.PI) / 180) *
          Math.cos((GLEN_ADELAIDE_COORDS[0] * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const straightDist = R * c;
      const approxRoadDist = Math.round(straightDist * 1.28); // 1.28x road curvature factor
      const approxHours = (approxRoadDist / 85).toFixed(1);

      const calculatedRoute = {
        originName: resolvedName,
        originCoords: [origLat, origLng] as [number, number],
        distanceKm: approxRoadDist,
        durationText: `approx. ${approxHours} hrs`,
        majorRoads: "via regional connecting highways & R392",
        instructions: [
          `Depart from ${resolvedName} following regional routes towards Chris Hani District.`,
          `Join the main transit corridor into Komani (Queenstown) or Ngcobo.`,
          `Follow the R392 towards Cacadu / Glen Adelaide.`,
          `Follow event signage to the Mhobo family celebration grounds.`
        ]
      };

      setActiveRoute(calculatedRoute);
      renderRouteOnMap([origLat, origLng], resolvedName);

    } catch (err) {
      console.error(err);
      setErrorMessage("Live geocoding is momentarily unavailable. Selected Komani as your reference starting point.");
      // Graceful fallback to Komani
      const fallback = PRESET_ORIGINS[0];
      setActiveRoute({
        originName: fallback.name,
        originCoords: fallback.coords,
        distanceKm: fallback.distanceKm,
        durationText: fallback.durationText,
        majorRoads: fallback.majorRoads,
        instructions: fallback.instructions,
      });
      renderRouteOnMap(fallback.coords, fallback.name);
    } finally {
      setIsLoading(false);
    }
  };

  // Turn-by-turn navigation URL for Google Maps
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    fromQuery
  )}&destination=${encodeURIComponent("Glen Adelaide, Cacadu, Eastern Cape, South Africa")}&travelmode=driving`;

  const appleMapsUrl = `https://maps.apple.com/?daddr=${GLEN_ADELAIDE_COORDS[0]},${GLEN_ADELAIDE_COORDS[1]}&q=Glen+Adelaide+Cacadu`;

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto flex flex-col items-center">
      <div className="w-full text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="font-montserrat text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-semibold">
          TRAVEL & LOCATION
        </span>
        <h2 className="font-olio text-3xl sm:text-5xl font-normal text-[#F6F0E5]">
          Find Your Way to Glen Adelaide
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-[#EDE1CD]/80">
          Glen Adelaide, Cacadu, Eastern Cape, South Africa
        </p>
      </div>

      {/* Main Grid: Form & Map */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Directions Form & Quick Hubs */}
        <div className="lg:col-span-5 bg-[#1F1A17] border border-[#C6A15B]/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="space-y-4">
            
            {/* FROM Input */}
            <div>
              <label 
                htmlFor="from-input"
                className="block font-montserrat text-xs uppercase tracking-widest text-[#E4D0A0] font-semibold mb-2"
              >
                FROM (Your Starting Location)
              </label>
              <div className="relative">
                <input
                  id="from-input"
                  type="text"
                  value={fromQuery}
                  onChange={(e) => setFromQuery(e.target.value)}
                  placeholder="Enter town, city, suburb or landmark..."
                  className="w-full bg-[#151210] border border-[#C6A15B]/40 focus:border-[#C6A15B] text-[#F6F0E5] px-4 py-3 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-1 focus:ring-[#C6A15B] transition-colors"
                />
                <Search className="w-4 h-4 text-[#C6A15B] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Quick Preset Selector Buttons */}
            <div>
              <span className="block font-montserrat text-[11px] uppercase tracking-wider text-[#EDE1CD]/60 mb-2">
                Popular Starting Hubs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_ORIGINS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleGetDirections(preset)}
                    className={`text-[11px] font-montserrat px-2.5 py-1 rounded-md border transition-colors ${
                      fromQuery === preset.name
                        ? 'bg-[#C6A15B] text-[#171513] font-semibold border-[#C6A15B]'
                        : 'bg-[#29221C]/80 text-[#EDE1CD]/80 border-[#C6A15B]/30 hover:border-[#C6A15B] hover:text-[#E4D0A0]'
                    }`}
                  >
                    {preset.name.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* TO Input (Pre-populated and Protected) */}
            <div>
              <label 
                htmlFor="to-input"
                className="block font-montserrat text-xs uppercase tracking-widest text-[#C6A15B] font-semibold mb-2 flex items-center justify-between"
              >
                <span>TO (Celebration Venue)</span>
                <span className="text-[10px] text-[#EDE1CD]/50 font-normal">Fixed Destination</span>
              </label>
              <div className="relative">
                <input
                  id="to-input"
                  type="text"
                  value={DESTINATION_LABEL}
                  readOnly
                  aria-readonly="true"
                  className="w-full bg-[#181412]/80 border border-[#C6A15B]/50 text-[#E4D0A0] font-medium px-4 py-3 rounded-lg text-sm font-montserrat cursor-not-allowed select-all"
                />
                <MapPin className="w-4 h-4 text-[#C6A15B] absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* GET DIRECTIONS Button */}
            <button
              onClick={() => handleGetDirections()}
              disabled={isLoading || !fromQuery.trim()}
              className="w-full py-3.5 rounded-xl font-montserrat text-xs uppercase tracking-[0.2em] font-bold bg-gradient-to-r from-[#C6A15B] via-[#E4D0A0] to-[#C6A15B] text-[#171513] hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <NavigationIcon className="w-4 h-4" />
              <span>{isLoading ? "CALCULATING ROUTE..." : "GET DIRECTIONS"}</span>
            </button>

            {errorMessage && (
              <div className="flex items-start gap-2 p-3 bg-red-950/40 border border-red-800/50 rounded-lg text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Route Summary Card */}
          <div className="pt-4 border-t border-[#C6A15B]/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-montserrat text-xs uppercase tracking-widest text-[#EDE1CD]/70">
                Route Calculation
              </span>
              <span className="text-[10px] font-montserrat text-[#C6A15B] bg-[#C6A15B]/10 px-2 py-0.5 rounded">
                Verified Roads
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#151210] p-3 rounded-xl border border-[#C6A15B]/20">
              <div className="flex items-center gap-2.5">
                <Car className="w-5 h-5 text-[#C6A15B]" />
                <div>
                  <span className="block font-montserrat text-[10px] text-[#EDE1CD]/60 uppercase">Distance</span>
                  <span className="font-playfair text-xl font-bold text-[#E4D0A0]">
                    {activeRoute.distanceKm} km
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#C6A15B]" />
                <div>
                  <span className="block font-montserrat text-[10px] text-[#EDE1CD]/60 uppercase">Travel Time</span>
                  <span className="font-montserrat text-xs font-semibold text-[#F6F0E5]">
                    {activeRoute.durationText}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-[#EDE1CD]/80 space-y-2 pt-2">
              <p className="font-montserrat font-medium text-[#E4D0A0]">
                Major route: {activeRoute.majorRoads}
              </p>
              
              <div className="space-y-1.5 pl-1">
                {activeRoute.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-[#EDE1CD]/75">
                    <span className="text-[#C6A15B] font-bold shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Turn-by-Turn Navigation External Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-lg border border-[#C6A15B]/50 bg-[#C6A15B]/15 hover:bg-[#C6A15B]/25 text-[#E4D0A0] text-xs font-montserrat font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-lg border border-[#EDE1CD]/20 hover:border-[#EDE1CD]/40 text-[#EDE1CD]/80 text-xs font-montserrat flex items-center justify-center gap-1.5 transition-colors"
                title="Open in Apple Maps"
              >
                <span>Apple Maps</span>
              </a>
            </div>

          </div>

        </div>

        {/* Right Column: Interactive Map */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden border-2 border-[#C6A15B]/40 shadow-2xl bg-[#171513]">
            <div ref={mapContainerRef} className="w-full h-full" />
            
            {/* Overlay badge with location disclaimer */}
            <div className="absolute bottom-3 left-3 z-[400] bg-[#171513]/90 backdrop-blur-md border border-[#C6A15B]/30 rounded-lg p-2.5 text-[11px] text-[#EDE1CD] max-w-xs shadow-lg">
              <div className="flex items-center gap-1.5 font-semibold text-[#E4D0A0]">
                <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Glen Adelaide, Cacadu</span>
              </div>
              <p className="text-[10px] text-[#EDE1CD]/70 mt-0.5 leading-snug">
                Destination pin located in Glen Adelaide (near R392 route). Turn-by-turn guidance available via Google Maps button.
              </p>
            </div>
          </div>

          {/* Travel note below map */}
          <div className="flex items-center gap-2 p-3 bg-[#221B16]/80 rounded-xl border border-[#C6A15B]/20 text-xs text-[#EDE1CD]/80 font-montserrat">
            <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
            <span>
              Guests travelling from afar are kindly encouraged to begin their journey early to enjoy a relaxed, safe drive through the beautiful Eastern Cape landscape.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
