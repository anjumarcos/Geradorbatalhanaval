
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

export type BoardState = {
  id: string;
  grid: (string | null)[][];
  ships: ShipPlacement[];
};

export const SHIPS_CONFIG: ShipType[] = [
  { id: 'galeao', name: 'Galeão de Guerra', size: 5, count: 1 },
  { id: 'caravela', name: 'Caravela Imperial', size: 4, count: 1 },
  { id: 'bergantim', name: 'Bergantim Rápido', size: 3, count: 1 },
  { id: 'escuna', name: 'Escuna Pirata', size: 3, count: 1 },
  { id: 'bote', name: 'Bote de Saque', size: 2, count: 2 },
];

export const ROWS = 10;
export const COLS = 11;
export const COL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
