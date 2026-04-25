import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const countries = [
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'US', name: 'United States', dial: '+1' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'IE', name: 'Ireland', dial: '+353' },
  { code: 'NZ', name: 'New Zealand', dial: '+64' },
  { code: 'IN', name: 'India', dial: '+91' },
  { code: 'PK', name: 'Pakistan', dial: '+92' },
  { code: 'AE', name: 'UAE', dial: '+971' },
  { code: 'DE', name: 'Germany', dial: '+49' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'ES', name: 'Spain', dial: '+34' },
  { code: 'IT', name: 'Italy', dial: '+39' },
  { code: 'NL', name: 'Netherlands', dial: '+31' },
  { code: 'BE', name: 'Belgium', dial: '+32' },
  { code: 'PT', name: 'Portugal', dial: '+351' },
  { code: 'CH', name: 'Switzerland', dial: '+41' },
  { code: 'SE', name: 'Sweden', dial: '+46' },
  { code: 'NO', name: 'Norway', dial: '+47' },
  { code: 'DK', name: 'Denmark', dial: '+45' },
  { code: 'PL', name: 'Poland', dial: '+48' },
  { code: 'TR', name: 'Turkey', dial: '+90' },
  { code: 'CN', name: 'China', dial: '+86' },
  { code: 'JP', name: 'Japan', dial: '+81' },
  { code: 'KR', name: 'South Korea', dial: '+82' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
  { code: 'MY', name: 'Malaysia', dial: '+60' },
  { code: 'TH', name: 'Thailand', dial: '+66' },
  { code: 'VN', name: 'Vietnam', dial: '+84' },
  { code: 'PH', name: 'Philippines', dial: '+63' },
  { code: 'ID', name: 'Indonesia', dial: '+62' },
  { code: 'BR', name: 'Brazil', dial: '+55' },
  { code: 'MX', name: 'Mexico', dial: '+52' },
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'ZA', name: 'South Africa', dial: '+27' },
  { code: 'NG', name: 'Nigeria', dial: '+234' },
  { code: 'EG', name: 'Egypt', dial: '+20' },
  { code: 'KE', name: 'Kenya', dial: '+254' },
  { code: 'GH', name: 'Ghana', dial: '+233' },
];

interface PhoneInputProps {
  label?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ label = "Phone Number" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <div className="space-y-2 relative">
      <label className="text-[10px] font-bold uppercase tracking-widest text-primary block">{label}</label>
      <div className="flex gap-2">
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-[56px] px-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-2 text-slate-900 hover:border-primary transition-all duration-300"
          >
            <img 
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} 
              alt={selectedCountry.name}
              className="w-6 h-auto rounded-sm shadow-sm"
            />
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-[110]" 
                onClick={() => setIsOpen(false)} 
              />
              <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white border border-slate-100 rounded-2xl shadow-2xl z-[120] custom-scrollbar py-2">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 text-left transition-colors group"
                  >
                    <img 
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} 
                      alt={country.name}
                      className="w-6 h-auto rounded-sm shadow-sm group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-medium text-slate-900">{country.name}</span>
                    <span className="text-xs text-slate-400 ml-auto">{country.dial}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Input */}
        <div className="flex-1 relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
            {selectedCountry.dial}
          </div>
          <input
            type="tel"
            placeholder="0000-000000"
            className="w-full h-[56px] bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
