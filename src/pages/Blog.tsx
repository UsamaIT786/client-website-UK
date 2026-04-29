import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts, categories } from '../lib/blogData';
import { Calendar, ArrowRight, Search } from 'lucide-react';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-slate-50 min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] font-bold mb-4 block">Knowledge Center</span>
            <h1 className="text-4xl md:text-7xl font-syne font-bold text-slate-900 leading-[1.1] uppercase tracking-tighter mb-8">
              Legal <span className="text-primary">Insights</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Expert advice, latest updates, and comprehensive guides on UK Immigration Law.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeCategory === "All" 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-white text-slate-500 border border-slate-200 hover:border-primary hover:text-primary"
              }`}
            >
              All Posts
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                  activeCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white text-slate-500 border border-slate-200 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-6 py-3 text-sm focus:border-primary focus:outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
                >
                  <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image || "/Image/Image.png"} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary/5 text-primary text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`} className="block">
                      <h3 className="text-xl font-syne font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100">
              <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">No articles found matching your criteria</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
