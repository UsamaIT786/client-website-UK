import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Hero: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className="relative min-h-screen lg:min-h-screen flex items-start lg:items-center pt-40 lg:pt-20 pb-20 lg:pb-0 overflow-x-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center w-full relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="text-left"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[85px] font-syne font-bold leading-[1.1] mb-6 md:mb-10 mt-12 text-textMain tracking-tighter uppercase">
            Professional <br />
            Uk <span className="text-primary">Immigration</span> <br />
            Legal <span className="text-primary">Support</span>
          </h1>
          <p className="text-textMuted text-base md:text-lg max-w-md mb-10 md:mb-12 leading-relaxed">
            Providing guidance and connecting you with the UK's most trusted legal professional. Secure your future with confidence.
          </p>

          <div className="flex flex-wrap gap-6 mb-12">
            <button
              onClick={openModal}
              className="bg-primary text-white px-10 py-4 rounded-2xl uppercase tracking-widest text-[10px] hover:bg-slate-900 shadow-xl shadow-primary/20 flex items-center gap-3 group"
            >
              Book Assessment
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-2xl border border-slate-200 hover:border-primary uppercase tracking-widest text-[10px] text-slate-600 hover:text-primary"
            >
              About Us
            </button>
          </div>

          <div className="flex items-center gap-8 border-t border-slate-100 pt-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-50 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="client" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-slate-900 tracking-tighter">4.8</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />)}
                </div>
              </div>
              <p className="text-[10px] uppercase text-textMuted tracking-widest">Trusted by Clients</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
          className="relative"
        >
          <div className="rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl shadow-slate-900/10">
            <img
              src="public/Images/hero.jfif"
              alt="UK Immigration - Professional Legal Support"
              className="w-full h-[400px] md:h-[550px] lg:h-[600px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
