import React from 'react';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementSlider: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/update" className="block">
          <div className="bg-white rounded-full py-5 px-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4 overflow-hidden group hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all duration-700">
            <div className="flex items-center gap-12 whitespace-nowrap animate-marquee py-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-5">
                  <Info size={20} className="text-slate-900 group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-[11px] md:text-xs uppercase tracking-[0.4em] text-slate-900 font-medium">
                    Latest Home Office Update <span className="mx-4 text-slate-400">•</span> UK Visa Fees Increased (8 April 2026) <span className="mx-4 text-slate-400">—</span> See what changed
                  </span>
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
