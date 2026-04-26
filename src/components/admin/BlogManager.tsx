import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Newspaper } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const BlogManager: React.FC = () => {
    const { token } = useAuth();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        image_url: '',
        content: ''
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/blogs/${isEditing.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Blog updated');
            } else {
                await axios.post('http://localhost:5000/api/blogs', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Blog created');
            }
            fetchBlogs();
            resetForm();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Blog deleted');
            fetchBlogs();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', image_url: '', content: '' });
        setIsEditing(null);
        setIsCreating(false);
    };

    const startEdit = (blog: any) => {
        setIsEditing(blog);
        setFormData({ title: blog.title, image_url: blog.image_url || '', content: blog.content });
        setIsCreating(true);
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-xl font-syne font-bold text-textMain uppercase tracking-tight">Blog Manager</h2>
                    <p className="text-textMuted text-sm mt-1">Publish and manage news and articles.</p>
                </div>
                {!isCreating && (
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl transition-all font-bold shadow-lg shadow-primary/20 uppercase tracking-widest text-[10px]"
                    >
                        <Plus size={18} />
                        New Article
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isCreating && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border border-slate-100 rounded-3xl p-8 mb-8 overflow-hidden shadow-sm"
                    >
                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-bold text-textMain uppercase tracking-widest">{isEditing ? 'Edit Article' : 'Compose New Article'}</h3>
                                <button type="button" onClick={resetForm} className="text-textMuted hover:text-textMain p-1.5 hover:bg-slate-50 rounded-lg transition-colors"><X size={20} /></button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-textMuted uppercase tracking-widest">Article Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-3 px-4 text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        placeholder="e.g. New UK Visa Regulations 2026"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-textMuted uppercase tracking-widest">Cover Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input 
                                            type="text" 
                                            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-textMuted uppercase tracking-widest">Content</label>
                                <textarea 
                                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-4 text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[250px] resize-none transition-all"
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    placeholder="Write your article here..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={resetForm}
                                    className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-textMuted text-[10px] font-bold uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl transition-all font-bold shadow-lg shadow-primary/20 text-[10px] uppercase tracking-widest"
                                >
                                    <Save size={16} />
                                    {isEditing ? 'Update' : 'Publish'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden group hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all">
                        {blog.image_url && (
                            <div className="h-48 overflow-hidden relative">
                                <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-60" />
                            </div>
                        )}
                        <div className="p-6">
                            <h3 className="text-lg font-syne font-bold text-textMain uppercase tracking-tight mb-2 line-clamp-1">{blog.title}</h3>
                            <p className="text-textMuted text-sm mb-5 line-clamp-2 leading-relaxed">{blog.content}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                <span className="text-[10px] text-textMuted uppercase tracking-widest">
                                    {new Date(blog.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => startEdit(blog)}
                                        className="p-2 border border-slate-200 hover:bg-primary/5 hover:border-primary/30 rounded-lg text-textMuted hover:text-primary transition-all"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(blog.id)}
                                        className="p-2 border border-slate-200 hover:bg-red-50 hover:border-red-200 rounded-lg text-textMuted hover:text-red-500 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {blogs.length === 0 && !isCreating && (
                    <div className="col-span-full bg-white border border-slate-100 rounded-2xl py-20 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Newspaper size={28} className="text-primary" />
                        </div>
                        <p className="text-textMuted text-sm">No articles found. Click "New Article" to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogManager;
