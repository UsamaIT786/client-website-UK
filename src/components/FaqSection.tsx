import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does Immigrationlaw.org.uk work?",
    answer: "We act as an intermediary service. Once you submit your details, we analyze your requirements and connect you with the most suitable, highly-qualified UK immigration legal professional from our trusted network."
  },
  {
    question: "Is your assessment service free?",
    answer: "Yes, our initial assessment and connection service is completely free of charge for users. You only pay for the professional legal advice provided by the expert we connect you with."
  },
  {
    question: "Are the legal professionals regulated?",
    answer: "Absolutely. We only partner with legal professionals and firms that are fully regulated by the Solicitors Regulation Authority (SRA) or the Office of the Immigration Services Commissioner (OISC)."
  },
  {
    question: "How quickly will I receive a response?",
    answer: "Our system prioritizes every request. Typically, you will receive a response or a call from a legal expert within 24 hours of your initial inquiry."
  },
  {
    question: "Is my personal information secure?",
    answer: "We take data privacy extremely seriously. Your information is encrypted and only shared with the specific legal professional assigned to your case for the purpose of your assessment."
  }
];

const FaqSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border-b border-slate-300 pb-1 mb-6"
          >
            <span className="text-slate-600 tracking-[0.3em] uppercase text-[10px]">Service FAQ</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-syne font-bold text-slate-900 mb-8"
          >
            How We Help You
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base"
          >
            Find answers to how our intermediary service connects you with the best UK immigration experts.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl bg-white border border-slate-100 transition-all duration-300 ${
                activeIndex === index ? 'shadow-lg shadow-slate-200/50' : 'hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="text-base md:text-lg font-syne font-bold text-slate-900">
                  {faq.question}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-slate-400 transition-transform duration-500 ${
                    activeIndex === index ? 'rotate-180 text-primary' : ''
                  }`} 
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
