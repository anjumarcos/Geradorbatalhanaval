
import React, { useState, useCallback } from 'react';
import { BoardState, GET_SHIPS_CONFIG, BoardSize } from './types';
import { generateBoard } from './utils/generator';
import BattleshipGrid from './components/BattleshipGrid';
import { Skull, Printer, RefreshCw, Crosshair, Swords, Compass, Map as MapIcon, Anchor } from 'lucide-react';

const App: React.FC = () => {
  const [numCardsInput, setNumCardsInput] = useState<string>('4');
  const [selectedSize, setSelectedSize] = useState<BoardSize>('LARGE');
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    const count = Math.max(2, Math.min(25, parseInt(numCardsInput) || 2));
    setNumCardsInput(count.toString()); // Normaliza o valor no input após gerar

    setTimeout(() => {
      const newBoards: BoardState[] = [];
      for (let i = 0; i < count; i++) {
        newBoards.push(generateBoard(`CAPITÃO #${i + 1}`, selectedSize));
      }
      setBoards(newBoards);
      setIsGenerating(false);
    }, 600);
  }, [numCardsInput, selectedSize]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen pb-20 print:pb-0 print:bg-white bg-[#0a0a0a] text-white selection:bg-yellow-500/30">
      {/* HEADER DA TELA */}
      <header className="bg-black border-b-4 border-yellow-500 p-4 no-print sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500 rounded-lg text-black">
              <Anchor size={28} />
            </div>
            <div>
              <h1 className="pirate-font text-3xl text-yellow-500 leading-none">Puerto Rico Naval</h1>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Mapeador de Saques</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="flex flex-col">
              <label className="text-[8px] uppercase font-black text-yellow-500/70 mb-1 ml-1">Tamanho da Grade</label>
              <div className="flex bg-black p-1 rounded-lg border border-yellow-500/30">
                {(['SMALL', 'MEDIUM', 'LARGE'] as BoardSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-all ${
                      selectedSize === size ? 'bg-yellow-500 text-black' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {size === 'SMALL' ? 'Peq' : size === 'MEDIUM' ? 'Méd' : 'Grd'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[8px] uppercase font-black text-yellow-500/70 mb-1 ml-1">Capitães</label>
              <input 
                type="number" 
                value={numCardsInput}
                onChange={(e) => setNumCardsInput(e.target.value)}
                placeholder="2"
                className="bg-black border border-yellow-500/30 rounded-lg px-3 py-1 text-yellow-500 w-16 font-bold outline-none"
              />
            </div>

            <div className="flex items-end h-full gap-2">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-xl font-black uppercase text-xs transition-all active:scale-95"
              >
                <RefreshCw className={isGenerating ? 'animate-spin' : ''} size={14} />
                {isGenerating ? 'Gerando...' : 'Zarpar'}
              </button>
              {boards.length > 0 && (
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-black uppercase text-xs transition-all hover:bg-yellow-50"
                >
                  <Printer size={14} />
                  Imprimir
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 mt-8 print:mt-0 print:px-0 print:max-w-none">
        <div className="space-y-12 print:space-y-0">
          {boards.map((currentBoard, boardIndex) => (
            <div 
              key={currentBoard.id} 
              className="print-page bg-white text-black p-10 rounded-[2.5rem] border-4 border-yellow-500 print:border-0 print:p-8"
            >
              {/* CABEÇALHO */}
              <div className="flex justify-between items-center border-b-[3px] border-black pb-4 mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 border-2 border-black flex items-center justify-center rounded-2xl overflow-hidden shrink-0">
                    <img 
                      src="/logo.png" 
                      alt="Logo Puerto Rico" 
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('p-4');
                      }}
                    />
                    <Skull className="text-black opacity-10" size={40} />
                  </div>
                  <div>
                    <h2 className="pirate-font text-4xl text-black leading-none mb-1">
                      1ª Batalha Naval do Puerto Rico
                    </h2>
                    <div className="flex items-center gap-3">
                       <span className="bg-yellow-500 text-black px-3 py-0.5 text-[11px] font-black rounded-full border border-black">{currentBoard.id}</span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Formato: {selectedSize === 'SMALL' ? 'Pequeno' : selectedSize === 'MEDIUM' ? 'Médio' : 'Grande'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-black/30 mb-1 uppercase">Página</p>
                   <span className="pirate-font text-5xl text-black/10">#{boardIndex + 1}</span>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                {/* DEFESA */}
                <section className="border-2 border-black p-6 rounded-3xl bg-yellow-500/5 print:bg-white">
                  <div className="flex items-center gap-2 mb-4 border-b border-black/10 pb-2">
                    <Anchor className="text-black" size={24} />
                    <h3 className="pirate-font text-2xl uppercase">Frota de Defesa (Suas Posições)</h3>
                  </div>
                  <div className="flex flex-col xl:flex-row gap-10 items-center xl:items-start">
                    <div className="shrink-0 scale-95 origin-top-left">
                       <BattleshipGrid board={currentBoard} showShips={true} scale={0.75} />
                    </div>
                    <div className="flex-1 w-full space-y-6">
                      <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] print:shadow-none">
                        <p className="text-sm font-bold leading-relaxed italic">
                          "Tripulante! Marque os ataques do adversário neste mapa. Se todos os canhões de um navio forem atingidos, ele afundará!"
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {GET_SHIPS_CONFIG(selectedSize).map(ship => (
                          <div key={ship.id} className="flex justify-between items-center text-[10px] font-black uppercase border-b-2 border-dashed border-black/10 py-2">
                            <span className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 bg-black rotate-45"></div> 
                              {ship.name}
                            </span>
                            <span className="bg-black text-yellow-500 px-3 py-0.5 rounded-full font-mono text-[11px] border border-black">{ship.size} Canhões</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* ATAQUE (RADARES AMPLIADOS) */}
                <section className="bg-white">
                  <div className="flex items-center gap-3 mb-6 bg-black text-yellow-500 p-3 px-6 rounded-2xl w-fit border-2 border-black">
                    <Crosshair size={24} />
                    <h3 className="pirate-font text-2xl uppercase leading-none">Mapa de Saque (Marque seus tiros aqui)</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-x-8 gap-y-12">
                    {boards.map((otherBoard, otherIdx) => {
                      if (otherIdx === boardIndex) return null;
                      return (
                        <div key={`radar-${otherIdx}`} className="avoid-split border-2 border-black/20 p-6 rounded-[2.5rem] flex flex-col items-center gap-6 bg-white hover:border-black/30 transition-colors">
                          <div className="w-full flex justify-between items-center border-b-2 border-black pb-2">
                            <span className="text-sm font-black uppercase text-black">
                              ALVO: {otherBoard.id}
                            </span>
                            <div className="flex gap-1">
                              <Skull size={16} className="text-black/20" />
                              <Skull size={16} className="text-black/20" />
                            </div>
                          </div>
                          <div className="scale-[1.2] origin-top py-4">
                            <BattleshipGrid 
                              board={{...otherBoard, grid: otherBoard.grid.map(r => r.map(() => null))}} 
                              showShips={false} 
                              scale={0.72} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* RODAPÉ */}
              <div className="mt-12 pt-6 border-t-[3px] border-black flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-8">
                   <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-600 border-2 border-black rounded shadow-sm"></div>
                      <span className="text-xs font-black uppercase">ACERTO (X)</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white border-2 border-black rounded shadow-sm"></div>
                      <span className="text-xs font-black uppercase">ÁGUA (O)</span>
                   </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm pirate-font text-black tracking-widest">Puerto Rico Board Games & Gastro Bar</p>
                  <p className="text-[9px] font-mono font-black opacity-40 uppercase">V.5.2-NAVAL-MAX-VIEW</p>
                </div>
              </div>
            </div>
          ))}

          {/* GABARITO (PÁGINA FINAL) */}
          {boards.length > 0 && (
            <div className="print-page bg-yellow-500 text-black p-12 rounded-[4rem] shadow-none mx-0 gabarito-print">
              <div className="text-center mb-10 border-b-4 border-black pb-6">
                 <MapIcon size={48} className="mx-auto mb-3" />
                 <h2 className="pirate-font text-5xl uppercase leading-none">Gabarito do Almirante</h2>
                 <p className="text-sm font-black uppercase tracking-[0.4em] opacity-70">Posição Real de Todas as Frotas</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-3 gap-8">
                 {boards.map((board) => (
                   <div key={`mirror-${board.id}`} className="avoid-split flex flex-col items-center gap-4 p-6 bg-white border-4 border-black rounded-[2.5rem]">
                      <span className="text-sm font-black uppercase italic bg-black text-yellow-500 px-5 py-1.5 rounded-full border-2 border-black shadow-md">{board.id}</span>
                      <BattleshipGrid board={board} showShips={true} scale={0.45} />
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-16 text-center no-print border-t border-white/10 opacity-30">
         <div className="flex justify-center gap-8 mb-4">
            <Anchor size={24} />
            <Skull size={24} />
            <Swords size={24} />
         </div>
         <p className="text-xs font-black uppercase tracking-[0.6em]">Puerto Rico • 2024</p>
      </footer>
    </div>
  );
};

export default App;
