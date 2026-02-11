
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
    galeao: '#451a03',    // Madeira escura
    caravela: '#78350f',  // Madeira média
    bergantim: '#92400e', // Madeira clara
    escuna: '#b45309',    // Madeira bronze
    bote: '#d97706',      // Madeira dourada
  };

  const color = colors[type] || '#451a03';

  return (
    <svg 
      viewBox="0 0 40 40" 
      className={`absolute inset-0 w-full h-full ${rotation}`}
    >
      {part === 'front' && (
        <path d="M40,5 L15,5 C5,5 0,20 0,20 C0,20 5,35 15,35 L40,35 Z" fill={color} stroke="#facc15" strokeWidth="1" />
      )}
      {part === 'middle' && (
        <rect x="0" y="5" width="40" height="30" fill={color} stroke="#facc15" strokeWidth="0.5" />
      )}
      {part === 'back' && (
        <path d="M0,5 L30,5 C35,5 40,10 40,20 L40,20 C40,30 35,35 30,35 L0,35 Z" fill={color} stroke="#facc15" strokeWidth="1" />
      )}
      {scale > 0.7 && part === 'middle' && (
        <>
          <rect x="15" y="10" width="10" height="20" fill="#facc15" fillOpacity="0.2" />
          <circle cx="20" cy="20" r="2" fill="#facc15" />
        </>
      )}
    </svg>
  );
};

const BattleshipGrid: React.FC<BattleshipGridProps> = ({ board, showShips = false, scale = 1 }) => {
  const { grid, ships } = board;
  const cellDimension = scale * 2.1;
  
  const cellStyle = {
    width: `${cellDimension}rem`,
    height: `${cellDimension}rem`,
  };

  const labelStyle = {
    width: `${cellDimension}rem`,
    height: `${cellDimension}rem`,
    fontSize: `${scale * 0.75}rem`,
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
    <div className={`inline-block bg-white shadow-xl print:shadow-none overflow-hidden ${scale > 0.5 ? 'border-[3px] border-black' : 'border-2 border-black'}`}>
      {/* Column Labels */}
      <div className="flex bg-[#facc15]">
        <div style={labelStyle} className={`flex items-center justify-center font-black border-black mono ${scale > 0.5 ? 'border-b-2 border-r-2' : 'border-b border-r'}`}>
          #
        </div>
        {COL_LABELS.map((label, i) => (
          <div 
            key={i} 
            style={labelStyle} 
            className={`flex items-center justify-center border-black font-black mono text-black ${scale > 0.5 ? 'border-b-2 border-r' : 'border-b border-r'}`}
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
            className={`flex items-center justify-center border-black font-black bg-[#facc15] mono text-black ${scale > 0.5 ? 'border-r-2 border-b' : 'border-r border-b'}`}
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
                  border-black/10 relative
                  ${cIdx === COLS - 1 ? '' : 'border-r'}
                  ${rIdx === ROWS - 1 ? '' : 'border-b'}
                  bg-[radial-gradient(#00000015_0.5px,transparent_0.5px)] bg-[size:6px_6px]
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
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BattleshipGrid;
