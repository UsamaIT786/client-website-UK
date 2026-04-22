import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="bg-white p-12 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 group hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] hover:-translate-y-3 transition-all duration-700 cursor-pointer relative overflow-hidden"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 translate-x-12 -translate-y-12 rounded-full group-hover:scale-150 transition-transform duration-700" />
      
      <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center mb-10 group-hover:bg-primary group-hover:rotate-[10deg] transition-all duration-500 relative z-10">
        <Icon size={32} className="text-primary group-hover:text-white transition-colors duration-500" />
      </div>
      
      <h3 className="text-2xl font-syne font-bold mb-5 text-slate-900 group-hover:text-primary transition-colors duration-300 relative z-10 leading-tight">
        {title}
      </h3>
      
      <p className="text-textMuted leading-relaxed mb-10 relative z-10 text-base">
        {description}
      </p>
      
      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary relative z-10">
        <span className="w-8 h-[1px] bg-primary/20 group-hover:w-12 transition-all duration-500" />
        Explore Details
      </div>
    </motion.div>
  );
};

export default ServiceCard;
