import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementSlider: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/blog/uk-visa-fees-increase-2026" className="block">
          <div className="bg-white rounded-3xl md:rounded-full py-6 px-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center overflow-hidden group hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all duration-500">
            <div className="flex items-center gap-20 md:gap-32 whitespace-nowrap animate-marquee py-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-6">
                  {/* Icon Section */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors duration-500">
                    <AlertCircle size={22} className="text-slate-900 group-hover:text-primary transition-colors duration-500" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-1">
                      Latest Home Office Update
                    </span>
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold text-[#002147] leading-tight">
                      UK Visa Fees Increased (8 April 2026) <span className="mx-2 text-slate-300 font-light">—</span> See what changed
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementSlider;
