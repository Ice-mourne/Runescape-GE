<script lang="ts">
  import { draw } from 'svelte/transition'
  import { onMount, tick } from 'svelte'

  export let barData: { currentPrice: number }[] = []

  $: highestPrice = Math.max(...barData.map(({ currentPrice: height }) => height))
  $: bars = barData.map(({ currentPrice }) => ({
    currentPrice: (currentPrice / highestPrice) * 95,
  }))

  $: numberOfBars = barData.length
  $: barWidth = 100 / numberOfBars

  $: toggle = false
  onMount(() => (toggle = !toggle))
  const toggleOnOff = () => {
    toggle = !toggle
    tick()
    toggle = !toggle
  }
  $: {
    console.log(123)
    barData
    bars
    numberOfBars
    barWidth
    toggleOnOff()
  }
</script>

{#each bars as { currentPrice: height }, i}
  {#if toggle}
    <path
      d={`M ${barWidth * i} 0 ${barWidth * i} ${height}`}
      stroke="green"
      stroke-width={barWidth - 0.2}
      transition:draw={{ duration: 1000 }}
    />
  {/if}
{/each}

<style lang="scss">
  rect {
    fill: rgb(253, 235, 235);
  }
</style>
