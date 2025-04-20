<script lang="ts">
  let notif: string|null = null;
  let fadeOut = false;
  export const setNotif = (text: string) => {
    notif = text;
    setTimeout(() => {
      fadeOut = true;
      setTimeout(() => {
        notif = null;
        fadeOut = false;
      }, 300);
    }, 2000);
  }
</script>

<div class="notif" class:show={notif !== null} class:fade-out={fadeOut}>{notif}</div>

<style>
  div {
    top: 75px;
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    min-width: 100px;
    border-radius: 5px;
    font-weight: 600;
    text-align: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    transition: .3s ease-in-out;
  }
  .show {
    opacity: .9;
    top: 50px;
  }
  .fade-out {
    top: 25px;
    opacity: 0;
  }
</style>
