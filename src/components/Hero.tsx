import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Scale } from 'lucide-react';

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
            <button className="px-10 py-4 rounded-2xl border border-slate-200 hover:border-primary uppercase tracking-widest text-[10px] text-slate-600 hover:text-primary">
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

        {/* Right Content - Premium Assessment Form */}
        <div className="relative">
          <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-100 relative overflow-hidden group">
            <AssessmentForm />
          </div>
        </div>
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
      <div
        className="relative z-10 text-center py-20"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Scale className="text-primary w-10 h-10" />
        </div>
        <h3 className="text-2xl font-syne font-bold text-slate-900 mb-4 uppercase tracking-tight">Assessment Requested</h3>
        <p className="text-slate-500 leading-relaxed text-lg">
          Your request has been prioritized. Our legal team will reach out with your comprehensive case breakdown within <span className="text-slate-900">24 hours</span>.
        </p>
      </div>
    );
  }

  return (
    <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
        {showWarning && (
          <div
            className="absolute top-0 left-0 right-0 -mt-4 z-20"
          >
            <div className="bg-red-500 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl">
              <span className="w-2 h-2 bg-white rounded-full" />
              Please fill all required fields
            </div>
          </div>
        )}

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-primary">Full Name *</label>
        <input
          type="text"
          placeholder="Your Legal Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-primary">Email *</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-primary">Phone</label>
        <input
          type="tel"
          placeholder="+44 7000-000000"
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-widest text-primary">Visa Category</label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-primary focus:outline-none appearance-none cursor-pointer">
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
        <label className="text-[10px] uppercase tracking-widest text-primary">Can you pay for professional legal advice?</label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-primary focus:outline-none appearance-none cursor-pointer">
          <option>Please Select</option>
          <option>Yes - I can pay for legal advice</option>
          <option>No - I cannot pay for legal advice</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-5 rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:bg-slate-900 shadow-2xl shadow-primary/30 mt-4"
      >
        Request Assessment Now
      </button>
    </form>
  );
};

export default Hero;
