import React from 'react';
import { ShieldAlert, Car, MapPin, Calendar, Clock } from 'lucide-react';
import { WeatherWidget } from './WeatherWidget';

interface TravelInfoSectionProps {
  onViewLocation: () => void;
}

export const TravelInfoSection: React.FC<TravelInfoSectionProps> = ({ onViewLocation }) => {
  // Official verified South African Weather Service (SAWS) / AccuWeather link for Cacadu / Lady Frere region
  const weatherForecastUrl = "https://www.accuweather.com/en/za/lady-frere/305280/weather-forecast/305280";

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="bg-[#1E1916] border border-[#C6A15B]/25 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-1">
          <span className="font-montserrat text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
            GUEST TRAVEL NOTICE
          </span>
          <h3 className="font-olio text-2xl sm:text-4xl text-[#F6F0E5]">
            Travel & Guest Information
          </h3>
        </div>

        {/* Essential Key Details Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#14110F] border border-[#C6A15B]/20 text-xs font-montserrat">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#8A6747] uppercase block text-[10px]">Date</span>
              <span className="font-semibold text-[#EDE1CD]">19 December 2026</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#8A6747] uppercase block text-[10px]">Event Time</span>
              <span className="font-semibold text-[#EDE1CD]">10h00</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#8A6747] uppercase block text-[10px]">Destination</span>
              <span className="font-semibold text-[#EDE1CD]">Glen Adelaide, Cacadu, EC</span>
            </div>
          </div>
        </div>

        {/* Travel & Safety Reminders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-3 p-5 rounded-xl bg-[#241E1A]/60 border border-[#C6A15B]/20">
            <div className="flex items-center gap-2 text-[#E4D0A0]">
              <Car className="w-5 h-5 text-[#C6A15B]" />
              <h4 className="font-montserrat text-sm font-semibold tracking-wide uppercase">
                Plan Your Journey in Advance
              </h4>
            </div>
            <p className="font-montserrat text-xs text-[#EDE1CD]/80 leading-relaxed">
              We warmly remind all travelling guests to plan routes in advance. The regional roads connecting Komani (Queenstown), Ngcobo, and Cacadu are scenic; please allow plenty of travel time and consider daylight driving where possible.
            </p>
            <button
              onClick={onViewLocation}
              className="text-xs font-montserrat text-[#C6A15B] hover:text-[#E4D0A0] underline underline-offset-4 flex items-center gap-1 font-medium pt-1"
            >
              <span>Explore route maps & directions</span>
            </button>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-[#241E1A]/60 border border-[#C6A15B]/20">
            <div className="flex items-center gap-2 text-[#E4D0A0]">
              <ShieldAlert className="w-5 h-5 text-[#C6A15B]" />
              <h4 className="font-montserrat text-sm font-semibold tracking-wide uppercase">
                Drive Safely
              </h4>
            </div>
            <p className="font-montserrat text-xs text-[#EDE1CD]/80 leading-relaxed">
              Please take frequent rest breaks, adhere strictly to speed limits, and observe livestock and wildlife crossing along Eastern Cape rural roadways. We want every family member and honoured guest to arrive sound and safe.
            </p>
          </div>

        </div>

        {/* Live Cacadu Weather Widget */}
        <WeatherWidget />

      </div>
    </section>
  );
};
