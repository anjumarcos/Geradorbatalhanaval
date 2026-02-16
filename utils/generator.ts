
import { BoardState, ShipPlacement, GET_SHIPS_CONFIG, GET_DIMENSIONS, Orientation, BoardSize } from '../types';

const canPlace = (
  grid: (string | null)[][],
  row: number,
  col: number,
  size: number,
  orientation: Orientation,
  maxRows: number,
  maxCols: number
): boolean => {
  if (orientation === 'H') {
    if (col + size > maxCols) return false;
    for (let i = 0; i < size; i++) {
      if (grid[row][col + i] !== null) return false;
    }
  } else {
    if (row + size > maxRows) return false;
    for (let i = 0; i < size; i++) {
      if (grid[row + i][col] !== null) return false;
    }
  }
  return true;
};

export const generateBoard = (id: string, boardSize: BoardSize): BoardState => {
  const { rows, cols } = GET_DIMENSIONS(boardSize);
  const ships_config = GET_SHIPS_CONFIG(boardSize);
  
  const grid: (string | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));
  const placements: ShipPlacement[] = [];

  for (const shipInfo of ships_config) {
    for (let c = 0; c < shipInfo.count; c++) {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 200) {
        attempts++;
        const orientation: Orientation = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        if (canPlace(grid, row, col, shipInfo.size, orientation, rows, cols)) {
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

  return { id, grid, ships: placements, rows, cols };
};
