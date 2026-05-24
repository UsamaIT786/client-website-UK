import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, Share2, ChevronRight } from 'lucide-react';
import BookAssessmentButton from './BookAssessmentButton';

export const metadata = {
  title: 'UK Immigration Visa Routes: Complete Guide for 2026 | ImmigrationLaw.org.uk',
  description: 'Explore every UK immigration visa route in 2026: work, study, family, and visitor visas. Expert guide with eligibility requirements.',
  alternates: {
    canonical: 'https://www.immigrationlaw.org.uk/blog/uk-immigration-visa-routes-guide',
  }
};

export default function Page() {
  const publishDate = 'May 21, 2026';

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "UK Immigration Visa Routes: Complete Guide for 2026",
            "description": "Explore every UK immigration visa route in 2026.",
            "url": "https://www.immigrationlaw.org.uk/blog/uk-immigration-visa-routes-guide",
            "datePublished": "2026-05-21",
            "dateModified": "2026-05-21",
            "author": {
              "@type": "Organization",
              "name": "ImmigrationLaw.org.uk",
              "url": "https://www.immigrationlaw.org.uk"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ImmigrationLaw.org.uk",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.immigrationlaw.org.uk/logo.png"
              }
            }
          })
        }}
      />

      <main className="bg-white min-h-screen pt-32 pb-24">
        {/* Breadcrumbs */}
        <nav className="px-6 mb-12">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-slate-900 truncate max-w-[200px]">Visa Guides</span>
          </div>
        </nav>

        {/* Article Header */}
        <section className="px-6 mb-16">
          <div className="max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-lg shadow-primary/20">
                  Visa Guides
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <Calendar size={12} /> {publishDate}
                </div>
              </div>

              <h1 className="text-3xl md:text-6xl font-syne font-bold text-slate-900 leading-[1.1] uppercase tracking-tighter mb-10">
                Navigating UK Immigration: A Complete Guide to Visa Routes (2026)
              </h1>

              <div className="flex items-center justify-between py-8 border-y border-slate-100 mb-12">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    <Share2 size={18} className="mr-1" /> Share Article
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-6 mb-16">
          <div className="max-w-5xl mx-auto rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="/Image/visa_routes_guide.png" 
              alt="Navigating UK Immigration: A Complete Guide to Visa Routes (2026)"
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        </section>

        {/* Article Content */}
        <section className="px-6">
          <div className="max-w-3xl mx-auto">
            <div className="blog-content prose prose-slate prose-lg max-w-none">
              <p>Are you planning to live, work, study, or join your family in the United Kingdom? The UK offers a wide range of immigration routes tailored to skilled professionals, entrepreneurs, students, and families. Understanding the right visa category is your most important first step and the wrong choice can cost you time and money. In this guide, we break down every major UK visa route available in 2026, with links to official government sources for each one.</p>

              <h2>1. Work and Business Visa Routes</h2>
              <p>The UK attracts top global talent through its points-based immigration system. Here are the main work and business routes available in 2026:</p>

              <h3>Global Talent Visa</h3>
              <p>For individuals who can demonstrate exceptional talent or exceptional promise in science, engineering, humanities, medicine, digital technology, or arts and culture. Those holding a prestigious prize such as a Nobel Prize or Academy Award are exempt from the endorsement requirement.</p>

              <h3>Innovator Founder Visa</h3>
              <p>For entrepreneurs seeking to establish an innovative, viable, and scalable business in the UK, supported by an approved endorsing body. You must play an active role in the day-to-day management of the business.</p>

              <h3>Senior or Specialist Worker (GBM)</h3>
              <p>Part of the Global Business Mobility routes, this covers intra-company transfers for senior staff or specialist employees. Related GBM routes include the Graduate Trainee, UK Expansion Worker, Service Supplier, and Secondment Worker.</p>

              <h3>Scale-up Worker Route</h3>
              <p>Designed for talented individuals recruited by a UK Scale-up sponsor. Requires high-level skills to help a fast-growing business continue expanding.</p>

              <h3>High Potential Individual (HPI)</h3>
              <p>An unsponsored route for recent graduates from top global universities on the <a href="https://www.gov.uk/government/publications/high-potential-individual-visa-global-universities-list" target="_blank" rel="noopener noreferrer">Global Universities List</a>. Allows you to work or look for work in the UK after completing an eligible degree.</p>

              <h3>International Sportsperson</h3>
              <p>For elite athletes and coaches making a genuine contribution to sport at the highest level in the UK.</p>

              <h2>2. Study and Post-Study Visa Routes</h2>
              <p>The UK is home to world-renowned universities and colleges. The study routes are carefully structured to support international students at every stage:</p>

              <h3>Student Route</h3>
              <p>For individuals aged 16 or over wishing to study a further or higher education course, pre-sessional English course, or recognised foundation programme with a licensed student sponsor.</p>

              <h3>Child Student Route</h3>
              <p>For children aged 4 to 17 who wish to study at an independent fee-paying school in the UK.</p>

              <h3>Graduate Route</h3>
              <p>Once you have successfully completed an eligible bachelor's degree or above at a UK institution, the Graduate Route allows you to work or look for work in the UK without a sponsor—a vital stepping stone into the UK workforce.</p>

              <h2>3. Family and Ancestry Visa Routes</h2>
              <p>Reuniting families is a core pillar of the UK immigration system. The following routes cover family-based applications:</p>

              <h3>Family Members (Appendix FM)</h3>
              <p>This route allows spouses, civil partners, unmarried partners, dependent children, and dependent parents to join or remain with a British citizen, a person settled in the UK, or someone with UK protection status.</p>

              <h3>UK Ancestry Route</h3>
              <p>For Commonwealth citizens aged 17 or over who have a grandparent born in the UK or Islands. Allows you to live and work in the UK for up to 5 years.</p>

              <h2>4. Temporary Work and Youth Mobility</h2>
              <h3>Seasonal Worker Route</h3>
              <p>For those coming to the UK to work in horticulture or poultry production on a temporary basis. Also available: Creative Worker, Charity Worker, and Government Authorised Exchange routes for approved schemes.</p>

              <h3>Youth Mobility Scheme</h3>
              <p>A cultural exchange programme for young adults aged 18-30 (up to 35 for specific nationalities) from participating countries including Australia, Canada, New Zealand, and Japan. Allows a stay of up to 2-3 years.</p>

              <h2>5. Short-Term Visiting</h2>
              <h3>Standard Visitor Route</h3>
              <p>The Standard Visitor route allows stays of up to 6 months for tourism, seeing family, or undertaking permitted business activities.</p>

              <h2>Conclusion: Find the Right Route for You</h2>
              <p>From the Graduate Route to the Innovator Founder Visa, the UK offers more immigration pathways than most people realise. The key is identifying the correct route early—the wrong application can lead to refusals and wasted fees. Our team connects you with regulated UK immigration solicitors who will assess your specific circumstances and guide your application from start to finish.</p>

              {/* CTA Box */}
              <div className="p-8 bg-primary/5 border border-primary/10 rounded-[32px] text-center my-12 flex flex-col items-center gap-4">
                <p className="text-xl font-syne font-bold text-slate-950 uppercase tracking-tight">
                  Ready to start your UK Visa Application?
                </p>
                <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
                  Get a professional eligibility assessment from our network of qualified, regulated UK immigration specialists.
                </p>
                <BookAssessmentButton />
              </div>

              {/* Disclaimer */}
              <div className="disclaimer-box">
                <strong>Disclaimer:</strong> This blog post provides a general overview of UK immigration routes and is not legal advice. For personalised guidance, please consult a qualified immigration professional.
              </div>
            </div>
          </div>
        </section>

        {/* Back to Blog */}
        <section className="px-6 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-3 text-slate-900 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[11px]"
            >
              <ArrowLeft size={16} /> Back to Knowledge Center
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
