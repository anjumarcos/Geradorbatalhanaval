
import { BoardState, ShipPlacement, SHIPS_CONFIG, ROWS, COLS, Orientation } from '../types';

const canPlace = (
  grid: (string | null)[][],
  row: number,
  col: number,
  size: number,
  orientation: Orientation
): boolean => {
  if (orientation === 'H') {
    if (col + size > COLS) return false;
    for (let i = 0; i < size; i++) {
      if (grid[row][col + i] !== null) return false;
    }
  } else {
    if (row + size > ROWS) return false;
    for (let i = 0; i < size; i++) {
      if (grid[row + i][col] !== null) return false;
    }
  }
  return true;
};

export const generateBoard = (id: string): BoardState => {
  const grid: (string | null)[][] = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
  const placements: ShipPlacement[] = [];

  for (const shipInfo of SHIPS_CONFIG) {
    for (let c = 0; c < shipInfo.count; c++) {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        attempts++;
        const orientation: Orientation = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);

        if (canPlace(grid, row, col, shipInfo.size, orientation)) {
          for (let i = 0; i < shipInfo.size; i++) {
            if (orientation === 'H') {
              grid[row][col + i] = shipInfo.id;
            } else {
              grid[row + i][col] = shipInfo.id;
            }
          }
          placements.push({
            shipId: shipInfo.id,
            row,
            col,
            orientation,
            size: shipInfo.size
          });
          placed = true;
        }
      }
    }
  }

  return { id, grid, ships: placements };
};
