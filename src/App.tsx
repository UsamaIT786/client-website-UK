import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProcessingTimes from './pages/ProcessingTimes';
import Updates from './pages/Updates';
import About from './pages/About';

import Preloader from './components/Preloader';

const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/processing-times" element={<ProcessingTimes />} />
        <Route path="/update" element={<Updates />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      {/* Global Footer - Premium Light Aesthetic */}
        <footer className="py-24 bg-[#f8fafc] text-slate-900 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <div className="col-span-full md:col-span-2">
              <div className="h-12 md:h-16 w-auto mb-8 md:mb-10 flex items-center gap-3">
                <img 
                   src="https://immigrationlaw.org.uk/wp-content/uploads/elementor/thumbs/ce896829-4abe-4faa-a633-9d5103fe2f91-1-rm724a590fvz73ddsioileszubihhy1skyfx14pi64.png" 
                   alt="Immigration Law Logo" 
                   className="h-full w-auto object-contain"
                />
                <h2 className="text-2xl md:text-3xl font-syne font-bold uppercase tracking-tighter text-slate-900">Immigration<span className="text-primary italic">Law</span></h2>
              </div>
              <p className="text-slate-500 max-w-sm mb-10 leading-relaxed text-sm md:text-base font-light">
                Setting the global standard for immigration legal counsel. We combine centuries-old legal tradition with modern, efficient solutions.
              </p>
              <div className="flex gap-4">
                 {[
                   { icon: Facebook, href: '#' },
                   { icon: Twitter, href: '#' },
                   { icon: Instagram, href: '#' },
                   { icon: Linkedin, href: '#' }
                 ].map((social, i) => (
                   <a 
                     key={i} 
                     href={social.href} 
                     className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                   >
                     <social.icon size={18} className="text-slate-600 group-hover:text-white group-hover:scale-110 transition-all" />
                   </a>
                 ))}
              </div>
            </div>
            <div className="col-span-1">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 md:mb-10 text-primary">Navigation</h3>
              <ul className="space-y-4 md:space-y-5 text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/processing-times" className="hover:text-primary transition-colors">Processing Time</a></li>
                <li><a href="/update" className="hover:text-primary transition-colors">Update</a></li>
                <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 md:mb-10 text-primary">Global Offices</h3>
              <ul className="space-y-4 md:space-y-5 text-slate-500 text-xs md:text-sm font-light">
                <li className="flex flex-col"><span className="text-slate-900 font-bold text-[10px] uppercase tracking-widest mb-1">London</span> 123 Legal Plaza, EC1A 4HD</li>
                <li className="flex flex-col"><span className="text-slate-900 font-bold text-[10px] uppercase tracking-widest mb-1">Inquiries</span> +44 20 7946 0958</li>
                <li className="flex flex-col"><span className="text-slate-900 font-bold text-[10px] uppercase tracking-widest mb-1">Email</span> counsel@immigrationlaw.com</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-6">
            <p>© 2026 Immigration Law Firm. Registered with SRA. All Rights Reserved.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Compliance</a>
            </div>
          </div>
        </footer>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </Router>
  );
};

export default App;
