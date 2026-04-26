import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, Eye } from 'lucide-react';

const StatsOverview: React.FC = () => {
    const stats = [
        { label: 'Total Visits', value: '12,482', change: '+12%', icon: Eye, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'New Leads', value: '148', change: '+25%', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Blog Views', value: '3,290', change: '+8%', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Inquiries', value: '42', change: '-2%', icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-400/10' },
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
                        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 h-80 flex items-center justify-center">
                    <p className="text-slate-500 font-medium italic">Analytics Chart Visualization Placeholder</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="text-sm text-white font-medium">New lead: John Doe</p>
                                    <p className="text-xs text-slate-500">2 hours ago</p>
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
