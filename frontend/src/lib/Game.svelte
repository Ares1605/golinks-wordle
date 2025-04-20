<script lang="ts">
  import trashLogo from "../assets/trash.svg";
  import refreshLogo from "../assets/refresh.svg";

  import Grid from "./Grid.svelte";
  import Keyboard from "./Keyboard.svelte";
  import Notif from "./Notif.svelte";
  import { Cell, getWord, Status, getCurrentCell, generateEmptyGrid } from "./grid";
  import { saveGameState, loadState, generateSeed, generateDate } from "./game";
  import API from "./api";
  import { GuessChar } from "./api";

  let state_ = loadState();
  let dateGenerated = $state(state_.date_generated);
  let grid = $state(state_.grid);
  let seed = $state(state_.seed);
  let locked = $state(state_.locked);

  let cell = getCurrentCell(grid);
  console.log(cell);
  let gridComp: Grid;
  let keyboardComp: Keyboard;
  let notifComp: Notif;

  $effect(() => {
    saveGameState(grid, seed, dateGenerated, locked);
  });

  const processEnter = async () => {
    console.log("Processing the enter key!");
    const row = grid[cell.row];

    if (cell.col !== row.length) {
      notifComp.setNotif("Not enough letters");
      gridComp.shakeRow(cell.row);
      return;
    }

    const word = getWord(row);
    API.guess(word, seed)
      .then(response => {
        const data = response.data;
        console.log(response);
        if (!data.is_valid_word) {
          notifComp.setNotif("Invalid word!");
          gridComp.shakeRow(cell.row)
          return;
        }

        locked = true;
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
        setTimeout(() => {
          locked = false;

          // if everything in data are right answers, we've won
          if (data.result.filter(i => i !== GuessChar.Right).length === 0) {
            notifComp.setNotif("Congrats! 🎉");
            locked = true;
          }
        }, (data.result.length - 1) * 175 + 550); // 550 for the 550 ms transition on the last cell

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
        return;
    const code = key.charCodeAt(0)
    // ASCII # of a => 97, and z => 122
    if (code < 97 || code > 122)
      return; // if the key is not a-z, then disregard the key (Enter and Backspace have already been accounted for)

    if (cell.col >= row.length)
        return;
    row[cell.col] = new Cell(key, Status.Pending);
    cell.col++;
  }

  let isClearing = $state(false);
  const clearGrid = () => {
    grid = generateEmptyGrid();
    cell = getCurrentCell(grid);
    locked = false;
    isClearing = true;
    notifComp.setNotif("Grid cleared, same word!")
    setTimeout(() => isClearing = false, 500);
  }
  let isRefreshing = $state(false);
  const refreshGrid = () => {
    isRefreshing = true;
    grid = generateEmptyGrid();
    cell = getCurrentCell(grid);
    seed = generateSeed();
    dateGenerated = generateDate();
    locked = false;
    notifComp.setNotif("Grid cleared, fresh word!")
    setTimeout(() => isRefreshing = false, 750);
  }
</script>

<div class="game">
    <div class="grid-cont">
      <!-- empty vbar on the left side to center the grid from the other vbar -->
      <div class="vbar"></div>
      <Grid height="100%" bind:this={gridComp} {grid}></Grid>
      <div class="vbar">
        <button class="clear" class:clearing={isClearing} onclick={clearGrid}><img alt="trash logo" src={trashLogo}></button>
        <button class="refresh" class:spinning={isRefreshing} onclick={refreshGrid}><img alt="refresh logo" src={refreshLogo}></button>
      </div>
    </div>
    <Keyboard bind:this={keyboardComp} {locked} height="30%" {onKey}></Keyboard>
    <Notif bind:this={notifComp} />
</div>

<style lang="scss">
  .game {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .grid-cont {
    display: flex;
    height: 60%;
    margin-bottom: 20px;
    justify-content: center;
  }
  .vbar {
    display: flex;
    gap: 7px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 30px 0px;
    width: 22px;
    height: 100%;

    img {
      width: 100%;
      aspect-ratio: 1;
    }
    button {
      box-sizing: border-box;
      cursor: pointer;
      background-color: transparent;
      border: none;
      padding: 0px;
      width: 100%;
      aspect-ratio: 1;
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    .clear {
      &:hover {
        transform: rotate(3deg) scale(1.07);
      }
      &.clearing {
        animation: clear-pop 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
      }
    }
    .refresh {
      width: 94%;
      padding-left: 3%;
      padding-right: 3%;
      &:hover {
        transform: rotate(35deg) scale(1.07);
      }
      &.spinning {
        animation: spin-with-bounce 0.75s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
      }
    }
    @keyframes clear-pop {
      0% {
        transform: scale(1);
      }
      40% {
        transform: scale(1.125);
      }
      70% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes spin-with-bounce {
      0% {
        transform: rotate(0deg) scale(1.07);
      }
      80% {
        transform: rotate(420deg) scale(1.11); /* spin a bit past 360 for bounce effect */
      }
      90% {
        transform: rotate(380deg) scale(1.09); /* bounce back */
      }
      100% {
        transform: rotate(390deg) scale(1.07); /* return to normal */
      }
    }
  }
  @media only screen and (min-height: 700px) {
    .vbar {
      width: 27px;
    }
  }
</style>
