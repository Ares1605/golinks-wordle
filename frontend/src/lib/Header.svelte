<script lang="ts">
  import goLinksLogo from "../assets/golinks_logo.svg";
</script>
<header>
   Wordle <img class="golinks-logo" alt="GoLinks Logo" src={goLinksLogo}>
</header>

<style lang="scss">
  $height: 40px;

  header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    height: $height;
    font-size: $height - 12px;
    text-align: center;
    color: var(--primary-color);
    font-weight: 600;
    background-color: var(--secondary-color);
    border-bottom: 2px solid var(--secondary-light-color);
    letter-spacing: 2px;
  }
  .golinks-logo {
    height: 275%;
  }
</style>
