<script lang="ts">
  import type { PriceData } from '$lib/types'
  import { draw } from 'svelte/transition'
  export let priceData: { [date: string]: PriceData }

  type TradeData = {
    date: string
    currentPrice: number
    currentHeight: number
    averagePrice: number
    averageHeight: number
    tradedAmount: number
    tradedHeight: number
  }

  const transformData = (data: { [date: string]: PriceData }) => {
    const dataArr: TradeData[] = []
    let highestCurrentPrice: number = 0
    let lowestCurrentPrice: number = 0
    let highestAveragePrice: number = 0
    let lowestAveragePrice: number = 0
    let highestTradedAmount: number = 0
    let lowestTradedAmount: number = 0

    for (const key in data) {
      dataArr.push({
        date: key,
        currentPrice: data[key].c,
        currentHeight: 0,
        averagePrice: data[key].a,
        averageHeight: 0,
        tradedAmount: data[key].t,
        tradedHeight: 0,
      })
      if (data[key].c > highestCurrentPrice) highestCurrentPrice = data[key].c
      if (data[key].c < lowestCurrentPrice) lowestCurrentPrice = data[key].c
      if (data[key].a > highestAveragePrice) highestAveragePrice = data[key].a
      if (data[key].a < lowestAveragePrice) lowestAveragePrice = data[key].a
      if (data[key].t > highestTradedAmount) highestTradedAmount = data[key].t
      if (data[key].t < lowestTradedAmount) lowestTradedAmount = data[key].t
    }

    for (const key in dataArr) {
      dataArr[key].currentHeight = ((dataArr[key].currentPrice / highestCurrentPrice) * 100) / 2
      dataArr[key].averageHeight = ((dataArr[key].averagePrice / highestAveragePrice) * 100) / 2
      dataArr[key].tradedHeight = ((dataArr[key].tradedAmount / highestTradedAmount) * 100) / 2
    }

    return {
      priceDataArr: dataArr,
      highestCurrentPrice,
      highestAveragePrice,
      numberOfBars: dataArr.length,
      barWidth: 100 / dataArr.length,
    }
  }

  $: ({ priceDataArr, numberOfBars, barWidth } = transformData(priceData))

  // $: barData = Object.entries(priceData).map(([date, data]) => ({
  //   current: data.c,
  //   average: data.a,
  //   traded: data.t,
  //   date,
  // }))

  // $: highestPrice = Math.max(...barData.map(({ currentPrice: height }) => height))
  // $: lowestPrice = Math.min(...barData.map(({ currentPrice: height }) => height))
  // $: bars = barData.map(({ currentPrice }) => ({
  //   currentPrice: (currentPrice / highestPrice) * 95,
  // }))

  // $: numberOfBars = barData.length
  // $: barWidth = 100 / numberOfBars

  $: keyGen = 0
  $: keyGen++, priceDataArr

  $: showHoverDisplay = false
  let hoverDisplay: HTMLDivElement
  $: hoverDisplayData = {} as TradeData
  const handleMouseEnter = (e: MouseEvent, data: TradeData) => {
    showHoverDisplay = true
    hoverDisplayData = data
  }
  const handleMouseLeave = (e: MouseEvent) => {
    showHoverDisplay = false
  }

  const handleMouseMove = (e: MouseEvent) => {
    const target = e.target as SVGPathElement
    hoverDisplay.style.left = `${target.getBoundingClientRect().x + target.getBoundingClientRect().width + 10}px`
    hoverDisplay.style.top = `${e.clientY - hoverDisplay.getBoundingClientRect().height / 2}px`
  }
</script>

<div class="hoverDisplay" bind:this={hoverDisplay}>
  {#if showHoverDisplay}
    <div class="hoverDisplayContent">
      <h1>Chart</h1>
      <p>Date: {hoverDisplayData.date}</p>
      <p>Current Price: {hoverDisplayData.currentPrice}</p>
      <p>Average Price: {hoverDisplayData.averagePrice}</p>
      <p>Traded Amount: {hoverDisplayData.tradedAmount}</p>
    </div>
  {/if}
</div>

<svg viewBox={`0 0 100 60`} xmlns="http://www.w3.org/2000/svg" width="1000" height="600">
  {#each priceDataArr as { currentHeight: height }, i (`${keyGen}${i}`)}
    <g
      on:mouseenter={(e) => handleMouseEnter(e, priceDataArr[i])}
      on:mouseleave={handleMouseLeave}
      on:mousemove={handleMouseMove}
      role="complementary"
      class="barGroup"
    >
      <path
        d={`M ${barWidth * i} 0 ${barWidth * i} ${height}`}
        stroke-width={Math.min(barWidth / 10, 0.5)}
        class="transparent"
      />
      <path
        d={`M ${barWidth * i + barWidth / 2} 0 ${barWidth * i + barWidth / 2} ${height}`}
        stroke-width={barWidth - Math.min(barWidth / 10, 0.5)}
        class="bar"
        transition:draw={{ duration: 750 }}
        role="complementary"
      />
    </g>
  {/each}
</svg>

<style lang="scss">
  svg {
    background-color: hsl(0, 0%, 30%);
    margin: 2rem;
    transform: rotate(180deg);
    transform-origin: center;
  }

  .barGroup {
    .transparent {
      stroke: transparent;
    }
    .bar {
      stroke: rgb(27, 90, 172);
    }
    &:hover {
      .bar {
        stroke: rgb(255, 0, 0);
      }
    }
  }
  .hoverDisplay {
    z-index: 2;
    position: absolute;
    .hoverDisplayContent {
      background-color: rgb(41, 10, 10);
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.5rem black;
    }
  }
</style>
