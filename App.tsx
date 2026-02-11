import React, { useState, useCallback } from 'react';
import { BoardState, SHIPS_CONFIG } from './types';
import { generateBoard } from './utils/generator';
import BattleshipGrid from './components/BattleshipGrid';
import { Skull, Printer, RefreshCw, Crosshair, Swords, Compass, Map as MapIcon, Anchor, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen pb-20 print:pb-0 print:bg-white bg-[#0a0a0a] text-white selection:bg-yellow-500/30">
      {/* UI do Sistema (Apenas Tela) */}
      <header className="bg-black border-b-4 border-yellow-500 p-4 no-print sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500 rounded-lg text-black">
              <Anchor size={28} />
            </div>
            <div>
              <h1 className="pirate-font text-3xl text-yellow-500 leading-none">Puerto Rico Naval</h1>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Tactical Map Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10">
            <div className="flex flex-col">
              <label className="text-[8px] uppercase font-black text-yellow-500/70 mb-1 ml-1">Participantes</label>
              <input 
                type="number" 
                min="2" max="25" 
                value={numCards}
                onChange={(e) => setNumCards(Math.max(2, parseInt(e.target.value) || 2))}
                className="bg-black border border-yellow-500/30 rounded-lg px-3 py-1 text-yellow-500 w-16 font-bold outline-none"
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg font-black uppercase text-xs transition-all active:scale-95"
            >
              <RefreshCw className={isGenerating ? 'animate-spin' : ''} size={14} />
              {isGenerating ? 'Calculando Marés...' : 'Gerar Cartelas'}
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

      <main className="max-w-[1100px] mx-auto px-4 mt-8 print:mt-0 print:px-0 print:max-w-none">
        {boards.length === 0 && !isGenerating && (
          <div className="flex flex-col items-center justify-center py-32 text-white/10 no-print">
            <Compass size={120} className="mb-4 opacity-20" />
            <h2 className="pirate-font text-4xl text-yellow-500/20">Aguardando Ordens do Porto</h2>
            <p className="mt-2 text-[10px] font-black uppercase tracking-widest">Defina o número de capitães e zarpe!</p>
          </div>
        )}

        <div className="space-y-12 print:space-y-0">
          {boards.map((currentBoard, boardIndex) => (
            <div 
              key={currentBoard.id} 
              className="print-page bg-white text-black p-8 rounded-[2.5rem] border-4 border-yellow-500 print:border-0 print:p-8"
            >
              {/* CABEÇALHO DA CARTELA COM LOGO */}
              <div className="flex justify-between items-start border-b-[3px] border-black pb-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-black flex items-center justify-center rounded-xl overflow-hidden shrink-0 print:border-2 print:border-black">
                    <img 
                      src="/logo.png" 
                      alt="Logo Puerto Rico" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('p-4');
                      }}
                    />
                    <Skull className="text-yellow-500 absolute pointer-events-none opacity-20" size={40} />
                  </div>
                  <div>
                    <h2 className="pirate-font text-4xl text-black leading-none mb-1">
                      1ª Batalha Naval do Puerto Rico
                    </h2>
                    <div className="flex items-center gap-2">
                       <span className="bg-yellow-500 text-black px-2 py-0.5 text-[10px] font-black rounded border border-black/20">{currentBoard.id}</span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Dossiê de Combate</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-black/30 mb-1 uppercase">Página</p>
                   <span className="pirate-font text-5xl text-black/10">#{boardIndex + 1}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* ÁREA DE DEFESA */}
                <section className="border-2 border-black p-4 rounded-3xl relative overflow-hidden bg-yellow-500/5 print:bg-white">
                  <div className="absolute top-0 right-0 p-4 opacity-5 no-print">
                    <ShieldCheck size={120} />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Anchor className="text-black" size={20} />
                    <h3 className="pirate-font text-2xl uppercase">Frota de Defesa</h3>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                    <div className="shrink-0 scale-95 origin-top-left">
                       <BattleshipGrid board={currentBoard} showShips={true} scale={0.75} />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="bg-white border-2 border-black p-4 rounded-2xl mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
                        <p className="text-xs font-bold leading-relaxed">
                          "Capitão, posicione seus navios com sabedoria. Use este mapa para registrar os ataques sofridos. Não permita que o inimigo descubra sua localização!"
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {SHIPS_CONFIG.map(ship => (
                          <div key={ship.id} className="flex justify-between items-center text-[10px] font-black uppercase border-b border-black/10 py-1.5 px-2">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-black"></div> {ship.name}</span>
                            <span className="bg-black text-yellow-500 px-2 rounded-full font-mono border border-black/20">{ship.size} Canhões</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* ÁREA DE ATAQUE (RADARES) */}
                <section>
                  <div className="flex items-center gap-2 mb-4 bg-black text-yellow-500 p-2 px-4 rounded-lg w-fit print:border print:border-black">
                    <Crosshair size={20} />
                    <h3 className="pirate-font text-xl uppercase leading-none">Plano de Saque (Radar de Ataque)</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 print:grid-cols-4 gap-4">
                    {boards.map((otherBoard, otherIdx) => {
                      if (otherIdx === boardIndex) return null;
                      return (
                        <div key={`radar-${otherIdx}`} className="avoid-split border border-black/20 p-2 rounded-xl flex flex-col items-center gap-2 bg-white">
                          <div className="w-full flex justify-between items-center border-b border-black pb-1 mb-1">
                            <span className="text-[8px] font-black uppercase truncate max-w-[80px]">
                              {otherBoard.id}
                            </span>
                            <Skull size={10} className="text-red-600" />
                          </div>
                          <div className="scale-[0.85] origin-top">
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

              {/* RODAPÉ DA CARTELA */}
              <div className="mt-8 pt-4 border-t-2 border-black flex justify-between items-end bg-white">
                <div className="flex gap-6">
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-600 border border-black"></div>
                      <span className="text-[10px] font-black uppercase">Acerto (X)</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border border-black"></div>
                      <span className="text-[10px] font-black uppercase">Água (O)</span>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] pirate-font text-black/60 tracking-wider">Puerto Rico Board Games & Gastro Bar</p>
                  <p className="text-[8px] font-mono font-black opacity-30">V.4.5-NAVAL-ECO-PRINT</p>
                </div>
              </div>
            </div>
          ))}

          {/* GABARITO (Impresso em página separada) */}
          {boards.length > 0 && (
            <div className="print-page bg-yellow-500 text-black p-8 rounded-[3rem] shadow-2xl mx-0 gabarito-print">
              <div className="text-center mb-8 border-b-2 border-black pb-4">
                 <MapIcon size={40} className="mx-auto mb-2" />
                 <h2 className="pirate-font text-4xl uppercase leading-none">Mapa do Almirante (Gabarito)</h2>
                 <p className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Confidencial - Posição de Todas as Frotas</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 print:grid-cols-4 gap-6">
                 {boards.map((board) => (
                   <div key={`mirror-${board.id}`} className="avoid-split flex flex-col items-center gap-3 p-4 bg-white border-2 border-black rounded-3xl">
                      <span className="text-xs font-black uppercase italic bg-black text-yellow-500 px-3 py-1 rounded-full border border-black">{board.id}</span>
                      <BattleshipGrid board={board} showShips={true} scale={0.4} />
                   </div>
                 ))}
              </div>
              <div className="mt-8 pt-4 border-t border-black text-center opacity-40 no-print">
                 <p className="text-[9px] font-black uppercase">Este gabarito sai na última página da sua impressão.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-12 text-center no-print border-t border-white/10 opacity-30">
         <div className="flex justify-center gap-6 mb-4">
            <Anchor size={20} />
            <Skull size={20} />
            <Swords size={20} />
         </div>
         <p className="text-[10px] font-black uppercase tracking-[0.5em]">Puerto Rico Board Games & Gastro Bar • 2024</p>
      </footer>
    </div>
  );
};

export default App;