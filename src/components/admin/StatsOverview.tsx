import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, FileText, Users, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

interface StatsData {
    blogs: number;
    contentSections: number;
    admins: number;
    recentBlogs: { id: number; title: string; created_at: string }[];
    recentContent: { id: number; section_key: string; updated_at: string }[];
}

const StatsOverview: React.FC = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/api/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Failed to load stats');
        } finally {
            setLoading(false);
        }
    };

    const formatTimeAgo = (dateStr: string) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    const statCards = [
        { label: 'Published Blogs', value: stats?.blogs ?? 0, icon: Newspaper, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Content Sections', value: stats?.contentSections ?? 0, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Admin Users', value: stats?.admins ?? 0, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={22} />
                            </div>
                        </div>
                        <div>
                            <p className="text-textMuted text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-syne font-bold text-textMain">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity - Real Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Blogs */}
                <div className="bg-white border border-slate-100 rounded-3xl p-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-textMain mb-6 flex items-center gap-2">
                        <Newspaper size={16} className="text-primary" />
                        Recent Blog Posts
                    </h3>
                    <div className="space-y-5">
                        {stats?.recentBlogs && stats.recentBlogs.length > 0 ? (
                            stats.recentBlogs.map((blog) => (
                                <div key={blog.id} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm text-textMain font-semibold truncate">{blog.title}</p>
                                        <p className="text-xs text-textMuted">{formatTimeAgo(blog.created_at)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-textMuted">No blog posts yet.</p>
                        )}
                    </div>
                </div>

                {/* Recent Content Updates */}
                <div className="bg-white border border-slate-100 rounded-3xl p-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-textMain mb-6 flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        Recent Content Updates
                    </h3>
                    <div className="space-y-5">
                        {stats?.recentContent && stats.recentContent.length > 0 ? (
                            stats.recentContent.map((item) => (
                                <div key={item.id} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm text-textMain font-semibold">{item.section_key.replace(/_/g, ' ')}</p>
                                        <p className="text-xs text-textMuted">{formatTimeAgo(item.updated_at)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-textMuted">No content updates yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
