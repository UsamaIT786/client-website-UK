import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle2, Info, ArrowRight, ShieldCheck, Landmark, Plane, Briefcase, Wallet } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK Genuine Visitor Rule Guide | How to Qualify in 2026',
  description: 'Demystifying the UK’s Genuine Visitor Rule. Learn the 5 pillars of eligibility, expert tips for proving strong ties, and financial sufficiency requirements.',
  alternates: {
    canonical: 'https://www.immigrationlaw.org.uk/genuine-visitor-rule',
  },
  openGraph: {
    title: 'How to Qualify: Demystifying the UK’s Genuine Visitor Rule',
    description: 'Expert guidance on navigating the UK Home Office visitor visa requirements.',
    images: ['/genuine-visitor.png'],
  },
};

export default function GenuineVisitorPage() {
  const pillars = [
    {
      title: "1. Intention to Leave",
      description: "You must satisfy the Home Office that you will leave the UK at the end of your visit and do not intend to make the UK your main home.",
      icon: <Plane className="w-6 h-6 text-primary" />,
    },
    {
      title: "2. Frequency of Visits",
      description: "You must not be living in the UK through frequent or successive visits, or making the UK your de facto residence.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: "3. Permitted Purpose",
      description: "Your visit must be for a permitted activity such as tourism, visiting family/friends, or specific business activities.",
      icon: <Briefcase className="w-6 h-6 text-primary" />,
    },
    {
      title: "4. Non-Prohibited Activities",
      description: "You must not intend to undertake prohibited activities, such as paid work, unpermitted study, or claiming public funds.",
      icon: <Info className="w-6 h-6 text-primary" />,
    },
    {
      title: "5. Financial Sufficiency",
      description: "You must have sufficient funds to cover all reasonable costs of your visit without working or accessing public funds.",
      icon: <Wallet className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Qualify: Demystifying the UK’s Genuine Visitor Rule",
            "description": "Comprehensive guide on the UK Home Office's Genuine Visitor Rule and the 5 pillars of eligibility.",
            "image": "https://www.immigrationlaw.org.uk/genuine-visitor.png",
            "author": {
              "@type": "Organization",
              "name": "Immigration Law UK"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Immigration Law UK",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.immigrationlaw.org.uk/logo.png"
              }
            },
            "datePublished": "2026-05-11",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.immigrationlaw.org.uk/genuine-visitor-rule"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/genuine-visitor.png"
            alt="London Legal Office"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              Expert Guidance
            </span>
            <h1 className="text-4xl md:text-6xl font-syne font-black text-slate-900 mb-6 leading-tight">
              How to Qualify: <span className="text-primary">Demystifying</span> the UK’s Genuine Visitor Rule
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Navigating the Home Office's subjective assessment of your intentions is the most critical hurdle for any UK Standard Visitor Visa application. Understanding the "Genuine Visitor" requirement is the difference between an approval and a refusal.
            </p>
          </div>
        </div>
      </section>

      {/* The 5 Pillars Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-syne font-bold text-slate-900 mb-4">
              The 5 Pillars of a Genuine Visitor
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="glass-card p-8 group">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Tips Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-syne font-bold text-slate-900 mb-8 uppercase tracking-tight">
                Expert Tips for <span className="text-primary">Success</span>
              </h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Proving Strong Ties</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Evidence of employment, property ownership, or family commitments in your home country are essential. The Home Office looks for reasons why you *must* return.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Origin of Funds</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Bank statements must clearly show where your money came from. Large, unexplained deposits often lead to immediate visa refusals under the "genuine" rule.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Budget Realism</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Your proposed spending must be proportional to your income. If your trip cost represents 80% of your annual savings, the Home Office will question the logic of your visit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl relative">
                <Image
                  src="/genuine-visitor.png"
                  alt="Legal Strategy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-xl max-w-[280px] hidden md:block border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-slate-900 text-sm">Case Success Rate</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our specialist team has a 98% success rate in overcoming "Genuine Visitor" refusals for complex cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -ml-32 -mb-32" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-syne font-black text-white mb-6 uppercase tracking-tight">
                Secure Your <span className="text-primary">UK Visit</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                Don't leave your application to chance. Speak with an expert UK immigration lawyer today to ensure your application meets the Genuine Visitor requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/assessment" className="btn-premium">
                  Free Consultation
                </Link>
                <Link href="/contact" className="px-8 py-3 rounded-full border border-slate-700 text-white font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  Contact Support <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="mt-8 text-slate-500 text-xs">
                © 2026 Immigration Law UK. Licensed Legal Practitioners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
