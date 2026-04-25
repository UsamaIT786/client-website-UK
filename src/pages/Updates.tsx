import React from 'react';
import { motion } from 'framer-motion';
import UpdateTable from '../components/UpdateTable';
import Breadcrumbs from '../components/Breadcrumbs';

const Updates: React.FC = () => {
  return (
    <div className="pt-28 md:pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen bg-background">
      <Breadcrumbs />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
      >
        <div className="max-w-2xl">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">News & Insights</span>
          <h1 className="text-5xl md:text-7xl font-syne font-bold uppercase mb-0 leading-none text-textMain">Latest <span className="text-primary">Update</span></h1>
        </div>
      </motion.div>

      <UpdateTable />
    </div>
  );
};

export default Updates;
