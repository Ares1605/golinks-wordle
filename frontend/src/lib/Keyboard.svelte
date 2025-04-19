<script lang="ts">
  import enterIcon from "../assets/enter.svg";
  import bkspcIcon from "../assets/backspace.svg";

  interface KeyboardProps {
    onKey: (key: string) => void;
    height: string;
  }

  let { onKey: onKeyTrigger, height }: KeyboardProps = $props();

  class Logo {
    src: string;
    code: string;

    constructor(src: string, code: string) {
      this.src = src;
      this.code = code;
    }
  }

  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    [new Logo(enterIcon, "Enter"), "z", "x", "c", "v", "b", "n", "m", new Logo(bkspcIcon, "Backspace")],
  ];

  const keysPressed: {[key: string]: boolean} = {};

  const onKeyDown = (event: KeyboardEvent) => {
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
        {#if key instanceof Logo}
          <button onclick={() => onKeyTrigger(key.code)} class="key"><img alt={key.code} src={key.src}></button>
        {:else}
          <button onclick={() => onKeyTrigger(key)} class="key">{key}</button>
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

  img {
    position: absolute;
    max-width: 95%;
    max-height: 85%;
  }
}
</style>
