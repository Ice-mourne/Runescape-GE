import type { PriceData, TradeData } from '$lib/types'

export type ChartData = {
  priceDataArr: TradeData[]
  numberOfBars: number
  barWidth: number
}

export const transformData = (data: { [date: string]: PriceData }, keys: string[]): ChartData => {
  const dataArr: TradeData[] = []
  let highestPrice: number = 0
  let lowestPrice: number = Infinity
  let highestTradedAmount: number = 0
  let lowestTradedAmount: number = Infinity

  for (const index in keys) {
    const date = keys[index]

    dataArr.push({
      date: date,
      currentPrice: data[date].c,
      currentHeight: 0,
      averagePrice: data[date].a,
      averageHeight: 0,
      tradedAmount: data[date].t ?? 0,
      tradedHeight: 0,
    })

    if (data[date].a > highestPrice) highestPrice = data[date].a
    if (data[date].c > highestPrice) highestPrice = data[date].c

    if (data[date].a < lowestPrice) lowestPrice = data[date].a
    if (data[date].c < lowestPrice) lowestPrice = data[date].c

    if (data[date].t > highestTradedAmount) highestTradedAmount = data[date].t
    if (data[date].t < lowestTradedAmount) lowestTradedAmount = data[date].t
  }

  const calc = (price: number, type: 'price' | 'amount') => {
    const max = type === 'price' ? highestPrice - lowestPrice : highestTradedAmount - lowestTradedAmount
    if (max === 0) return 100 - price * 100
    return 100 - ((max - price) / max) * 100
  }

  for (const key in dataArr) {
    dataArr[key].currentHeight = calc(dataArr[key].currentPrice - lowestPrice, 'price')
    dataArr[key].averageHeight = calc(dataArr[key].averagePrice - lowestPrice, 'price')
    dataArr[key].tradedHeight = calc(dataArr[key].tradedAmount - lowestTradedAmount, 'amount')
  }

  return {
    priceDataArr: dataArr,
    numberOfBars: dataArr.length,
    barWidth: 100 / dataArr.length,
  }
}
