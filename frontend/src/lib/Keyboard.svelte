<script lang="ts">
  import enterIcon from "../assets/enter.svg";
  import bkspcIcon from "../assets/backspace.svg";

  interface KeyboardProps {
    onKey: (key: string) => void;
  }

  let { onKey: onKeyTrigger }: KeyboardProps = $props();

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

<style lang="scss">
.row {
  display: flex;
  justify-content: center;
  margin: 10px 0px;
  gap: 5px;
}
.key {
  $height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 50px;
  line-height: $height;
  height: $height;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-weight: bold;
  font-size: 23px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-transform: capitalize;

  img {
    align-items: center;
    max-width: 85%;
    max-height: 85%;
  }
}
</style>
