import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Zap, Info } from 'lucide-react';

const tableData = [
  { category: "Skilled Worker Visa (Outside UK)", standard: "3 weeks", priority: "5 working days", superPriority: "Not Available" },
  { category: "Student Visa (Outside UK)", standard: "3 weeks", priority: "5 working days", superPriority: "Not Available" },
  { category: "Family / Spouse Visa (Outside UK)", standard: "24 weeks", priority: "30 working days", superPriority: "Not Available" },
  { category: "Standard Visitor Visa (Outside UK)", standard: "3 weeks", priority: "5 working days", superPriority: "Not Available" },
  { category: "Indefinite Leave to Remain (ILR)", standard: "6 months", priority: "5 working days", superPriority: "Next working day" },
  { category: "British Citizenship", standard: "6 months", priority: "Not Available", superPriority: "Not Available" },
  { category: "Health and Care Worker Visa", standard: "3 weeks", priority: "5 working days", superPriority: "Not Available" },
];

const ProcessingTable: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20"
    >
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Table Header / Top Bar */}
        <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Calendar size={16} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Last Updated: April 2026</span>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 w-1/3">Visa Category</th>
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Standard</th>
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Zap size={14} className="fill-primary" /> Priority
                </th>
                <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Super Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tableData.map((row, index) => (
                <tr key={index} className="group hover:bg-slate-50/50 transition-colors duration-300">
                  <td className="px-10 py-8">
                    <span className="text-lg font-syne font-bold text-slate-900 group-hover:text-primary transition-colors">{row.category}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-slate-600 font-medium">{row.standard}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`font-bold ${row.priority === 'Not Available' ? 'text-slate-300' : 'text-slate-900'}`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`font-bold ${row.superPriority === 'Not Available' ? 'text-slate-300' : 'text-primary'}`}>
                      {row.superPriority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-10 py-8 bg-slate-50/30 border-t border-slate-100 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Info size={14} className="text-primary" />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            Processing times are estimates provided by the Home Office. Actual processing times may vary depending on the specific circumstances of your case and the volume of applications.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessingTable;
