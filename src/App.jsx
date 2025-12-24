import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Trophy, Globe, RotateCcw, Gamepad2 } from 'lucide-react';

// Componente Pallina da Tennis ultra-veloce 
const TennisBall = () => (
  <div className="w-14 h-14 bg-[#DFFF4F] rounded-full relative overflow-hidden shadow-[0_0_25px_rgba(223,255,79,1)] border-2 border-[#C0E040]">
    <div className="absolute w-14 h-14 rounded-full border-[2px] border-white top-[-6px] left-[-28px]"></div>
    <div className="absolute w-14 h-14 rounded-full border-[2px] border-white bottom-[-6px] right-[-28px]"></div>
  </div>
);

// Effetto neve natalizio 
const Snow = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white/40"
        initial={{ y: -20, x: Math.random() * 100 + "%" }}
        animate={{ y: "100vh" }}
        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "linear" }}
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <Snow />
      
      {/* Barra di progressione  */}
      {level > 0 && level < 4 && (
        <div className="absolute top-10 w-72 h-4 bg-gray-800 rounded-full border-2 border-red-600 overflow-hidden z-10 shadow-2xl">
          <motion.div 
            className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]" 
            initial={{ width: 0 }} 
            animate={{ width: `${(level / 3) * 100}%` }} 
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* SCHERMATA INIZIALE  */}
        {level === 0 && (
          <motion.div key="start" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center z-10 max-w-md">
            <h1 className="text-6xl font-black mb-6 text-red-600 drop-shadow-2xl">BUON NATALE! 🎅</h1>
            <div className="text-xl mb-10 text-white font-bold bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-red-500/30 shadow-2xl">
              <p className="mb-4 text-3xl text-yellow-400 font-black uppercase italic">Sfida Accettata?</p>
              Supera i livelli alla massima velocità per ricevere il tuo regalo! <br/>
              <span className="text-blue-500 text-xl mt-4 block font-black">FORZA INTER! 🔵⚫</span>
            </div>
            <button onClick={nextLevel} className="bg-red-600 hover:bg-red-500 px-14 py-6 rounded-full text-3xl font-black shadow-[0_0_30px_rgba(220,38,38,0.6)] transform hover:scale-110 transition active:scale-90 border-4 border-white/20">
              VOGLIO LA PS5!
            </button>
          </motion.div>
        )}

        {/* LIVELLO 1: INTER - MOVIMENTO AMPIO E VELOCISSIMO  */}
        {level === 1 && (
          <motion.div key="l1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-2xl">
            <h2 className="text-4xl font-black mb-6 text-blue-500 uppercase italic drop-shadow-md">Livello 1: Reazione Interista!</h2>
            <div className="relative w-full h-[500px] bg-black/60 rounded-[40px] border-4 border-blue-600/40 mx-auto overflow-hidden shadow-2xl">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ 
                  x: [150, -350, 200, -300, 250, -100, 300], // Molto più verso sinistra (-350) 
                  y: [100, -150, 200, -100, 150, -200, 0],
                  scale: [1, 1.2, 0.9, 1.1, 1]
                }}
                transition={{ duration: 0.45, repeat: Infinity, ease: "circInOut" }} // Velocità raddoppiata 
                className="absolute p-5 bg-blue-700 rounded-3xl shadow-[0_0_25px_#2563eb] cursor-none"
                style={{ top: '45%', left: '50%' }}
              >
                <Trophy className="text-yellow-400" size={60} />
                <span className="absolute -top-6 -right-4 text-4xl rotate-12">🎅</span>
              </motion.button>
            </div>
            <p className="mt-8 text-5xl font-black text-white bg-blue-900/50 inline-block px-8 py-2 rounded-full border-2 border-blue-500">PUNTI: {score}/5</p>
          </motion.div>
        )}

        {/* LIVELLO 2: TENNIS - FRENETICO  */}
        {level === 2 && (
          <motion.div key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-2xl">
             <h2 className="text-4xl font-black mb-6 text-[#DFFF4F] uppercase italic">Livello 2: Riflessi da Sinner! 🎾</h2>
            <div className="bg-green-950/60 rounded-[40px] border-4 border-[#DFFF4F]/40 relative overflow-hidden h-[500px] shadow-2xl backdrop-blur-md">
              <motion.button
                onClick={() => { setScore(s => s + 1); if (score >= 4) nextLevel(); }}
                animate={{ 
                  x: ["-400px", "400px", "-250px", "300px", "-450px"], // Range a sinistra aumentato drasticamente 
                  y: ["-200px", "200px", "0px", "-150px", "100px"],
                  rotate: [0, 1080]
                }}
                transition={{ 
                  duration: 0.35, // Velocità estrema 
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  ease: "linear" 
                }}
                className="absolute active:scale-50 transition cursor-none"
                style={{ left: '50%', top: '50%' }}
              >
               <TennisBall />
              </motion.button>
            </div>
            <p className="mt-8 text-4xl font-black text-[#DFFF4F] tracking-tighter uppercase underline decoration-4">Colpisci subito! {5 - score} rimasti</p>
          </motion.div>
        )}

        {/* LIVELLO 3: GEOGRAFIA  */}
        {level === 3 && (
          <motion.div key="l3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 w-full max-w-md">
             <h2 className="text-4xl font-black mb-10 text-green-500 flex justify-center items-center gap-4">
              <Globe size={40} /> QUIZ FINALE
            </h2>
            <div className="bg-white/5 p-10 rounded-[40px] border-2 border-white/20 shadow-2xl backdrop-blur-2xl">
              <p className="text-3xl mb-10 font-black text-red-500 uppercase leading-none">Dove vive Babbo Natale? 🎅</p>
              <div className="grid grid-cols-1 gap-5 text-left">
                {['Australia', 'Lapponia (Finlandia)', 'Giappone', 'Argentina'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => opt.includes('Lapponia') ? nextLevel() : alert("SBAGLIATO! Concentrati! ❄️")}
                    className="bg-white/10 hover:bg-red-600 py-5 px-8 rounded-2xl text-2xl font-black border-b-4 border-black/40 transition-all hover:translate-y-[-5px] active:translate-y-[2px]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* WIN SCREEN: PS5  */}
        {level === 4 && (
          <motion.div key="win" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }} className="text-center z-10 max-w-2xl p-8 bg-blue-600/10 rounded-[60px] border-4 border-blue-500/20 backdrop-blur-3xl">
            <motion.div 
              animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }} 
              transition={{ duration: 1, repeat: Infinity }}
              className="text-white flex justify-center mb-8"
            >
              <Gamepad2 size={160} className="drop-shadow-[0_0_60px_rgba(59,130,246,1)]" />
            </motion.div>
            <h2 className="text-4xl font-black text-yellow-400 mb-4 tracking-widest">LEGGENDA DI NATALE!</h2>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-10">
              HAI VINTO LA<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-500 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">PLAY STATION 5</span>
            </h1>
            <div className="bg-red-600 text-white py-6 px-12 rounded-[30px] text-4xl font-black inline-block mb-10 shadow-[0_15px_0_#b91c1c]">
              BUON NATALE! 🎁🎮
            </div>
            <p className="block text-blue-500 text-2xl font-black uppercase mb-12">#InterChristmas 🔵⚫</p>
            <button onClick={() => setLevel(0)} className="bg-white/10 hover:bg-white/20 px-10 py-4 rounded-full flex items-center gap-3 mx-auto font-black transition text-lg border-2 border-white/20">
              <RotateCcw size={24} /> RIGIOCHIAMO?
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
