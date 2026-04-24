import React from 'react';
import { motion } from 'framer-motion';
import VisaCard from '../components/VisaCard';
import ProcessingTable from '../components/ProcessingTable';
import Breadcrumbs from '../components/Breadcrumbs';
import { useModal } from '../context/ModalContext';

const visaData = [
  { title: "Student Visa (Tier 4)", time: "3 Weeks", status: "Stable" as const },
  { title: "Skilled Worker Visa", time: "8 Weeks", status: "Increasing" as const },
  { title: "Spouse Visa", time: "12 Weeks", status: "Decreasing" as const },
  { title: "Visitor Visa (Standard)", time: "15 Days", status: "Stable" as const },
  { title: "Innovator Founder", time: "5 Weeks", status: "Increasing" as const },
  { title: "Indefinite Leave (ILR)", time: "6 Months", status: "Stable" as const },
];

const ProcessingTimes: React.FC = () => {
  const { openModal } = useModal();
  return (
    <div className="pt-28 md:pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen bg-background text-textMain">
      <Breadcrumbs />
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        className="mb-24 text-center"
      >
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block font-jost">Real-time Data</span>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-syne font-bold uppercase mb-8">Visa <span className="text-primary">Processing</span> Time</h1>
        <p className="text-textMuted max-w-2xl mx-auto text-lg leading-relaxed font-jost">
          We monitor the latest home office data to provide you with the most accurate estimates for your application journey.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {visaData.map((visa, index) => (
          <VisaCard key={index} {...visa} index={index} />
        ))}
      </div>

      <ProcessingTable />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 p-16 bg-white rounded-[40px] text-center border border-slate-100 shadow-[0_10px_50px_rgba(0,0,0,0.03)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />
        <h2 className="text-3xl md:text-4xl font-syne font-bold mb-6 uppercase text-slate-900">Need faster processing?</h2>
        <p className="text-textMuted mb-10 max-w-2xl mx-auto text-lg">Some applications qualify for priority or super-priority services. Contact us to check your eligibility.</p>
        <button
          onClick={openModal}
          className="bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-900 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
        >
          Inquire Now
        </button>
      </motion.div>
    </div>
  );
};

export default ProcessingTimes;
