<script lang="ts">
  import Footer from "./lib/Footer.svelte";
  import Game from "./lib/Game.svelte";
  import Header from "./lib/Header.svelte";
</script>

<Header />
<main>
  <Game />
</main>
<Footer />

<style>
  main {
    flex: 1 0 auto;
  }
</style>
