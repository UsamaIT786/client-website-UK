import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, MapPin, Scale, Info, Database, Eye, Share2, Globe, Lock, Clock, UserCheck, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      id: "introduction",
      icon: Info,
      title: "1. Introduction",
      content: "Welcome to ImmigrationLaw.org.uk. We are committed to protecting your personal data and respecting your privacy. This policy explains how we collect, use, and share your personal information when you visit our website or use our intermediary services to find legal representation."
    },
    {
      id: "who-we-are",
      icon: Scale,
      title: "2. Important Information and Who We Are",
      content: (
        <div className="space-y-4">
          <p>ImmigrationLaw.org.uk is the data controller responsible for your personal data.</p>
          <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl">
            <p className="font-bold text-slate-900 mb-2">Intermediary Disclosure:</p>
            <p>We are not a law firm. We are an intermediary service that connects individuals with SRA-regulated solicitors and legal experts. By using our service, you acknowledge that your data will be passed to third-party legal professionals to assist with your inquiry.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start gap-3">
              <UserCheck className="text-primary shrink-0" size={20} />
              <div>
                <p className="font-bold text-slate-900 text-sm uppercase tracking-wider">Entity Name</p>
                <p className="text-slate-600">ImmigrationLaw.org.uk</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-primary shrink-0" size={20} />
              <div>
                <p className="font-bold text-slate-900 text-sm uppercase tracking-wider">Email</p>
                <p className="text-slate-600">info@immigrationlaw.org.uk</p>
              </div>
            </div>
            <div className="flex items-start gap-3 col-span-full">
              <MapPin className="text-primary shrink-0" size={20} />
              <div>
                <p className="font-bold text-slate-900 text-sm uppercase tracking-wider">Address</p>
                <p className="text-slate-600">London, United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "data-collection",
      icon: Database,
      title: "3. The Data We Collect",
      content: (
        <div className="space-y-4">
          <p>We may collect, use, and transfer different kinds of personal data about you, including:</p>
          <ul className="grid sm:grid-cols-2 gap-4">
            <li className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="font-bold text-slate-900 block mb-1">Identity Data:</span>
              <span className="text-slate-600 text-sm">First name, last name.</span>
            </li>
            <li className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="font-bold text-slate-900 block mb-1">Contact Data:</span>
              <span className="text-slate-600 text-sm">Email address, telephone number.</span>
            </li>
            <li className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="font-bold text-slate-900 block mb-1">Case Data:</span>
              <span className="text-slate-600 text-sm">Information relating to your immigration status, visa requirements, or legal disputes that you provide via our consultation forms.</span>
            </li>
            <li className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="font-bold text-slate-900 block mb-1">Technical Data:</span>
              <span className="text-slate-600 text-sm">IP address, browser type, and location data.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "data-use",
      icon: Eye,
      title: "4. How We Use Your Personal Data",
      content: (
        <div className="space-y-4">
          <p>We will only use your personal data when the law allows us to. Most commonly, we use your data:</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p>To facilitate your request for legal assistance (Contractual necessity).</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p>To connect you with a qualified SRA-regulated solicitor (Consent).</p>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p>To improve our website and user experience (Legitimate interests).</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "third-parties",
      icon: Share2,
      title: "5. Sharing Your Data with Third Parties",
      content: (
        <div className="space-y-4">
          <p>Because we are an intermediary, the primary purpose of our site is to share your information with third-party legal experts.</p>
          <div className="grid gap-4">
            <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Scale className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Regulated Solicitors</h4>
                <p className="text-slate-600 text-sm leading-relaxed">We will share your Identity, Contact, and Case Data with SRA-regulated law firms so they can provide you with a quote or consultation.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Globe className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Service Providers</h4>
                <p className="text-slate-600 text-sm leading-relaxed">We may share data with IT and system administration services (e.g., our hosting provider, Vercel).</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Lock className="text-primary" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Legal Requirements</h4>
                <p className="text-slate-600 text-sm leading-relaxed">We may share data if required by law or to protect our legal rights.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "international-transfers",
      icon: Globe,
      title: "6. International Transfers",
      content: "We primarily store and process your data within the UK. If we transfer your data outside the UK (for example, if a service provider's servers are located elsewhere), we ensure a similar degree of protection is afforded to it by ensuring appropriate safeguards are in place."
    },
    {
      id: "security",
      icon: Lock,
      title: "7. Data Security",
      content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees and third parties who have a business need to know."
    },
    {
      id: "retention",
      icon: Clock,
      title: "8. Data Retention",
      content: "We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements."
    },
    {
      id: "legal-rights",
      icon: UserCheck,
      title: "9. Your Legal Rights",
      content: (
        <div className="space-y-4">
          <p>Under UK data protection laws, you have rights including:</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "The right to access your personal data.",
              "The right to rectification of incorrect data.",
              "The right to erasure (\"the right to be forgotten\").",
              "The right to withdraw consent at any time."
            ].map((right, idx) => (
              <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <ShieldCheck size={18} className="text-primary shrink-0" />
                <span className="text-slate-700 text-sm">{right}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: "complaints",
      icon: AlertCircle,
      title: "10. How to Complain",
      content: (
        <div className="space-y-4">
          <p>If you have any concerns about our use of your personal information, you can make a complaint to us at <a href="mailto:info@immigrationlaw.org.uk" className="text-primary font-bold hover:underline">info@immigrationlaw.org.uk</a>.</p>
          <p>You can also complain to the Information Commissioner's Office (ICO) if you are unhappy with how we have used your data.</p>
        </div>
      )
    }
  ];

  return (
    <div className="pt-28 md:pt-40 pb-32 px-6 max-w-5xl mx-auto min-h-screen bg-background">
      <Breadcrumbs />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Legal Documentation</span>
        <h1 className="text-4xl md:text-6xl font-syne font-bold uppercase text-slate-900 mb-6">Privacy <span className="text-primary">Policy</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Last updated: May 2026. Your privacy is our priority. This document outlines how we handle your data with the highest standards of security and transparency.
        </p>
      </motion.div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <section.icon size={24} />
              </div>
              <h2 className="text-xl md:text-2xl font-syne font-bold text-slate-900 uppercase tracking-tight">{section.title}</h2>
            </div>
            <div className="pl-16 text-slate-600 leading-relaxed text-sm md:text-base max-w-4xl">
              {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
            </div>
          </motion.section>
        ))}
      </div>


    </div>
  );
};

export default PrivacyPolicy;
