<script lang="ts">
  import { draw } from 'svelte/transition'
  import { onMount } from 'svelte'

  export let barData: { currentPrice: number }[] = []

  $: highestPrice = Math.max(...barData.map(({ currentPrice: height }) => height))
  $: lowestPrice = Math.min(...barData.map(({ currentPrice: height }) => height))
  $: bars = barData.map(({ currentPrice }) => ({
    currentPrice: (currentPrice / highestPrice) * 95,
  }))

  $: numberOfBars = barData.length
  $: barWidth = 100 / numberOfBars

  $: keyGen = 0
  $: keyGen++, barData

  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as SVGPathElement
    target.style.stroke = 'rgb(255, 0, 0)'
  }
  const handleMouseLeave = (e: MouseEvent) => {
    const target = e.target as SVGPathElement
    target.style.stroke = 'rgb(27, 90, 172)'
  }
</script>

{#each bars as { currentPrice: height }, i (`${keyGen}${i}`)}
  {@const width = barWidth * i + barWidth / 2}
  <path
    d={`M ${width} 0 ${width} ${height}`}
    stroke-width={barWidth - 0.2}
    transition:draw={{ duration: 750 }}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="complementary"
  />
{/each}

<style lang="scss">
  path {
    stroke: rgb(27, 90, 172);
    stroke-dasharray: 100%;
  }
</style>
