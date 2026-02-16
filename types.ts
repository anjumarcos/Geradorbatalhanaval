
export type ShipType = {
  id: string;
  name: string;
  size: number;
  count: number;
};

export type Orientation = 'H' | 'V';

export type ShipPlacement = {
  shipId: string;
  row: number;
  col: number;
  orientation: Orientation;
  size: number;
};

export type BoardSize = 'LARGE' | 'MEDIUM' | 'SMALL';

export type BoardState = {
  id: string;
  grid: (string | null)[][];
  ships: ShipPlacement[];
  rows: number;
  cols: number;
};

export const GET_SHIPS_CONFIG = (size: BoardSize): ShipType[] => {
  switch (size) {
    case 'SMALL':
      return [
        { id: 'bergantim', name: 'Bergantim', size: 3, count: 1 },
        { id: 'escuna', name: 'Escuna', size: 3, count: 1 },
        { id: 'bote', name: 'Bote', size: 2, count: 2 },
      ];
    case 'MEDIUM':
      return [
        { id: 'caravela', name: 'Caravela Imperial', size: 4, count: 1 },
        { id: 'bergantim', name: 'Bergantim Rápido', size: 3, count: 1 },
        { id: 'escuna', name: 'Escuna Pirata', size: 3, count: 1 },
        { id: 'bote', name: 'Bote de Saque', size: 2, count: 2 },
      ];
    default: // LARGE
      return [
        { id: 'galeao', name: 'Galeão de Guerra', size: 5, count: 1 },
        { id: 'caravela', name: 'Caravela Imperial', size: 4, count: 1 },
        { id: 'bergantim', name: 'Bergantim Rápido', size: 3, count: 1 },
        { id: 'escuna', name: 'Escuna Pirata', size: 3, count: 1 },
        { id: 'bote', name: 'Bote de Saque', size: 2, count: 2 },
      ];
  }
};

export const GET_DIMENSIONS = (size: BoardSize) => {
  switch (size) {
    case 'SMALL': return { rows: 6, cols: 7 };
    case 'MEDIUM': return { rows: 8, cols: 9 };
    default: return { rows: 10, cols: 11 };
  }
};

export const COL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
