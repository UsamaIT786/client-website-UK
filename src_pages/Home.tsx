import React from 'react';
import Hero from '../components/Hero';
import TestimonialSection from '../components/TestimonialSection';
import FaqSection from '../components/FaqSection';

export default function HomeView() {
  return (
    <main className="bg-white min-h-screen">
      <Hero />
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Intermediary Service Routes</h2>
          <p className="mt-4 text-lg text-gray-500">Connecting you seamlessly with elite UK immigration legal services.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Work & Business Visas</h3>
            <p className="text-gray-600 text-sm">Strategic alignment matching for Global Talent, Innovator Founder, and corporate sponsorship applications.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Family & Spouse Re-unification</h3>
            <p className="text-gray-600 text-sm">Vetted specialist solicitor support routing to guide Appendix FM applications safely through threshold checks.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Settlement & Citizenship</h3>
            <p className="text-gray-600 text-sm">Long-term planning matching for Indefinite Leave to Remain (ILR) paths and official British Naturalisation protocols.</p>
          </div>
        </div>
      </section>
      <TestimonialSection />
      <FaqSection />
    </main>
  );
}
