import React from 'react';
import { motion } from 'framer-motion';
import { Shield, GraduationCap, Briefcase, Users, Scale, Clock } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import TeamMember from '../components/TeamMember';
import TestimonialSection from '../components/TestimonialSection';
import FaqSection from '../components/FaqSection';
import FeeCalculator from '../components/FeeCalculator';
import CompanySlider from '../components/CompanySlider';

const services = [
  {
    title: "Student Visas",
    description: "Guidance for international students looking to study at top universities. We handle the paperwork, you focus on your studies.",
    icon: GraduationCap
  },
  {
    title: "Work Permits",
    description: "Assisting skilled professionals and employers with work authorization and sponsorship applications.",
    icon: Briefcase
  },
  {
    title: "Family Reunion",
    description: "Helping families stay together. We specialize in spouse, child, and parent visa categories with high success rates.",
    icon: Users
  },
  {
    title: "Legal Appeals",
    description: "Expert representation for visa refusals and complex immigration litigation. We fight for your rights.",
    icon: Scale
  },
  {
    title: "Citizenship",
    description: "Comprehensive support for naturalization and indefinite leave to remain applications.",
    icon: Shield
  },
  {
    title: "Urgent Processing",
    description: "Fast-track services for time-critical immigration matters and emergency travel documents.",
    icon: Clock
  }
];

const team = [
  {
    name: "Romina Ron",
    role: "Senior Attorney",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Oliver Robo",
    role: "Visa Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Elena Rodriguez",
    role: "Case Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "David Smith",
    role: "Liaison Officer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
  }
];

const Home: React.FC = () => {
  const { openModal } = useModal();

  return (
    <main className="bg-background">
      <Hero />
      <CompanySlider />

      {/* Services Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block"
              >
                Our Expertise
              </motion.div>
              <h2 className="text-3xl md:text-6xl font-syne font-bold uppercase leading-tight text-textMain">
                Comprehensive <br /> <span className="text-primary">Immigration Solutions</span>
              </h2>
            </div>
            <p className="text-textMuted max-w-sm leading-relaxed text-lg">
              We provide a wide range of legal services tailored to your unique situation, ensuring the best possible outcome.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />

      <FeeCalculator />

      {/* Team Section - Fully Replicated Weblite Style */}
      <section className="py-20 md:py-32 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block"
            >
              Our Experts
            </motion.div>
            <h2 className="text-3xl md:text-6xl font-syne font-bold uppercase leading-tight text-textMain">
              Meet The <span className="text-primary">Professionals</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra Premium Light Design */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] md:rounded-[60px] p-8 md:p-24 relative z-10 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.06)] text-center border border-slate-100"
          >
            {/* Elegant abstract accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block">Ready to Start?</span>
              <h2 className="text-3xl md:text-7xl font-syne font-bold mb-10 text-slate-900 leading-[1.1] uppercase tracking-tighter">
                Transform Your <span className="text-primary italic">Global Journey</span> <br className="hidden md:block" /> With Expert Counsel.
              </h2>
              <p className="text-slate-500 text-base md:text-xl mb-14 leading-relaxed font-light">
                Secure your future with the UK's leading immigration experts. Precision, speed, and absolute confidentiality guaranteed.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                <button 
                  onClick={openModal}
                  className="bg-primary text-white px-10 md:px-14 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-slate-900 transition-all duration-500 shadow-2xl shadow-primary/20"
                >
                  Book Free Consultation
                </button>
                <button 
                  onClick={openModal}
                  className="px-10 md:px-14 py-5 rounded-2xl border border-slate-200 text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-slate-50 transition-all duration-500"
                >
                  View Success Stories
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FaqSection />
    </main>
  );
};

export default Home;
