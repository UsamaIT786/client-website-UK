import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Globe2, 
  ShieldCheck, 
  Zap, 
  Award, 
  Layers,
  Compass,
  Cpu
} from 'lucide-react';

const companies = [
  { name: "Global Tech", icon: Globe2 },
  { name: "Nexus Corp", icon: Cpu },
  { name: "Horizon", icon: Compass },
  { name: "Zenith", icon: Award },
  { name: "Stellar", icon: Zap },
  { name: "Omni", icon: Layers },
  { name: "SecureLaw", icon: ShieldCheck },
  { name: "BridgeLegal", icon: Building2 },
];

const CompanySlider: React.FC = () => {
  // Duplicate companies to create a seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <div className="py-20 bg-background overflow-hidden relative">
      {/* Gradient Fades for edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 justify-center"
        >
          <span className="w-8 h-[1px] bg-primary/30" />
          <span className="text-textMuted font-bold tracking-[0.4em] uppercase text-[9px]">Trusted by Industry Leaders</span>
          <span className="w-8 h-[1px] bg-primary/30" />
        </motion.div>
      </div>

      <div className="flex relative">
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          whileHover={{ animationPlayState: "paused" }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedCompanies.map((company, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 group cursor-pointer px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
            >
              <company.icon 
                size={24} 
                className="text-textMuted group-hover:text-primary transition-colors duration-500" 
              />
              <span className="text-2xl font-syne font-bold uppercase tracking-tighter text-textMuted group-hover:text-slate-900 transition-colors duration-500">
                {company.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanySlider;
