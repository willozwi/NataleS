import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Trophy, Globe, RotateCcw, Gamepad2 } from 'lucide-react';

// Componente Pallina da Tennis
const TennisBall = () => (
  <div className="w-16 h-16 bg-[#DFFF4F] rounded-full relative overflow-hidden shadow-[0_0_15px_rgba(223,255,79,0.7)] border-2 border-[#C0E040]">
    <div className="absolute w-16 h-16 rounded-full border-[2px] border-white top-[-8px] left-[-35px]"></div>
    <div className="absolute w-16 h-16 rounded-full border-[2px] border-white bottom-[-8px] right-[-35px]"></div>
  </div>
);

// Effetto neve
const Snow = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white/40"
        initial={{ y: -20, x: Math.random() * 100 + "%" }}
        animate={{ y: "100vh" }}
        transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: "linear" }}
      >
        <Snowflake size={24} />
      </motion.div>
    ))}
  </div>
);

export default function App() {
  const [level, setLevel] = useState(0); 
  const [score, setScore] = useState(0);

  const nextLevel = () => { setScore(0); setLevel(l => l + 1); };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <Snow />
      
      {/* Barra di progresso */}
      {level > 0 && level < 4 && (
        <div className="absolute top-10 w-64 h-3 bg-gray-700 rounded-full border border-red-500 overflow-hidden z-10">
          <motion.div 
            className="h-full bg-green-500" 
            initial={{ width: 0 }} 
            animate={{ width: `${(level / 3) * 100}%` }} 
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* SCHERMATA INIZIALE */}
        {level === 0 && (
          <motion.div key="start" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center z-10 max-w-md">
            <h1 className="text-5xl font-black mb-4 text-red-500 drop-shadow-md">BUON NATALE! 🎅</h1>
            <div className="text-xl mb-8 text-white font-bold bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-red-500/50">
              <p className="mb-4 text-
