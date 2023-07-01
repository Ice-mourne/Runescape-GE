<script lang="ts">
  import type { PriceData } from '$lib/types'
  import Bar from './Bars.svelte'
  export let priceData: { [date: string]: PriceData }

  $: prices = Object.entries(priceData).map(([date, currentPrice]) => ({ currentPrice: currentPrice.c }))
</script>

<svg viewBox={`0 0 100 100`} xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
  <Bar barData={prices} />
</svg>

<style lang="scss">
  svg {
    background-color: hsl(0, 0%, 30%);
    margin: 2rem;
    transform: rotate(180deg);
    transform-origin: center;
  }
</style>
