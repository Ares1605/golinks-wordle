<script lang="ts">
import { Cell, Status } from "./grid";

interface gridProps {
  grid: Cell[][];
  height: string;
};

let { grid, height }: gridProps = $props();

let shaking = $state(-1);

let shakingTimeout = -1;
export const shakeRow = (rowI: number) => {
  shaking = rowI;
  clearTimeout(shakingTimeout);
  shakingTimeout = setTimeout(() => shaking = -1, 500);
}
</script>

<div class="grid" style:height={height}>
  {#each grid as row, rowI}
  <div class="row" class:shake={rowI === shaking}>
    {#each row as cell}
        <div class="cell"
          class:pending={cell.status === Status.Pending}
          class:right={cell.status === Status.Right}
          class:wrong={cell.status === Status.Wrong}
          class:close={cell.status === Status.Close}
        >{cell.value}</div>
    {/each}
  </div>
  {/each}
</div>

<style lang="scss">
  .grid {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 10px;
  }
  .row {
    $gap: 4px;

    flex: 1 1 0%;

    display: flex;
    justify-content: center;
    gap: $gap;
    margin: $gap;
    
    &.shake {
      animation: shake .5s ease-in-out infinite;
    }
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    12.5% { transform: translateX(-5px); }
    25% { transform: translateX(5px); }
    37.5% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    62.5% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
    87.5% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

  .cell {
    --border-width: 4px;

    $pending-bkgrd-color: #FACAA5;
    box-sizing: border-box;
    display: flex;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: var(--border-width) solid var(--secondary-color);
    border-radius: 5px;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 23px;
    text-transform: capitalize;

    &.pending {
      background-color: $pending-bkgrd-color;
      animation: pop 70ms ease-in-out;
    }
    &.right {
      --to-be-background-color: #C25E59;
    }
    &.close {
      --to-be-background-color: #EBB746;
    }
    &.wrong {
      --to-be-background-color: var(--secondary-color);
    }

    &.right, &.close, &.wrong {
      animation: reveal 550ms ease-in-out forwards;
    }

    @keyframes reveal {
      0% { 
        transform: scaleY(1);
        background-color: $pending-bkgrd-color;
        border: var(--border-width) solid var(--secondary-color);
      }
      48% { 
        transform: scaleY(0.05);
        background-color: $pending-bkgrd-color;
        border: var(--border-width) solid var(--secondary-color);
      }
      50.01% {
        background-color: var(--to-be-background-color);
        border: none;
      }
      52% {
        transform: scaleY(0.05);
        background-color: var(--to-be-background-color);
        border: none;
      }
      100% { 
        transform: scaleY(1);
        background-color: var(--to-be-background-color);
        border: none;
      }
    }
  }
  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.07);
    }
    100% {
      transform: scale(1);
    }
  }

  @media screen and (max-height: 400px) {
    .cell {
      --border-width: 3px;
      border-width: var(--border-width);
    }
  }
</style>
