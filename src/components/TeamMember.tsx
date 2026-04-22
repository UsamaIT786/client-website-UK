import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Facebook } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-[32px] aspect-[10/13] mb-8 bg-slate-100 border border-slate-100 shadow-xl group-hover:shadow-primary/10 transition-all duration-700">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        />
        
        {/* Elegant Social Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
          <div className="flex justify-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center px-4">
        <h3 className="text-2xl font-syne font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors duration-300 tracking-tight">{name}</h3>
        <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-80">{role}</p>
        <div className="w-8 h-[2px] bg-primary/20 mx-auto group-hover:w-16 transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export default TeamMember;
