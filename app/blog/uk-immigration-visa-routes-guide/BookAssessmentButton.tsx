"use client";

import React from 'react';
import { useModal } from '../../../context/ModalContext';
import { ArrowUpRight } from 'lucide-react';

export default function BookAssessmentButton() {
  const { openModal } = useModal();

  return (
    <button
      onClick={openModal}
      className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl uppercase tracking-widest text-[10px] font-bold hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-primary/20 group"
    >
      Book Free Assessment
      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
