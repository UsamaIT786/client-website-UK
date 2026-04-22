import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-4 mb-8">
      <Link 
        to="/" 
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors group"
      >
        <Home size={14} className="group-hover:scale-110 transition-transform" />
        Home
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const name = value.replace(/-/g, ' ');

        return (
          <React.Fragment key={to}>
            <ChevronRight size={14} className="text-slate-300" />
            {last ? (
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                {name}
              </span>
            ) : (
              <Link 
                to={to} 
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
