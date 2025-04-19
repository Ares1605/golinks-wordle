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
    gap: 50px;
    height: $height;
    font-size: $height - 15px;
    text-align: center;
    color: var(--primary-color);
    font-weight: 500;
    background-color: var(--secondary-color);
    border-bottom: 2px solid var(--secondary-light-color);
    letter-spacing: 2px;
  }
  .golinks-logo {
    height: 250%;
  }
</style>
