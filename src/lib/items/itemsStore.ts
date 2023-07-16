import type { PriceData } from '$lib/types'
import { writable } from 'svelte/store'
import { transformData, type ChartData } from './tools'

type ItemsStore = {
  rawPriceData: { [date: string]: PriceData }
  chartData: ChartData
  randomKey: number
}

const defaultState: ItemsStore = {
  rawPriceData: {},
  chartData: {
    priceDataArr: [],
    numberOfBars: 0,
    barWidth: 0,
  },
  randomKey: 0,
}

const { set, subscribe, update } = writable<ItemsStore>(defaultState)

export const itemsStore = {
  subscribe,
  update,
  setPrices: (data: { [date: string]: PriceData }) => {
    const first30Days = Object.keys(data).slice(0, 30)
    update((state) => {
      state.rawPriceData = data
      state.chartData = transformData(data, first30Days)
      // state.display.startDate = first30Days[0]
      // state.display.endDate = first30Days[first30Days.length - 1]
      state.randomKey++
      return state
    })
  },
}
