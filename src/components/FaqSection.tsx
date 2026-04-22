import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How long does a Skilled Worker Visa application typically take?",
    answer: "Standard processing times are currently around 8 weeks. However, priority services can reduce this to 5 working days, and super-priority services can provide a decision within 24 hours. We monitor these timelines daily to provide accurate estimates."
  },
  {
    question: "What is your success rate for complex immigration cases?",
    answer: "We maintain a 99.2% success rate for standard applications and a 94.5% success rate for complex appeals and human rights cases. Our precision-driven approach ensures every detail is meticulously verified before submission."
  },
  {
    question: "Do you offer fixed-fee legal representation?",
    answer: "Yes, we believe in absolute transparency. After your initial assessment, we provide a fixed-fee quote for our services. There are no hidden costs or surprise hourly billing cycles."
  },
  {
    question: "Can you assist with Sponsor License applications for UK businesses?",
    answer: "Absolutely. We specialize in corporate immigration, helping UK enterprises secure sponsor licenses and manage their ongoing compliance duties to recruit global talent legally and efficiently."
  }
];

const FaqSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <HelpCircle className="text-primary" size={20} />
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">Expert Guidance</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl font-syne font-bold uppercase mb-8"
          >
            Common <span className="text-primary italic">Inquiries</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-[30px] border transition-all duration-500 overflow-hidden ${
                activeIndex === index ? 'bg-white border-primary shadow-xl shadow-primary/5' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-8 py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-lg md:text-xl font-bold font-syne transition-colors duration-300 ${
                  activeIndex === index ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  activeIndex === index ? 'bg-primary text-white rotate-180' : 'bg-slate-200/50 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 text-textMuted leading-relaxed text-lg border-t border-slate-100 pt-6">
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
