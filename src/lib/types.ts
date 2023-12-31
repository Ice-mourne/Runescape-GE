export type PriceData = {
  c: number
  a: number
  t: number
}

export type SearchData = [number, string, boolean]

export type TradeData = {
  date: string
  currentPrice: number
  currentHeight: number
  averagePrice: number
  averageHeight: number
  tradedAmount: number
  tradedHeight: number
}
