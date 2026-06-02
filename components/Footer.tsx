"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 bg-[#f8fafc] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
        <div className="col-span-full md:col-span-2">
          <div className="h-12 md:h-16 w-auto mb-8 md:mb-10 flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-syne font-bold uppercase tracking-tighter text-slate-900">
              Immigration<span className="text-primary">Law</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm mb-10 leading-relaxed text-sm md:text-base">
            Setting the global standard for UK Immigration Solutions. We combine old legal tradition with modern efficient solutions.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Facebook, href: 'https://www.facebook.com/share/1CwN4FSCXe/?mibextid=wwXIfr' },
              { icon: Instagram, href: 'https://www.instagram.com/immigrationlaw.org.uk?igsh=MXI4dWdscW5sdHpoZg%3D%3D&utm_source=q' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              >
                <social.icon size={18} className="text-slate-600 group-hover:text-white group-hover:scale-110 transition-all" />
              </a>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="text-[10px] uppercase tracking-[0.3em] mb-8 md:mb-10 text-primary">Navigation</h3>
          <ul className="space-y-4 md:space-y-5 text-slate-500 text-[10px] md:text-[11px] uppercase tracking-widest">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/processing-times" className="hover:text-primary transition-colors">Processing Time</Link></li>
            <li><Link href="/update" className="hover:text-primary transition-colors">Update</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="col-span-1">
          <ul className="space-y-4 md:space-y-5 text-slate-500 text-xs md:text-sm">
            <li className="flex flex-col"><span className="text-slate-900 text-[15px] uppercase tracking-widest mb-1">London</span> United Kingdom</li>
            <li className="flex flex-col"><span className="text-slate-900 text-[15px] uppercase tracking-widest mb-1">Email</span>info@immigrationlaw.org.uk</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-end gap-6 text-slate-500">
        <div className="flex flex-col gap-4 text-xs leading-relaxed max-w-3xl">
          <p className="text-[10px] md:text-xs text-slate-400">
            © 2026 Scosh Limited. Trading as ImmigrationLaw.org.uk. All rights reserved.<br/>
            Scosh Limited is registered in England and Wales. Company No. 15141679.<br/>
            ImmigrationLaw.org.uk is an intermediary service. We are not a law firm. We connect clients with SRA-regulated immigration solicitors.
          </p>
        </div>
        <div className="shrink-0 flex gap-4">
          <button onClick={() => { if (typeof window !== 'undefined') (window as any).Cookiebot?.show() }} className="text-xs text-gray-400 hover:underline">Cookie Settings</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
