<script lang="ts">
  import { draw } from 'svelte/transition'
  import { handleHoverDisplay } from './actions'
  import { itemsStore } from '../itemsStore'
  import HoverDisplay from './HoverDisplay.svelte'
  import AnimatedPath from './AnimatedPath.svelte'

  $: barWidth = $itemsStore.chartData.barWidth
  $: priceDataArr = $itemsStore.chartData.priceDataArr
  $: randomKey = $itemsStore.randomKey

  $: currentPriceSVG = priceDataArr
    .map((tradeData, i) => {
      if (i === 0) return `${barWidth * i} ${tradeData.currentHeight}`
      if (i === priceDataArr.length - 1) return `${barWidth * i + barWidth} ${tradeData.currentHeight}`
      return `${barWidth * i + barWidth / 2} ${tradeData.currentHeight}`
    })
    .join(', ')

  $: averagePriceSVG = priceDataArr
    .map((tradeData, i) => {
      if (i === 0) return `${barWidth * i} ${tradeData.averageHeight}`
      if (i === priceDataArr.length - 1) return `${barWidth * i + barWidth} ${tradeData.averageHeight}`
      return `${barWidth * i + barWidth / 2} ${tradeData.averageHeight}`
    })
    .join(', ')

  $: display = {
    average: true,
    current: false,
    traded: true,
  }
</script>

<div>
  <span>Average</span>
  <input type="checkbox" bind:checked={display.average} />
  <span>Current</span>
  <input type="checkbox" bind:checked={display.current} />
  <span>Traded</span>
  <input type="checkbox" bind:checked={display.traded} />
</div>

<HoverDisplay />

<svg viewBox={`0 -0.2 100 101`} xmlns="http://www.w3.org/2000/svg" width="1000" height="1010">
  {#each priceDataArr as { tradedHeight: height }, i}
    <AnimatedPath
      initial={`M ${barWidth * i + barWidth / 2} -0.2 ${barWidth * i + barWidth / 2} -0.2`}
      d={`M ${barWidth * i + barWidth / 2} -0.2 ${barWidth * i + barWidth / 2} ${height}`}
      strokeWidth={barWidth - Math.min(1, barWidth / 5)}
      stroke="#8a8c0dcc"
    />
  {/each}

  <!-- {#if display.average} -->
  <!-- <path d={`M ${averagePriceSVG}`} stroke-width="0.5" fill="transparent" stroke="white" id="test" /> -->
  <!-- use:animatePath={{ height: averagePriceSVG, showHide: display.average, time: 5000 }} -->
  <!-- {/if} -->

  <AnimatedPath d={`M ${averagePriceSVG}`} strokeWidth={0.5} stroke="#0d8c18cc" />
  <AnimatedPath d={`M ${currentPriceSVG}`} strokeWidth={0.5} stroke="#0d7d8ccc" />
  <!-- {#if display.current}
    <path
      d={`M ${currentPriceSVG}`}
      stroke-width="0.5"
      stroke="blue"
      fill="transparent"
      in:draw={{ duration: 750 }}
      out:draw={{ duration: 500 }}
    />
  {/if} -->

  {#each priceDataArr as { }, i (`${randomKey}${i}`)}
    <!-- used to allow hover anywhere -->
    <path
      d={`M ${barWidth * i + barWidth / 2} -0.2 ${barWidth * i + barWidth / 2} 101`}
      stroke-width={barWidth}
      class="transparent"
      use:handleHoverDisplay={{ data: priceDataArr[i] }}
      role="complementary"
    />
  {/each}
</svg>

<style lang="scss">
  svg {
    background-color: hsl(0, 0%, 30%);
    margin: 2rem;
    transform: rotate(180deg);
    transform-origin: center;
  }
  .tradedAmountBar {
    stroke: #0d7d8ccc;
  }

  .transparent {
    stroke: transparent;
    &:hover {
      stroke: hsla(101, 74%, 30%, 0.384);
    }
  }

  // .svgLength {
  //   stroke-dasharray: 129.59471130371094;
  // }

  .fade-in {
    animation: draw-in 50s linear forwards;
    stroke-dashoffset: 129.59471130371094;
  }

  .fade-out {
    animation: draw-out 50s linear forwards;
  }

  @keyframes draw-out {
    to {
      stroke-dashoffset: 129.59471130371094;
    }
  }
  @keyframes draw-in {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
