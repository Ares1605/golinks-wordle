export enum Status {
  Wrong = "Wrong",
  Close = "Close", 
  Right = "Right",
  Pending = "Pending",
  Empty = "Empty",
}

export class Cell {
  value: string;
  status: Status;
  constructor(value: string, status: Status) {
    this.value = value;
    this.status = status;
  }
}

export const generateEmptyGrid = () => {
  const grid = [];
  for (let rowI = 0; rowI < 6; rowI++) {
    const row = [];
    for (let colI = 0; colI < 5; colI ++) {
      row.push(new Cell("", Status.Empty));
    }
    grid.push(row);
  }

  return grid;
}

export const getWord = (row: Cell[]): string => 
  row.map(cell => cell.value).join("");

export type GridJSON = {
  value: string,
  status: Status,
}[][];

export const gridMarshaller = (grid: Cell[][]): GridJSON =>
  grid.map(row => row.map(cell => ({
    value: cell.value,
    status: cell.status,
  })));
export const gridUnMarshaller = (gridJSON: GridJSON): GridJSON =>
  gridJSON.map(row => row.map(cell => new Cell(cell.value, cell.status)));

export const getCurrentCell = (grid: Cell[][]) => {
  console.log(grid);
  for (let rowI = 0; rowI < grid.length; rowI++) {
    const row = grid[rowI];
    for (let colI = 0; colI < row.length; colI++) {
      const col = row[colI];
      if (col.status === Status.Empty)
        return { row: rowI, col: colI };
      if (col.status === Status.Pending && colI + 1 === row.length)
        return { row: rowI, col: colI + 1 };
    }
  }
  return { row: grid.length, col: 0 };
}
