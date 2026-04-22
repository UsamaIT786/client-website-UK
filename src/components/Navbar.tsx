import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Processing Time', path: '/processing-times' },
    { name: 'Update', path: '/update' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2 bg-background border-b border-slate-200 shadow-xl' : 'py-4 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-8 md:h-16 w-auto group-hover:scale-110 transition-transform duration-500 flex items-center">
            <img
              src="https://immigrationlaw.org.uk/wp-content/uploads/elementor/thumbs/ce896829-4abe-4faa-a633-9d5103fe2f91-1-rm724a590fvz73ddsioileszubihhy1skyfx14pi64.png"
              alt="Immigration Law Mascot"
              className="h-full w-auto object-contain"
            />
          </div>
          <span className="font-syne font-bold text-xs md:text-xl tracking-tighter uppercase text-textMain leading-none">
            Immigration<span className="text-primary">Law</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold text-[10px] uppercase tracking-[0.2em] hover:text-primary transition-all duration-300 relative group py-2 ${location.pathname === link.path ? 'text-primary' : 'text-textMain/70'
                }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''
                }`} />
            </Link>
          ))}
          <button
            onClick={openModal}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-slate-900 transition-all duration-500 shadow-lg shadow-primary/20 ml-4"
          >
            Consultation
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-textMain"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Slide-over */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[70%] md:w-[60%] lg:w-[40%] max-w-sm bg-white z-[70] p-8 md:p-10 flex flex-col border-l border-slate-200"
            >
              <div className="flex justify-end mb-10">
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={30} className="text-textMain hover:text-primary transition-colors" />
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-syne font-bold uppercase tracking-tighter ${location.pathname === link.path ? 'text-primary' : 'text-textMain'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => { setIsMobileMenuOpen(false); openModal(); }}
                  className="bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 mt-10"
                >
                  Book Free Consultation
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
