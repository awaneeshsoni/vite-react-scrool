// src/components/Section.tsx
import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center h-screen bg-gray-100 text-center"
    >
      <div className="p-8 max-m-4 w-3xl mx-auto">
        <h2 className="text-4xl font-semibold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </motion.div>
  );
};

export default Section;
