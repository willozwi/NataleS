import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Trophy, Target, Globe, RotateCcw } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
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
        {/* START SCREEN AGGIORNATA */}
        {level === 0 && (
          <motion.div key="start" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center z-10">
            <h1 className="text-5xl font-black mb-4 text-red-500 drop-shadow-md">BUON NATALE! 🎅</h1>
            <p className="text-2xl mb-8 text-white font-bold bg-black/30 p-4 rounded-2xl">
              Supera tutti i livelli per avere il tuo regalo! 🎁<br/>
              <span className="text-blue-400 text-lg">Forza Inter! 🔵⚫</span>
            </p>
            <button onClick={nextLevel} className="bg-red-600 hover:bg-red-700 px-12 py-4 rounded-full text-2xl font-bold shadow-xl transform hover:scale-110 transition">
              INIZIA LA SFIDA!
            </button>
          </motion.div>
        )}

        {/* LIVELLO 1: INTER */}
        {level === 1 && (
          <motion.div key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Livello 1: Cuore Nerazzurro 🔵⚫</h2>
            <p className="mb-4">Clicca il Trofeo dell'Inter 5 volte!</p>
            <div className="relative w-64 h-64 bg-black/40 rounded-xl border-2 border-blue-500 mx-auto overflow-hidden">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ x: [0, 150, 50, 180, 0], y: [0, 150, 20, 100, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute p-3 bg-blue-600 rounded-lg shadow-lg"
              >
                <Trophy className="text-yellow-400" size={40} />
                <span className="absolute -top-3 -right-2">🎅</span>
              </motion.button>
            </div>
            <p className="mt-4 text-2xl font-bold italic text-yellow-500">Punti: {score}/5</p>
          </motion.div>
        )}

        {/* LIVELLO 2: TENNIS */}
        {level === 2 && (
          <motion.div key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400 font-mono">Livello 2: Tennis Sinner 🎾</h2>
            <div className="bg-green-800/50 p-6 rounded-2xl border-4 border-white mb-6">
              <p className="mb-4 italic">"Sinner è diventato numero 1 perché non molla mai!"</p>
              <button 
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                className="bg-yellow-400 p-6 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-125 transition active:scale-90"
              >
                <Target className="text-green-900" size={50} />
              </button>
            </div>
            <p className="text-xl">Colpisci la pallina {5 - score} volte!</p>
          </motion.div>
        )}

        {/* LIVELLO 3: GEOGRAFIA */}
        {level === 3 && (
          <motion.div key="l3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-green-400 flex justify-center items-center gap-2">
              <Globe /> Livello 3: Esploratore
            </h2>
            <div className="bg-slate-800 p-8 rounded-3xl border-2 border-white/20">
              <p className="text-2xl mb-8 font-semibold text-red-400">Dove vive Babbo Natale? 🎅</p>
              <div className="grid grid-cols-1 gap-4">
                {['Australia', 'Lapponia (Finlandia)', 'Egitto', 'Stati Uniti'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => opt.includes('Lapponia') ? nextLevel() : alert("Riprova! ❄️")}
                    className="bg-white/10 hover:bg-white/20 py-4 rounded-xl text-xl font-medium border border-white/10"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* WIN SCREEN */}
        {level === 4 && (
          <motion.div key="win" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center z-10">
            <div className="text-8xl mb-4">🎁</div>
            <h2 className="text-5xl font-black text-yellow-500 mb-2">CE L'HAI FATTA!</h2>
            <p className="text-2xl text-white mb-8">Corri a prendere il tuo regalo! 🎄✨</p>
            <button onClick={() => setLevel(0)} className="bg-green-600 px-8 py-3 rounded-full flex items-center gap-2 mx-auto font-bold text-lg shadow-lg">
              <RotateCcw size={20} /> RIGIOCA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
