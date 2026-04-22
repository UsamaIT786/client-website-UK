import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, Tech Solutions Global",
    content: "The most professional legal team I've ever worked with. They handled our complex sponsor license and high-volume Tier 2 visas with absolute precision and zero delays.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Mark Thompson",
    role: "International Business Director",
    content: "Incredible attention to detail. Their knowledge of the latest Home Office changes saved us weeks of processing time. Truly the elite standard in immigration law.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Elena Rodriguez",
    role: "British Citizenship Applicant",
    content: "Transparent pricing and world-class service. They made my citizenship journey feel effortless. I felt supported and informed at every single stage of the process.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-[1px] bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">Client Stories</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-7xl font-syne font-bold uppercase tracking-tighter text-slate-900"
            >
              Global <span className="text-primary italic">Reputation</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-textMuted text-lg max-w-sm leading-relaxed"
          >
            Trusted by multinational corporations and individuals worldwide to navigate the complexities of global mobility.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-100 hover:border-primary transition-all duration-500 relative shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            >
              <div className="absolute top-8 right-10 text-slate-100 group-hover:text-primary/10 transition-colors duration-500">
                <Quote size={80} />
              </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed mb-10 relative z-10 italic">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-100 group-hover:border-primary transition-colors"
                />
                <div>
                  <h4 className="text-slate-900 font-bold font-syne uppercase tracking-wider text-sm">{t.name}</h4>
                  <p className="text-textMuted text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
