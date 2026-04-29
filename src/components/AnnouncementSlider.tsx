import React from 'react';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementSlider: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/update" className="block">
          <div className="bg-white rounded-full py-5 px-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-4 overflow-hidden group hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)]">
            <div className="flex items-center gap-12 whitespace-nowrap py-1 animate-marquee">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-5">
                  <span className="text-sm md:text-base font-bold text-[#002147]">
                    UK SPOUSE VISA 2026 UPDATE <span className="mx-4 text-slate-300">—</span> MINIMUM INCOME REQUIREMENT NOW £29,000 PER YEAR <span className="mx-4 text-slate-300">•</span> APPLICATION FEES FROM £2,064 <span className="mx-4 text-slate-300">•</span> ENGLISH LEVEL A1 REQUIRED FOR INITIAL APPLICATION <span className="mx-4 text-slate-300">•</span> DIGITAL VISA SYSTEM INTRODUCED (NO PHYSICAL CARD) <span className="mx-4 text-slate-300">•</span> STRICT RELATIONSHIP EVIDENCE CHECKS NOW REQUIRED <span className="mx-4 text-slate-300">•</span> PROCESSING TIME: 8–12 WEEKS STANDARD <span className="mx-4 text-slate-300">•</span> PRIORITY SERVICE AVAILABLE FOR FASTER DECISIONS <span className="mx-4 text-slate-300">•</span> SAVINGS ROUTE: £88,500 HELD FOR 6 MONTHS <span className="mx-4 text-slate-300">•</span> BOTH PARTNERS MUST BE 18+ <span className="mx-4 text-slate-300">•</span> SETTLEMENT POSSIBLE AFTER 5 YEARS <span className="mx-4 text-slate-300">•</span> CITIZENSHIP AFTER 6 YEARS <span className="mx-4 text-slate-300">•</span> MAX ABSENCE LIMIT: 180 DAYS PER YEAR <span className="mx-4 text-slate-300">•</span> COMMON REFUSALS: INSUFFICIENT EVIDENCE, LOW INCOME, WRONG DOCUMENTS <span className="mx-4 text-slate-300">•</span> ENSURE ALL DOCUMENTS ARE COMPLETE & TRANSLATED
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
