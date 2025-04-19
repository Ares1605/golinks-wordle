<script lang="ts">
  import Grid from "./Grid.svelte";
  import Keyboard from "./Keyboard.svelte";

  let cell = { row: 0, col: 0 };
  let grid = $state([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]);

  const processEnter = () => {
    console.log("Processing the enter key!");
    const row = grid[cell.row];

    if (cell.col === row.length) {
      console.log("Going to new row");
      cell.row++;
      cell.col = 0;
    }
  }
  const processBackspace  = () => {
    console.log("Processing the backspace key!");
    cell.col = Math.max(cell.col - 1, 0);
    grid[cell.row][cell.col] = "";
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
    row[cell.col] = key;
    cell.col++;
  }
</script>

<div class="populator"></div>
<Grid {grid}></Grid>
<Keyboard onKey={onKey}></Keyboard>

<style lang="scss">
  .populator {
    width: 100%;
    height: 125px;
  }
</style>
