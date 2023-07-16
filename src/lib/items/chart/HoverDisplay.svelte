<script lang="ts">
  import { hoverDisplayStore } from './actions'

  const convertNumber = (number: number) => {
    return number.toLocaleString('en-US')
  }
</script>

<div id="hoverDisplayContainer">
  {#if $hoverDisplayStore.status}
    <div class="hoverDisplay">
      <h1>Chart</h1>
      <p>Date: {$hoverDisplayStore.date}</p>
      <p>Current Price: {convertNumber($hoverDisplayStore.current)}</p>
      <p>Average Price: {convertNumber($hoverDisplayStore.average)}</p>
      <p>Traded Amount: {convertNumber($hoverDisplayStore.traded)}</p>
    </div>
  {/if}
</div>

<style lang="scss">
  #hoverDisplayContainer {
    z-index: 2;
    position: absolute;
  }

  .hoverDisplay {
    background-color: rgb(41, 10, 10);
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem black;
    min-width: 10rem;
  }
</style>
