import { Cell, gridUnMarshaller, gridMarshaller, generateEmptyGrid } from "./grid";

export const getGameState = (): Cell[][]|null => {
  try {
    const gridRaw = localStorage.getItem("grid");
    if (gridRaw === null)
      return null;
    const gridJSON = JSON.parse(gridRaw);
    return gridUnMarshaller(gridJSON);
  } catch(error) {
    console.error("error while getting game state from local storage: ", error)
    return null;
  }
}
export const loadGrid = (): Cell[][] => {
  const gameState = getGameState();
  if (gameState === null) {
    return generateEmptyGrid();
  }
  return gameState;
}

export const saveGameState = (grid: Cell[][]) => {
  localStorage.setItem("grid",  JSON.stringify(gridMarshaller(grid)));
}
