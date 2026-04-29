import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale } from 'lucide-react';
import PhoneInput from './PhoneInput';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    visaCategory: 'Select Category',
    canPay: 'Please Select',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to send assessment'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset success state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          visaCategory: 'Select Category',
          canPay: 'Please Select',
          message: ''
        });
      }, 300);
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
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Legal Name"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <PhoneInput
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  />

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Visa Category</label>
                    <select
                      name="visaCategory"
                      value={formData.visaCategory}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-primary focus:outline-none appearance-none cursor-pointer"
                    >
                      <option disabled value="Select Category">Select Category</option>
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
                      <option>Standard Visitor Visa</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Can you pay for professional legal advice?</label>
                    <select
                      name="canPay"
                      value={formData.canPay}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:border-primary focus:outline-none appearance-none cursor-pointer"
                    >
                      <option disabled value="Please Select">Please Select</option>
                      <option>Yes - I can pay for legal advice</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Additional Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your case..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none min-h-[100px] resize-none"
                    />
                  </div>


                  <button
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-slate-900 shadow-2xl shadow-primary/20 mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? 'Sending Inquiry...' : 'Request Assessment Now'}
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
                  <p className="text-slate-500 leading-relaxed text-lg mb-10">
                    Thank you. Expect to hear from a legal professional within <span className="text-slate-900 font-bold">24hrs</span>.
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
