import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Save, RefreshCw } from 'lucide-react';
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
            const response = await axios.get('http://localhost:5000/api/content');
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
            await axios.post('http://localhost:5000/api/content/update', 
                { section_key: key, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Updated successfully');
        } catch (error) {
            toast.error('Update failed');
        } finally {
            setSaving(null);
        }
    };

    if (loading) return <div className="text-center py-20 text-slate-400">Initializing editor...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Site Content</h2>
                    <p className="text-slate-400">Update text and strings across the website dynamically.</p>
                </div>
                <button onClick={fetchContent} className="p-2 hover:bg-white/5 rounded-lg text-slate-400">
                    <RefreshCw size={20} />
                </button>
            </div>

            <div className="grid gap-6">
                {sections.length === 0 ? (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                        <p className="text-slate-500">No editable sections found in database.</p>
                        <button 
                            onClick={() => handleUpdate('hero_title', 'Expert Immigration Legal Services')}
                            className="mt-4 text-primary hover:underline"
                        >
                            Create first section (Hero Title)
                        </button>
                    </div>
                ) : (
                    sections.map((section) => (
                        <div key={section.section_key} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-primary uppercase tracking-widest">{section.section_key.replace('_', ' ')}</label>
                                <button 
                                    onClick={() => handleUpdate(section.section_key, section.content)}
                                    disabled={saving === section.section_key}
                                    className="flex items-center gap-2 bg-primary/20 hover:bg-primary text-primary hover:text-white px-4 py-1.5 rounded-lg transition-all text-xs font-bold disabled:opacity-50"
                                >
                                    <Save size={14} />
                                    {saving === section.section_key ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                            <textarea 
                                className="w-full bg-black/20 border border-white/5 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-primary/50 min-h-[100px] resize-none"
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
