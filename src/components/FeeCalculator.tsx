import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Zap, Users, Info, ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const visaTypes = [
  { name: "Skilled Worker Visa (Up to 3 years)", fee: 819, ihs: 3105, hasPriority: true },
  { name: "Skilled Worker Visa (More than 3 years)", fee: 1618, ihs: 5175, hasPriority: true },
  { name: "Student Visa", fee: 558, ihs: 2328, hasPriority: true },
  { name: "Spouse / Partner Visa", fee: 1846, ihs: 3105, hasPriority: true },
  { name: "Standard Visitor Visa (6 months)", fee: 135, ihs: 0, hasPriority: true },
  { name: "Indefinite Leave to Remain (ILR)", fee: 3226, ihs: 0, hasPriority: true },
  { name: "British Citizenship (Naturalisation)", fee: 1580, ihs: 0, hasPriority: false }
];

const FeeCalculator: React.FC = () => {
  const { openModal } = useModal();
  const [selectedVisa, setSelectedVisa] = useState(visaTypes[0]);
  const [applicants, setApplicants] = useState(1);
  const [isPriority, setIsPriority] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const baseFee = selectedVisa.fee * applicants;
    const baseIhs = selectedVisa.ihs * applicants;
    const priorityFee = (isPriority && selectedVisa.hasPriority) ? 500 * applicants : 0;
    setTotal(baseFee + baseIhs + priorityFee);
  }, [selectedVisa, applicants, isPriority]);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Calculator className="text-primary" size={20} />
            <span className="text-primary tracking-[0.3em] uppercase text-[10px]">Financial Planning</span>
          </div>
          <h2 
            className="text-3xl md:text-6xl font-syne font-bold uppercase mb-8"
          >
            Fee <span className="text-primary">Calculator</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          {/* Controls */}
          <div className="p-8 md:p-12 space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-primary block">Select Visa Type</label>
              <div className="relative group">
                <select 
                  onChange={(e) => setSelectedVisa(visaTypes.find(v => v.name === e.target.value) || visaTypes[0])}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-slate-900 focus:border-primary focus:outline-none appearance-none cursor-pointer text-lg font-syne"
                >
                  {visaTypes.map((v, i) => (
                    <option key={i} value={v.name}>{v.name}</option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary">
                  <ArrowRight size={20} className="rotate-90" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-[0.2em] text-primary">Number of Applicants</label>
                <span className="text-2xl font-syne font-bold text-slate-900">{applicants}</span>
              </div>
              <div className="flex items-center gap-6">
                <Users size={20} className="text-slate-400" />
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={applicants}
                  onChange={(e) => setApplicants(parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {selectedVisa.hasPriority ? (
              <button 
                onClick={() => setIsPriority(!isPriority)}
                className={`w-full p-8 rounded-3xl border flex items-center gap-6 group relative overflow-hidden ${
                  isPriority ? 'bg-primary/5 border-primary shadow-[0_10px_30px_rgba(37,99,235,0.1)]' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isPriority ? 'bg-primary text-white scale-110' : 'bg-slate-200 text-slate-500 group-hover:text-slate-700'
                }`}>
                  <div className="relative">
                    <Zap size={24} className={isPriority ? 'fill-white' : ''} />
                  </div>
                </div>
                <div className="text-left">
                  <h4 className={`text-lg font-syne uppercase tracking-tight mb-1 ${isPriority ? 'text-slate-900' : 'text-slate-700'}`}>Priority Service</h4>
                  <p className="text-slate-400 text-xs font-medium">Faster decision (usually 5 working days)</p>
                </div>
                {isPriority && (
                  <div 
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
                  />
                )}
              </button>
            ) : (
              <div className="w-full p-8 rounded-3xl border border-slate-100 bg-slate-50/50 flex items-center gap-6 opacity-60">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-200 text-slate-400">
                  <Zap size={24} />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-syne uppercase tracking-tight mb-1 text-slate-500">Priority Service</h4>
                  <p className="text-slate-400 text-xs font-medium">Not available for this visa type</p>
                </div>
              </div>
            )}

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 items-start">
              <Info className="text-primary shrink-0" size={18} />
              <p className="text-slate-500 text-[11px] leading-relaxed font-medium uppercase tracking-wider">
                This calculator provides an estimate based on standard Home Office fees. Actual costs may vary depending on individual circumstances.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50/50 p-8 md:p-12 flex flex-col justify-between border-l border-slate-100">
            <div className="space-y-10">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Estimated Breakdown</h3>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-slate-600 text-lg">Application Fee ({applicants}x)</span>
                    <span className="text-slate-900 font-syne font-bold text-xl">£{(selectedVisa.fee * applicants).toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-slate-600 text-lg">Health Surcharge (IHS)</span>
                    <span className="text-slate-900 font-syne font-bold text-xl">£{(selectedVisa.ihs * applicants).toLocaleString()}</span>
                  </div>
                  {(isPriority && selectedVisa.hasPriority) && (
                    <div 
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                    >
                      <span className="text-primary text-lg">Priority Service</span>
                      <span className="text-primary font-syne font-bold text-xl">£{(500 * applicants).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-10 border-t border-slate-200">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-4">Total Cost</h3>
                <div className="text-5xl md:text-8xl font-syne font-bold text-slate-900 tracking-tighter break-words">
                  £{total.toLocaleString()}
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300 mt-6">Fees correct as of April 2026</p>
              </div>
            </div>

            <button 
              onClick={openModal}
              className="w-full bg-slate-900 text-white py-6 rounded-2xl uppercase tracking-[0.2em] text-[11px] hover:bg-primary flex items-center justify-center gap-3 mt-12 shadow-2xl shadow-slate-200 group"
            >
              Get Help With Your Application
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeeCalculator;
