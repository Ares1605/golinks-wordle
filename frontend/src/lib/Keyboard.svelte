<script lang="ts">
  import enterIcon from "../assets/enter.svg";
  import bkspcIcon from "../assets/backspace.svg";
  import { type Grid, Heat, getWordHeatMap } from "./grid";

  interface KeyboardProps {
    onKey: (key: string) => void;
    height: string;
    locked: boolean;
    grid: Grid;
  }

  let { onKey: onKeyTriggerWrapper, grid, height, locked }: KeyboardProps = $props();

  let wordHeatMap: Map<string, Heat> = $state(getWordHeatMap(grid));
  $effect(() => { wordHeatMap = getWordHeatMap(grid) });
  
  class Icon {
    src: string;
    code: string;
    style: string;

    constructor(src: string, code: string, style = "") {
      this.src = src;
      this.code = code;
      this.style = style;
    }
  }

  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    [new Icon(enterIcon, "Enter", "height: 60%"), "z", "x", "c", "v", "b", "n", "m", new Icon(bkspcIcon, "Backspace")],
  ];

  const keysPressed: {[key: string]: boolean} = {};

  const onKeyTrigger = (key: string) => {
    if (locked) return;
    onKeyTriggerWrapper(key);
  }

  const onKeyDown = (event: KeyboardEvent) => {
    // if control is also being pressed, disregard the key event
    if (event.ctrlKey)
      return;
    event.preventDefault();
    // if the key is currently being pressed, disregard the consecutive events
    if (keysPressed[event.key])
      return;
    keysPressed[event.key] = true;

    onKeyTrigger(event.key);
  }
  const onKeyUp = (event: KeyboardEvent) => {
    keysPressed[event.key] = false;
  }
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<div class="keyboard" style:height={height}>
  {#each rows as row}
    <div class="row">
      {#each row as key}
        {#if key instanceof Icon}
          <button onclick={() => onKeyTrigger(key.code)} class="key"><img alt={key.code} style={key.style} src={key.src}></button>
        {:else}
          <button onclick={() => onKeyTrigger(key)}
            class:somewhere={wordHeatMap.get(key) === Heat.Somewhere}
            class:located={wordHeatMap.get(key) === Heat.Located}
            class:nowhere={wordHeatMap.get(key) === Heat.Nowhere}
            class="key">{key}</button>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
.keyboard {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
}
.row {
  flex: auto; 
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
}
.key {
  $height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  height: $height;
  aspect-ratio: .8;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-transform: capitalize;
  position: relative;

  transition: .15s background-color ease-in-out;

  img {
    position: absolute;
    max-width: 95%;
    max-height: 85%;
  }
}
.located { background-color: var(--located); }
.somewhere { background-color: var(--somewhere); }
.nowhere { background-color: var(--nowhere); }
</style>
