import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
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
        setFormData({ title: blog.title, image_url: blog.image_url, content: blog.content });
        setIsCreating(true);
    };

    if (loading) return <div className="text-center py-20 text-slate-400">Loading blogs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Blog Manager</h2>
                    <p className="text-slate-400">Publish and manage news and articles.</p>
                </div>
                {!isCreating && (
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl transition-all font-bold shadow-lg shadow-primary/20"
                    >
                        <Plus size={20} />
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
                        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 overflow-hidden"
                    >
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold">{isEditing ? 'Edit Article' : 'Compose New Article'}</h3>
                                <button type="button" onClick={resetForm} className="text-slate-400 hover:text-white"><X size={20} /></button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Article Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        placeholder="e.g. New UK Visa Regulations 2026"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Cover Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input 
                                            type="text" 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Content (Markdown supported)</label>
                                <textarea 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 min-h-[300px] resize-none"
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    placeholder="Write your article here..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    onClick={resetForm}
                                    className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-slate-300 font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl transition-all font-bold shadow-lg shadow-primary/20"
                                >
                                    <Save size={20} />
                                    {isEditing ? 'Update Article' : 'Publish Article'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                        {blog.image_url && (
                            <div className="h-48 overflow-hidden relative">
                                <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60" />
                            </div>
                        )}
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 line-clamp-1">{blog.title}</h3>
                            <p className="text-slate-400 text-sm mb-6 line-clamp-2">{blog.content}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => startEdit(blog)}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(blog.id)}
                                        className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-slate-300 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {blogs.length === 0 && !isCreating && (
                    <div className="col-span-full py-20 text-center text-slate-500">
                        No articles found. Click "New Article" to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogManager;
