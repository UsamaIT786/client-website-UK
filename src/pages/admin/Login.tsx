import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
            login(response.data.token, response.data.username);
            toast.success('Welcome back, Admin!');
            navigate('/admin/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Subtle Background Accents */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[150px]" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-primary" />
                    
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="text-primary" size={32} />
                        </div>
                        <h1 className="text-2xl font-syne font-bold text-textMain uppercase tracking-tight mb-2">Admin Gateway</h1>
                        <p className="text-textMuted text-sm">Secure access to management controls</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-textMuted uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 text-sm"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-textMuted uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[11px]"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                </div>
                
                <p className="text-center mt-8 text-textMuted text-xs uppercase tracking-widest">
                    Immigration<span className="text-primary font-bold">Law</span> · Secure Portal
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
