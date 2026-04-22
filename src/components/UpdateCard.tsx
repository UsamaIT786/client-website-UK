import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';

interface UpdateCardProps {
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  index: number;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ title, category, date, author, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer bg-white rounded-[40px] p-6 border border-slate-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="relative overflow-hidden rounded-[32px] aspect-video mb-8">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg border border-slate-100">
          {category}
        </div>
      </div>
      
      <div className="space-y-4 px-2">
        <div className="flex items-center gap-6 text-[9px] text-textMuted uppercase tracking-[0.2em] font-bold">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {date}</span>
          <span className="flex items-center gap-2"><User size={14} className="text-primary" /> {author}</span>
        </div>
        <h3 className="text-2xl font-syne font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-tight">
          {title}
        </h3>
        <p className="text-textMuted text-sm line-clamp-2 leading-relaxed">
          Stay informed about the latest changes in immigration policy and how they might affect your application process...
        </p>
      </div>
    </motion.div>
  );
};

export default UpdateCard;
