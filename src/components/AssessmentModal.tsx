import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you'd send data here
    setTimeout(() => {
      // Auto close after 5 seconds or keep it for user to read
    }, 5000);
  };

  // Reset success state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsSubmitted(false), 300);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.15)] custom-scrollbar"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 p-6 md:p-12">
              <div className="flex justify-between items-center mb-10">
                <div className="pr-12">
                  <h2 className="text-2xl md:text-3xl font-syne font-bold text-slate-900 uppercase tracking-tighter">
                    {isSubmitted ? 'Request Received' : 'Free Assessment'}
                  </h2>
                  <p className="text-textMuted text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">
                    {isSubmitted ? 'Your journey begins now' : 'Start your journey today'}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-primary hover:border-primary group"
                >
                  <X size={18} className="text-slate-400 group-hover:text-white" />
                </button>
              </div>

                {!isSubmitted ? (
                  <form 
                    className="space-y-6" 
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Full Name *</label>
                        <input 
                          type="text" 
                          placeholder="Legal Name" 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Email *</label>
                        <input 
                          type="email" 
                          placeholder="email@example.com" 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+44 7000-000000" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Visa Category</label>
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
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Can you pay for legal advice?</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-primary focus:outline-none appearance-none cursor-pointer">
                        <option>Please Select</option>
                        <option>Yes - I can pay for legal advice</option>
                        <option>No - I cannot pay for legal advice</option>
                      </select>
                    </div>

                    <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-slate-900 shadow-2xl shadow-primary/20 mt-4">
                      Request Assessment Now
                    </button>
                  </form>
                ) : (
                  <div 
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Scale className="text-primary w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-syne font-bold text-slate-900 mb-4 uppercase tracking-tight">Expert Counsel Awaits</h3>
                    <p className="text-textMuted leading-relaxed mb-10 text-lg">
                      Thank you for choosing excellence. Our specialist legal team is already reviewing your details. Expect a comprehensive case assessment in your inbox within <span className="text-slate-900 font-bold">24 hours</span>.
                    </p>
                    <button 
                      onClick={onClose}
                      className="px-10 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white"
                    >
                      Close Window
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssessmentModal;
