import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../lib/blogData';
import { Calendar, ArrowLeft, Share2, ChevronRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';


const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  const { openModal } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  useEffect(() => {
    const handleCtaClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('cta-button') && target.getAttribute('href') === '/') {
        e.preventDefault();
        openModal();
      }
    };
    document.addEventListener('click', handleCtaClick);
    return () => document.removeEventListener('click', handleCtaClick);
  }, [openModal]);


  if (!post) return null;

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      {/* Breadcrumbs */}
      <nav className="px-6 mb-12">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 truncate max-w-[200px]">{post.category}</span>
        </div>
      </nav>

      {/* Article Header */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-lg shadow-primary/20">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                <Calendar size={12} /> {post.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-6xl font-syne font-bold text-slate-900 leading-[1.1] uppercase tracking-tighter mb-10">
              {post.title}
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
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto rounded-[40px] overflow-hidden shadow-2xl">
          <img 
            src={post.image || "https://pix4free.org/assets/library/2021-01-21/originals/immigration_law.jpg"} 
            alt={post.title}
            className="w-full h-auto object-cover max-h-[600px]"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6">
        <div className="max-w-3xl mx-auto">
          <div 
            className="blog-content prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Assessment CTA */}
          <div className="mt-16 bg-slate-50 rounded-[32px] p-8 md:p-12 text-center border border-slate-100">
            <h3 className="text-2xl md:text-3xl font-syne font-bold text-slate-900 mb-4 uppercase tracking-tighter">
              Get Your Professional <span className="text-primary">Immigration Assessment</span>
            </h3>
            <p className="text-slate-500 mb-10 max-w-xl mx-auto">
              Take the first step towards your UK journey. Our experts provide detailed assessments of your eligibility and case strength.
            </p>
            <button 
              onClick={openModal}
              className="bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:bg-slate-900 transition-all duration-300"
            >
              Start Free Assessment
            </button>
          </div>
          
          {/* Tags / Meta Footer */}

          <div className="mt-20 pt-10 border-t border-slate-100">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Related:</span>
              {["Immigration", "Visa Guide", post.category].map(tag => (
                <span key={tag} className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] uppercase tracking-widest font-bold text-slate-600 border border-slate-100">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-3 text-slate-900 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[11px]"
          >
            <ArrowLeft size={16} /> Back to Knowledge Center
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
