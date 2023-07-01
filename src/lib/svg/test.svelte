<script lang="ts">
  import { scale } from 'svelte/transition'

  export let barData = [
    ...Array(50)
      .fill(0)
      .map(() => ({ height: Math.random() * 100 })),
  ]

  $: numberOfBars = barData.length
  $: barWidth = 100 / numberOfBars

  let toggle = false
</script>

<button on:click={() => (toggle = !toggle)}>toggle</button>

<svg viewBox={`0 0 100 100`} xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
  {#each barData as { height }, i (i)}
    <path
      d={`M ${barWidth * i + 0.1} 0 ${barWidth * i + 0.1} ${height}`}
      stroke="green"
      stroke-width={barWidth - 0.2}
    />
  {/each}
</svg>

<style lang="scss">
  stroke {
    fill: rgb(253, 235, 235);
  }
</style>
