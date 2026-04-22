import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Scale } from 'lucide-react';

import { useModal } from '../context/ModalContext';

const Hero: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className="relative min-h-screen lg:min-h-screen flex items-start lg:items-center pt-40 lg:pt-20 pb-20 lg:pb-0 overflow-x-hidden bg-background">
      {/* Background Subtle Gradient Blobs - Optimized */}
      <div className="absolute top-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[180px] md:w-[300px] h-[180px] md:h-[300px] bg-blue-100/40 rounded-full blur-[80px] md:blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center w-full relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary font-bold tracking-[0.2em] uppercase text-[9px] mb-8 border border-primary/10"
          >
            Professional Legal Representation
          </motion.div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[85px] font-syne font-bold leading-[1.1] mb-6 md:mb-10 text-textMain tracking-tighter uppercase">
            Professional <br />
            Uk <span className="text-primary italic">Immigration</span> <br />
            Legal <span className="text-primary italic">Support</span>
          </h1>
          <p className="text-textMuted text-base md:text-lg max-w-md mb-10 md:mb-12 leading-relaxed">
            Leading the global standard in UK immigration legal counsel. We provide precise, result-oriented support for complex visa and citizenship cases.
          </p>

          <div className="flex flex-wrap gap-6 mb-12">
            <button
              onClick={openModal}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-primary/20 flex items-center gap-3 group"
            >
              Book Assessment
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="px-10 py-4 rounded-2xl border border-slate-200 hover:border-primary transition-all duration-300 font-bold uppercase tracking-widest text-[10px] text-slate-600 hover:text-primary">
              About The Firm
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
                <span className="text-sm font-bold text-slate-900 tracking-tighter">5.0</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />)}
                </div>
              </div>
              <p className="text-[10px] uppercase font-bold text-textMuted tracking-widest">Trusted by 2k+ Clients</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Premium Assessment Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Enhanced Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-[44px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />

            <AssessmentForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AssessmentForm: React.FC = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center py-20"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Scale className="text-primary w-10 h-10" />
        </div>
        <h3 className="text-2xl font-syne font-bold text-slate-900 mb-4 uppercase tracking-tight">Assessment Requested</h3>
        <p className="text-slate-500 leading-relaxed text-lg">
          Your request has been prioritized. Our legal team will reach out with your comprehensive case breakdown within <span className="text-slate-900 font-bold">24 hours</span>.
        </p>
      </motion.div>
    );
  }

  return (
    <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 -mt-4 z-20"
          >
            <div className="bg-red-500 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Please fill all required fields
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Full Name *</label>
        <input
          type="text"
          placeholder="Your Legal Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Email *</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Phone</label>
        <input
          type="tel"
          placeholder="+44 7000-000000"
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Visa Category</label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer">
          <option>Select Category</option>
          <option>Skilled Worker Visa</option>
          <option>Health and Care Worker Visa</option>
          <option>Sponsor License Applications</option>
          <option>Spouse / Partner Visa</option>
          <option>Fiancé / Proposed Civil Partner</option>
          <option>Family Reunion</option>
          <option>Indefinite Leave to Remain (ILR)</option>
          <option>British Citizenship (Naturalisation)</option>
          <option>Global Talent Visa</option>
          <option>High Potential Individual (HPI)</option>
          <option>Graduate Visa</option>
          <option>Student Visa</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Can you pay for professional legal advice?</label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer">
          <option>Please Select</option>
          <option>Yes - I can pay for legal advice</option>
          <option>No - I cannot pay for legal advice</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-slate-900 transition-all duration-500 shadow-2xl shadow-primary/30 mt-4"
      >
        Request Assessment Now
      </button>
    </form>
  );
};

export default Hero;
