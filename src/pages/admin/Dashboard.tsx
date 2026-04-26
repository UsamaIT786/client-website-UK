import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
    LayoutDashboard, 
    FileText, 
    Newspaper, 
    LogOut, 
    Menu, 
    X,
    TrendingUp,
    Users,
    MessageSquare,
    Settings,
    ShieldCheck as ShieldCheckIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentEditor from '../../components/admin/ContentEditor';
import BlogManager from '../../components/admin/BlogManager';
import StatsOverview from '../../components/admin/StatsOverview';

const ShieldCheck = ({ size }: { size: number }) => <ShieldCheckIcon size={size} />;

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
        <div className="min-h-screen bg-[#0f172a] text-white flex overflow-hidden">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside 
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="fixed lg:relative z-50 w-72 h-full backdrop-blur-2xl bg-white/5 border-r border-white/10 p-6 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-10 px-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <ShieldCheck size={24} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Admin<span className="text-primary">Panel</span></h2>
                            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden ml-auto">
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                                        activeTab === item.id 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-white/10">
                            <div className="flex items-center gap-3 px-2 mb-6">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-primary font-bold">
                                    {username?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-bold truncate max-w-[120px]">{username}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Administrator</p>
                                </div>
                            </div>
                            <button 
                                onClick={logout}
                                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto relative">
                {/* Header */}
                <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0f172a]/80 border-b border-white/5 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg">
                                <Menu size={24} />
                            </button>
                        )}
                        <h1 className="text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs text-slate-500 uppercase tracking-widest">Server Status</span>
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                            <Settings className="mx-auto mb-6 text-slate-500" size={48} />
                            <h2 className="text-2xl font-bold mb-2">System Settings</h2>
                            <p className="text-slate-400">Settings module is currently under development.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
