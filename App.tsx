
import React, { useState, useCallback } from 'react';
import { BoardState, SHIPS_CONFIG } from './types';
import { generateBoard } from './utils/generator';
import BattleshipGrid from './components/BattleshipGrid';
import { Anchor, Printer, RefreshCw, Crosshair, Shield, Users, Target, Info, Map as MapIcon } from 'lucide-react';

const App: React.FC = () => {
  const [numCards, setNumCards] = useState<number>(4);
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    // Delay estratégico para feedback de UX
    setTimeout(() => {
      const newBoards: BoardState[] = [];
      for (let i = 0; i < numCards; i++) {
        newBoards.push(generateBoard(`Comandante #${i + 1}`));
      }
      setBoards(newBoards);
      setIsGenerating(false);
    }, 600);
  }, [numCards]);

  const handlePrint = () => {
    // Método direto para garantir compatibilidade entre navegadores
    window.print();
  };

  return (
    <div className="min-h-screen pb-20 print:pb-0 bg-slate-900 text-slate-100 selection:bg-blue-500/30">
      {/* Menu de Comando - Oculto na Impressão */}
      <header className="bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 p-6 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 rotate-3">
              <Anchor size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">Batalha Royale</h1>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Gerador de Combate Marítimo</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
            <div className="flex flex-col">
              <label className="text-[10px] uppercase font-black text-slate-500 mb-1 ml-1">Total de Frotas</label>
              <input 
                type="number" 
                min="2" 
                max="25" 
                value={numCards}
                onChange={(e) => setNumCards(Math.max(2, parseInt(e.target.value) || 2))}
                className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-white w-20 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white px-8 py-3 rounded-xl font-black uppercase tracking-tight transition-all h-fit self-end shadow-xl active:scale-95 disabled:text-slate-500"
            >
              <RefreshCw className={isGenerating ? 'animate-spin' : ''} size={18} />
              {isGenerating ? 'Mobilizando...' : 'Gerar Armada'}
            </button>
            {boards.length > 0 && (
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-black uppercase tracking-tight transition-all h-fit self-end shadow-xl"
              >
                <Printer size={18} />
                IMPRIMIR
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 mt-8 print:mt-0">
        {boards.length === 0 && !isGenerating && (
          <div className="flex flex-col items-center justify-center py-40 text-slate-700">
            <div className="relative mb-8">
               <Target size={120} className="opacity-10" />
               <Crosshair size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse text-blue-500" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-[0.3em]">Aguardando Coordenadas</h2>
            <p className="mt-2 text-slate-500 font-medium">Configure a quantidade de jogadores para gerar o Kit de Guerra.</p>
          </div>
        )}

        {/* Listagem das Cartelas - Transformadas em Páginas de Impressão */}
        <div className="space-y-12 print:space-y-0">
          {boards.map((currentBoard, boardIndex) => (
            <div 
              key={currentBoard.id} 
              className="print-page bg-white text-slate-900 p-8 md:p-12 rounded-[3rem] border border-slate-800/10 shadow-2xl print:shadow-none print:border-0 print:p-0 print:m-0"
            >
              {/* Header da Página */}
              <div className="flex justify-between items-end border-b-4 border-slate-900 pb-6 mb-8 print:mb-10">
                <div className="flex items-center gap-6">
                  <div className="bg-slate-900 text-white p-4 rounded-3xl">
                    <Shield size={48} />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                      {currentBoard.id}
                    </h2>
                    <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Dossiê Tático de Combate</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase text-slate-400">Página</div>
                  <div className="text-4xl font-black text-slate-200 italic">#{boardIndex + 1}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {/* PARTE 1: MINHA FROTA (VISÍVEL) */}
                <section className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 print:bg-white print:border-2 print:border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="text-blue-600" size={24} />
                    <h3 className="text-xl font-black uppercase italic text-slate-800">Minha Frota (Defesa)</h3>
                  </div>
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="shrink-0">
                       <BattleshipGrid board={currentBoard} showShips={true} scale={0.8} />
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm print:shadow-none">
                        <h4 className="text-[10px] font-black uppercase text-blue-500 mb-3 flex items-center gap-2">
                           <Info size={14} /> Protocolo de Segurança
                        </h4>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                          "Não revele esta folha aos seus oponentes. Use esta grade para marcar os disparos recebidos. Se um navio for totalmente atingido, ele afunda."
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {SHIPS_CONFIG.map(ship => (
                          <div key={ship.id} className="flex items-center justify-between text-[10px] font-bold uppercase p-2 border-b border-slate-100">
                            <span className="text-slate-400">{ship.name}</span>
                            <span className="bg-slate-900 text-white px-2 rounded-full font-mono">{ship.size} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* PARTE 2: RADARES DE ATAQUE (EM BRANCO) */}
                <section>
                  <div className="flex items-center gap-3 mb-8 bg-slate-900 text-white p-4 rounded-2xl w-fit">
                    <Crosshair className="text-red-500" size={24} />
                    <h3 className="text-xl font-black uppercase italic">Radar de Ataque (Ofensiva)</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-3 gap-8">
                    {boards.map((otherBoard, otherIdx) => {
                      if (otherIdx === boardIndex) return null;
                      
                      return (
                        <div key={`radar-${otherIdx}`} className="flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2 px-1">
                            <span className="text-[10px] font-black uppercase italic text-slate-500">
                              ALVO: {otherBoard.id}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-red-600 shadow-sm animate-pulse"></div>
                          </div>
                          <div className="flex justify-center">
                            <BattleshipGrid 
                              board={{...otherBoard, grid: otherBoard.grid.map(r => r.map(() => null))}} 
                              showShips={false} 
                              scale={0.4} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Footer da Página de Impressão */}
              <div className="mt-16 pt-8 border-t-2 border-dashed border-slate-200 flex justify-between items-center opacity-30">
                <div className="flex gap-8">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      <span className="text-[9px] font-black uppercase">X = FOGO (Acerto)</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-blue-600"></div>
                      <span className="text-[9px] font-black uppercase">O = ÁGUA (Erro)</span>
                   </div>
                </div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  NAV-ROYALE-GEN-v3.0
                </div>
              </div>
            </div>
          ))}

          {/* Gabarito Final - No-Print por padrão para o Árbitro */}
          <div className="bg-slate-800 text-white p-12 rounded-[3rem] no-print border border-slate-700 shadow-2xl">
            <div className="text-center mb-12">
               <MapIcon size={48} className="mx-auto text-blue-500 mb-4" />
               <h2 className="text-3xl font-black uppercase italic">Espelho de Comando</h2>
               <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-1">Gabarito Secreto para o Árbitro da Partida</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {boards.map((board) => (
                 <div key={`mirror-${board.id}`} className="flex flex-col items-center gap-3 p-4 bg-slate-900 rounded-3xl border border-slate-700">
                    <span className="text-[10px] font-black uppercase italic text-blue-400">{board.id}</span>
                    <BattleshipGrid board={board} showShips={true} scale={0.35} />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-40 py-20 text-center no-print border-t border-slate-800 bg-slate-900/50">
         <div className="flex justify-center gap-8 opacity-10 mb-6">
            <Anchor size={24} />
            <Crosshair size={24} />
            <Shield size={24} />
         </div>
         <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">Naval Strike Systems - Tactical Unit</p>
      </footer>
    </div>
  );
};

export default App;
