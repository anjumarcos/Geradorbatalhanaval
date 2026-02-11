
import React, { useState, useCallback } from 'react';
import { BoardState, SHIPS_CONFIG } from './types';
import { generateBoard } from './utils/generator';
import BattleshipGrid from './components/BattleshipGrid';
import { Skull, Printer, RefreshCw, Crosshair, Swords, Compass, Map as MapIcon, Info, Anchor } from 'lucide-react';

const App: React.FC = () => {
  const [numCards, setNumCards] = useState<number>(4);
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const newBoards: BoardState[] = [];
      for (let i = 0; i < numCards; i++) {
        newBoards.push(generateBoard(`CAPITÃO #${i + 1}`));
      }
      setBoards(newBoards);
      setIsGenerating(false);
    }, 600);
  }, [numCards]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen pb-20 print:pb-0 bg-[#0a0a0a] text-white selection:bg-yellow-500/30">
      {/* Header Estilo Pirata */}
      <header className="bg-black/95 border-b-4 border-yellow-500 p-4 no-print sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500 rounded-lg rotate-3 text-black">
              <Skull size={28} />
            </div>
            <div>
              <h1 className="pirate-font text-3xl text-yellow-500 leading-none">Pirate Conquest</h1>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Mapeador de Batalhas Navais</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10">
            <div className="flex flex-col">
              <label className="text-[8px] uppercase font-black text-yellow-500/70 mb-1 ml-1">Frotas</label>
              <input 
                type="number" 
                min="2" max="25" 
                value={numCards}
                onChange={(e) => setNumCards(Math.max(2, parseInt(e.target.value) || 2))}
                className="bg-black border border-yellow-500/30 rounded-lg px-3 py-1 text-yellow-500 w-16 font-bold focus:ring-1 focus:ring-yellow-500 outline-none"
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg font-black uppercase text-xs transition-all active:scale-95"
            >
              <RefreshCw className={isGenerating ? 'animate-spin' : ''} size={14} />
              {isGenerating ? 'Navegando...' : 'Zarpar Frota'}
            </button>
            {boards.length > 0 && (
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg font-black uppercase text-xs transition-all hover:bg-yellow-50"
              >
                <Printer size={14} />
                IMPRIMIR
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 mt-6 print:mt-0">
        {boards.length === 0 && !isGenerating && (
          <div className="flex flex-col items-center justify-center py-32 text-white/10">
            <Compass size={120} className="mb-4 animate-[spin_10s_linear_infinite]" />
            <h2 className="pirate-font text-4xl uppercase tracking-widest text-yellow-500/20">Sem rumo no oceano</h2>
            <p className="mt-2 text-[10px] font-black uppercase tracking-widest">Defina a quantidade de capitães para iniciar o saque.</p>
          </div>
        )}

        <div className="space-y-8 print:space-y-0">
          {boards.map((currentBoard, boardIndex) => (
            <div 
              key={currentBoard.id} 
              className="print-page bg-white text-black p-6 rounded-3xl border-4 border-yellow-500/20 print:border-0 print:p-0"
            >
              {/* Header da Cartela Otimizado */}
              <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4 print:mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-black text-yellow-500 p-2 rounded-lg">
                    <Swords size={24} />
                  </div>
                  <div>
                    <h2 className="pirate-font text-2xl uppercase text-black leading-none">
                      {currentBoard.id}
                    </h2>
                    <p className="text-[9px] font-black uppercase tracking-widest text-black/50">Mapa Secreto de Defesa</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="pirate-font text-3xl text-black/20 italic">#{boardIndex + 1}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* DEFESA */}
                <section className="bg-yellow-500/5 p-4 rounded-2xl border border-black/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Anchor className="text-black" size={18} />
                    <h3 className="pirate-font text-xl uppercase">Minha Tripulação</h3>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="shrink-0 scale-90 origin-top-left">
                       <BattleshipGrid board={currentBoard} showShips={true} scale={0.7} />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="bg-white p-3 rounded-xl border-2 border-dashed border-black/20">
                        <p className="text-[10px] font-bold text-black/70 italic leading-tight">
                          "Mantenha este mapa longe dos olhos dos traidores. Marque os canhões inimigos aqui. Se seu galeão for atingido por completo, ele afunda!"
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {SHIPS_CONFIG.map(ship => (
                          <div key={ship.id} className="flex justify-between text-[9px] font-black uppercase border-b border-black/10 py-1">
                            <span>{ship.name}</span>
                            <span className="text-yellow-600 font-mono">{ship.size} canhões</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* OFENSIVA (RADARES) */}
                <section>
                  <div className="flex items-center gap-2 mb-4 bg-black text-yellow-500 p-2 rounded-lg w-fit">
                    <Crosshair size={18} />
                    <h3 className="pirate-font text-lg uppercase leading-none">Mapa de Saque (Ataque)</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 print:grid-cols-4 gap-4">
                    {boards.map((otherBoard, otherIdx) => {
                      if (otherIdx === boardIndex) return null;
                      return (
                        <div key={`radar-${otherIdx}`} className="avoid-split flex flex-col gap-1">
                          <div className="flex items-center justify-between border-b border-black/20 pb-1 px-1">
                            <span className="text-[8px] font-black uppercase text-black/60">
                              ALVO: {otherBoard.id}
                            </span>
                            <Skull size={10} className="text-red-600" />
                          </div>
                          <div className="flex justify-center scale-[0.85] origin-top">
                            <BattleshipGrid 
                              board={{...otherBoard, grid: otherBoard.grid.map(r => r.map(() => null))}} 
                              showShips={false} 
                              scale={0.35} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-black/20 flex justify-between items-center opacity-40">
                <div className="flex gap-4">
                   <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-600"></div>
                      <span className="text-[8px] font-black uppercase">FOGO</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <div className="w-2 h-2 border border-black"></div>
                      <span className="text-[8px] font-black uppercase">ÁGUA</span>
                   </div>
                </div>
                <div className="text-[8px] font-mono font-black uppercase tracking-widest">
                  PIRATE-CONQUEST-v4.0
                </div>
              </div>
            </div>
          ))}

          {/* GABARITO (NO-PRINT) */}
          <div className="bg-yellow-500 text-black p-8 rounded-[2rem] no-print shadow-2xl">
            <div className="text-center mb-6">
               <MapIcon size={32} className="mx-auto mb-2" />
               <h2 className="pirate-font text-3xl uppercase leading-none">Mapa do Tesouro (Gabarito)</h2>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Segredo do Almirante</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {boards.map((board) => (
                 <div key={`mirror-${board.id}`} className="flex flex-col items-center gap-2 p-3 bg-black/10 rounded-2xl border border-black/20">
                    <span className="text-[10px] font-black uppercase italic text-black/80">{board.id}</span>
                    <BattleshipGrid board={board} showShips={true} scale={0.35} />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 py-10 text-center no-print border-t-2 border-yellow-500/20">
         <div className="flex justify-center gap-4 opacity-10 mb-2 text-yellow-500">
            <Anchor size={20} />
            <Skull size={20} />
            <Swords size={20} />
         </div>
         <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em]">Pirate Conquest Tactical Unit © 1720</p>
      </footer>
    </div>
  );
};

export default App;
