import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, Eye } from 'lucide-react';

const StatsOverview: React.FC = () => {
    const stats = [
        { label: 'Total Visits', value: '12,482', change: '+12%', icon: Eye, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'New Leads', value: '148', change: '+25%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Blog Views', value: '3,290', change: '+8%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Inquiries', value: '42', change: '-2%', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
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
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-textMuted text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-syne font-bold text-textMain">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 h-80 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <TrendingUp size={28} className="text-primary" />
                    </div>
                    <p className="text-textMuted text-sm font-medium">Analytics Dashboard</p>
                    <p className="text-slate-400 text-xs mt-1">Chart visualization coming soon</p>
                </div>
                <div className="bg-white border border-slate-100 rounded-3xl p-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-textMain mb-6">Recent Activity</h3>
                    <div className="space-y-5">
                        {[
                            { name: 'Sarah Johnson', time: '2 hours ago' },
                            { name: 'Michael Chen', time: '5 hours ago' },
                            { name: 'Aisha Patel', time: '1 day ago' },
                            { name: 'David Williams', time: '2 days ago' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                <div>
                                    <p className="text-sm text-textMain font-semibold">New lead: {item.name}</p>
                                    <p className="text-xs text-textMuted">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
