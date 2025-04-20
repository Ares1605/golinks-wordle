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

export type Grid = Cell[][];

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

export const gridMarshaller = (grid: Grid): GridJSON =>
  grid.map(row => row.map(cell => ({
    value: cell.value,
    status: cell.status,
  })));
export const gridUnMarshaller = (gridJSON: GridJSON): GridJSON =>
  gridJSON.map(row => row.map(cell => new Cell(cell.value, cell.status)));

export const getCurrentCell = (grid: Grid) => {
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

export enum Heat {
  Nowhere = 'Nowhere',
  Somewhere = 'Somewhere',
  Located = 'Located',
}

export const getWordHeatMap = (grid: Grid): Map<string, Heat> => {
  const statusToHeat = (status: Status.Wrong | Status.Right | Status.Close): Heat => {
    switch (status) {
      case Status.Close:
        return Heat.Somewhere;
      case Status.Wrong:
        return Heat.Nowhere;
      case Status.Right:
        return Heat.Located;
    }
  }

  const heatMap = new Map<string, Heat>();
  for (const row of grid) {
    for (const cell of row) {
      // if empty or pending is found, we expect there to be no more non-empty/non-pending cells, so just return heatMap
      if (cell.status === Status.Pending || cell.status === Status.Empty)
        return heatMap;
      const heat = statusToHeat(cell.status);
      if (heatMap.has(cell.value)) {
        switch (heatMap.get(cell.value)) {
          case Heat.Nowhere:
            if (heat !== Heat.Nowhere)
              heatMap.set(cell.value, heat);
          case Heat.Somewhere:
            if (heat === Heat.Located)
              heatMap.set(cell.value, heat);
        }
      } else {
        heatMap.set(cell.value, heat);
      }
    }
  }

  return heatMap;
}
