import { Cell, gridUnMarshaller, gridMarshaller, generateEmptyGrid, type GridJSON } from "./grid";

type StateJSON = {
  seed: number,
  grid: GridJSON,
  date_generated: string,
  locked: boolean,
} | null;
type State = {
  seed: number,
  grid: Cell[][],
  date_generated: string,
  locked: boolean,
};

const stateUnMarshaller = (stateJSON: StateJSON): State|null => {
  if (stateJSON === null) return null;
  stateJSON.grid = gridUnMarshaller(stateJSON.grid);
  return stateJSON;
}
const stateMarshaller = (state: State): StateJSON => {
  state.grid = gridMarshaller(state.grid);
  return state;
}
export const getGameState = (): State|null => {
  try {
    const stateRaw = localStorage.getItem("state");
    if (stateRaw === null)
      return null;
    const stateJSON = JSON.parse(stateRaw) as StateJSON;
    return stateUnMarshaller(stateJSON);
  } catch(error) {
    console.error("error while getting game state from local storage: ", error)
    return null;
  }
}
export const generateSeed = () => Math.floor(Math.random() * 1000000);
export const generateDate = () => new Date().toLocaleDateString();
export const loadState = (): State => {
  const gameState = getGameState();
  if (gameState === null) {
    return {
      grid: generateEmptyGrid(),
      seed: generateSeed(),
      date_generated: generateDate(),
      locked: false,
    };
  }
  return gameState;
}

export const saveGameState = (grid: Cell[][], seed: number, dateGenerated: string, locked: boolean) => {
  const state: State = {
    grid: grid,
    seed: seed,
    date_generated: dateGenerated,
    locked: locked,
  };
  localStorage.setItem("state",  JSON.stringify(stateMarshaller(state)));
}
