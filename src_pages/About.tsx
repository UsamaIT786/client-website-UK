import React from 'react';

export default function AboutView() {
  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-center">About Our Intermediary Services</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">ImmigrationLaw.org.uk serves as an elite legal matchmaking platform across the United Kingdom. We operate to bridge the gap between complex application processes and trusted, independent SRA-regulated professionals.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-blue-50 p-8 rounded-2xl text-center mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-900 mb-1">100%</h2>
            <p className="text-xs text-blue-700 font-medium uppercase tracking-wider">Vetted SRA Solicitors</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-blue-900 mb-1">24-48h</h2>
            <p className="text-xs text-blue-700 font-medium uppercase tracking-wider">Average Match Window</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-blue-900 mb-1">2026</h2>
            <p className="text-xs text-blue-700 font-medium uppercase tracking-wider">Compliant Routing Standards</p>
          </div>
        </div>
      </div>
    </section>
  );
}
