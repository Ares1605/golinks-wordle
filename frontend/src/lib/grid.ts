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
      row.push(new Cell(" ", Status.Empty));
    }
    grid.push(row);
  }

  return grid;
}

export const getWord = (row: Cell[]): string => 
  row.map(cell => cell.value).join("");
