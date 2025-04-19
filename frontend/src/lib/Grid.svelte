<script lang="ts">
interface gridProps {
  grid: string[][]
};

let { grid }: gridProps = $props();
</script>

{#each grid as row}
<div class="row">
  {#each row as cell}
      <div class="cell">{cell}</div>
  {/each}
</div>
{/each}

<style lang="scss">
  .row {
    $gap: 4px;

    display: flex;
    justify-content: center;
    gap: $gap;
    margin: $gap;
  }
  .cell {
    display: flex;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    width: 62px;
    border: 3px solid var(--secondary-color);
    border-radius: 5px;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 30px;
    text-transform: capitalize;
  }
</style>
