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
              <p className="mb-4 text-2xl text-yellow-300">🎄 Missione Regalo 🎄</p>
              Supera tutti i livelli per avere il tuo regalo! <br/>
              <span className="text-blue-400 text-lg mt-2 block">Forza Inter! 🔵⚫</span>
            </div>
            <button onClick={nextLevel} className="bg-red-600 hover:bg-red-700 px-12 py-4 rounded-full text-2xl font-bold shadow-xl transform hover:scale-110 transition">
              INIZIA LA SFIDA!
            </button>
          </motion.div>
        )}

        {/* LIVELLO 1: INTER - VELOCITÀ MODERATA */}
        {level === 1 && (
          <motion.div key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-400 uppercase italic">Livello 1: Prendi lo Scudetto! 🔵⚫</h2>
            <div className="relative w-full h-[450px] bg-black/40 rounded-3xl border-2 border-blue-500/30 mx-auto overflow-hidden">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ 
                  x: [100, -300, 150, -250, 0], // Movimento ampio verso sinistra
                  y: [50, 150, -100, 200, 0] 
                }}
                transition={{ 
                  duration: 1.5, // VELOCITÀ MODERATA
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute p-4 bg-blue-600 rounded-2xl shadow-lg transform active:scale-90 transition"
                style={{ top: '40%', left: '50%' }}
              >
                <Trophy className="text-yellow-400" size={50} />
                <span className="absolute -top-4 -right-2 text-3xl">🎅</span>
              </motion.button>
            </div>
            <p className="mt-6 text-3xl font-bold text-white">Punti: {score}/5</p>
          </motion.div>
        )}

        {/* LIVELLO 2: TENNIS - VELOCITÀ MODERATA */}
        {level === 2 && (
          <motion.div key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-2xl">
             <h2 className="text-3xl font-bold mb-6 text-[#DFFF4F] uppercase italic">Livello 2: Ace di Natale! 🎾</h2>
            <div className="bg-green-900/40 rounded-3xl border-2 border-[#DFFF4F]/30 relative overflow-hidden h-[450px]">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ 
                  x: ["-350px", "300px", "-200px", "250px"], // Movimento ampio verso sinistra
                  y: ["-100px", "150px", "0px", "-50px"],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 1.3, // VELOCITÀ MODERATA
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  ease: "linear" 
                }}
                className="absolute active:scale-90 transition"
                style={{ left: '50%', top: '50%' }}
              >
               <TennisBall />
              </motion.button>
            </div>
            <p className="mt-6 text-2xl font-bold text-[#DFFF4F]">Colpisci la pallina! Mancano: {5 - score}</p>
          </motion.div>
        )}

        {/* LIVELLO 3: GEOGRAFIA */}
        {level === 3 && (
          <motion.div key="l3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-md">
             <h2 className="text-3xl font-bold mb-8 text-green-400 flex justify-center items-center gap-2">
              <Globe size={30} /> Livello 3: Quiz Finale
            </h2>
            <div className="bg-slate-800 p-8 rounded-3xl border-2 border-white/20 shadow-2xl backdrop-blur-md">
              <p className="text-2xl mb-8 font-bold text-red-400 uppercase tracking-tight">Dove vive Babbo Natale? 🎅</p>
              <div className="grid grid-cols-1 gap-4 text-left">
                {['Brasile', 'Lapponia (Finlandia)', 'Giappone', 'Egitto'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => opt.includes('Lapponia') ? nextLevel() : alert("Riprova! ❄️")}
                    className="bg-white/10 hover:bg-red-600 py-4 px-6 rounded-xl text-xl font-semibold border border-white/10 transition-all hover:scale-105"
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
          <motion.div key="win" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="text-center z-10 max-w-lg p-8 bg-blue-600/20 rounded-[40px] border-2 border-blue-500/30 backdrop-blur-xl">
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white flex justify-center mb-6"
            >
              <Gamepad2 size={100} className="drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
            </motion.div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-2 uppercase tracking-tighter">Complimenti Campione!</h2>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
              HAI VINTO LA<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">PLAY STATION 5</span>
            </h1>
            <p className="text-2xl text-white mb-10 font-bold bg-red-600 py-2 rounded-full shadow-lg">BUON NATALE! 🎁🎮</p>
            <p className="block text-blue-400 font-black mb-10 uppercase tracking-widest">Forza Inter 🔵⚫</p>
            <button onClick={() => setLevel(0)} className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full flex items-center gap-2 mx-auto font-bold transition">
              <RotateCcw size={20} /> RIGIOCA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
