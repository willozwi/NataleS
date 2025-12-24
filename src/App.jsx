import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Trophy, Globe, RotateCcw, Gamepad2 } from 'lucide-react';

// Componente Pallina da Tennis (Creata con CSS)
const TennisBall = () => (
  <div className="w-20 h-20 bg-[#DFFF4F] rounded-full relative overflow-hidden shadow-[0_0_15px_rgba(223,255,79,0.6)] border-2 border-[#C0E040]">
    {/* Le righe curve della pallina */}
    <div className="absolute w-20 h-20 rounded-full border-[3px] border-white top-[-10px] left-[-40px]"></div>
    <div className="absolute w-20 h-20 rounded-full border-[3px] border-white bottom-[-10px] right-[-40px]"></div>
  </div>
);

// Effetto neve semplice
const Snow = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white/40"
        initial={{ y: -20, x: Math.random() * 100 + "%" }}
        animate={{ y: "100vh" }}
        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
      >
        <Snowflake size={24} />
      </motion.div>
    ))}
  </div>
);

export default function App() {
  const [level, setLevel] = useState(0); // 0: Start, 1: Inter, 2: Tennis, 3: Geo, 4: Win
  const [score, setScore] = useState(0);

  const nextLevel = () => { setScore(0); setLevel(l => l + 1); };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <Snow />
      
      {/* Barra di Progresso Natalizia */}
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
        {/* START SCREEN */}
        {level === 0 && (
          <motion.div key="start" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center z-10 max-w-md">
            <h1 className="text-5xl font-black mb-4 text-red-500 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">BUON NATALE! 🎅</h1>
            <div className="text-xl mb-8 text-white font-bold bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-red-500/50">
              <p className="mb-2 text-2xl text-yellow-300">🎄 Missione Speciale 🎄</p>
              Supera i 3 livelli per scartare il tuo regalo! <br/>
              <span className="text-blue-400 text-lg mt-2 block">Forza Inter! 🔵⚫</span>
            </div>
            <button onClick={nextLevel} className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 px-12 py-4 rounded-full text-2xl font-bold shadow-xl transform hover:scale-105 transition active:scale-95">
              INIZIA LA SFIDA!
            </button>
          </motion.div>
        )}

        {/* LIVELLO 1: INTER */}
        {level === 1 && (
          <motion.div key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
            <h2 className="text-4xl font-bold mb-2 text-blue-400">Livello 1</h2>
            <h3 className="text-2xl font-bold mb-6 text-white">Cuore Nerazzurro 🔵⚫</h3>
            <p className="mb-8 text-lg">Clicca il Trofeo dell'Inter 5 volte!</p>
            <div className="relative w-full max-w-sm h-72 bg-slate-800/50 rounded-2xl border-2 border-blue-500/30 mx-auto overflow-hidden">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ x: [0, 120, -100, 80, 0], y: [0, 100, -80, 50, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg transform active:scale-90 transition"
              >
                <Trophy className="text-yellow-400 drop-shadow-md" size={48} />
                <span className="absolute -top-4 -right-3 text-3xl filter drop-shadow">🎅</span>
              </motion.button>
            </div>
            <p className="mt-6 text-3xl font-bold text-yellow-500">{score}/5</p>
          </motion.div>
        )}

        {/* LIVELLO 2: TENNIS (Aggiornato con pallina) */}
        {level === 2 && (
          <motion.div key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-md">
             <h2 className="text-4xl font-bold mb-2 text-[#DFFF4F]">Livello 2</h2>
             <h3 className="text-2xl font-bold mb-6 text-white">Ace di Natale! 🎾</h3>
            
            <div className="bg-green-900/40 p-6 rounded-3xl border-2 border-[#DFFF4F]/50 mb-6 relative overflow-hidden h-80">
              <p className="mb-4 text-lg font-medium z-10 relative">Colpisci la pallina da tennis al volo!</p>
              {/* Pallina che rimbalza */}
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ 
                  x: ["-120%", "120%"], // Movimento orizzontale rapido
                  y: ["-20%", "80%", "10%"], // Rimbalzi verticali
                  rotate: [0, 360]
                }}
                transition={{ 
                  x: { duration: 1.2, repeat: Infinity, repeatType: "mirror", ease: "linear" },
                  y: { duration: 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
                className="absolute active:scale-90 transition"
                style={{ left: '50%', top: '30%' }}
              >
               <TennisBall />
              </motion.button>
            </div>
            <p className="text-xl font-bold text-[#DFFF4F]">Colpi rimanenti: {5 - score}</p>
          </motion.div>
        )}

        {/* LIVELLO 3: GEOGRAFIA */}
        {level === 3 && (
          <motion.div key="l3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-md">
             <h2 className="text-4xl font-bold mb-2 text-green-400">Livello 3</h2>
             <h3 className="text-2xl font-bold mb-8 text-white flex justify-center items-center gap-2">
              <Globe /> L'ultimo viaggio
            </h3>
            <div className="bg-slate-800/80 p-8 rounded-3xl border-2 border-white/10 backdrop-blur-md shadow-2xl">
              <p className="text-2xl mb-8 font-bold text-red-400 leading-tight">Dove si trova il villaggio di Babbo Natale? 🎅</p>
              <div className="grid grid-cols-1 gap-4">
                {['Al Polo Sud', 'In Lapponia (Finlandia)', 'Sulle Alpi', 'A New York'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => opt.includes('Lapponia') ? nextLevel() : alert("Acqua! Riprova! ❄️")}
                    className="bg-white/5 hover:bg-white/20 py-4 px-6 rounded-2xl text-xl font-semibold border border-white/10 transition-all transform hover:scale-105 active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* WIN SCREEN (Aggiornata con PS5) */}
        {level === 4 && (
          <motion.div key="win" initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="text-center z-10 max-w-lg">
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-500 flex justify-center mb-6"
            >
              <Gamepad2 size={120} className="drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">COMPLIMENTI CAMPIONE!</h2>
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-tight mb-8 drop-shadow-sm">
              HAI VINTO LA<br/>PLAY STATION 5
            </h1>
            <p className="text-xl text-gray-300 mb-12">Buon Natale e forza Inter! 🔵⚫🎮</p>
            <button onClick={() => setLevel(0)} className="bg-green-600 hover:bg-green-700 px-10 py-4 rounded-full flex items-center gap-3 mx-auto font-bold text-xl shadow-xl transition transform hover:scale-105">
              <RotateCcw size={24} /> RIGIOCA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
