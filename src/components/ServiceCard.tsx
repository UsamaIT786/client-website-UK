import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  categories?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, index, categories = [] }) => {
  const { openModal } = useModal();
  
  return (
    <div
      onClick={openModal}
      className="bg-white p-12 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 group hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] cursor-pointer relative overflow-hidden transition-all duration-300 h-full flex flex-col hover:-translate-y-1"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 translate-x-16 -translate-y-16 rounded-full group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="w-20 h-20 bg-slate-50 rounded-[24px] flex items-center justify-center mb-10 group-hover:bg-primary relative z-10 transition-colors duration-300 shadow-sm group-hover:shadow-primary/20">
        <Icon size={32} className="text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      
      <h3 className="text-2xl font-syne font-bold mb-5 text-slate-900 group-hover:text-primary relative z-10 leading-tight transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-textMuted leading-relaxed mb-8 relative z-10 text-base flex-grow">
        {description}
      </p>
      
      {/* Bottom Footer Section */}
      <div className="flex items-end justify-between relative z-10 mt-auto pt-6 border-t border-slate-50">
        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 max-w-[70%]">
          {categories.map((cat, i) => (
            <span 
              key={i}
              className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-slate-100 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10 transition-all duration-300"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Action Arrow */}
        <div className="relative">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-500 overflow-hidden">
            <ArrowUpRight 
              size={24} 
              className="text-slate-400 group-hover:text-white transition-colors duration-300" 
            />
          </div>
          
          {/* "Get Started" Guidance Text */}
          <span className="absolute -top-8 right-0 text-[9px] font-bold uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
            Start Assessment
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
