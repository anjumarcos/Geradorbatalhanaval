
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
  { id: 'battleship', name: 'Battleship', size: 5, count: 1 },
  { id: 'cruiser', name: 'Cruiser', size: 4, count: 1 },
  { id: 'submarine', name: 'Submarine', size: 3, count: 1 },
  { id: 'destroyer', name: 'Destroyer', size: 3, count: 1 },
  { id: 'patrol_boat', name: 'Patrol Boat', size: 2, count: 2 },
];

export const ROWS = 10;
export const COLS = 11;
// Grid labels baseados em padrões de batalha naval profissionais
export const COL_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
