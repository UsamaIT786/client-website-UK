import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
    LayoutDashboard, 
    FileText, 
    Newspaper, 
    LogOut, 
    Menu, 
    X,
    Settings,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentEditor from '../../components/admin/ContentEditor';
import BlogManager from '../../components/admin/BlogManager';
import StatsOverview from '../../components/admin/StatsOverview';

const Dashboard: React.FC = () => {
    const { logout, username } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'content', label: 'Site Content', icon: FileText },
        { id: 'blogs', label: 'Blog Manager', icon: Newspaper },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex overflow-hidden">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside 
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed lg:relative z-50 w-72 h-full bg-white border-r border-slate-200 p-6 flex flex-col shadow-xl lg:shadow-none"
                    >
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-10 px-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <ShieldCheck size={22} className="text-white" />
                            </div>
                            <h2 className="text-lg font-syne font-bold uppercase tracking-tighter text-textMain">Immigration<span className="text-primary">Law</span></h2>
                            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden ml-auto text-textMuted hover:text-textMain">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="px-2 mb-4">
                            <p className="text-[9px] uppercase tracking-[0.3em] text-textMuted font-bold mb-3">Navigation</p>
                        </div>
                        <nav className="flex-1 space-y-1.5">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all text-sm ${
                                        activeTab === item.id 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' 
                                        : 'text-textMuted hover:bg-slate-50 hover:text-textMain font-medium'
                                    }`}
                                >
                                    <item.icon size={18} />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        {/* User Profile */}
                        <div className="mt-auto pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-3 px-2 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                    {username?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-textMain truncate max-w-[120px]">{username}</p>
                                    <p className="text-[9px] text-textMuted uppercase tracking-[0.2em]">Administrator</p>
                                </div>
                            </div>
                            <button 
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium text-sm"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Click-away overlay for mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto relative">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">
                                <Menu size={20} className="text-textMain" />
                            </button>
                        )}
                        <div>
                            <h1 className="text-lg font-syne font-bold uppercase tracking-tight text-textMain">{activeTab === 'overview' ? 'Dashboard' : activeTab.replace('-', ' ')}</h1>
                            <p className="text-[10px] text-textMuted uppercase tracking-widest">Immigration Law Admin</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[9px] text-textMuted uppercase tracking-[0.2em] font-bold">Server Status</span>
                            <span className="text-[10px] text-emerald-600 flex items-center gap-1.5 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Operational
                            </span>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {activeTab === 'overview' && <StatsOverview />}
                    {activeTab === 'content' && <ContentEditor />}
                    {activeTab === 'blogs' && <BlogManager />}
                    {activeTab === 'settings' && (
                        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Settings size={28} className="text-primary" />
                            </div>
                            <h2 className="text-xl font-syne font-bold text-textMain uppercase tracking-tight mb-2">System Settings</h2>
                            <p className="text-textMuted text-sm">Settings module is currently under development.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
