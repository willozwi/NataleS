import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Trophy, Globe, RotateCcw, Gamepad2 } from 'lucide-react';

// Componente Pallina da Tennis (CSS)
const TennisBall = () => (
  <div className="w-16 h-16 bg-[#DFFF4F] rounded-full relative overflow-hidden shadow-[0_0_20px_rgba(223,255,79,0.8)] border-2 border-[#C0E040]">
    <div className="absolute w-16 h-16 rounded-full border-[2px] border-white top-[-8px] left-[-32px]"></div>
    <div className="absolute w-16 h-16 rounded-full border-[2px] border-white bottom-[-8px] right-[-32px]"></div>
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
      
      {level > 0 && level < 4 && (
        <div className="absolute top-10 w-64 h-3 bg-gray-700 rounded-full border border-red-500 overflow-hidden z-10 shadow-lg">
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
            <h1 className="text-5xl font-black mb-4 text-red-500 drop-shadow-xl">BUON NATALE! 🎅</h1>
            <div className="text-xl mb-8 text-white font-bold bg-white/10 backdrop-blur-md p-6 rounded-2xl border-2 border-red-500/50">
              <p className="mb-2 text-2xl text-yellow-300">🎮 Sfida Finale 🎮</p>
              Supera i livelli per avere il tuo regalo!<br/>
              <span className="text-blue-400 text-lg mt-2 block italic">Forza Inter! 🔵⚫</span>
            </div>
            <button onClick={nextLevel} className="bg-red-600 hover:bg-red-500 px-12 py-5 rounded-full text-2xl font-black shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105 transition active:scale-90">
              VOGLIO IL REGALO!
            </button>
          </motion.div>
        )}

        {/* LIVELLO 1: INTER (Velocità Aumentata) */}
        {level === 1 && (
          <motion.div key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Livello 1: Prendi lo Scudetto! 🔵⚫</h2>
            <div className="relative w-full h-[400px] bg-black/40 rounded-3xl border-4 border-blue-500/20 mx-auto overflow-hidden shadow-inner">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ 
                  x: [0, 200, -150, 180, -180, 50, 0], 
                  y: [0, 250, 50, 300, 100, 200, 0] 
                }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="absolute p-4 bg-blue-600 rounded-2xl shadow-[0_0_15px_rgba(37,99,235,0.6)] cursor-crosshair"
                style={{ top: '20%', left: '45%' }}
              >
                <Trophy className="text-yellow-400" size={50} />
                <span className="absolute -top-4 -right-2 text-3xl">🎅</span>
              </motion.button>
            </div>
            <p className="mt-6 text-4xl font-black text-yellow-500 tracking-widest">{score}/5</p>
          </motion.div>
        )}

        {/* LIVELLO 2: TENNIS (Rimbalzo Rapido) */}
        {level === 2 && (
          <motion.div key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-lg">
             <h2 className="text-3xl font-bold mb-6 text-[#DFFF4F]">Livello 2: Match Point Sinner! 🎾</h2>
            <div className="bg-green-900/40 rounded-3xl border-4 border-[#DFFF4F]/30 relative overflow-hidden h-[400px] shadow-2xl backdrop-blur-sm">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ 
                  x: ["-200px", "200px", "-150px", "150px"],
                  y: ["-100px", "150px", "-50px", "100px"],
                  rotate: [0, 720]
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  ease: "easeInOut" 
                }}
                className="absolute active:scale-75 transition cursor-crosshair"
                style={{ left: '50%', top: '50%' }}
              >
               <TennisBall />
              </motion.button>
            </div>
            <p className="mt-6 text-3xl font-black text-[#DFFF4F]">COLPISCI! {5 - score} RIMANENTI</p>
          </motion.div>
        )}

        {/* LIVELLO 3: GEOGRAFIA */}
        {level === 3 && (
          <motion.div key="l3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-md">
             <h2 className="text-3xl font-bold mb-8 text-green-400 flex justify-center items-center gap-2">
              <Globe /> Ultima domanda!
            </h2>
            <div className="bg-slate-800/90 p-8 rounded-3xl border-2 border-white/20 shadow-2xl backdrop-blur-md">
              <p className="text-2xl mb-8 font-black text-red-400 uppercase tracking-tight">Dove vive Babbo Natale? 🎅</p>
              <div className="grid grid-cols-1 gap-4">
                {['Brasile', 'Lapponia (Finlandia)', 'Giappone', 'Marocco'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => opt.includes('Lapponia') ? nextLevel() : alert("Riprova! ❄️")}
                    className="bg-white/10 hover:bg-red-600 py-4 rounded-xl text-xl font-bold border border-white/10 transition-all hover:scale-105 active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* WIN SCREEN: PLAY STATION 5 */}
        {level === 4 && (
          <motion.div key="win" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="text-center z-10 max-w-xl">
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white flex justify-center mb-6"
            >
              <Gamepad2 size={120} className="drop-shadow-[0_0_40px_rgba(59,130,246,0.9)]" />
            </motion.div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">CAMPIONE ASSOLUTO!</h2>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 drop-shadow-2xl">
              HAI VINTO LA<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">PLAY STATION 5</span>
            </h1>
            <div className="bg-blue-600 text-white py-4 px-8 rounded-2xl text-2xl font-black inline-block mb-10 shadow-xl">
              BUON NATALE! 🎁🎮
            </div>
            <p className="block text-blue-400 font-bold mb-10">#SempreInter 🔵⚫</p>
            <button onClick={() => setLevel(0)} className="bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-full flex items-center gap-2 mx-auto font-bold opacity-80 transition">
              <RotateCcw size={20} /> RIGIOCA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
