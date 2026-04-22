import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp } from 'lucide-react';

interface VisaCardProps {
  title: string;
  time: string;
  status: 'Increasing' | 'Decreasing' | 'Stable';
  index: number;
}

const VisaCard: React.FC<VisaCardProps> = ({ title, time, status, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
    >
      <div>
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-xl font-syne font-bold text-slate-900 group-hover:text-primary transition-colors pr-4">{title}</h3>
          <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
            status === 'Increasing' ? 'bg-red-500/10 text-red-500' : 
            status === 'Decreasing' ? 'bg-green-500/10 text-green-500' : 
            'bg-blue-500/10 text-blue-600'
          }`}>
            {status}
          </div>
        </div>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Clock className="text-primary" size={24} />
          </div>
          <span className="text-4xl font-bold font-syne text-slate-900">{time}</span>
        </div>
      </div>
      
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] text-textMuted uppercase tracking-[0.2em] font-bold">
        <span>Updated: Today</span>
        <TrendingUp size={16} className={status === 'Decreasing' ? 'rotate-180 text-green-500' : status === 'Increasing' ? 'text-red-500' : 'text-blue-600'} />
      </div>
    </motion.div>
  );
};

export default VisaCard;
