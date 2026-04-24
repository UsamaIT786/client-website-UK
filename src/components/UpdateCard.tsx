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
    <div
      className="group cursor-pointer bg-white rounded-[40px] p-6 border border-slate-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-primary/5"
    >
      <div className="relative overflow-hidden rounded-[32px] aspect-video mb-8">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
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
        <h3 className="text-2xl font-syne font-bold text-slate-900 group-hover:text-primary leading-tight">
          {title}
        </h3>
        <p className="text-textMuted text-sm line-clamp-2 leading-relaxed">
          Stay informed about the latest changes in immigration policy and how they might affect your application process...
        </p>
      </div>
    </div>
  );
};

export default UpdateCard;
