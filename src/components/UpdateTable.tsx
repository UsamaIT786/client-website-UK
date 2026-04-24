import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp } from 'lucide-react';

const feeData = [
  { category: "VISITORS", type: "Standard Visitor Visa", oldFee: "£127", newFee: "£135", change: "+6%" },
  { category: "STUDENTS", type: "Student Visa", oldFee: "£524", newFee: "£558", change: "+6.5%" },
  { category: "WORKERS (<3 YRS)", type: "Skilled Worker Visa", oldFee: "£769", newFee: "£819", change: "+6.5%" },
  { category: "WORKERS (3+ YRS)", type: "Skilled Worker Visa", oldFee: "£1,519", newFee: "£1,618", change: "+6.5%" },
  { category: "FAMILY / SPOUSE", type: "Spouse Visa (outside UK)", oldFee: "£1,983", newFee: "£2,064", change: "+4%" },
  { category: "SETTLEMENT", type: "Indefinite Leave to Remain", oldFee: "£3,037", newFee: "£3,226", change: "+6%" },
  { category: "CITIZENSHIP", type: "Naturalisation", oldFee: "£1,500", newFee: "£1,709", change: "+14%" },
  { category: "TRAVEL AUTH", type: "ETA (Electronic Travel Auth)", oldFee: "£16", newFee: "£20", change: "+25%" },
];

const UpdateTable: React.FC = () => {
  return (
    <div 
      className="mt-20 mb-32"
    >
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.04)] overflow-hidden p-2">
        <div className="px-8 py-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-syne font-bold text-slate-900 tracking-tight">
              Which UK visa categories <span className="text-primary">are affected?</span>
            </h2>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border border-slate-100">Category</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border border-slate-100">Visa Type</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border border-slate-100">Old Fee</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border border-slate-100">New Fee</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border border-slate-100">Change</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-8 py-6 border border-slate-100">
                      <span className="text-xs font-bold text-slate-900 tracking-wider">{row.category}</span>
                    </td>
                    <td className="px-8 py-6 border border-slate-100">
                      <span className="text-slate-500 font-medium">{row.type}</span>
                    </td>
                    <td className="px-8 py-6 border border-slate-100">
                      <span className="text-slate-400">{row.oldFee}</span>
                    </td>
                    <td className="px-8 py-6 border border-slate-100">
                      <span className="text-slate-900 font-bold">{row.newFee}</span>
                    </td>
                    <td className="px-8 py-6 border border-slate-100">
                      <div className="flex items-center gap-2 text-red-500 font-bold">
                        <TrendingUp size={14} />
                        {row.change}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTable;
