<script lang="ts">
  import githubLogo from "../assets/github_logo.svg";
  import linkedInLogo from "../assets/linkedin_logo.svg";
  import xLogo from "../assets/x_logo.svg";
</script>

<footer>
  <span>Ares Stavropoulos</span>|
  <a href="https://github.com/Ares1605" target="_blank"><img alt="Github logo" src={githubLogo}></a>|
  <a href="https://www.linkedin.com/in/ares-stavropoulos/" target="_blank"><img alt="LinkedIn Logo" src={linkedInLogo}></a>|
  <a href="https://x.com/ares1605" target="_blank"><img alt="X Logo" src={xLogo}></a>
</footer>

<style lang="scss">
  footer {
    flex-shrink: 0;
    display: flex;
    font-size: 16px;
    justify-content: center;
    height: 30px;
    line-height: 30px;
    width: 100%;
    color: var(--primary-color);
    gap: 6px;
  }
  img {
    height: 75%;
    display: inline-block;
    align-self: center;
    aspect-ratio: 1;
  }
  a {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>
