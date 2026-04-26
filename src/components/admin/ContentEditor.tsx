import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { Save, RefreshCw, PlusCircle, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ContentEditor: React.FC = () => {
    const { token } = useAuth();
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await api.get('/api/content');
            setSections(response.data);
        } catch (error) {
            toast.error('Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (key: string, content: string) => {
        setSaving(key);
        try {
            await api.post('/api/content/update', 
                { section_key: key, content }
            );
            toast.success('Updated successfully');
            fetchContent();
        } catch (error) {
            toast.error('Update failed');
        } finally {
            setSaving(null);
        }
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
                    <h2 className="text-xl font-syne font-bold text-textMain uppercase tracking-tight">Site Content</h2>
                    <p className="text-textMuted text-sm mt-1">Update text and strings across the website dynamically.</p>
                </div>
                <button onClick={fetchContent} className="p-2.5 hover:bg-slate-50 rounded-xl text-textMuted border border-slate-200 transition-colors">
                    <RefreshCw size={18} />
                </button>
            </div>

            <div className="grid gap-5">
                {sections.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText size={28} className="text-primary" />
                        </div>
                        <p className="text-textMuted text-sm mb-4">No editable sections found in database.</p>
                        <button 
                            onClick={() => handleUpdate('hero_title', 'Expert Immigration Legal Services')}
                            className="inline-flex items-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                        >
                            <PlusCircle size={16} />
                            Create first section (Hero Title)
                        </button>
                    </div>
                ) : (
                    sections.map((section) => (
                        <div key={section.section_key} className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-primary/20 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{section.section_key.replace(/_/g, ' ')}</label>
                                <button 
                                    onClick={() => handleUpdate(section.section_key, section.content)}
                                    disabled={saving === section.section_key}
                                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 shadow-sm shadow-primary/10"
                                >
                                    <Save size={14} />
                                    {saving === section.section_key ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                            <textarea 
                                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-4 text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[100px] resize-none transition-all"
                                value={section.content}
                                onChange={(e) => {
                                    const newSections = sections.map(s => 
                                        s.section_key === section.section_key ? { ...s, content: e.target.value } : s
                                    );
                                    setSections(newSections);
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContentEditor;
