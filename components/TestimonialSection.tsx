"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    role: "Spouse Visa Approved",
    content: "Excellent support throughout our family migration process. The matched solicitors were diligent, responsive, and completely transparent with legal requirements.",
    rating: 5,
    initial: "S"
  },
  {
    name: "David K.",
    role: "Global Talent Route",
    content: "Extremely professional intermediary service. Saved us weeks of parsing home office frameworks by linking us directly to a tier-1 tech endorsement visa expert.",
    rating: 5,
    initial: "D"
  },
  {
    name: "Amara Singh",
    role: "ILR & Settlement",
    content: "Highly recommend for anyone seeking indefinite leave to remain. The assessment form was straightforward and secure, leading to a flawless execution.",
    rating: 5,
    initial: "A"
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
            <div
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.3em] uppercase text-[10px]">Client Stories</span>
            </div>
            <h2
              className="text-3xl md:text-7xl font-syne font-bold uppercase tracking-tighter text-slate-900"
            >
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </div>
          <p
            className="text-textMuted text-lg max-w-sm leading-relaxed"
          >
            Verified customer feedback powered by real success stories.
          </p>
        </div>

        {/* Trustpilot Review Carousel Embed Component Widget */}
        <div className="mb-16 flex justify-center w-full">
          <div className="trustpilot-widget" data-locale="en-GB" data-template-id="53aa8912dec7e10d38c5b536" data-businessunit-id="YOUR-TRUSTPILOT-ID" data-style-height="140px" data-style-width="100%" data-theme="light">
            <a href="https://uk.trustpilot.com/review/immigrationlaw.org.uk" target="_blank" rel="noopener noreferrer">Trustpilot</a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-white p-10 md:p-12 rounded-[40px] border border-slate-100 relative shadow-[0_10px_50px_rgba(0,0,0,0.02)] flex flex-col h-full"
            >
              <div className="flex gap-1.5 mb-10">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#00154d] text-[#00154d]" />
                ))}
              </div>

              <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-12 flex-grow">
                "{t.content}"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  <span className="text-slate-900 font-syne font-bold text-xl uppercase">{t.initial}</span>
                </div>
                <div>
                  <h4 className="text-slate-900 font-syne font-bold uppercase tracking-wider text-base mb-1">{t.name}</h4>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
