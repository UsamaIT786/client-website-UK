import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Loader2, Minus, Maximize2, ShieldCheck } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: 'Welcome to the Legal Document Assistant. I am here to provide instant answers based strictly on our official legal repository. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.answer || 'System encounterd an error.', timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Connectivity issue detected. Please ensure the secure backend is operational.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[10000] font-sans selection:bg-blue-500/30">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[420px] h-[calc(100vh-120px)] sm:h-[600px] max-h-[700px] flex flex-col rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] bg-[#0B1120]/90 backdrop-blur-2xl"
          >
            {/* Premium Header */}
            <div className="relative p-4 sm:p-6 bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30 relative z-10">
                      <Bot size={24} className="text-blue-400" />
                    </div>
                    <div className="absolute -inset-1 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
                      Legal AI
                      <ShieldCheck size={14} className="text-emerald-400" />
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-bold">Verified Intelligence</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setIsMinimized(true)}
                    className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <Minus size={18} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/30 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 custom-scrollbar scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.1 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`group relative max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-lg ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none border border-blue-400/20' 
                        : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-md'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] text-white/20 uppercase tracking-widest px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    </div>
                    <span className="text-[11px] font-medium text-white/50 tracking-wide uppercase">Analyzing Documents</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-gradient-to-t from-white/5 to-transparent border-t border-white/5">
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about legal documents..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all shadow-inner group-hover:border-white/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-20 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="mt-4 flex justify-between items-center px-1">
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">Secure Processing</span>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">v2.4.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button / Minimized Bar */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.div
            layoutId="chat-button"
            className="flex flex-col items-end gap-3"
          >
            {isMinimized && isOpen && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setIsMinimized(false)}
                className="bg-[#0B1120]/90 backdrop-blur-xl border border-white/10 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-2 sm:gap-3 shadow-2xl hover:bg-blue-600 transition-all group"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Return to Conversation
                <Maximize2 size={16} className="text-white/50 group-hover:text-white" />
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isMinimized) {
                  setIsMinimized(false);
                } else {
                  setIsOpen(!isOpen);
                }
              }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[1.4rem] sm:rounded-[1.8rem] flex items-center justify-center text-white transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] relative border border-white/10 ${
                isOpen && !isMinimized ? 'bg-rose-500 shadow-rose-500/20' : 'bg-blue-600'
              }`}
            >
              <AnimatePresence mode="wait">
                {isOpen && !isMinimized ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={28} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <MessageSquare size={28} strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
              {!isOpen && (
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-4 w-4 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-blue-600"></span>
                  </span>
                </div>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
    </div>
  );
};

export default ChatWidget;
