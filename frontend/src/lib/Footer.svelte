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
    justify-content: center;
    gap: 5px;
    height: 30px;
    width: 100%;
    color: var(--primary-color);
  }
  img {
    height: 80%;
    aspect-ratio: 1;
  }
</style>
