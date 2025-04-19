<script lang="ts">
  import Grid from "./Grid.svelte";
  import Keyboard from "./Keyboard.svelte";
  import { Cell, generateEmptyGrid, getWord, Status } from "./grid";
  import API from "./api";
  import { GuessChar } from "./api";

  let cell = { row: 0, col: 0 };
  let grid = $state(generateEmptyGrid());
  let gridComp: Grid;

  const processEnter = async () => {
    console.log("Processing the enter key!");
    const row = grid[cell.row];

    if (cell.col !== row.length) {
      gridComp.shakeRow(cell.row);
      return;
    }

    const word = getWord(row);
    API.guess(word)
      .then(response => {
        const data = response.data;
        console.log(response);
        if (!data.is_valid_word) {
          gridComp.shakeRow(cell.row)
          return;
        }

        for (let colI = 0; colI < data.result.length; colI++) {
          let status: Status;
          switch (data.result[colI]) {
            case GuessChar.Wrong:
              status = Status.Wrong;
              break;
            case GuessChar.Right:
              status = Status.Right;
              break;
            case GuessChar.Close:
              status = Status.Close;
              break;
            default:
              throw new Error(`Unknown status: ${data.result[colI]}`)
          }
          // create a new cell (instead of updating status property)
          // to trigger a re-render on the grid cell component
          setTimeout(() => {
            row[colI] = new Cell(row[colI].value, status);
          }, colI * 175);
        }

        console.log("Going to new row");
        cell.row++;
        cell.col = 0;
      })
      .catch(error => {
        console.error(error);
      });
  }
  const processBackspace  = () => {
    console.log("Processing the backspace key!");
    cell.col = Math.max(cell.col - 1, 0);
    grid[cell.row][cell.col] = new Cell(" ", Status.Empty);
  }
  const onKey = (key: string) => {
    const row = grid[cell.row];
    if (key === "Enter")
      processEnter();
    if (key === "Backspace")
      processBackspace();
    key = key.toLowerCase();
    // if the key is longer then one character, it must be a keyboard code like Alt or Menu (not a-z)
    if (key.length > 1)
        return
    const code = key.charCodeAt(0)
    // ASCII # of a => 97, and z => 122
    if (code < 97 || code > 122)
      return // if the key is not a-z, then disregard the key (Enter and Backspace have already been accounted for)

    if (cell.col >= row.length)
        return // TODO: add a "camera" shake
    row[cell.col] = new Cell(key, Status.Pending);
    cell.col++;
  }
</script>

<Grid height="60%" bind:this={gridComp} {grid}></Grid>
<Keyboard height="30%" onKey={onKey}></Keyboard>
