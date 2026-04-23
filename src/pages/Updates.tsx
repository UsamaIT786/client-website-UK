import React from 'react';
import UpdateCard from '../components/UpdateCard';
import UpdateTable from '../components/UpdateTable';
import Breadcrumbs from '../components/Breadcrumbs';

const blogPosts = [
  {
    title: "New 2026 Immigration Policy Changes Explained",
    category: "Policy",
    date: "April 20, 2026",
    author: "Sarah Jenkins",
    image: "https://img.freepik.com/free-photo/visa-application-form-laptop-tablet_23-2149117770.jpg"
  },
  {
    title: "Top 5 Mistakes in Student Visa Applications",
    category: "Guide",
    date: "April 15, 2026",
    author: "Michael Chen",
    image: "https://www.shutterstock.com/image-photo/visa-processing-registration-application-form-260nw-1188483571.jpg"
  },
  {
    title: "The Future of Skilled Worker Visas in the UK",
    category: "Trends",
    date: "April 10, 2026",
    author: "Elena Rodriguez",
    image: "https://img.freepik.com/free-photo/visa-application-composition-with-europe-america-flag_23-2149117810.jpg"
  },
  {
    title: "How to Secure Your Indefinite Leave to Remain",
    category: "Residency",
    date: "April 05, 2026",
    author: "David Smith",
    image: "https://img.freepik.com/free-photo/visa-application-composition-with-american-flag_23-2149117813.jpg"
  },
];

const Updates: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');

  const filteredPosts = activeFilter === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  const categories = ['All', 'Policy', 'Guide', 'Trends', 'Residency'];

  return (
    <div className="pt-28 md:pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen bg-background">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div className="max-w-2xl">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">News & Insights</span>
          <h1 className="text-5xl md:text-7xl font-syne font-bold uppercase mb-0 leading-none text-textMain">Latest <span className="text-primary">Update</span></h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeFilter === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'border border-slate-100 text-textMuted bg-white hover:border-primary hover:text-primary'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 min-h-[400px]">
        {filteredPosts.map((post, index) => (
          <UpdateCard key={index} {...post} index={index} />
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <p className="text-slate-400 text-lg">No articles found in this category.</p>
          </div>
        )}
      </div>

      <UpdateTable />

      <div className="mt-24 flex justify-center">
        <button
          onClick={(e) => {
            const btn = e.currentTarget;
            btn.innerHTML = 'Loading...';
            btn.disabled = true;
            setTimeout(() => {
              btn.innerHTML = 'No more articles';
            }, 1500);
          }}
          className="px-12 py-4 border border-slate-100 rounded-2xl hover:border-primary hover:text-primary transition-all uppercase tracking-widest font-bold text-xs text-textMain bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default Updates;
