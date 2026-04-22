import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Award, Zap } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const About: React.FC = () => {
  return (
    <div className="pt-28 md:pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen bg-background">
      <Breadcrumbs />
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Our Story</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-syne font-bold uppercase mb-10 leading-tight text-textMain">Expertise <br /> You Can <span className="text-primary">Trust</span></h1>
          <p className="text-textMuted text-lg leading-relaxed mb-10">
            Founded with a vision to simplify the complex world of immigration, our firm has helped thousands of individuals and families find their new home. We combine legal expertise with a human-centric approach.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <span className="block text-4xl sm:text-5xl font-syne font-bold text-slate-900 mb-2">10k+</span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Successful Cases</span>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <span className="block text-4xl sm:text-5xl font-syne font-bold text-slate-900 mb-2">50+</span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Countries Served</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl border border-white/5 bg-surface"
        >
          <img 
            src="https://4kwallpapers.com/images/wallpapers/london-bridge-united-kingdom-river-thames-night-time-3840x2160-3316.jpg" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            alt="Office" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>

      {/* Values Grid */}
      <div className="mb-32">
        <div className="text-center mb-24">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">What Drives Us</span>
          <h2 className="text-3xl md:text-6xl font-syne font-bold uppercase text-textMain"><span className="text-primary">Our Mission</span> & Values</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: Target, title: "Precision", desc: "Every detail matters in immigration law. We ensure your application is perfect." },
            { icon: Heart, title: "Empathy", desc: "We understand the emotional weight of moving countries and treat every case with care." },
            { icon: Award, title: "Excellence", desc: "Setting the gold standard for legal representation and client satisfaction." },
            { icon: Zap, title: "Speed", desc: "Time is often critical. We use efficient workflows to get you results faster." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-primary/5 transition-all duration-500 text-center group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary transition-colors duration-500">
                <item.icon size={28} className="text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-syne font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
              <p className="text-sm text-textMuted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
