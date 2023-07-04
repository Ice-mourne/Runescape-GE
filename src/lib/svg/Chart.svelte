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
    let lowestCurrentPrice: number = Infinity
    let highestAveragePrice: number = 0
    let lowestAveragePrice: number = Infinity
    let highestTradedAmount: number = 0
    let lowestTradedAmount: number = Infinity

    for (const key in data) {
      dataArr.push({
        date: key,
        currentPrice: data[key].c,
        currentHeight: 0,
        averagePrice: data[key].a,
        averageHeight: 0,
        tradedAmount: data[key].t ?? 0,
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
      const current = dataArr[key].currentPrice - lowestCurrentPrice
      const maxCurrent = highestCurrentPrice - lowestCurrentPrice === 0 ? 1 : highestCurrentPrice - lowestCurrentPrice
      dataArr[key].currentHeight = 100 - ((maxCurrent - current) / maxCurrent) * 99

      const average = dataArr[key].averagePrice - lowestAveragePrice
      const maxAverage = highestAveragePrice - lowestAveragePrice === 0 ? 1 : highestAveragePrice - lowestAveragePrice
      dataArr[key].averageHeight = 100 - ((maxAverage - average) / maxAverage) * 99

      const traded = dataArr[key].tradedAmount - lowestTradedAmount
      const maxTraded = highestTradedAmount - lowestTradedAmount === 0 ? 1 : highestTradedAmount - lowestTradedAmount
      dataArr[key].tradedHeight = 100 - ((maxTraded - traded) / maxTraded) * 99
    }

    return {
      priceDataArr: dataArr.reverse(),
      highestTradedAmount,
      lowestTradedAmount,
      numberOfBars: dataArr.length,
      barWidth: 100 / dataArr.length,
    }
  }

  $: ({ priceDataArr, highestTradedAmount, lowestTradedAmount, barWidth } = transformData(priceData))

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
    const targetRect = target.getBoundingClientRect()

    if (e.clientX + hoverDisplay.getBoundingClientRect().width + 10 > window.innerWidth) {
      hoverDisplay.style.left = `${targetRect.x - hoverDisplay.getBoundingClientRect().width - 10}px`
    } else {
      hoverDisplay.style.left = `${targetRect.x + targetRect.width + 10}px`
    }
    hoverDisplay.style.top = `${e.clientY - hoverDisplay.getBoundingClientRect().height / 2}px`
  }

  $: currentPriceSVG = priceDataArr
    .map((tradeData, i) => {
      return `${barWidth * i + barWidth / 2} ${tradeData.currentHeight}`
    })
    .join(', ')

  $: averagePriceSVG = priceDataArr
    .map((tradeData, i) => {
      return `${barWidth * i + barWidth / 2} ${tradeData.averageHeight}`
    })
    .join(', ')
</script>

<div class="hoverDisplay" bind:this={hoverDisplay}>
  {#if showHoverDisplay}
    <div class="hoverDisplayContent">
      <h1>Chart</h1>
      <p>Date: {hoverDisplayData.date}</p>
      <p>Current Price: {hoverDisplayData.currentPrice}</p>
      <p>Average Price: {hoverDisplayData.averagePrice}</p>
      <p>Traded Amount: {hoverDisplayData.tradedAmount ?? 'Unknown'}</p>
    </div>
  {/if}
</div>

<svg viewBox={`0 0 100 101`} xmlns="http://www.w3.org/2000/svg" width="1000" height="1010">
  {#each priceDataArr as { tradedHeight: height }, i (`${keyGen}${i}`)}
    <g
      on:mouseenter={(e) => handleMouseEnter(e, priceDataArr[i])}
      on:mouseleave={handleMouseLeave}
      on:mousemove={handleMouseMove}
      role="complementary"
      class="barGroup"
    >
      <!-- used to allow hover anywhere -->
      <path
        d={`M ${barWidth * i + barWidth / 2} 0 ${barWidth * i + barWidth / 2} 101`}
        stroke-width={barWidth}
        class="transparent"
      />

      <path
        d={`M ${barWidth * i + barWidth / 2} 0 ${barWidth * i + barWidth / 2} ${height}`}
        stroke-width={barWidth}
        class="tradedAmountBar"
      />
    </g>
  {/each}

  {#each { length: 1 } as _, i (`${keyGen}${i}`)}
    <path
      d={`M ${averagePriceSVG}`}
      stroke-width="0.5"
      stroke="white"
      fill="transparent"
      transition:draw={{ duration: 750 }}
    />
    <path
      d={`M ${currentPriceSVG}`}
      stroke-width="0.5"
      stroke="blue"
      fill="transparent"
      transition:draw={{ duration: 750 }}
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

  .barGroup {
    .transparent {
      stroke: transparent;
    }
    .currentPriceBar {
      stroke: hsla(214, 73%, 39%, 0.8);
    }
    .tradedAmountBar {
      stroke: hsla(0, 73%, 39%, 0.8);
    }
    &:hover {
      .transparent {
        stroke: hsla(101, 74%, 30%, 0.384);
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
      min-width: 10rem;
    }
  }
</style>
