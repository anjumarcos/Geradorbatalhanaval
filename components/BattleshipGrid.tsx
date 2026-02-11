
import React from 'react';
import { COL_LABELS, ROWS, COLS, BoardState, Orientation } from '../types';

interface BattleshipGridProps {
  board: BoardState;
  showShips?: boolean;
  scale?: number;
}

const ShipPart: React.FC<{ 
  type: string; 
  part: 'front' | 'middle' | 'back' | 'single'; 
  orientation: Orientation;
  scale: number;
}> = ({ type, part, orientation, scale }) => {
  const isVertical = orientation === 'V';
  const rotation = isVertical ? 'rotate-90' : '';
  
  const colors: Record<string, string> = {
    battleship: '#1e293b',
    cruiser: '#334155',
    submarine: '#475569',
    destroyer: '#64748b',
    patrol_boat: '#94a3b8',
  };

  const color = colors[type] || '#ccc';

  return (
    <svg 
      viewBox="0 0 40 40" 
      className={`absolute inset-0 w-full h-full ${rotation}`}
      style={{ filter: scale > 0.6 ? 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))' : 'none' }}
    >
      {part === 'front' && (
        <path d="M40,10 L15,10 C5,10 0,20 0,20 C0,20 5,30 15,30 L40,30 Z" fill={color} />
      )}
      {part === 'middle' && (
        <rect x="0" y="10" width="40" height="20" fill={color} />
      )}
      {part === 'back' && (
        <path d="M0,10 L25,10 C35,10 40,15 40,20 L40,20 C40,25 35,30 25,30 L0,30 Z" fill={color} />
      )}
      {scale > 0.7 && part === 'middle' && (
        <>
          <circle cx="10" cy="20" r="1.5" fill="white" fillOpacity="0.4" />
          <circle cx="20" cy="20" r="1.5" fill="white" fillOpacity="0.4" />
          <circle cx="30" cy="20" r="1.5" fill="white" fillOpacity="0.4" />
        </>
      )}
    </svg>
  );
};

const BattleshipGrid: React.FC<BattleshipGridProps> = ({ board, showShips = false, scale = 1 }) => {
  const { grid, ships } = board;
  const cellDimension = scale * 2.1; // Ligeiramente menor para caber melhor no A4
  
  const cellStyle = {
    width: `${cellDimension}rem`,
    height: `${cellDimension}rem`,
  };

  const labelStyle = {
    width: `${cellDimension}rem`,
    height: `${cellDimension}rem`,
    fontSize: `${scale * 0.7}rem`,
  };

  const getShipPartInfo = (r: number, c: number) => {
    if (!showShips) return null;
    
    for (const ship of ships) {
      const { row, col, orientation, size, shipId } = ship;
      for (let i = 0; i < size; i++) {
        const currR = orientation === 'V' ? row + i : row;
        const currC = orientation === 'H' ? col + i : col;
        if (currR === r && currC === c) {
          let part: 'front' | 'middle' | 'back' = 'middle';
          if (i === 0) part = 'front';
          else if (i === size - 1) part = 'back';
          return { type: shipId, part, orientation };
        }
      }
    }
    return null;
  };

  return (
    <div className={`inline-block border-slate-900 bg-white shadow-lg print:shadow-none overflow-hidden ${scale > 0.5 ? 'border-[3px]' : 'border-2'}`}>
      {/* Column Labels */}
      <div className="flex">
        <div style={labelStyle} className={`flex items-center justify-center border-slate-900 font-black bg-slate-100 uppercase mono text-slate-400 ${scale > 0.5 ? 'border-b-2 border-r-2' : 'border-b border-r'}`}>
          #
        </div>
        {COL_LABELS.map((label, i) => (
          <div 
            key={i} 
            style={labelStyle} 
            className={`flex items-center justify-center border-slate-900 font-black bg-slate-100 mono text-slate-800 ${scale > 0.5 ? 'border-b-2 border-r' : 'border-b border-r'}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Grid Rows */}
      {grid.map((row, rIdx) => (
        <div key={rIdx} className="flex">
          {/* Row Label */}
          <div 
            style={labelStyle} 
            className={`flex items-center justify-center border-slate-900 font-black bg-slate-100 mono text-slate-800 ${scale > 0.5 ? 'border-r-2 border-b' : 'border-r border-b'}`}
          >
            {rIdx + 1}
          </div>
          {row.map((_, cIdx) => {
            const partInfo = getShipPartInfo(rIdx, cIdx);
            return (
              <div
                key={cIdx}
                style={cellStyle}
                className={`
                  border-slate-300 relative
                  ${cIdx === COLS - 1 ? '' : 'border-r'}
                  ${rIdx === ROWS - 1 ? '' : 'border-b'}
                  bg-[radial-gradient(#cbd5e1_0.5px,transparent_0.5px)] bg-[size:5px_5px]
                `}
              >
                {partInfo && (
                  <ShipPart 
                    type={partInfo.type} 
                    part={partInfo.part} 
                    orientation={partInfo.orientation} 
                    scale={scale}
                  />
                )}
                {/* Indicador sutil de centro para o radar de ataque */}
                {!partInfo && !showShips && (
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
                     <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                   </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BattleshipGrid;
